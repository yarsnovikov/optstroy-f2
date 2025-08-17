"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Copy, Percent, Users, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Promocode {
  id: number
  code: string
  description: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  isActive: boolean
  validFrom: string
  validTo: string
  createdAt: string
}

export default function PromocodesPage() {
  const [promocodes, setPromocodes] = useState<Promocode[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingPromocode, setEditingPromocode] = useState<Promocode | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "percentage" as "percentage" | "fixed",
    value: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    usageLimit: 0,
    validFrom: "",
    validTo: "",
    isActive: true,
  })

  useEffect(() => {
    fetchPromocodes()
  }, [])

  const fetchPromocodes = async () => {
    try {
      const response = await fetch("/api/admin/promocodes")
      const data = await response.json()
      setPromocodes(data)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить промокоды",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePromocode = async () => {
    try {
      const response = await fetch("/api/admin/promocodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Промокод создан",
        })
        setIsCreateModalOpen(false)
        resetForm()
        fetchPromocodes()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать промокод",
        variant: "destructive",
      })
    }
  }

  const handleEditPromocode = async () => {
    if (!editingPromocode) return

    try {
      const response = await fetch(`/api/admin/promocodes/${editingPromocode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Промокод обновлен",
        })
        setIsEditModalOpen(false)
        setEditingPromocode(null)
        resetForm()
        fetchPromocodes()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить промокод",
        variant: "destructive",
      })
    }
  }

  const handleDeletePromocode = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/promocodes/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Промокод удален",
        })
        fetchPromocodes()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить промокод",
        variant: "destructive",
      })
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/promocodes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: `Промокод ${isActive ? "активирован" : "деактивирован"}`,
        })
        fetchPromocodes()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус промокода",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      maxDiscount: 0,
      usageLimit: 0,
      validFrom: "",
      validTo: "",
      isActive: true,
    })
  }

  const openEditModal = (promocode: Promocode) => {
    setEditingPromocode(promocode)
    setFormData({
      code: promocode.code,
      description: promocode.description,
      type: promocode.type,
      value: promocode.value,
      minOrderAmount: promocode.minOrderAmount,
      maxDiscount: promocode.maxDiscount || 0,
      usageLimit: promocode.usageLimit,
      validFrom: promocode.validFrom.split("T")[0],
      validTo: promocode.validTo.split("T")[0],
      isActive: promocode.isActive,
    })
    setIsEditModalOpen(true)
  }

  const copyPromocode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Скопировано",
      description: "Промокод скопирован в буфер обмена",
    })
  }

  const filteredPromocodes = promocodes.filter((promocode) => {
    const matchesSearch =
      promocode.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promocode.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && promocode.isActive) ||
      (filterStatus === "inactive" && !promocode.isActive)
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: promocodes.length,
    active: promocodes.filter((p) => p.isActive).length,
    totalUsage: promocodes.reduce((sum, p) => sum + p.usedCount, 0),
    totalSavings: promocodes.reduce((sum, p) => sum + p.usedCount * p.value, 0),
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Управление промокодами</h1>
          <p className="text-muted-foreground">Создавайте и управляйте промокодами для скидок</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Создать промокод
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Создать промокод</DialogTitle>
              <DialogDescription>Заполните информацию для нового промокода</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Код промокода</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="SALE20"
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Скидка 20% на все товары"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Тип скидки</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "percentage" | "fixed") => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Процент</SelectItem>
                      <SelectItem value="fixed">Фиксированная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Значение</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    placeholder={formData.type === "percentage" ? "20" : "1000"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minOrderAmount">Мин. сумма заказа</Label>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="usageLimit">Лимит использований</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    placeholder="100"
                  />
                </div>
              </div>
              {formData.type === "percentage" && (
                <div>
                  <Label htmlFor="maxDiscount">Макс. скидка (₽)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    placeholder="5000"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validFrom">Действует с</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="validTo">Действует до</Label>
                  <Input
                    id="validTo"
                    type="date"
                    value={formData.validTo}
                    onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Активный</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreatePromocode}>Создать</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего промокодов</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <Badge variant="secondary">{stats.active}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Использований</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsage}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общая экономия</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽{stats.totalSavings.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры и поиск */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск по коду или описанию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={(value: "all" | "active" | "inactive") => setFilterStatus(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все промокоды</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="inactive">Неактивные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Таблица промокодов */}
      <Card>
        <CardHeader>
          <CardTitle>Промокоды ({filteredPromocodes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Код</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Скидка</TableHead>
                  <TableHead>Использовано</TableHead>
                  <TableHead>Период действия</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromocodes.map((promocode) => (
                  <TableRow key={promocode.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{promocode.code}</code>
                        <Button variant="ghost" size="sm" onClick={() => copyPromocode(promocode.code)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{promocode.description}</TableCell>
                    <TableCell>
                      {promocode.type === "percentage" ? `${promocode.value}%` : `₽${promocode.value}`}
                      {promocode.maxDiscount && promocode.type === "percentage" && (
                        <div className="text-xs text-muted-foreground">макс. ₽{promocode.maxDiscount}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>
                          {promocode.usedCount} / {promocode.usageLimit}
                        </span>
                        <div className="w-full bg-muted rounded-full h-1 mt-1">
                          <div
                            className="bg-primary h-1 rounded-full"
                            style={{
                              width: `${Math.min((promocode.usedCount / promocode.usageLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(promocode.validFrom).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          до {new Date(promocode.validTo).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={promocode.isActive}
                          onCheckedChange={(checked) => handleToggleActive(promocode.id, checked)}
                        />
                        <Badge variant={promocode.isActive ? "default" : "secondary"}>
                          {promocode.isActive ? "Активен" : "Неактивен"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(promocode)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePromocode(promocode.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Модальное окно редактирования */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать промокод</DialogTitle>
            <DialogDescription>Измените параметры промокода</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-code">Код промокода</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="SALE20"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Описание</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Скидка 20% на все товары"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Тип скидки</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "percentage" | "fixed") => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Процент</SelectItem>
                    <SelectItem value="fixed">Фиксированная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-value">Значение</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  placeholder={formData.type === "percentage" ? "20" : "1000"}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-minOrderAmount">Мин. сумма заказа</Label>
                <Input
                  id="edit-minOrderAmount"
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="edit-usageLimit">Лимит использований</Label>
                <Input
                  id="edit-usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                  placeholder="100"
                />
              </div>
            </div>
            {formData.type === "percentage" && (
              <div>
                <Label htmlFor="edit-maxDiscount">Макс. скидка (₽)</Label>
                <Input
                  id="edit-maxDiscount"
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                  placeholder="5000"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-validFrom">Действует с</Label>
                <Input
                  id="edit-validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-validTo">Действует до</Label>
                <Input
                  id="edit-validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="edit-isActive">Активный</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleEditPromocode}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
