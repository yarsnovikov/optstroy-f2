"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, Plus, BarChart3, FolderTree, Settings } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Моковые данные для админ-панели
const mockStats = {
  totalProducts: 156,
  totalOrders: 89,
  totalUsers: 234,
  revenue: 1250000,
}

const mockRecentOrders = [
  {
    id: "ОС-123456",
    customer: "Иван Петров",
    email: "ivan@example.com",
    total: 15600,
    status: "pending",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "ОС-123457",
    customer: "Мария Сидорова",
    email: "maria@example.com",
    total: 8900,
    status: "confirmed",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "ОС-123458",
    customer: "Алексей Иванов",
    email: "alex@example.com",
    total: 23400,
    status: "shipped",
    date: "2024-01-14",
    items: 5,
  },
]

const mockProducts = [
  {
    id: 1,
    name: "Цемент М500 50кг",
    category: "Строительные материалы",
    price: 450,
    stock: 150,
    status: "active",
    image: "/cement-bag-front.png",
  },
  {
    id: 2,
    name: "Дрель ударная Bosch GSB 13 RE",
    category: "Инструменты",
    price: 8500,
    stock: 25,
    status: "active",
    image: "/placeholder-p46z1.png",
  },
  {
    id: 3,
    name: "Кирпич керамический рядовой",
    category: "Строительные материалы",
    price: 12.5,
    stock: 5000,
    status: "active",
    image: "/red-ceramic-brick.png",
  },
]

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState(mockStats)
  const [orders, setOrders] = useState(mockRecentOrders)
  const [products, setProducts] = useState(mockProducts)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loadStats = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats({
          totalProducts: data.totalProducts,
          totalOrders: data.totalOrders,
          totalUsers: data.totalUsers,
          revenue: data.totalRevenue,
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить статистику",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders?limit=5")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error("Failed to load orders:", error)
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/admin/products?limit=5")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Failed to load products:", error)
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
        loadProducts() // Reload products
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
    loadStats()
    loadOrders()
    loadProducts()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-emerald-100 text-emerald-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает"
      case "confirmed":
        return "Подтвержден"
      case "shipped":
        return "Отправлен"
      case "delivered":
        return "Доставлен"
      case "cancelled":
        return "Отменен"
      default:
        return status
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Добро пожаловать!</h1>
          <p className="text-muted-foreground">Обзор вашего интернет-магазина ОптСтрой</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Добавить товар
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
            <Link href="/admin/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Товары</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +12% за месяц
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заказы</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-full">
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +8% за месяц
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +15% за месяц
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выручка</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-full">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.revenue.toLocaleString()} ₽</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +22% за месяц
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Последние заказы</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">Все заказы</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total.toLocaleString()} ₽</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Популярные товары</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">Все товары</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-medium text-sm">{product.price.toLocaleString()} ₽</p>
                    <p className="text-xs text-muted-foreground">{product.stock} шт.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/products/new">
                <Plus className="h-6 w-6" />
                <span className="text-sm">Добавить товар</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/categories">
                <FolderTree className="h-6 w-6" />
                <span className="text-sm">Управление категориями</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/users">
                <Users className="h-6 w-6" />
                <span className="text-sm">Пользователи</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/settings">
                <Settings className="h-6 w-6" />
                <span className="text-sm">Настройки</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminPage() {
  return <AdminDashboard />
}
