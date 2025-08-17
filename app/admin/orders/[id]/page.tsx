"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Package, User, CreditCard, Truck } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

// Моковые данные заказа
const mockOrder = {
  id: "ОС-123456",
  customer: {
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
  },
  shipping: {
    address: "г. Ярославль, ул. Советская, д. 15, кв. 25",
    method: "Доставка курьером",
    cost: 500,
  },
  payment: {
    method: "Наличными при получении",
    status: "pending",
  },
  status: "confirmed",
  total: 15600,
  created_at: "2024-01-15T10:30:00",
  items: [
    {
      id: 1,
      name: "Цемент М500 50кг",
      price: 450,
      quantity: 20,
      image: "/cement-bag-front.png",
    },
    {
      id: 2,
      name: "Кирпич керамический рядовой",
      price: 12.5,
      quantity: 500,
      image: "/red-ceramic-brick.png",
    },
  ],
}

function OrderDetails() {
  const params = useParams()
  const router = useRouter()
  const [orderStatus, setOrderStatus] = useState(mockOrder.status)
  const [isUpdating, setIsUpdating] = useState(false)

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

  const updateOrderStatus = async (newStatus: string) => {
    setIsUpdating(true)
    // Здесь будет API вызов
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setOrderStatus(newStatus)
    setIsUpdating(false)
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

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Заказ {mockOrder.id}</h1>
            <p className="text-muted-foreground">Создан {new Date(mockOrder.created_at).toLocaleString("ru-RU")}</p>
          </div>
          <Badge className={getStatusColor(orderStatus)}>
            {orderStatus === "pending"
              ? "Ожидает"
              : orderStatus === "confirmed"
                ? "Подтвержден"
                : orderStatus === "shipped"
                  ? "Отправлен"
                  : orderStatus === "delivered"
                    ? "Доставлен"
                    : "Отменен"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Товары в заказе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.price.toLocaleString()} ₽ × {item.quantity} шт.
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(item.price * item.quantity).toLocaleString()} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Итого:</span>
                    <span>{mockOrder.total.toLocaleString()} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Info Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Управление заказом</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Статус заказа</label>
                  <Select value={orderStatus} onValueChange={updateOrderStatus} disabled={isUpdating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Ожидает</SelectItem>
                      <SelectItem value="confirmed">Подтвержден</SelectItem>
                      <SelectItem value="shipped">Отправлен</SelectItem>
                      <SelectItem value="delivered">Доставлен</SelectItem>
                      <SelectItem value="cancelled">Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Информация о клиенте
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{mockOrder.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{mockOrder.customer.email}</p>
                  <p className="text-sm text-muted-foreground">{mockOrder.customer.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Доставка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{mockOrder.shipping.method}</p>
                  <p className="text-sm text-muted-foreground">{mockOrder.shipping.address}</p>
                  <p className="text-sm">Стоимость: {mockOrder.shipping.cost} ₽</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Оплата
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-medium">{mockOrder.payment.method}</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Ожидает оплаты</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderDetailsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <OrderDetails />
    </AuthGuard>
  )
}
