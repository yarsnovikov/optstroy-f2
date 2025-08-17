"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, X } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

interface ProductForm {
  name: string
  slug: string
  description: string
  shortDescription: string
  price: string
  oldPrice: string
  sku: string
  stockQuantity: string
  categoryId: string
  brand: string
  weight: string
  dimensions: string
  specifications: Record<string, string>
  isFeatured: boolean
  isActive: boolean
}

const categories = [
  { id: "1", name: "Строительные материалы" },
  { id: "2", name: "Инструменты" },
  { id: "3", name: "Электрика" },
  { id: "4", name: "Сантехника" },
  { id: "5", name: "Отделочные материалы" },
  { id: "6", name: "Крепеж" },
]

function NewProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: "",
    oldPrice: "",
    sku: "",
    stockQuantity: "",
    categoryId: "",
    brand: "",
    weight: "",
    dimensions: "",
    specifications: {},
    isFeatured: false,
    isActive: true,
  })

  const handleInputChange = (field: keyof ProductForm, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Автоматическое создание slug из названия
      if (field === "name" && typeof value === "string") {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-zа-я0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()
      }

      return updated
    })
  }

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }))
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
      const { [key]: removed, ...rest } = prev.specifications
      return { ...prev, specifications: rest }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Валидация
    if (!formData.name.trim()) {
      setError("Название товара обязательно")
      setIsLoading(false)
      return
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      setError("Укажите корректную цену")
      setIsLoading(false)
      return
    }

    if (!formData.categoryId) {
      setError("Выберите категорию")
      setIsLoading(false)
      return
    }

    try {
      // Здесь будет отправка данных на сервер
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Перенаправление на страницу товаров
      router.push("/admin?tab=products")
    } catch (err) {
      setError("Ошибка при создании товара")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться в админ-панель
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-foreground">Добавить новый товар</h1>
          <p className="text-muted-foreground">Заполните информацию о товаре</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название товара *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Например: Цемент М500 50кг"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">URL (slug)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                        placeholder="cement-m500-50kg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Краткое описание</Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      placeholder="Краткое описание для карточки товара"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Полное описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Подробное описание товара"
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing and Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Цена и остатки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Цена *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="oldPrice">Старая цена</Label>
                      <Input
                        id="oldPrice"
                        type="number"
                        step="0.01"
                        value={formData.oldPrice}
                        onChange={(e) => handleInputChange("oldPrice", e.target.value)}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stockQuantity">Количество на складе</Label>
                      <Input
                        id="stockQuantity"
                        type="number"
                        value={formData.stockQuantity}
                        onChange={(e) => handleInputChange("stockQuantity", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">Артикул (SKU)</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleInputChange("sku", e.target.value)}
                        placeholder="CEM-M500-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brand">Бренд</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleInputChange("brand", e.target.value)}
                        placeholder="Название бренда"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Дополнительные характеристики</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Вес (кг)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Размеры</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) => handleInputChange("dimensions", e.target.value)}
                        placeholder="Д x Ш x В (см)"
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <Label>Технические характеристики</Label>

                    {/* Existing specifications */}
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <Input value={key} disabled className="flex-1" />
                        <Input value={value} disabled className="flex-1" />
                        <Button type="button" variant="outline" size="sm" onClick={() => removeSpecification(key)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {/* Add new specification */}
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Название характеристики"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Значение"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                        Добавить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category and Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Категория и статус</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Категория *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => handleInputChange("categoryId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
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
                        onCheckedChange={(checked) => handleInputChange("isFeatured", checked as boolean)}
                      />
                      <Label htmlFor="isFeatured">Рекомендуемый товар</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleInputChange("isActive", checked as boolean)}
                      />
                      <Label htmlFor="isActive">Активен (показывать на сайте)</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Изображения товара</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Перетащите изображения сюда или</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent" type="button">
                      Выбрать файлы
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Поддерживаются форматы: JPG, PNG, WebP. Максимальный размер: 5MB
                  </p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Создание..." : "Создать товар"}
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

export default function NewProductPage() {
  return (
    <AuthGuard requiredRole="admin" redirectTo="/auth/login">
      <NewProductForm />
    </AuthGuard>
  )
}
