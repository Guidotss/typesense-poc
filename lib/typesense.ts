import { Client } from "typesense";

interface SearchFilters {
  categories: string[]
  families: string[]
  priceRange: [number, number]
  careLevel: string[]
  lightRequirements: string[]
  stockStatus: string[]
  origin: string[]
  size: string[]
  status: string[]
  rank: string[]
}

interface Product {
  id: string
  name: string
  scientific_name: string
  category: string
  price: number
  min_quantity: number
  stock: number
  image_url: string
  description: string
  care_level: string
  light_requirements: string
  size: string
  origin: string
}

export class TypesenseService {
  private client: Client;

  constructor() {
    this.client = new Client({
      nodes: [{
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT || '8108'),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http'
      }],
      apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || 'your-api-key',
      connectionTimeoutSeconds: 2
    })
  }

  async searchProducts(query: string, filters: SearchFilters) {
    try {
      const filterBy = this.buildFilters(filters);
      
      const searchParameters = {
        q: query || "*",
        query_by: "common_name,scientific_name,description,category,family,synonyms,search_text",
        filter_by: filterBy,
        facet_by: "category,family,care_level,light_requirements,origin,size,status,rank",
        sort_by: "_text_match:desc",
        per_page: 20,
        prefix: true,
        typo_tolerance_enabled: true,
        num_typos: 2,
        enable_highlight_v1: true,
        highlight_full_fields: "common_name,scientific_name,description"
      };

      console.log("Search parameters:", searchParameters);

      const searchResults = await this.client
        .collections("plants")
        .documents()
        .search(searchParameters);

      return {
        hits: searchResults.hits?.map(hit => hit.document) || [],
        found: searchResults.found || 0,
        facets: searchResults.facet_counts || {}
      };
    } catch (error) {
      console.error("Error en búsqueda semántica:", error);
      return this.fallbackSearch(query, filters);
    }
  }

  private buildFilters(filters: SearchFilters): string {
    const filterConditions = [];
    
    if (filters.categories.length > 0) {
      const categoryFilters = filters.categories.map(cat => `category:=${cat}`).join(' || ');
      filterConditions.push(`(${categoryFilters})`);
    }
    
    if (filters.families.length > 0) {
      const familyFilters = filters.families.map(family => `family:=${family}`).join(' || ');
      filterConditions.push(`(${familyFilters})`);
    }
    
    if (filters.priceRange[0] > 10 || filters.priceRange[1] < 109) {
      filterConditions.push(`price:>=${filters.priceRange[0]} && price:<=${filters.priceRange[1]}`);
    }
    
    if (filters.careLevel.length > 0) {
      const careLevelFilters = filters.careLevel.map(level => `care_level:=${level}`).join(' || ');
      filterConditions.push(`(${careLevelFilters})`);
    }
    
    if (filters.lightRequirements.length > 0) {
      const lightFilters = filters.lightRequirements.map(light => `light_requirements:=${light}`).join(' || ');
      filterConditions.push(`(${lightFilters})`);
    }
    
    if (filters.stockStatus.length > 0) {
      const stockConditions: string[] = [];
      filters.stockStatus.forEach(status => {
        switch (status) {
          case "Alto Stock":
            stockConditions.push("stock:>=100");
            break;
          case "Stock Medio":
            stockConditions.push("stock:>=50 && stock:<100");
            break;
          case "Stock Bajo":
            stockConditions.push("stock:<50");
            break;
        }
      });
      if (stockConditions.length > 0) {
        filterConditions.push(`(${stockConditions.join(' || ')})`);
      }
    }

    if (filters.origin.length > 0) {
      const originFilters = filters.origin.map(origin => `origin:=${origin}`).join(' || ');
      filterConditions.push(`(${originFilters})`);
    }
    
    if (filters.size.length > 0) {
      const sizeFilters = filters.size.map(size => `size:=${size}`).join(' || ');
      filterConditions.push(`(${sizeFilters})`);
    }
    
    if (filters.status.length > 0) {
      const statusFilters = filters.status.map(status => `status:=${status}`).join(' || ');
      filterConditions.push(`(${statusFilters})`);
    }
    
    if (filters.rank.length > 0) {
      const rankFilters = filters.rank.map(rank => `rank:=${rank}`).join(' || ');
      filterConditions.push(`(${rankFilters})`);
    }
    
    return filterConditions.join(' && ');
  }

  private async fallbackSearch(query: string, filters: SearchFilters) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let filteredProducts: Product[] = [];

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.scientific_name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm),
      );
    }

    return {
      hits: filteredProducts,
      found: filteredProducts.length,
      facets: {}
    };
  }

  async initializeCollection() {
    console.log("Initializing Typesense collection...");
  }
}
