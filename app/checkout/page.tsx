"use client"

import type React from "react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, Mail, User, Percent } from "lucide-react"

interface OrderForm {
  // Контактная информация
  firstName: string
  lastName: string
  email: string
  phone: string

  // Адрес доставки
  city: string
  address: string
  apartment: string
  postalCode: string

  // Способ доставки и оплаты
  deliveryMethod: string
  paymentMethod: string

  // Дополнительно
  comment: string
  agreeToTerms: boolean
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<OrderForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    apartment: "",
    postalCode: "",
    deliveryMethod: "courier",
    paymentMethod: "card",
    comment: "",
    agreeToTerms: false,
  })

  // Промокод и скидка
  const [promocode, setPromocode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [promocodeError, setPromocodeError] = useState("")
  const [isCheckingPromocode, setIsCheckingPromocode] = useState(false)

  // Если корзина пуста, перенаправляем
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Корзина пуста</h1>
            <p className="text-muted-foreground mb-6">Добавьте товары для оформления заказа</p>
            <Button asChild>
              <Link href="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const deliveryFee = formData.deliveryMethod === "pickup" ? 0 : state.total > 5000 ? 0 : 500
  const discountAmount = Math.round(state.total * (discount / 100))
  const finalTotal = state.total - discountAmount + (formData.deliveryMethod === "pickup" ? 0 : deliveryFee)

  const handleInputChange = (field: keyof OrderForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const checkPromocode = async () => {
    if (!promocode.trim()) return

    setIsCheckingPromocode(true)
    setPromocodeError("")

    try {
      const response = await fetch(`/api/promocodes/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promocode, orderTotal: state.total }),
      })

      const data = await response.json()

      if (response.ok) {
        setDiscount(data.discount)
        setPromocodeError("")
      } else {
        setPromocodeError(data.error || "Промокод не найден")
        setDiscount(0)
      }
    } catch (error) {
      setPromocodeError("Ошибка при проверке промокода")
      setDiscount(0)
    } finally {
      setIsCheckingPromocode(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.agreeToTerms) {
      setError("Необходимо согласиться с условиями")
      setIsLoading(false)
      return
    }

    try {
      const orderData = {
        items: state.items,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        delivery: {
          method: formData.deliveryMethod,
          address:
            formData.deliveryMethod === "courier"
              ? {
                  city: formData.city,
                  address: formData.address,
                  apartment: formData.apartment,
                  postalCode: formData.postalCode,
                }
              : null,
        },
        payment: {
          method: formData.paymentMethod,
        },
        promocode: promocode || null,
        discount: discount,
        subtotal: state.total,
        deliveryFee: formData.deliveryMethod === "pickup" ? 0 : deliveryFee,
        total: finalTotal,
        comment: formData.comment,
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (response.ok) {
        clearCart()
        router.push(`/order-success?order=${result.orderNumber}`)
      } else {
        setError(result.error || "Ошибка при оформлении заказа")
      }
    } catch (err) {
      setError("Ошибка при оформлении заказа. Попробуйте еще раз.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться в корзину
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-foreground">Оформление заказа</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Контактная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          placeholder="+7(999)123-45-67"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Адрес доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Индекс</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Улица, дом *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">Квартира, офис</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange("apartment", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Promocode */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Промокод
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите промокод"
                      value={promocode}
                      onChange={(e) => setPromocode(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={checkPromocode}
                      disabled={isCheckingPromocode || !promocode.trim()}
                    >
                      {isCheckingPromocode ? "Проверка..." : "Применить"}
                    </Button>
                  </div>

                  {promocodeError && (
                    <Alert variant="destructive">
                      <AlertDescription>{promocodeError}</AlertDescription>
                    </Alert>
                  )}

                  {discount > 0 && (
                    <Alert>
                      <AlertDescription className="text-green-600">
                        Промокод применен! Скидка {discount}%
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Способ доставки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => handleInputChange("deliveryMethod", value)}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">Курьерская доставка</div>
                          <div className="text-sm text-muted-foreground">
                            Доставка в течение 1-3 дней. {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">Самовывоз</div>
                          <div className="text-sm text-muted-foreground">Забрать в пункте выдачи. Бесплатно</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">Банковской картой</div>
                          <div className="text-sm text-muted-foreground">Visa, MasterCard, МИР</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">Наличными при получении</div>
                          <div className="text-sm text-muted-foreground">Оплата курьеру или в пункте выдачи</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Comment */}
              <Card>
                <CardHeader>
                  <CardTitle>Комментарий к заказу</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Дополнительная информация для курьера или пожелания по заказу"
                    value={formData.comment}
                    onChange={(e) => handleInputChange("comment", e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  Я согласен с{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    условиями использования
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    политикой конфиденциальности
                  </Link>
                </Label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="font-medium text-sm line-clamp-2">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.quantity} × {item.price.toLocaleString()} ₽
                          </div>
                        </div>
                        <div className="font-medium text-sm">{(item.price * item.quantity).toLocaleString()} ₽</div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Товары:</span>
                      <span>{state.total.toLocaleString()} ₽</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Скидка ({discount}%):</span>
                        <span>-{discountAmount.toLocaleString()} ₽</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span>Доставка:</span>
                      <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                        {formData.deliveryMethod === "pickup"
                          ? "Бесплатно"
                          : deliveryFee === 0
                            ? "Бесплатно"
                            : `${deliveryFee.toLocaleString()} ₽`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">
                      {(formData.deliveryMethod === "pickup" ? state.total : finalTotal).toLocaleString()} ₽
                    </span>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading || !formData.agreeToTerms}>
                    {isLoading ? "Оформление..." : "Подтвердить заказ"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
