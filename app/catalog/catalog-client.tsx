"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star, Filter, Grid, List, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  slug: string
  price: number
  oldPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
}

// Моковые данные товаров
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Цемент М500 50кг",
    slug: "cement-m500-50kg",
    price: 450,
    oldPrice: 520,
    image: "/placeholder-vyubc.png",
    rating: 4.8,
    reviews: 124,
    category: "Строительные материалы",
    brand: "ЕвроЦемент",
    inStock: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Дрель ударная Bosch GSB 13 RE",
    slug: "drill-bosch-gsb-13-re",
    price: 8500,
    oldPrice: 9200,
    image: "/placeholder-p46z1.png",
    rating: 4.9,
    reviews: 89,
    category: "Инструменты",
    brand: "Bosch",
    inStock: true,
    isNew: true,
  },
  {
    id: 3,
    name: "Кирпич керамический рядовой",
    slug: "kirpich-keramicheskiy",
    price: 12.5,
    image: "/red-ceramic-brick.png",
    rating: 4.6,
    reviews: 67,
    category: "Строительные материалы",
    brand: "КирпичСтрой",
    inStock: true,
  },
  {
    id: 4,
    name: "Молоток слесарный 500г",
    slug: "molotok-slesarnyy-500g",
    price: 850,
    image: "/500g-hammer.png",
    rating: 4.7,
    reviews: 45,
    category: "Инструменты",
    brand: "Зубр",
    inStock: true,
  },
  {
    id: 5,
    name: "Кабель ВВГ 3x2.5",
    slug: "kabel-vvg-3x2-5",
    price: 125,
    image: "/electrical-cable-wire.png",
    rating: 4.5,
    reviews: 32,
    category: "Электрика",
    brand: "Энергокабель",
    inStock: false,
  },
  {
    id: 6,
    name: "Смеситель для кухни",
    slug: "smesitel-dlya-kukhni",
    price: 3200,
    oldPrice: 3800,
    image: "/kitchen-faucet-mixer.png",
    rating: 4.4,
    reviews: 28,
    category: "Сантехника",
    brand: "Grohe",
    inStock: true,
  },
]

const categories = [
  "Все категории",
  "Строительные материалы",
  "Инструменты",
  "Электрика",
  "Сантехника",
  "Отделочные материалы",
]

const brands = ["Все бренды", "Bosch", "ЕвроЦемент", "КирпичСтрой", "Зубр", "Энергокабель", "Grohe"]

export default function CatalogClientPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("Все категории")
  const [selectedBrand, setSelectedBrand] = useState("Все бренды")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      const categoryName = categories.find((cat) => cat.toLowerCase().replace(/\s+/g, "-") === category)
      if (categoryName) {
        setSelectedCategory(categoryName)
      }
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = products

    // Фильтр по категории
    if (selectedCategory !== "Все категории") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Фильтр по бренду
    if (selectedBrand !== "Все бренды") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    // Фильтр по цене
    filtered = filtered.filter(
      (product) => product.price >= (priceRange?.[0] ?? 0) && product.price <= (priceRange?.[1] ?? 10000),
    )

    // Фильтр по наличию
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Сортировка
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // popular - сначала featured, потом по рейтингу
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return b.rating - a.rating
        })
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy, inStockOnly])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Каталог товаров</h1>
          <p className="text-muted-foreground">
            Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Фильтры</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Бренд</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Цена: {priceRange?.[0] ?? 0} - {priceRange?.[1] ?? 10000} ₽
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                </div>

                {/* In Stock Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="inStock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                  <label htmlFor="inStock" className="text-sm font-medium">
                    Только в наличии
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">По популярности</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className={viewMode === "list" ? "flex" : ""}>
                  <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className={`w-full object-cover ${viewMode === "list" ? "h-48" : "h-64"}`}
                      />
                      {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Новинка</Badge>}
                      {product.isFeatured && <Badge className="absolute top-2 right-2 bg-orange-500">Хит</Badge>}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary">Нет в наличии</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/catalog/${product.slug}`}
                          className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
                        >
                          {product.name}
                        </Link>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </CardHeader>

                    <CardContent className={viewMode === "list" ? "py-2" : ""}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                        {product.oldPrice && (
                          <span className="text-lg text-muted-foreground line-through">{product.oldPrice} ₽</span>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className="w-full"
                        disabled={!product.inStock}
                        variant={product.inStock ? "default" : "secondary"}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "В корзину" : "Нет в наличии"}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Товары не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
