"use client"

import { Grid, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProductSortProps {
  sortBy: string
  onSortChange: (sortBy: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (viewMode: "grid" | "list") => void
  totalProducts: number
}

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "name-asc", label: "По названию: А-Я" },
  { value: "name-desc", label: "По названию: Я-А" },
  { value: "rating", label: "По рейтингу" },
  { value: "newest", label: "Сначала новые" },
]

export function ProductSort({ sortBy, onSortChange, viewMode, onViewModeChange, totalProducts }: ProductSortProps) {
  const currentSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || "По популярности"

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Найдено товаров: <span className="font-medium text-gray-900">{totalProducts}</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Сортировка:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                {currentSortLabel}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={sortBy === option.value ? "bg-gray-100" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="rounded-r-none"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
