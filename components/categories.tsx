import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Hammer, Zap, Wrench, Paintbrush, Home } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Строительные материалы",
    description: "Кирпич, блоки, цемент, арматура",
    icon: Home,
    image: "/construction-materials.png",
    itemCount: "2,500+ товаров",
    slug: "construction-materials",
  },
  {
    id: 2,
    name: "Инструменты",
    description: "Профессиональный инструмент для строительства",
    icon: Hammer,
    image: "/placeholder-yb9du.png",
    itemCount: "1,200+ товаров",
    slug: "tools",
  },
  {
    id: 3,
    name: "Электрика",
    description: "Кабели, розетки, автоматы, светильники",
    icon: Zap,
    image: "/placeholder-ibn1g.png",
    itemCount: "800+ товаров",
    slug: "electrical",
  },
  {
    id: 4,
    name: "Сантехника",
    description: "Трубы, фитинги, смесители, сантехника",
    icon: Wrench,
    image: "/plumbing-bathroom.png",
    itemCount: "600+ товаров",
    slug: "plumbing",
  },
  {
    id: 5,
    name: "Отделочные материалы",
    description: "Краски, обои, плитка, напольные покрытия",
    icon: Paintbrush,
    image: "/finishing-materials-display.png",
    itemCount: "1,500+ товаров",
    slug: "finishing-materials",
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Каталог товаров</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Широкий ассортимент строительных материалов и инструментов от ведущих производителей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/catalog/${category.slug}`}>
                <Card className="group category-hover cursor-pointer overflow-hidden border-0 shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-sm font-medium">{category.itemCount}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80">
                      Перейти в раздел
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
