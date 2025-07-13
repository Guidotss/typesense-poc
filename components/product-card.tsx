import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ShoppingCart, Eye, Heart } from "lucide-react"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStockStatus = (stock: number) => {
    if (stock > 100) return { label: "Alto Stock", color: "bg-green-100 text-green-800" }
    if (stock > 20) return { label: "Stock Medio", color: "bg-yellow-100 text-yellow-800" }
    if (stock > 0) return { label: "Stock Bajo", color: "bg-red-100 text-red-800" }
    return { label: "Agotado", color: "bg-gray-100 text-gray-800" }
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{product.category}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 italic">{product.scientific_name}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>

          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="outline" className="text-xs">
              {product.care_level}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.light_requirements}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.size}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</p>
              <p className="text-xs text-gray-600">Mín. {product.min_quantity} unidades</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Stock: {product.stock}</p>
              <p className="text-xs text-gray-600">unidades</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cotizar
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
