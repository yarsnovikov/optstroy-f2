"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ProductSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
}

export function ProductSearch({ onSearch, placeholder = "Поиск товаров...", initialValue = "" }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery.trim())
  }

  const handleClear = () => {
    setSearchQuery("")
    onSearch("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Автоматический поиск при вводе (с задержкой)
    if (value.length >= 3 || value.length === 0) {
      const timeoutId = setTimeout(() => {
        onSearch(value.trim())
      }, 300)

      return () => clearTimeout(timeoutId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600">
          Поиск по запросу: <span className="font-medium">"{searchQuery}"</span>
        </div>
      )}
    </div>
  )
}
