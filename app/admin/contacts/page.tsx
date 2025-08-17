"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Phone, MessageCircle, Send, Users, UserCheck, UserX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Manager {
  id: number
  name: string
  position: string
  phone: string
  whatsapp: string
  telegram: string
  email: string
  specialization: string
  avatar: string
  isActive: boolean
  createdAt: string
}

export default function ContactsManagementPage() {
  const [managers, setManagers] = useState<Manager[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingManager, setEditingManager] = useState<Manager | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    phone: "",
    whatsapp: "",
    telegram: "",
    email: "",
    specialization: "",
    avatar: "",
    isActive: true,
  })

  useEffect(() => {
    fetchManagers()
  }, [])

  const fetchManagers = async () => {
    try {
      const response = await fetch("/api/admin/contacts")
      const data = await response.json()
      setManagers(data.managers || [])
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить менеджеров",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Менеджер добавлен",
        })
        setIsCreateOpen(false)
        resetForm()
        fetchManagers()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить менеджера",
        variant: "destructive",
      })
    }
  }

  const handleEdit = async () => {
    if (!editingManager) return

    try {
      const response = await fetch(`/api/admin/contacts/${editingManager.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Менеджер обновлен",
        })
        setIsEditOpen(false)
        setEditingManager(null)
        resetForm()
        fetchManagers()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить менеджера",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого менеджера?")) return

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Менеджер удален",
        })
        fetchManagers()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить менеджера",
        variant: "destructive",
      })
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: `Менеджер ${isActive ? "активирован" : "деактивирован"}`,
        })
        fetchManagers()
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      phone: "",
      whatsapp: "",
      telegram: "",
      email: "",
      specialization: "",
      avatar: "",
      isActive: true,
    })
  }

  const openEditDialog = (manager: Manager) => {
    setEditingManager(manager)
    setFormData({
      name: manager.name,
      position: manager.position,
      phone: manager.phone,
      whatsapp: manager.whatsapp,
      telegram: manager.telegram,
      email: manager.email,
      specialization: manager.specialization,
      avatar: manager.avatar,
      isActive: manager.isActive,
    })
    setIsEditOpen(true)
  }

  const filteredManagers = managers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeManagers = managers.filter((m) => m.isActive).length
  const totalManagers = managers.length

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Управление контактами</h1>
          <p className="text-muted-foreground">Управление менеджерами и их контактной информацией</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить менеджера
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить нового менеджера</DialogTitle>
              <DialogDescription>Заполните информацию о новом менеджере</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">ФИО</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Должность</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите должность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Менеджер по продажам">Менеджер по продажам</SelectItem>
                      <SelectItem value="Старший менеджер">Старший менеджер</SelectItem>
                      <SelectItem value="Менеджер по работе с клиентами">Менеджер по работе с клиентами</SelectItem>
                      <SelectItem value="Технический консультант">Технический консультант</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (901) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="manager@optstroy.shop"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="79011234567"
                  />
                </div>
                <div>
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="specialization">Специализация</Label>
                <Textarea
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Строительные материалы, инструменты..."
                />
              </div>
              <div>
                <Label htmlFor="avatar">URL аватара</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Активный менеджер</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreate}>Добавить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего менеджеров</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalManagers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeManagers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Неактивные</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalManagers - activeManagers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Поиск менеджеров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Managers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Менеджеры</CardTitle>
          <CardDescription>Список всех менеджеров с их контактной информацией</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Менеджер</TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Специализация</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredManagers.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={manager.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {manager.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{manager.name}</div>
                          <div className="text-sm text-muted-foreground">{manager.position}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {manager.phone}
                        </div>
                        <div className="flex gap-2">
                          {manager.whatsapp && (
                            <Button size="sm" variant="outline" className="h-6 px-2 bg-transparent">
                              <MessageCircle className="h-3 w-3" />
                            </Button>
                          )}
                          {manager.telegram && (
                            <Button size="sm" variant="outline" className="h-6 px-2 bg-transparent">
                              <Send className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{manager.specialization}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={manager.isActive}
                          onCheckedChange={(checked) => handleToggleActive(manager.id, checked)}
                        />
                        <Badge variant={manager.isActive ? "default" : "secondary"}>
                          {manager.isActive ? "Активен" : "Неактивен"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(manager)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(manager.id)}>
                          <Trash2 className="h-3 w-3" />
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать менеджера</DialogTitle>
            <DialogDescription>Измените информацию о менеджере</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">ФИО</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-position">Должность</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Менеджер по продажам">Менеджер по продажам</SelectItem>
                    <SelectItem value="Старший менеджер">Старший менеджер</SelectItem>
                    <SelectItem value="Менеджер по работе с клиентами">Менеджер по работе с клиентами</SelectItem>
                    <SelectItem value="Технический консультант">Технический консультант</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone">Телефон</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-whatsapp">WhatsApp</Label>
                <Input
                  id="edit-whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-telegram">Telegram</Label>
                <Input
                  id="edit-telegram"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-specialization">Специализация</Label>
              <Textarea
                id="edit-specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-avatar">URL аватара</Label>
              <Input
                id="edit-avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="edit-isActive">Активный менеджер</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleEdit}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
