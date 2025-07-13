import { Client } from "typesense";
import plantsData from "../plants-processed.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();

if (!process.env.TYPESENSE_API_KEY) {
  console.error("TYPESENSE_API_KEY is not set in the environment variables");
  process.exit(1);
}

const client = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST ?? "localhost",
      port: process.env.TYPESENSE_PORT ?? 8108,
      protocol: process.env.TYPESENSE_PROTOCOL ?? "http",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});

const plantsSchema = {
  name: "plants",
  fields: [
    { name: "id", type: "string" },
    { name: "common_name", type: "string", optional: true },
    { name: "slug", type: "string", optional: true },
    { name: "scientific_name", type: "string", optional: true },
    { name: "year", type: "int32", optional: true },
    { name: "bibliography", type: "string", optional: true },
    { name: "author", type: "string", optional: true },
    { name: "status", type: "string", facet: true, optional: true },
    { name: "rank", type: "string", facet: true, optional: true },
    { name: "family_common_name", type: "string", optional: true },
    { name: "genus_id", type: "int32", optional: true },
    { name: "image_url", type: "string", optional: true },
    { name: "synonyms", type: "string[]", optional: true },
    { name: "genus", type: "string", facet: true, optional: true },
    { name: "family", type: "string", facet: true, optional: true },
    { name: "links", type: "object", optional: true },
    { name: "description", type: "string", optional: true },
    { name: "category", type: "string", facet: true, optional: true },
    { name: "care_level", type: "string", facet: true, optional: true },
    { name: "light_requirements", type: "string", facet: true, optional: true },
    { name: "origin", type: "string", facet: true, optional: true },
    { name: "price", type: "float", optional: true },
    { name: "stock", type: "int32", optional: true },
    { name: "size", type: "string", facet: true, optional: true },
    { name: "search_text", type: "string", optional: true },
  ],
  enable_nested_fields: true,
  synonyms: [
    {
      id: "plant_synonyms",
      synonyms: [
        "roble, oak, quercus",
        "pino, pine, pinus", 
        "árbol, tree, planta",
        "flor, flower, bloom",
        "hoja, leaf, foliage"
      ]
    }
  ]
};

async function setupTypesense() {
  try {
    try {
      const checkCollectionExists = await client.collections("plants").retrieve();
      if (checkCollectionExists) {
        console.log("Colección ya existe, eliminando...");
        await client.collections("plants").delete();
        console.log("Colección eliminada");
      }
    } catch (error) {
      if (error.message.includes("404") || error.message.includes("not found")) {
        console.log("Colección no existe, creando nueva...");
      } else {
        throw error;
      }
    }

    console.log("Creando colección de plantas...");
    await client.collections().create(plantsSchema);
    console.log("Colección creada exitosamente");

    console.log("Indexando productos...");
    const importResults = await client
      .collections("plants")
      .documents()
      .import(plantsData);
    console.log("Productos indexados:", importResults.length);

    const searchResults = await client
      .collections("plants")
      .documents()
      .search({
        q: "*",
        per_page: 5,
      });

    console.log("Verificación de búsqueda");
    console.log(`- Total de documentos: ${searchResults.found}`);
    console.log(`- Primeros resultados: ${searchResults.hits.length}`);

    console.log("Configuración de Typesense completada");
  } catch (error) {
    console.error("Error configurando Typesense:", error);
  }
}

async function testSearch() {
  try {
    console.log("\nProbando búsquedas...");

    const textSearch = await client.collections("plants").documents().search({
      q: "oak",
      query_by: "common_name,scientific_name",
    });
    console.log(`Búsqueda "oak": ${textSearch.found} resultados`);

    const filteredSearch = await client
      .collections("plants")
      .documents()
      .search({
        q: "*",
        query_by: "common_name,scientific_name",
        filter_by: "family:=Fagaceae && status:=accepted",
        facet_by: "family,genus,status",
      });
    console.log(
      `Plantas de la familia Fagaceae aceptadas: ${filteredSearch.found} resultados`
    );

    const facetSearch = await client.collections("plants").documents().search({
      q: "*",
      facet_by: "family,genus,status,rank",
    });
    console.log(
      "Facetas disponibles:",
      Object.keys(facetSearch.facet_counts || {})
    );
  } catch (error) {
    console.error("Error en las pruebas:", error);
  }
}



setupTypesense().then(() => {
  return testSearch();
});


