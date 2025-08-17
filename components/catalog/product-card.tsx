"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number // изменил с originalPrice на oldPrice для единообразия
  image: string // основное изображение
  images?: string[] // дополнительные изображения (опционально)
  rating: number
  reviews: number
  inStock: boolean
  stockQuantity?: number // добавил для совместимости со страницей товара
  isNew?: boolean
  isHit?: boolean
  brand: string
  category: string
  slug?: string
  description?: string // добавил для совместимости
  specifications?: Record<string, string> // добавил для совместимости
}

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list" // сделал опциональным со значением по умолчанию
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id.toString(),
      name: product.name,
      slug: product.slug || `product-${product.id}`,
      price: product.price,
      image: product.image,
      maxQuantity: product.stockQuantity || 999,
      brand: product.brand,
      quantity: 1,
    })

    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name}`,
    })
  }

  const productUrl = product.slug ? `/catalog/${product.slug}` : `/catalog/product-${product.id}`

  if (viewMode === "list") {
    return (
      <Link href={productUrl} className="block">
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
              {product.isNew && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Новинка
                </span>
              )}
              {product.isHit && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Хит
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} ₽</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.oldPrice.toLocaleString()} ₽</span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? "В корзину" : "Нет в наличии"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={productUrl} className="block group">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Новинка
            </span>
          )}
          {product.isHit && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Хит</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} ₽</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">{product.oldPrice.toLocaleString()} ₽</span>
            )}
          </div>
          <Button className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? "В корзину" : "Нет в наличии"}
          </Button>
        </div>
      </div>
    </Link>
  )
}
