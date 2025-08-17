import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { ProductGrid } from "@/components/catalog/product-grid"
import { ProductFilters } from "@/components/catalog/product-filters"
import { ProductSort } from "@/components/catalog/product-sort"
import { ProductSearch } from "@/components/catalog/product-search"

export const metadata: Metadata = {
  title: "Сантехника - ОптСтрой",
  description:
    "Сантехника для дома и офиса: смесители, трубы, фитинги, унитазы, раковины. Качественная сантехника по доступным ценам.",
}

const plumbing = [
  {
    id: 19,
    name: "Смеситель для кухни",
    price: 2800,
    oldPrice: 3200,
    image: "/kitchen-faucet-mixer.png",
    rating: 4.7,
    reviews: 145,
    inStock: true,
    category: "Смесители",
    brand: "АкваПро",
    slug: "kitchen-faucet-mixer",
  },
  {
    id: 20,
    name: "Труба полипропиленовая 32мм",
    price: 120,
    image: "/polypropylene-pipe.png",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    category: "Трубы и фитинги",
    brand: "ТрубПром",
    slug: "polypropylene-pipe-32mm",
  },
  {
    id: 21,
    name: "Унитаз напольный",
    price: 4500,
    image: "/floor-toilet.png",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    category: "Унитазы",
    brand: "СанПро",
    slug: "floor-toilet",
  },
  {
    id: 22,
    name: "Раковина накладная 60см",
    price: 3200,
    image: "/bathroom-sink.png",
    rating: 4.5,
    reviews: 123,
    inStock: true,
    category: "Раковины",
    brand: "КерамПро",
    slug: "bathroom-sink-60cm",
  },
  {
    id: 23,
    name: "Фитинг угловой 32мм",
    price: 45,
    image: "/pipe-elbow-fitting.png",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    category: "Трубы и фитинги",
    brand: "ФитингПро",
    slug: "elbow-fitting-32mm",
  },
  {
    id: 24,
    name: "Душевая кабина 90x90",
    price: 15800,
    image: "/modern-shower-cabin.png",
    rating: 4.8,
    reviews: 45,
    inStock: false,
    category: "Душевые кабины",
    brand: "ДушПро",
    slug: "shower-cabin-90x90",
  },
]

export default function PlumbingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600 flex items-center">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalog" className="hover:text-green-600">
            Каталог
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Сантехника</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Сантехника</h1>
          <p className="text-gray-600">
            Качественная сантехника для дома и офиса. Смесители, трубы, унитазы, раковины и душевые кабины от
            проверенных производителей.
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
              <p className="text-gray-600">Найдено {plumbing.length} товаров</p>
            </div>
            <ProductGrid products={plumbing} />
          </div>
        </div>
      </div>
    </div>
  )
}
