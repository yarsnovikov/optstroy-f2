"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Package, Eye, RotateCcw } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

const mockOrders = [
  {
    id: "ОС-123456",
    date: "2024-01-15",
    status: "delivered",
    total: 15600,
    items: [
      { name: "Цемент М500 50кг", quantity: 2, price: 450, image: "/cement-bag-front.png" },
      { name: "Дрель ударная Bosch GSB 13 RE", quantity: 1, price: 8500, image: "/placeholder-p46z1.png" },
    ],
    deliveryAddress: "г. Москва, ул. Примерная, д. 123, кв. 45",
    trackingNumber: "TR123456789",
  },
  {
    id: "ОС-123457",
    date: "2024-01-10",
    status: "shipped",
    total: 8900,
    items: [{ name: "Кирпич керамический рядовой", quantity: 100, price: 12.5, image: "/red-ceramic-brick.png" }],
    deliveryAddress: "г. Москва, ул. Примерная, д. 123, кв. 45",
    trackingNumber: "TR123456790",
  },
  {
    id: "ОС-123458",
    date: "2024-01-05",
    status: "confirmed",
    total: 2850,
    items: [{ name: "Молоток слесарный 500г", quantity: 1, price: 850, image: "/500g-hammer.png" }],
    deliveryAddress: "г. Москва, ул. Примерная, д. 123, кв. 45",
  },
]

function OrdersContent() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
        return "Ожидает подтверждения"
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/profile">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться в профиль
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-foreground mb-2">Мои заказы</h1>
          <p className="text-muted-foreground">История ваших покупок в ОптСтрой</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск по номеру заказа..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">Ожидает подтверждения</SelectItem>
                  <SelectItem value="confirmed">Подтвержден</SelectItem>
                  <SelectItem value="shipped">Отправлен</SelectItem>
                  <SelectItem value="delivered">Доставлен</SelectItem>
                  <SelectItem value="cancelled">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Заказы не найдены</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Попробуйте изменить параметры поиска"
                    : "У вас пока нет заказов"}
                </p>
                <Button asChild>
                  <Link href="/catalog">Перейти в каталог</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">Заказ {order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">от {order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold">{order.total.toLocaleString()} ₽</div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? "товар" : "товара"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × {item.price.toLocaleString()} ₽
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{(item.price * item.quantity).toLocaleString()} ₽</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Адрес доставки:</span>
                        <p className="text-muted-foreground">{order.deliveryAddress}</p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <span className="font-medium">Трек-номер:</span>
                          <p className="text-muted-foreground">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Подробнее
                    </Button>

                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Повторить заказ
                      </Button>
                    )}

                    {order.trackingNumber && (
                      <Button variant="outline" size="sm">
                        Отследить посылку
                      </Button>
                    )}

                    {(order.status === "pending" || order.status === "confirmed") && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        Отменить заказ
                      </Button>
                    )}
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
    <AuthGuard requiredRole="user" redirectTo="/auth/login">
      <OrdersContent />
    </AuthGuard>
  )
}
