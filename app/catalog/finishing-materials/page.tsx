import type { Metadata } from "next"
import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"
import { ProductGrid } from "@/components/catalog/product-grid"
import { ProductFilters } from "@/components/catalog/product-filters"
import { ProductSort } from "@/components/catalog/product-sort"
import { ProductSearch } from "@/components/catalog/product-search"

export const metadata: Metadata = {
  title: "Отделочные материалы - ОптСтрой",
  description:
    "Отделочные материалы для ремонта: плитка, обои, краски, штукатурка, напольные покрытия. Качественная отделка по выгодным ценам.",
}

const finishingMaterials = [
  {
    id: 25,
    name: "Плитка керамическая 30x30",
    price: 450,
    image: "/ceramic-tile.png",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    category: "Плитка",
    brand: "КерамПро",
    slug: "ceramic-tile-30x30",
  },
  {
    id: 26,
    name: "Краска водоэмульсионная 10л",
    price: 1200,
    oldPrice: 1400,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    category: "Краски",
    brand: "КраскаПро",
    slug: "water-based-paint-10l",
  },
  {
    id: 27,
    name: "Обои виниловые 1.06x10м",
    price: 850,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    category: "Обои",
    brand: "ОбоиПро",
    slug: "vinyl-wallpaper-106x10m",
  },
  {
    id: 28,
    name: "Ламинат 32 класс",
    price: 680,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    category: "Напольные покрытия",
    brand: "ПолПро",
    slug: "laminate-class-32",
  },
  {
    id: 29,
    name: "Штукатурка гипсовая 30кг",
    price: 380,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 123,
    inStock: true,
    category: "Штукатурка",
    brand: "ШтукПро",
    slug: "gypsum-plaster-30kg",
  },
  {
    id: 30,
    name: "Линолеум бытовой 2м",
    price: 320,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    reviews: 67,
    inStock: false,
    category: "Напольные покрытия",
    brand: "ЛинПро",
    slug: "household-linoleum-2m",
  },
]

export default function FinishingMaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="flex items-center hover:text-green-600 transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalog" className="hover:text-green-600 transition-colors">
            Каталог
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Отделочные материалы</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Отделочные материалы</h1>
          <p className="text-gray-600">
            Широкий выбор отделочных материалов для любого ремонта. Плитка, краски, обои, напольные покрытия и
            штукатурка высокого качества.
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
              <p className="text-gray-600">Найдено {finishingMaterials.length} товаров</p>
            </div>
            <ProductGrid products={finishingMaterials} />
          </div>
        </div>
      </div>
    </div>
  )
}
