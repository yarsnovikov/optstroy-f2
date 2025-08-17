"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const deliveryFee = state.total > 5000 ? 0 : 500
  const finalTotal = state.total + deliveryFee

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Корзина пуста</h1>
              <p className="text-muted-foreground">Добавьте товары из каталога, чтобы оформить заказ</p>
            </div>

            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/catalog">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Перейти в каталог
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  На главную
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/catalog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Продолжить покупки
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-foreground">Корзина</h1>
          <p className="text-muted-foreground mt-2">
            {state.itemCount} {state.itemCount === 1 ? "товар" : state.itemCount < 5 ? "товара" : "товаров"} на сумму{" "}
            {state.total.toLocaleString()} ₽
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/catalog/${item.slug}`}
                            className="text-lg font-semibold hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Количество:</span>
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id.toString(), item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id.toString(), item.quantity + 1)}
                              disabled={item.quantity >= (item.maxQuantity || 999)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground">(макс. {item.maxQuantity || 999})</span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </div>
                          <div className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽ за шт.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Очистить корзину
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Итого по заказу</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Промокод</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      Применить
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Товары ({state.itemCount}):</span>
                    <span>{state.total.toLocaleString()} ₽</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee.toLocaleString()} ₽`}
                    </span>
                  </div>

                  {state.total < 5000 && (
                    <p className="text-xs text-muted-foreground">Бесплатная доставка от 5 000 ₽</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{finalTotal.toLocaleString()} ₽</span>
                </div>

                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Оформить заказ</Link>
                </Button>

                <div className="text-center">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/catalog">Продолжить покупки</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
