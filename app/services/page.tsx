import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Users, Calculator, Wrench, Clock, Shield, Phone, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Услуги - ОптСтрой | Доставка, монтаж, консультации",
  description:
    "Полный спектр услуг от ОптСтрой: доставка строительных материалов, монтажные работы, консультации специалистов, расчет материалов. Профессиональный сервис в Ярославле.",
  keywords: "услуги, доставка, монтаж, консультации, расчет материалов, строительные работы, Ярославль",
}

const services = [
  {
    icon: Truck,
    title: "Доставка",
    description: "Быстрая доставка строительных материалов по Ярославлю и области",
    features: ["Доставка в день заказа", "Разные типы транспорта", "Услуги грузчиков", "Подъем на этаж"],
    price: "от 500 ₽",
    popular: true,
  },
  {
    icon: Users,
    title: "Монтажные работы",
    description: "Профессиональный монтаж и установка строительных материалов",
    features: ["Опытные мастера", "Гарантия на работы", "Собственный инструмент", "Выезд на объект"],
    price: "от 1000 ₽/час",
  },
  {
    icon: Calculator,
    title: "Расчет материалов",
    description: "Точный расчет необходимых материалов для вашего проекта",
    features: ["Бесплатный расчет", "3D визуализация", "Смета с ценами", "Рекомендации по выбору"],
    price: "Бесплатно",
  },
  {
    icon: Wrench,
    title: "Техническая поддержка",
    description: "Консультации и техническая поддержка по всем вопросам",
    features: ["Консультации специалистов", "Помощь в выборе", "Технические решения", "Поддержка 24/7"],
    price: "Бесплатно",
  },
]

const additionalServices = [
  {
    title: "Складские услуги",
    description: "Временное хранение ваших материалов на нашем складе",
    icon: Shield,
  },
  {
    title: "Экспресс-доставка",
    description: "Срочная доставка в течение 2-4 часов по городу",
    icon: Clock,
  },
  {
    title: "Персональный менеджер",
    description: "Индивидуальное сопровождение крупных проектов",
    icon: Users,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Наши услуги</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Полный спектр услуг для вашего строительного проекта. От доставки материалов до профессионального монтажа.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contacts">
                  <Phone className="h-5 w-5 mr-2" />
                  Получить консультацию
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/catalog">
                  Перейти в каталог
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Основные услуги</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы предоставляем комплексные услуги для решения всех ваших строительных задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative ${service.popular ? "ring-2 ring-primary" : ""}`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">Популярно</Badge>
                )}
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-primary font-semibold">{service.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/contacts">Заказать услугу</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Дополнительные услуги</h2>
            <p className="text-muted-foreground">Расширенные возможности для максимального удобства</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Готовы начать ваш проект?</h2>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Свяжитесь с нами для получения персональной консультации и расчета стоимости услуг
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contacts">
                    <Phone className="h-5 w-5 mr-2" />
                    +7 (901) 040-09-77
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="https://wa.me/79010400977">WhatsApp</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
