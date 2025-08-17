import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { ProductGrid } from "@/components/catalog/product-grid"
import { ProductFilters } from "@/components/catalog/product-filters"
import { ProductSort } from "@/components/catalog/product-sort"
import { ProductSearch } from "@/components/catalog/product-search"

export const metadata: Metadata = {
  title: "Электрика - ОптСтрой",
  description:
    "Электротовары для строительства: кабели, провода, розетки, выключатели, автоматы. Качественная электрика от ведущих производителей.",
}

const electrical = [
  {
    id: 13,
    name: "Кабель ВВГ 3x2.5",
    price: 85,
    image: "/electrical-cable-wire.png",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    category: "Кабели и провода",
    brand: "КабельПром",
    slug: "cable-vvg-3x2-5",
  },
  {
    id: 14,
    name: "Розетка с заземлением",
    price: 180,
    image: "/electrical-outlet.png",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    category: "Розетки и выключатели",
    brand: "ЭлектроПро",
    slug: "grounded-outlet",
  },
  {
    id: 15,
    name: "Автомат 16А однополюсный",
    price: 320,
    image: "/placeholder-3x871.png",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    category: "Автоматы и УЗО",
    brand: "ЗащитаПро",
    slug: "circuit-breaker-16a",
  },
  {
    id: 16,
    name: "Выключатель одноклавишный",
    price: 120,
    image: "/single-pole-light-switch.png",
    rating: 4.6,
    reviews: 134,
    inStock: true,
    category: "Розетки и выключатели",
    brand: "ЭлектроПро",
    slug: "single-light-switch",
  },
  {
    id: 17,
    name: "Щиток электрический 12 модулей",
    price: 850,
    image: "/electrical-panel.png",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    category: "Щитки и боксы",
    brand: "ЩитПром",
    slug: "electrical-panel-12-modules",
  },
  {
    id: 18,
    name: "Лампа LED 10Вт E27",
    price: 150,
    image: "/glowing-led-bulb.png",
    rating: 4.5,
    reviews: 298,
    inStock: false,
    category: "Освещение",
    brand: "СветПро",
    slug: "led-bulb-10w-e27",
  },
]

export default function ElectricalPage() {
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
          <span className="text-gray-900">Электрика</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Электрика</h1>
          <p className="text-gray-600">
            Полный ассортимент электротоваров для строительства и ремонта. Кабели, розетки, выключатели, автоматы и
            освещение от надежных производителей.
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
              <p className="text-gray-600">Найдено {electrical.length} товаров</p>
            </div>
            <ProductGrid products={electrical} />
          </div>
        </div>
      </div>
    </div>
  )
}
