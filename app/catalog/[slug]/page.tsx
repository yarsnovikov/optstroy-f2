"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  slug: string
  price: number
  oldPrice?: number
  images: string[]
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
  stockQuantity: number
  description: string
  specifications: Record<string, string>
  isNew?: boolean
  isFeatured?: boolean
}

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data.product)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error("Ошибка загрузки товара:", error)
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchProduct()
    }
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка товара...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Товар не найден</h1>
          <p className="text-gray-600 mb-4">Запрашиваемый товар не существует</p>
          <Button asChild>
            <Link href="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    // Имитация добавления в корзину
    await new Promise((resolve) => setTimeout(resolve, 500))

    addItem({
      id: product.id.toString(),
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      maxQuantity: product.stockQuantity,
      brand: product.brand,
      quantity: quantity,
    })

    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} (${quantity} шт.)`,
    })

    setIsAddingToCart(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Главная
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-primary">
            Каталог
          </Link>
          <span>/</span>
          <Link
            href={`/catalog?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-primary"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images?.[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500">Новинка</Badge>}
              {product.isFeatured && <Badge className="absolute top-4 right-4 bg-orange-500">Хит продаж</Badge>}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-lg font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} отзывов)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">{product.price} ₽</span>
              {product.oldPrice && (
                <span className="text-2xl text-muted-foreground line-through">{product.oldPrice} ₽</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">В наличии ({product.stockQuantity} шт.)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Нет в наличии</span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Количество:</span>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={isAddingToCart}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isAddingToCart ? "Добавление..." : "Добавить в корзину"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Доставка</p>
                  <p className="text-sm text-muted-foreground">От 1 дня</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Гарантия</p>
                  <p className="text-sm text-muted-foreground">12 месяцев</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Возврат</p>
                  <p className="text-sm text-muted-foreground">14 дней</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    {product.description.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Отзывы пока не добавлены</p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Оставить отзыв
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
