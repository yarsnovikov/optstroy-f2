"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Здесь будет логика аутентификации с PHP backend
    try {
      // Имитация запроса к серверу
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Временная логика для демонстрации
      if (formData.email === "admin@optstroy.shop" && formData.password === "admin123") {
        // Успешный вход
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: "admin",
            name: "Администратор",
          }),
        )
        window.location.href = "/admin"
      } else if (formData.email && formData.password) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: "user",
            name: "Пользователь",
          }),
        )
        window.location.href = "/"
      } else {
        setError("Неверный email или пароль")
      }
    } catch (err) {
      setError("Ошибка при входе в систему")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-800">Вход в систему</CardTitle>
          <CardDescription>Войдите в свой аккаунт ОптСтрой</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Введите пароль"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>

            <div className="text-center space-y-2">
              <Link href="/auth/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                Забыли пароль?
              </Link>
              <div className="text-sm text-gray-600">
                Нет аккаунта?{" "}
                <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
