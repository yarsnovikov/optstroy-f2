"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Search, Edit, Trash2, Package, Grid, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockProducts = [
  {
    id: 1,
    name: "Цемент М500 50кг",
    category: "Строительные материалы",
    price: 450,
    oldPrice: 500,
    stock: 150,
    status: "active",
    image: "/cement-bag-front.png",
    sku: "CEM-M500-50",
    featured: true,
  },
  {
    id: 2,
    name: "Дрель ударная Bosch GSB 13 RE",
    category: "Инструменты",
    price: 8500,
    oldPrice: null,
    stock: 25,
    status: "active",
    image: "/placeholder-p46z1.png",
    sku: "DRILL-BOSCH-13",
    featured: false,
  },
  {
    id: 3,
    name: "Кирпич керамический рядовой",
    category: "Строительные материалы",
    price: 12.5,
    oldPrice: null,
    stock: 5000,
    status: "active",
    image: "/red-ceramic-brick.png",
    sku: "BRICK-CER-RED",
    featured: true,
  },
]

function ProductsManagement() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || mockProducts)
      }
    } catch (error) {
      console.error("Failed to load products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Товар успешно удален",
        })
        setProducts((prev) => prev.filter((p) => p.id !== productId))
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться в админ-панель
          </Link>
        </Button>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Управление товарами</h1>
            <p className="text-muted-foreground">Всего товаров: {products.length}</p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Добавить товар
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск по названию или артикулу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="inactive">Неактивные</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Display */}
        {isLoading ? (
          <div className="text-center py-8">Загрузка товаров...</div>
        ) : filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Товары не найдены</p>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && <Badge className="absolute top-2 left-2 bg-orange-500">Рекомендуемый</Badge>}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-xs text-muted-foreground">Артикул: {product.sku}</p>

                    <div className="flex items-center gap-2">
                      <span className="font-bold">{product.price.toLocaleString()} ₽</span>
                      {product.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                        {product.stock > 0 ? `${product.stock} шт.` : "Нет в наличии"}
                      </Badge>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status === "active" ? "Активен" : "Неактивен"}
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Изменить
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{product.name}</h3>
                        {product.featured && <Badge className="bg-orange-500">Рекомендуемый</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-xs text-muted-foreground">Артикул: {product.sku}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{product.price.toLocaleString()} ₽</span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1 mb-2">
                        <Badge variant={product.stock > 0 ? "default" : "destructive"} className="text-xs">
                          {product.stock > 0 ? `${product.stock} шт.` : "Нет в наличии"}
                        </Badge>
                        <Badge variant={product.status === "active" ? "default" : "secondary"} className="text-xs">
                          {product.status === "active" ? "Активен" : "Неактивен"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <ProductsManagement />
    </AuthGuard>
  )
}
