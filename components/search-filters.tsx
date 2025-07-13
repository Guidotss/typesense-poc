"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

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

interface SearchFiltersProps {
  filters: {
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
  facets?: Facets
  onFilterChange: (filterType: string, value: any) => void
  onClearFilters: () => void
}

export function SearchFilters({ filters, facets, onFilterChange, onClearFilters }: SearchFiltersProps) {
  const defaultCategories = [
    "Poaceae",
    "Aster family", 
    "Fabaceae",
    "Sedge family",
    "Rose family",
    "Lamiaceae",
    "Brassicaceae",
    "Orchidaceae",
    "Carrot family",
    "Caryophyllaceae",
    "Plantaginaceae",
    "Ranunculaceae",
    "Juncaceae",
    "Polygonaceae",
    "Ericaceae",
    "Boraginaceae",
    "Asparagaceae",
    "Rubiaceae",
    "Primulaceae",
    "Fagaceae"
  ]

  const defaultCareLevels = ["Fácil", "Moderado", "Avanzado"]
  const defaultLightRequirements = ["Luz Directa", "Luz Indirecta", "Sombra Parcial", "Sombra Total"]
  const stockStatuses = ["Alto Stock", "Stock Medio", "Stock Bajo"]
  const defaultOrigins = ["Nativo", "Importado", "Híbrido", "Cultivado"]
  const defaultSizes = ["Pequeño", "Mediano", "Grande", "Extra Grande"]

  const categories = facets?.category?.counts?.map(item => item.value) || defaultCategories
  const families = facets?.family?.counts?.map(item => item.value) || defaultCategories
  const careLevels = facets?.care_level?.counts?.map(item => item.value) || defaultCareLevels
  const lightRequirements = facets?.light_requirements?.counts?.map(item => item.value) || defaultLightRequirements
  const origins = facets?.origin?.counts?.map(item => item.value) || defaultOrigins
  const sizes = facets?.size?.counts?.map(item => item.value) || defaultSizes

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.families.length > 0 ||
    filters.careLevel.length > 0 ||
    filters.lightRequirements.length > 0 ||
    filters.stockStatus.length > 0 ||
    filters.origin.length > 0 ||
    filters.size.length > 0 ||
    filters.status.length > 0 ||
    filters.rank.length > 0 ||
    filters.priceRange[0] > 10 ||
    filters.priceRange[1] < 109

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Filtros
            {hasActiveFilters && (
              <span className="ml-2 text-sm text-gray-500">
                ({Object.values(filters).flat().filter(v => Array.isArray(v) ? v.length > 0 : v !== 10 && v !== 109).length} activos)
              </span>
            )}
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-red-600 hover:text-red-700">
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Rango de Precio</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFilterChange("priceRange", value)}
              max={109}
              min={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Familias de Plantas</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {families.slice(0, 15).map((family) => {
              const facetCount = facets?.family?.counts?.find(item => item.value === family)?.count
              return (
                <div key={family} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={family}
                      checked={filters.families.includes(family)}
                      onCheckedChange={(checked) => {
                        const newFamilies = checked
                          ? [...filters.families, family]
                          : filters.families.filter((f) => f !== family)
                        onFilterChange("families", newFamilies)
                      }}
                    />
                    <Label htmlFor={family} className="text-sm">
                      {family}
                    </Label>
                  </div>
                  {facetCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facetCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Categorías</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.slice(0, 15).map((category) => {
              const facetCount = facets?.category?.counts?.find(item => item.value === category)?.count
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...filters.categories, category]
                          : filters.categories.filter((c) => c !== category)
                        onFilterChange("categories", newCategories)
                      }}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                  {facetCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facetCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Nivel de Cuidado</Label>
          <div className="space-y-2">
            {careLevels.map((level) => {
              const facetCount = facets?.care_level?.counts?.find(item => item.value === level)?.count
              return (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={level}
                      checked={filters.careLevel.includes(level)}
                      onCheckedChange={(checked) => {
                        const newLevels = checked
                          ? [...filters.careLevel, level]
                          : filters.careLevel.filter((l) => l !== level)
                        onFilterChange("careLevel", newLevels)
                      }}
                    />
                    <Label htmlFor={level} className="text-sm">
                      {level}
                    </Label>
                  </div>
                  {facetCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facetCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Requerimientos de Luz</Label>
          <div className="space-y-2">
            {lightRequirements.map((requirement) => {
              const facetCount = facets?.light_requirements?.counts?.find(item => item.value === requirement)?.count
              return (
                <div key={requirement} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={requirement}
                      checked={filters.lightRequirements.includes(requirement)}
                      onCheckedChange={(checked) => {
                        const newRequirements = checked
                          ? [...filters.lightRequirements, requirement]
                          : filters.lightRequirements.filter((r) => r !== requirement)
                        onFilterChange("lightRequirements", newRequirements)
                      }}
                    />
                    <Label htmlFor={requirement} className="text-sm">
                      {requirement}
                    </Label>
                  </div>
                  {facetCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facetCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Estado de Stock</Label>
          <div className="space-y-2">
            {stockStatuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={status}
                  checked={filters.stockStatus.includes(status)}
                  onCheckedChange={(checked) => {
                    const newStatuses = checked
                      ? [...filters.stockStatus, status]
                      : filters.stockStatus.filter((s) => s !== status)
                    onFilterChange("stockStatus", newStatuses)
                  }}
                />
                <Label htmlFor={status} className="text-sm">
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Origen</Label>
          <div className="space-y-2">
            {origins.map((origin) => {
              const facetCount = facets?.origin?.counts?.find(item => item.value === origin)?.count
              return (
                <div key={origin} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={origin}
                      checked={filters.origin.includes(origin)}
                      onCheckedChange={(checked) => {
                        const newOrigins = checked
                          ? [...filters.origin, origin]
                          : filters.origin.filter((o) => o !== origin)
                        onFilterChange("origin", newOrigins)
                      }}
                    />
                    <Label htmlFor={origin} className="text-sm">
                      {origin}
                    </Label>
                  </div>
                  {facetCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facetCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Tamaño</Label>
          <div className="space-y-2">
            {sizes.map((size) => {
              const facetCount = facets?.size?.counts?.find(item => item.value === size)?.count
              return (
                <div key={size} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={filters.size.includes(size)}
                      onCheckedChange={(checked) => {
                        const newSizes = checked
                          ? [...filters.size, size]
                          : filters.size.filter((s) => s !== size)
                        onFilterChange("size", newSizes)
                      }}
                    />
                    <Label htmlFor={size} className="text-sm">
                      {size}
                    </Label>
                  </div>
                  {facetCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facetCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
