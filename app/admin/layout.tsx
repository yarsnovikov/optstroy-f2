"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  Home,
  FolderTree,
  Bell,
  Search,
  Phone,
  Percent,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { AuthGuard } from "@/components/auth-guard"
import { Suspense } from "react"

const sidebarItems = [
  {
    title: "Дашборд",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Товары",
    href: "/admin/products",
    icon: Package,
    badge: "156",
  },
  {
    title: "Заказы",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    title: "Пользователи",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Категории",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Промокоды",
    href: "/admin/promocodes",
    icon: Percent,
    badge: "8",
  },
  {
    title: "Контакты",
    href: "/admin/contacts",
    icon: Phone,
  },
  {
    title: "Аналитика",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Настройки",
    href: "/admin/settings",
    icon: Settings,
  },
]

function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
            >
              <Home className="h-4 w-4" />
              Вернуться на сайт
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Админ-панель</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <MobileNav />

        <div className="flex flex-1 items-center gap-4">
          <div className="hidden md:flex">
            <h1 className="text-xl font-semibold">ОптСтрой Админ</h1>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Поиск..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="admin" redirectTo="/auth/login">
      <Suspense fallback={null}>
        <div className="min-h-screen bg-background">
          <div className="flex">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
              <div className="flex-1 flex flex-col min-h-0 border-r bg-muted/10">
                <Sidebar />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-72">
              <AdminHeader />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </div>
      </Suspense>
    </AuthGuard>
  )
}
