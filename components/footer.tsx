"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage({ type: "error", text: "Введите email адрес" })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Введите корректный email адрес" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: "Спасибо! Вы успешно подписались на рассылку" })
        setEmail("")
      } else {
        setMessage({ type: "error", text: data.error || "Произошла ошибка при подписке" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Произошла ошибка при подписке" })
    } finally {
      setIsLoading(false)
    }

    // Clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ОС</span>
              </div>
              <span className="text-xl font-bold text-primary">ОптСтрой</span>
            </div>
            <p className="text-gray-300 mb-4">
              Более 20 лет обеспечиваем Ярославль качественными строительными материалами. Надежность, подтвержденная
              временем.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+7 (901) 040-09-77</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@optstroy.shop</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>г. Ярославль, ул. Магистральная, д. 7 ТД "Аркада"</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                <span>Пн-Пт: 9:00-17:00, Сб-Вс: выходной</span>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/catalog/construction-materials" className="hover:text-primary transition-colors">
                  Строительные материалы
                </Link>
              </li>
              <li>
                <Link href="/catalog/tools" className="hover:text-primary transition-colors">
                  Инструменты
                </Link>
              </li>
              <li>
                <Link href="/catalog/electrical" className="hover:text-primary transition-colors">
                  Электрика
                </Link>
              </li>
              <li>
                <Link href="/catalog/plumbing" className="hover:text-primary transition-colors">
                  Сантехника
                </Link>
              </li>
              <li>
                <Link href="/catalog/finishing-materials" className="hover:text-primary transition-colors">
                  Отделочные материалы
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/delivery-payment" className="hover:text-primary transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/warranties" className="hover:text-primary transition-colors">
                  Гарантии
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  Вакансии
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Новости и акции</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Подпишитесь на рассылку и получайте информацию о новинках и специальных предложениях
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Подписываем..." : "Подписаться"}
              </Button>
            </form>

            {/* Added message display for subscription feedback */}
            {message && (
              <div
                className={`mt-3 p-2 rounded-md text-sm flex items-center gap-2 ${
                  message.type === "success"
                    ? "bg-green-900/50 text-green-300 border border-green-800"
                    : "bg-red-900/50 text-red-300 border border-red-800"
                }`}
              >
                {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span>{message.text}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 ОптСтрой. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
