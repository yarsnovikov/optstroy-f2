"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Phone, Mail } from "lucide-react"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    const order = searchParams.get("order")
    if (order) {
      setOrderNumber(order)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Заказ успешно оформлен!</h1>
            <p className="text-muted-foreground">
              Спасибо за покупку в ОптСтрой. Мы свяжемся с вами в ближайшее время.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Детали заказа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">Номер заказа</div>
                  <div className="text-2xl font-bold text-green-600">{orderNumber}</div>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Доставка</div>
                    <div className="text-sm text-muted-foreground">1-3 рабочих дня</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Уведомления</div>
                    <div className="text-sm text-muted-foreground">SMS и Email</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Что дальше?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Подтверждение заказа</div>
                    <div className="text-sm text-muted-foreground">
                      Мы свяжемся с вами в течение 30 минут для подтверждения заказа
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Сборка заказа</div>
                    <div className="text-sm text-muted-foreground">Ваш заказ будет собран и подготовлен к отправке</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Доставка</div>
                    <div className="text-sm text-muted-foreground">Курьер доставит заказ по указанному адресу</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Нужна помощь?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-sm text-muted-foreground">+7 (800) 123-45-67</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">support@optstroy.shop</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/catalog">Продолжить покупки</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/orders">Мои заказы</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/">На главную</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
