"use client"

import { ProductCard } from "./product-card"

interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isHit?: boolean
  brand: string
  category: string
  slug?: string
  description?: string
}

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Товары не найдены</h3>
        <p className="text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
      </div>
    )
  }

  return (
    <div
      className={
        viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  )
}
