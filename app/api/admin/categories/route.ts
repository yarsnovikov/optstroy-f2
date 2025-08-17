import { type NextRequest, NextResponse } from "next/server"

// Демонстрационные данные категорий
const categories = [
  {
    id: 1,
    name: "Строительные материалы",
    slug: "construction-materials",
    description: "Цемент, кирпич, блоки и другие строительные материалы",
    productsCount: 45,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Инструменты",
    slug: "tools",
    description: "Электроинструменты, ручные инструменты",
    productsCount: 28,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Электрика",
    slug: "electrical",
    description: "Кабели, розетки, выключатели, светильники",
    productsCount: 32,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      categories,
      total: categories.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении категорий" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json()

    // В реальном приложении здесь будет сохранение в БД
    const newCategory = {
      id: Date.now(),
      ...categoryData,
      productsCount: 0,
      createdAt: new Date().toISOString(),
    }

    categories.push(newCategory)

    return NextResponse.json({
      message: "Категория успешно создана",
      category: newCategory,
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при создании категории" }, { status: 500 })
  }
}
