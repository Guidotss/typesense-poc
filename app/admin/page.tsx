"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Upload, Database, Settings } from "lucide-react"

export default function AdminPage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    scientific_name: "",
    category: "",
    price: "",
    min_quantity: "",
    stock: "",
    description: "",
    care_level: "",
    light_requirements: "",
    size: "",
    origin: "",
  })


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Gestión de productos y configuración de Typesense</p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="search">Búsqueda</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agregar Producto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Agregar Producto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Ej: Monstera Deliciosa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="scientific_name">Nombre Científico</Label>
                      <Input
                        id="scientific_name"
                        value={newProduct.scientific_name}
                        onChange={(e) => setNewProduct({ ...newProduct, scientific_name: e.target.value })}
                        placeholder="Ej: Monstera deliciosa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoría</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Plantas de Interior">Plantas de Interior</SelectItem>
                          <SelectItem value="Plantas de Exterior">Plantas de Exterior</SelectItem>
                          <SelectItem value="Suculentas">Suculentas</SelectItem>
                          <SelectItem value="Cactus">Cactus</SelectItem>
                          <SelectItem value="Plantas Aromáticas">Plantas Aromáticas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Precio (COP)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="25000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min_quantity">Cantidad Mínima</Label>
                      <Input
                        id="min_quantity"
                        type="number"
                        value={newProduct.min_quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, min_quantity: e.target.value })}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="150"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Descripción detallada del producto..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="care_level">Nivel de Cuidado</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, care_level: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fácil">Fácil</SelectItem>
                          <SelectItem value="Intermedio">Intermedio</SelectItem>
                          <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="light_requirements">Luz</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, light_requirements: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Luz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Luz Directa">Luz Directa</SelectItem>
                          <SelectItem value="Luz Indirecta">Luz Indirecta</SelectItem>
                          <SelectItem value="Sombra Parcial">Sombra Parcial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="origin">Origen</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, origin: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Origen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nacional">Nacional</SelectItem>
                          <SelectItem value="Importado">Importado</SelectItem>
                          <SelectItem value="Vivero Local">Vivero Local</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Estadísticas del Catálogo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1,247</div>
                      <div className="text-sm text-green-700">Total Productos</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-blue-700">Categorías</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">156</div>
                      <div className="text-sm text-yellow-700">Stock Bajo</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">23</div>
                      <div className="text-sm text-red-700">Agotados</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Categorías Populares</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Plantas de Interior</span>
                        <Badge variant="secondary">342</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Suculentas</span>
                        <Badge variant="secondary">289</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Plantas Aromáticas</span>
                        <Badge variant="secondary">156</Badge>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Reindexar Colección
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Configuración de Búsqueda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Campos de Búsqueda</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">name</span>
                        <Badge>Peso: 3</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">scientific_name</span>
                        <Badge>Peso: 2</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">description</span>
                        <Badge>Peso: 1</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">category</span>
                        <Badge>Peso: 2</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Facetas Disponibles</h3>
                    <div className="space-y-2">
                      {["category", "care_level", "light_requirements", "origin", "size"].map((facet) => (
                        <div key={facet} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{facet}</span>
                          <Badge variant="outline">Activo</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Sinónimos</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-medium">plantas, planta, vegetal, vegetales</div>
                      <div className="text-xs text-gray-600">Términos relacionados con plantas</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-medium">cactus, cacto, suculenta</div>
                      <div className="text-xs text-gray-600">Plantas suculentas y cactáceas</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Búsquedas Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { term: "monstera", count: 1247 },
                      { term: "suculentas", count: 892 },
                      { term: "plantas interior", count: 756 },
                      { term: "cactus", count: 634 },
                      { term: "ficus", count: 523 },
                    ].map((item) => (
                      <div key={item.term} className="flex justify-between items-center">
                        <span className="text-sm">{item.term}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filtros Más Usados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { filter: "Plantas de Interior", count: 2341 },
                      { filter: "Fácil cuidado", count: 1876 },
                      { filter: "Luz Indirecta", count: 1654 },
                      { filter: "Nacional", count: 1432 },
                      { filter: "Precio < $50,000", count: 1298 },
                    ].map((item) => (
                      <div key={item.filter} className="flex justify-between items-center">
                        <span className="text-sm">{item.filter}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rendimiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tiempo de respuesta</span>
                        <span>12ms</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Precisión</span>
                        <span>94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Índice actualizado</span>
                        <span>Hace 2h</span>
                      </div>
                      <Badge variant="outline" className="w-full justify-center">
                        Saludable
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración de Typesense
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Configuración del Servidor</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="host">Host</Label>
                        <Input id="host" defaultValue="localhost" />
                      </div>
                      <div>
                        <Label htmlFor="port">Puerto</Label>
                        <Input id="port" defaultValue="8108" />
                      </div>
                      <div>
                        <Label htmlFor="protocol">Protocolo</Label>
                        <Select defaultValue="http">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="http">HTTP</SelectItem>
                            <SelectItem value="https">HTTPS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Configuración de Búsqueda</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="results_per_page">Resultados por página</Label>
                        <Input id="results_per_page" type="number" defaultValue="20" />
                      </div>
                      <div>
                        <Label htmlFor="typo_tolerance">Tolerancia a errores</Label>
                        <Select defaultValue="2">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Deshabilitado</SelectItem>
                            <SelectItem value="1">1 error</SelectItem>
                            <SelectItem value="2">2 errores</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="prefix_search">Búsqueda por prefijo</Label>
                        <Select defaultValue="true">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Habilitado</SelectItem>
                            <SelectItem value="false">Deshabilitado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button>Guardar Configuración</Button>
                  <Button variant="outline">Probar Conexión</Button>
                  <Button variant="destructive">Reiniciar Índice</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
