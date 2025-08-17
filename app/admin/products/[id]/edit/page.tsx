"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

// Моковые данные товара
const mockProduct = {
  id: 1,
  name: "Цемент М500 50кг",
  slug: "cement-m500-50kg",
  description:
    "Высококачественный портландцемент марки М500 в мешках по 50 кг. Идеально подходит для строительных и ремонтных работ.",
  shortDescription: "Портландцемент М500 для строительных работ",
  price: 450,
  oldPrice: 500,
  sku: "CEM-M500-50",
  stockQuantity: 150,
  categoryId: "1",
  brand: "СтройЦемент",
  weight: 50,
  dimensions: "60x40x10",
  specifications: {
    Марка: "М500",
    Вес: "50 кг",
    Тип: "Портландцемент",
    Применение: "Универсальное",
  },
  isFeatured: true,
  isActive: true,
}

const categories = [
  { id: "1", name: "Строительные материалы" },
  { id: "2", name: "Инструменты" },
  { id: "3", name: "Электрика" },
  { id: "4", name: "Сантехника" },
  { id: "5", name: "Отделочные материалы" },
]

function EditProductForm() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState(mockProduct)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Здесь будет API вызов для обновления товара
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/admin")
    } catch (err) {
      setError("Ошибка при обновлении товара")
    } finally {
      setIsLoading(false)
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Редактировать товар</h1>
          <p className="text-muted-foreground">ID: {params.id}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название товара</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">Артикул</Label>
                      <Input id="sku" value={formData.sku} onChange={(e) => handleInputChange("sku", e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Цена и остатки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oldPrice">Старая цена</Label>
                      <Input
                        id="oldPrice"
                        type="number"
                        value={formData.oldPrice}
                        onChange={(e) => handleInputChange("oldPrice", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stockQuantity">Остаток</Label>
                      <Input
                        id="stockQuantity"
                        type="number"
                        value={formData.stockQuantity}
                        onChange={(e) => handleInputChange("stockQuantity", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => handleInputChange("categoryId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                      />
                      <Label htmlFor="isFeatured">Рекомендуемый</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                      />
                      <Label htmlFor="isActive">Активен</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Сохранение..." : "Сохранить изменения"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/admin">Отмена</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function EditProductPage() {
  return (
    <AuthGuard requiredRole="admin">
      <EditProductForm />
    </AuthGuard>
  )
}
