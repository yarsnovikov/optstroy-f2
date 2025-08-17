import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { ProductGrid } from "@/components/catalog/product-grid"
import { ProductFilters } from "@/components/catalog/product-filters"
import { ProductSort } from "@/components/catalog/product-sort"
import { ProductSearch } from "@/components/catalog/product-search"

export const metadata: Metadata = {
  title: "Инструменты - ОптСтрой",
  description:
    "Профессиональные строительные инструменты: электроинструмент, ручной инструмент, измерительные приборы. Качество и надежность.",
}

const tools = [
  {
    id: 7,
    name: "Молоток слесарный 500г",
    price: 450,
    image: "/500g-hammer.png",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    category: "Ручной инструмент",
    brand: "ИнструментПро",
    slug: "500g-hammer",
  },
  {
    id: 8,
    name: "Дрель ударная 850Вт",
    price: 3200,
    oldPrice: 3800,
    image: "/electric-drill.png",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    category: "Электроинструмент",
    brand: "ПроДрель",
    slug: "impact-drill-850w",
  },
  {
    id: 9,
    name: "Уровень строительный 60см",
    price: 890,
    image: "/construction-level.png",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    category: "Измерительный инструмент",
    brand: "ТочностьПро",
    slug: "construction-level-60cm",
  },
  {
    id: 10,
    name: "Болгарка 125мм 900Вт",
    price: 2800,
    image: "/angle-grinder-sparks.png",
    rating: 4.6,
    reviews: 167,
    inStock: true,
    category: "Электроинструмент",
    brand: "ШлифМастер",
    slug: "angle-grinder-125mm",
  },
  {
    id: 11,
    name: "Набор отверток 12шт",
    price: 650,
    image: "/placeholder-nzqb9.png",
    rating: 4.5,
    reviews: 98,
    inStock: true,
    category: "Ручной инструмент",
    brand: "ИнструментПро",
    slug: "screwdriver-set-12pcs",
  },
  {
    id: 12,
    name: "Рулетка 5м",
    price: 320,
    image: "/measuring-tape.png",
    rating: 4.7,
    reviews: 145,
    inStock: false,
    category: "Измерительный инструмент",
    brand: "ИзмерПро",
    slug: "measuring-tape-5m",
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки для навигации */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600 flex items-center">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalog" className="hover:text-green-600">
            Каталог
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Инструменты</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Инструменты</h1>
          <p className="text-gray-600">
            Профессиональные строительные инструменты для любых задач. Электроинструмент, ручной инструмент и
            измерительные приборы высокого качества.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <ProductSearch />
          </div>
          <ProductSort />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">Найдено {tools.length} товаров</p>
            </div>
            <ProductGrid products={tools} />
          </div>
        </div>
      </div>
    </div>
  )
}
