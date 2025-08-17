"use client"

import { useState } from "react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, Users, Package, ShoppingCart, Download } from "lucide-react"

// Моковые данные для аналитики
const mockAnalytics = {
  revenue: {
    current: 1250000,
    previous: 980000,
    data: [
      { month: "Янв", value: 850000 },
      { month: "Фев", value: 920000 },
      { month: "Мар", value: 1100000 },
      { month: "Апр", value: 980000 },
      { month: "Май", value: 1250000 },
    ],
  },
  orders: {
    current: 89,
    previous: 67,
    data: [
      { month: "Янв", value: 45 },
      { month: "Фев", value: 52 },
      { month: "Мар", value: 61 },
      { month: "Апр", value: 67 },
      { month: "Май", value: 89 },
    ],
  },
  topProducts: [
    { name: "Цемент М500 50кг", sales: 245, revenue: 110250 },
    { name: "Кирпич керамический", sales: 1200, revenue: 15000 },
    { name: "Дрель ударная Bosch", sales: 15, revenue: 127500 },
  ],
  topCategories: [
    { name: "Строительные материалы", sales: 65, revenue: 780000 },
    { name: "Инструменты", sales: 20, revenue: 340000 },
    { name: "Электрика", sales: 10, revenue: 85000 },
  ],
}

function AnalyticsPage() {
  const [period, setPeriod] = useState("month")

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
            <h1 className="text-3xl font-bold">Аналитика и отчеты</h1>
            <p className="text-muted-foreground">Детальная статистика продаж и активности</p>
          </div>
          <div className="flex gap-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">За неделю</SelectItem>
                <SelectItem value="month">За месяц</SelectItem>
                <SelectItem value="quarter">За квартал</SelectItem>
                <SelectItem value="year">За год</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выручка</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.revenue.current.toLocaleString()} ₽</div>
              <p className="text-xs text-green-600">
                +
                {Math.round(
                  ((mockAnalytics.revenue.current - mockAnalytics.revenue.previous) / mockAnalytics.revenue.previous) *
                    100,
                )}
                % к прошлому периоду
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Заказы</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.orders.current}</div>
              <p className="text-xs text-green-600">
                +
                {Math.round(
                  ((mockAnalytics.orders.current - mockAnalytics.orders.previous) / mockAnalytics.orders.previous) *
                    100,
                )}
                % к прошлому периоду
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockAnalytics.revenue.current / mockAnalytics.orders.current).toLocaleString()} ₽
              </div>
              <p className="text-xs text-blue-600">+5% к прошлому периоду</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-green-600">+0.4% к прошлому периоду</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sales">Продажи</TabsTrigger>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="customers">Клиенты</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика выручки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {mockAnalytics.revenue.data.map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-emerald-500 w-full rounded-t"
                          style={{ height: `${(item.value / 1250000) * 200}px` }}
                        />
                        <span className="text-xs mt-2">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Количество заказов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {mockAnalytics.orders.data.map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-blue-500 w-full rounded-t"
                          style={{ height: `${(item.value / 89) * 200}px` }}
                        />
                        <span className="text-xs mt-2">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Топ товары по продажам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topProducts.map((product, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} продаж</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.revenue.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Топ категории</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topCategories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">{category.sales}% от общих продаж</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{category.revenue.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Анализ клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Детальная аналитика клиентов будет добавлена в следующем обновлении
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <AuthGuard requiredRole="admin">
      <AnalyticsPage />
    </AuthGuard>
  )
}
