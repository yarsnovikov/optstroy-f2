"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Eye, ShoppingCart, Calendar, User, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockOrders = [
  {
    id: "ОС-123456",
    customer: {
      name: "Иван Петров",
      email: "ivan@example.com",
      phone: "+7 (999) 123-45-67",
    },
    total: 15600,
    status: "pending",
    paymentStatus: "pending",
    created_at: "2024-01-15T10:30:00",
    items: 3,
    itemsPreview: ["Цемент М500 50кг", "Кирпич керамический"],
  },
  {
    id: "ОС-123457",
    customer: {
      name: "Мария Сидорова",
      email: "maria@example.com",
      phone: "+7 (999) 234-56-78",
    },
    total: 8900,
    status: "confirmed",
    paymentStatus: "paid",
    created_at: "2024-01-15T09:15:00",
    items: 2,
    itemsPreview: ["Дрель ударная Bosch"],
  },
  {
    id: "ОС-123458",
    customer: {
      name: "Алексей Иванов",
      email: "alex@example.com",
      phone: "+7 (999) 345-67-89",
    },
    total: 23400,
    status: "shipped",
    paymentStatus: "paid",
    created_at: "2024-01-14T16:45:00",
    items: 5,
    itemsPreview: ["Цемент М500 50кг", "Арматура 12мм", "Песок речной"],
  },
  {
    id: "ОС-123459",
    customer: {
      name: "Елена Козлова",
      email: "elena@example.com",
      phone: "+7 (999) 456-78-90",
    },
    total: 12300,
    status: "delivered",
    paymentStatus: "paid",
    created_at: "2024-01-13T11:20:00",
    items: 4,
    itemsPreview: ["Плитка керамическая", "Клей для плитки"],
  },
  {
    id: "ОС-123460",
    customer: {
      name: "Дмитрий Волков",
      email: "dmitry@example.com",
      phone: "+7 (999) 567-89-01",
    },
    total: 5600,
    status: "cancelled",
    paymentStatus: "refunded",
    created_at: "2024-01-12T14:30:00",
    items: 1,
    itemsPreview: ["Перфоратор Makita"],
  },
]

function OrdersManagement() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || mockOrders)
      }
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает оплаты"
      case "paid":
        return "Оплачен"
      case "refunded":
        return "Возврат"
      default:
        return status
    }
  }

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
            <h1 className="text-3xl font-bold">Управление заказами</h1>
            <p className="text-muted-foreground">Всего заказов: {orders.length}</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск по номеру заказа, имени или email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Статус заказа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="confirmed">Подтвержден</SelectItem>
                  <SelectItem value="shipped">Отправлен</SelectItem>
                  <SelectItem value="delivered">Доставлен</SelectItem>
                  <SelectItem value="cancelled">Отменен</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Статус оплаты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все оплаты</SelectItem>
                  <SelectItem value="pending">Ожидает оплаты</SelectItem>
                  <SelectItem value="paid">Оплачен</SelectItem>
                  <SelectItem value="refunded">Возврат</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-8">Загрузка заказов...</div>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Заказы не найдены</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {getPaymentStatusText(order.paymentStatus)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{order.customer.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(order.created_at).toLocaleString("ru-RU")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          <span>{order.items} товар(ов)</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Email: {order.customer.email}</p>
                        <p>Телефон: {order.customer.phone}</p>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground">Товары:</p>
                        <p>
                          {order.itemsPreview.join(", ")}
                          {order.items > order.itemsPreview.length ? "..." : ""}
                        </p>
                      </div>
                    </div>

                    {/* Order Total & Actions */}
                    <div className="flex flex-col items-end gap-4 lg:min-w-[200px]">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{order.total.toLocaleString()} ₽</p>
                        <p className="text-sm text-muted-foreground">Итого</p>
                      </div>

                      <Button asChild className="w-full lg:w-auto">
                        <Link href={`/admin/orders/${order.id.split("-")[1]}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <AuthGuard requiredRole="admin">
      <OrdersManagement />
    </AuthGuard>
  )
}
