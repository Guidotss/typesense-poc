"use client"

import { useState, useEffect, useMemo } from "react"
import { TypesenseService } from "@/lib/typesense"

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

interface Facets {
  category?: { counts: Array<{ value: string; count: number }> }
  family?: { counts: Array<{ value: string; count: number }> }
  care_level?: { counts: Array<{ value: string; count: number }> }
  light_requirements?: { counts: Array<{ value: string; count: number }> }
  origin?: { counts: Array<{ value: string; count: number }> }
  size?: { counts: Array<{ value: string; count: number }> }
  status?: { counts: Array<{ value: string; count: number }> }
  rank?: { counts: Array<{ value: string; count: number }> }
}

export function useTypesenseSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [facets, setFacets] = useState<Facets>({})
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    families: [],
    priceRange: [10, 109],
    careLevel: [],
    lightRequirements: [],
    stockStatus: [],
    origin: [],
    size: [],
    status: [],
    rank: [],
  })

  const typesenseService = useMemo(() => new TypesenseService(), [])

  useEffect(() => {
    performSearch()
  }, [searchQuery, filters])

  const performSearch = async () => {
    setIsLoading(true)
    try {
      const results = await typesenseService.searchProducts(searchQuery, filters)
      setSearchResults((results.hits || []) as Product[])
      setTotalResults(results.found || 0)
      setFacets(results.facets || {})
    } catch (error) {
      console.error("Error searching products:", error)
      setSearchResults([])
      setTotalResults(0)
      setFacets({})
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilter = (filterType: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      families: [],
      priceRange: [10, 109],
      careLevel: [],
      lightRequirements: [],
      stockStatus: [],
      origin: [],
      size: [],
      status: [],
      rank: [],
    })
  }

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    totalResults,
    filters,
    facets,
    updateFilter,
    clearFilters,
  }
}
