"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

const featuredProducts = [
  {
    id: "1",
    name: "Дрель ударная Bosch GSB 13 RE",
    price: 8990,
    originalPrice: 10500,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder-87kh2.png",
    badge: "Хит продаж",
    inStock: true,
    slug: "drill-bosch-gsb-13-re",
    brand: "Bosch",
    category: "Инструменты",
  },
  {
    id: "2",
    name: "Цемент М500 50кг",
    price: 450,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder-ph8my.png",
    badge: "Лучшая цена",
    inStock: true,
    slug: "cement-m500-50kg",
    brand: "СтройМикс",
    category: "Строительные материалы",
  },
  {
    id: "3",
    name: "Кабель ВВГнг 3x2.5",
    price: 120,
    rating: 4.7,
    reviews: 67,
    image: "/electrical-cable-vvg.png",
    inStock: true,
    slug: "cable-vvgng-3x25",
    brand: "КабельПром",
    category: "Электрика",
  },
  {
    id: "4",
    name: "Смеситель для кухни Grohe",
    price: 15900,
    originalPrice: 18500,
    rating: 4.9,
    reviews: 45,
    image: "/premium-kitchen-faucet.png",
    badge: "Премиум",
    inStock: true,
    slug: "faucet-grohe-kitchen",
    brand: "Grohe",
    category: "Сантехника",
  },
]

export function FeaturedProducts() {
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
    })
    toast.success(`${product.name} добавлен в корзину`)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Рекомендуемые товары</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Популярные товары с высокими оценками от наших клиентов
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group product-card overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="relative">
                <Link href={`/catalog/${product.slug}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover cursor-pointer"
                  />
                </Link>
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">{product.badge}</Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive" className="absolute top-3 right-3">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              <div className="p-4">
                <Link href={`/catalog/${product.slug}`}>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">{product.price.toLocaleString("ru-RU")} ₽</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("ru-RU")} ₽
                    </span>
                  )}
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />В корзину
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/catalog">
            <Button size="lg" variant="outline" className="font-semibold bg-transparent">
              Посмотреть все товары
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
