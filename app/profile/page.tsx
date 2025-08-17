"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Package,
  Settings,
  ArrowLeft,
  Edit,
  Eye,
  Shield,
  Crown,
  LogOut,
  Heart,
  Key,
  Bell,
  Trash2,
} from "lucide-react"
import { AuthGuard, useAuth } from "@/components/auth-guard"
import { useCart } from "@/lib/cart-context"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  address: string
  apartment: string
  postalCode: string
}

interface FavoriteProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  inStock: boolean
}

const mockOrders = [
  {
    id: "ОС-123456",
    date: "2024-01-15",
    status: "delivered",
    total: 15600,
    items: [
      { name: "Цемент М500 50кг", quantity: 2, price: 450 },
      { name: "Дрель ударная Bosch", quantity: 1, price: 8500 },
    ],
  },
  {
    id: "ОС-123457",
    date: "2024-01-10",
    status: "shipped",
    total: 8900,
    items: [{ name: "Кирпич керамический", quantity: 100, price: 12.5 }],
  },
]

const mockFavorites: FavoriteProduct[] = [
  {
    id: "1",
    name: "Цемент М500 50кг",
    price: 450,
    image: "/cement-bag.png",
    category: "Строительные материалы",
    inStock: true,
  },
  {
    id: "2",
    name: "Дрель ударная Bosch GSB 13 RE",
    price: 8500,
    image: "/power-drill.png",
    category: "Инструменты",
    inStock: true,
  },
]

function ProfileContent() {
  const { user, updateUser, logout } = useAuth()
  const { addItem } = useCart()
  const [isEditing, setIsEditing] = useState(false)
  const [favorites, setFavorites] = useState<FavoriteProduct[]>(mockFavorites)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [profileData, setProfileData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    apartment: "",
    postalCode: "",
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "+7(999)123-45-67",
        city: "Москва",
        address: user.address || "ул. Примерная, д. 123",
        apartment: "кв. 45",
        postalCode: "123456",
      })
    }
  }, [user])

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const updatedName = `${profileData.firstName} ${profileData.lastName}`.trim()
    updateUser({
      name: updatedName,
      phone: profileData.phone,
      address: `${profileData.address}, ${profileData.apartment}`,
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Новые пароли не совпадают")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("Пароль должен содержать минимум 6 символов")
      return
    }

    // Здесь будет запрос к API для смены пароля
    alert("Пароль успешно изменен")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId))
  }

  const addToCartFromFavorites = (product: FavoriteProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "user":
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Администратор"
      case "user":
        return "Пользователь"
      default:
        return "Гость"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-emerald-100 text-emerald-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает подтверждения"
      case "confirmed":
        return "Подтвержден"
      case "shipped":
        return "Отправлен"
      case "delivered":
        return "Доставлен"
      case "cancelled":
        return "Отменен"
      default:
        return status
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              На главную
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                {user.name?.charAt(0) || "U"}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge className={`${getRoleBadge(user.role)} flex items-center gap-1 w-fit mt-2`}>
                  {getRoleIcon(user.role)}
                  {getRoleText(user.role)}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Мои заказы
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Избранное
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Личная информация</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Сохранить" : "Редактировать"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Информация об аккаунте</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">ID пользователя:</span>
                      <span className="ml-2 font-mono">#{user.id || "000001"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Дата регистрации:</span>
                      <span className="ml-2">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString("ru-RU") : "01.01.2024"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-semibold">Адрес доставки</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Город</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Индекс</Label>
                    <Input
                      id="postalCode"
                      value={profileData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Улица, дом</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apartment">Квартира, офис</Label>
                  <Input
                    id="apartment"
                    value={profileData.apartment}
                    onChange={(e) => handleInputChange("apartment", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {user.role === "admin" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-red-600" />
                    Панель администратора
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    У вас есть права администратора. Вы можете управлять товарами и пользователями.
                  </p>
                  <Button asChild>
                    <Link href="/admin">Перейти в админ-панель</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Заказ {order.id}</h3>
                          <p className="text-sm text-muted-foreground">от {order.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                          <p className="text-lg font-bold mt-1">{order.total.toLocaleString()} ₽</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Повторить заказ
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Избранные товары</CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">У вас пока нет избранных товаров</p>
                    <Button asChild className="mt-4">
                      <Link href="/catalog">Перейти в каталог</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 flex gap-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-lg font-bold text-emerald-600 mt-1">{product.price.toLocaleString()} ₽</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={() => addToCartFromFavorites(product)}
                              disabled={!product.inStock}
                            >
                              В корзину
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeFavorite(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Смена пароля
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <Button onClick={handlePasswordChange}>Изменить пароль</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Уведомления
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderUpdates">Уведомления о заказах</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления об изменении статуса заказов</p>
                  </div>
                  <Switch
                    id="orderUpdates"
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, orderUpdates: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotions">Акции и скидки</Label>
                    <p className="text-sm text-muted-foreground">Получать информацию о специальных предложениях</p>
                  </div>
                  <Switch
                    id="promotions"
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, promotions: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter">Новостная рассылка</Label>
                    <p className="text-sm text-muted-foreground">Получать новости компании и новые товары</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newsletter: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Действия с аккаунтом</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Удаление аккаунта</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Это действие нельзя отменить. Все ваши данные будут удалены безвозвратно.
                  </p>
                  <Button variant="destructive" size="sm">
                    Удалить аккаунт
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard allowedRoles={["user", "admin"]} redirectTo="/auth/login">
      <ProfileContent />
    </AuthGuard>
  )
}
