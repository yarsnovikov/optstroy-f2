"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const { state } = useCart()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ОС</span>
            </div>
            <span className="text-xl font-bold text-primary">ОптСтрой</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="font-medium" asChild>
              <Link href="/">Главная</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  Каталог
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/catalog?category=stroitelnye-materialy">Строительные материалы</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/catalog?category=instrumenty">Инструменты</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/catalog?category=elektrika">Электрика</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/catalog?category=santekhnika">Сантехника</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/catalog?category=otdelochnye-materialy">Отделочные материалы</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/catalog">Все товары</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="font-medium" asChild>
              <Link href="/about">О компании</Link>
            </Button>
            <Button variant="ghost" className="font-medium" asChild>
              <Link href="/services">Услуги</Link>
            </Button>
            <Button variant="ghost" className="font-medium" asChild>
              <Link href="/contacts">Контакты</Link>
            </Button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Поиск товаров..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Профиль</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Мои заказы</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile?tab=favorites">Избранное</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Админ-панель</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                <Link href="/auth/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Updated cart button to show item count from cart context */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Поиск товаров..." className="pl-10 pr-4" />
              </div>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/">Главная</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/catalog">Каталог</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/about">О компании</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/services">Услуги</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/contacts">Контакты</Link>
              </Button>
              {user ? (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Профиль
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/orders">
                      <Package className="h-4 w-4 mr-2" />
                      Мои заказы
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </Button>
                </>
              ) : (
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/auth/login">
                    <User className="h-4 w-4 mr-2" />
                    Войти
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
