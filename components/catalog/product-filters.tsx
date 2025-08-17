"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface FilterSection {
  id: string
  title: string
  options: { id: string; label: string; count?: number }[]
}

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void
  categories: FilterSection
  brands: FilterSection
  priceRange: [number, number]
  maxPrice: number
}

export function ProductFilters({ onFiltersChange, categories, brands, priceRange, maxPrice }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "brands", "price", "availability"])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>(priceRange)
  const [inStockOnly, setInStockOnly] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId)

    setSelectedCategories(newCategories)
    updateFilters({ categories: newCategories })
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked ? [...selectedBrands, brandId] : selectedBrands.filter((id) => id !== brandId)

    setSelectedBrands(newBrands)
    updateFilters({ brands: newBrands })
  }

  const handlePriceChange = (value: [number, number]) => {
    setCurrentPriceRange(value)
    updateFilters({ priceRange: value })
  }

  const handleStockChange = (checked: boolean) => {
    setInStockOnly(checked)
    updateFilters({ inStockOnly: checked })
  }

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: currentPriceRange,
      inStockOnly,
      ...newFilters,
    })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setCurrentPriceRange([0, maxPrice])
    setInStockOnly(false)
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: [0, maxPrice],
      inStockOnly: false,
    })
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    (currentPriceRange?.[0] ?? 0) > 0 ||
    (currentPriceRange?.[1] ?? maxPrice) < maxPrice ||
    inStockOnly

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Фильтры</h2>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Очистить все
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <button
            onClick={() => toggleSection("categories")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-gray-900">Категории</h3>
            {expandedSections.includes("categories") ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {expandedSections.includes("categories") && (
            <div className="mt-3 space-y-2">
              {categories.options.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                    {category.label}
                    {category.count && <span className="text-gray-500 ml-1">({category.count})</span>}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brands */}
        <div>
          <button
            onClick={() => toggleSection("brands")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-gray-900">Бренды</h3>
            {expandedSections.includes("brands") ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {expandedSections.includes("brands") && (
            <div className="mt-3 space-y-2">
              {brands.options.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                    {brand.label}
                    {brand.count && <span className="text-gray-500 ml-1">({brand.count})</span>}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full text-left">
            <h3 className="font-medium text-gray-900">Цена</h3>
            {expandedSections.includes("price") ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {expandedSections.includes("price") && (
            <div className="mt-3 space-y-4">
              <Slider
                value={currentPriceRange}
                onValueChange={handlePriceChange}
                max={maxPrice}
                step={100}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{(currentPriceRange?.[0] ?? 0).toLocaleString()} ₽</span>
                <span>{(currentPriceRange?.[1] ?? maxPrice).toLocaleString()} ₽</span>
              </div>
            </div>
          )}
        </div>

        {/* Availability */}
        <div>
          <button
            onClick={() => toggleSection("availability")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-gray-900">Наличие</h3>
            {expandedSections.includes("availability") ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {expandedSections.includes("availability") && (
            <div className="mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={handleStockChange} />
                <Label htmlFor="in-stock" className="text-sm text-gray-700 cursor-pointer">
                  Только в наличии
                </Label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
