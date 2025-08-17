"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/components/ui/use-mobile"
import { Search, UserPlus, Edit, Trash2, Shield, Crown, Phone, Mail, Calendar, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: number
  name: string
  email: string
  role: "guest" | "user" | "admin"
  phone?: string
  created_at: string
  last_login?: string
  status: "active" | "blocked"
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "guest" | "user" | "admin">("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user" as "guest" | "user" | "admin",
    password: "",
  })
  const { toast } = useToast()
  const isMobile = useIsMobile()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Пользователь создан",
        })
        setIsCreateModalOpen(false)
        setNewUser({ name: "", email: "", phone: "", role: "user", password: "" })
        fetchUsers()
      } else {
        throw new Error("Failed to create user")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать пользователя",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUser = async (userId: number, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Пользователь обновлен",
        })
        fetchUsers()
      } else {
        throw new Error("Failed to update user")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить пользователя",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Пользователь удален",
        })
        fetchUsers()
      } else {
        throw new Error("Failed to delete user")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пользователя",
        variant: "destructive",
      })
    }
  }

  const toggleUserStatus = async (user: User) => {
    const newStatus = user.status === "active" ? "blocked" : "active"
    await handleUpdateUser(user.id, { status: newStatus })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "user":
        return <Shield className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-red-100 text-red-800",
      user: "bg-blue-100 text-blue-800",
      guest: "bg-gray-100 text-gray-800",
    }
    return variants[role as keyof typeof variants] || variants.guest
  }

  const UserCard = ({ user }: { user: User }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <Mail className="h-3 w-3" />
              {user.email}
            </div>
            {user.phone && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Phone className="h-3 w-3" />
                {user.phone}
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingUser(user)}>
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleUserStatus(user)}>
                {user.status === "active" ? "Заблокировать" : "Разблокировать"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={`${getRoleBadge(user.role)} flex items-center gap-1`}>
            {getRoleIcon(user.role)}
            {user.role === "admin" ? "Админ" : user.role === "user" ? "Пользователь" : "Гость"}
          </Badge>
          <Badge className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {user.status === "active" ? "Активен" : "Заблокирован"}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          Регистрация: {new Date(user.created_at).toLocaleDateString("ru-RU")}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AuthGuard requiredRole="admin">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Управление пользователями</h1>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                <UserPlus className="h-4 w-4 mr-2" />
                Добавить пользователя
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Создать пользователя</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Введите имя"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Введите email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="Введите телефон"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Введите пароль"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Роль</Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
                <Button onClick={handleCreateUser} className="w-full">
                  Создать пользователя
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Поиск по имени или email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-[140px]"
              >
                <option value="all">Все роли</option>
                <option value="admin">Администраторы</option>
                <option value="user">Пользователи</option>
                <option value="guest">Гости</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Загрузка пользователей...</p>
            </CardContent>
          </Card>
        ) : isMobile ? (
          // Mobile card layout
          <div>
            <div className="mb-4 text-sm text-gray-600">Найдено пользователей: {filteredUsers.length}</div>
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          // Desktop table layout
          <Card>
            <CardHeader>
              <CardTitle>Пользователи ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Пользователь</th>
                      <th className="text-left py-3 px-4">Роль</th>
                      <th className="text-left py-3 px-4">Телефон</th>
                      <th className="text-left py-3 px-4">Регистрация</th>
                      <th className="text-left py-3 px-4">Статус</th>
                      <th className="text-left py-3 px-4">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${getRoleBadge(user.role)} flex items-center gap-1 w-fit`}>
                            {getRoleIcon(user.role)}
                            {user.role === "admin" ? "Админ" : user.role === "user" ? "Пользователь" : "Гость"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{user.phone || "—"}</td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(user.created_at).toLocaleDateString("ru-RU")}
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {user.status === "active" ? "Активен" : "Заблокирован"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingUser(user)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {editingUser && (
          <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Редактировать пользователя</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Имя</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Телефон</Label>
                  <Input
                    id="edit-phone"
                    value={editingUser.phone || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-role">Роль</Label>
                  <select
                    id="edit-role"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleUpdateUser(editingUser.id, editingUser)} className="flex-1">
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => toggleUserStatus(editingUser)} className="flex-1">
                    {editingUser.status === "active" ? "Заблокировать" : "Разблокировать"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AuthGuard>
  )
}
