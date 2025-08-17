"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Settings, Mail, Truck } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

function SiteSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Основные настройки
    siteName: "ОптСтрой",
    siteDescription: "Строительные материалы и инструменты в Ярославле",
    contactEmail: "info@optstroy.shop",
    contactPhone: "+7 (901) 040-09-77",
    address: 'г. Ярославль, ул. Магистральная, д. 7 ТД "Аркада"',

    // Настройки доставки
    freeDeliveryThreshold: 5000,
    deliveryPrice: 500,
    deliveryEnabled: true,

    // Email настройки
    emailNotifications: true,
    orderNotifications: true,

    // Прочие настройки
    maintenanceMode: false,
    allowRegistration: true,
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Здесь будет API вызов для сохранения настроек
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
            <h1 className="text-3xl font-bold">Настройки сайта</h1>
            <p className="text-muted-foreground">Управление основными параметрами</p>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Основные
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Доставка
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Уведомления
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Информация о сайте</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Название сайта</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => updateSetting("siteName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => updateSetting("contactEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Описание сайта</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => updateSetting("siteDescription", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Телефон</Label>
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => updateSetting("contactPhone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => updateSetting("address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Системные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Режим обслуживания</Label>
                    <p className="text-sm text-muted-foreground">Временно закрыть сайт для посетителей</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowRegistration">Разрешить регистрацию</Label>
                    <p className="text-sm text-muted-foreground">Позволить новым пользователям регистрироваться</p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => updateSetting("allowRegistration", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="deliveryEnabled">Включить доставку</Label>
                    <p className="text-sm text-muted-foreground">Предлагать доставку товаров</p>
                  </div>
                  <Switch
                    id="deliveryEnabled"
                    checked={settings.deliveryEnabled}
                    onCheckedChange={(checked) => updateSetting("deliveryEnabled", checked)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryPrice">Стоимость доставки (₽)</Label>
                    <Input
                      id="deliveryPrice"
                      type="number"
                      value={settings.deliveryPrice}
                      onChange={(e) => updateSetting("deliveryPrice", Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freeDeliveryThreshold">Бесплатная доставка от (₽)</Label>
                    <Input
                      id="freeDeliveryThreshold"
                      type="number"
                      value={settings.freeDeliveryThreshold}
                      onChange={(e) => updateSetting("freeDeliveryThreshold", Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">Отправлять уведомления на email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderNotifications">Уведомления о заказах</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления о новых заказах</p>
                  </div>
                  <Switch
                    id="orderNotifications"
                    checked={settings.orderNotifications}
                    onCheckedChange={(checked) => updateSetting("orderNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <SiteSettings />
    </AuthGuard>
  )
}
