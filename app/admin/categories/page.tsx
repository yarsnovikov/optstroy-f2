"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2, Package } from "lucide-react"

const mockCategories = [
  {
    id: 1,
    name: "Строительные материалы",
    slug: "construction-materials",
    description: "Цемент, кирпич, блоки и другие строительные материалы",
    productsCount: 45,
    isActive: true,
  },
  {
    id: 2,
    name: "Инструменты",
    slug: "tools",
    description: "Электроинструменты, ручные инструменты",
    productsCount: 28,
    isActive: true,
  },
  {
    id: 3,
    name: "Электрика",
    slug: "electrical",
    description: "Кабели, розетки, выключатели, светильники",
    productsCount: 32,
    isActive: true,
  },
  {
    id: 4,
    name: "Сантехника",
    slug: "plumbing",
    description: "Трубы, фитинги, смесители, сантехника",
    productsCount: 19,
    isActive: true,
  },
]

function CategoriesManagement() {
  const [categories, setCategories] = useState(mockCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      // Обновление категории
      setCategories((prev) => prev.map((cat) => (cat.id === editingCategory.id ? { ...cat, ...formData } : cat)))
    } else {
      // Создание новой категории
      const newCategory = {
        id: Date.now(),
        ...formData,
        productsCount: 0,
      }
      setCategories((prev) => [...prev, newCategory])
    }

    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData({ name: "", slug: "", description: "", isActive: true })
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      isActive: category.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id))
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
            <h1 className="text-3xl font-bold">Управление категориями</h1>
            <p className="text-muted-foreground">Создание и редактирование категорий товаров</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить категорию
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Редактировать категорию" : "Новая категория"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL (slug)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">{editingCategory ? "Сохранить" : "Создать"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Категории ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{category.productsCount} товаров</Badge>
                        <Badge
                          className={category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {category.isActive ? "Активна" : "Неактивна"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <AuthGuard requiredRole="admin">
      <CategoriesManagement />
    </AuthGuard>
  )
}
