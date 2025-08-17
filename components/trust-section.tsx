import { Truck, Shield, Headphones, Award, Clock, Users } from "lucide-react"

const trustFeatures = [
  {
    icon: Users,
    title: "20+ лет опыта",
    description: "Успешно работаем на Ярославском рынке более двух десятилетий",
  },
  {
    icon: Shield,
    title: "Команда профессионалов",
    description: "Опытные специалисты с четким пониманием ответственности",
  },
  {
    icon: Truck,
    title: "Складские запасы",
    description: "Все основные материалы всегда в наличии на складах",
  },
  {
    icon: Clock,
    title: "Быстрое обслуживание",
    description: "Оформление и отгрузка товара в течение нескольких минут",
  },
  {
    icon: Headphones,
    title: "Персональный менеджер",
    description: "Быстрое и гибкое решение поставленных задач",
  },
  {
    icon: Award,
    title: "Комплексное обеспечение",
    description: "Большой ассортимент для строительства любой сложности",
  },
]

export function TrustSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши самые сильные стороны</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 20 лет успешной работы на Ярославском рынке строительных материалов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/90 transition-colors">
                  <IconComponent className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
