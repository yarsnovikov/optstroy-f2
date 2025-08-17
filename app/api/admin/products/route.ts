import { type NextRequest, NextResponse } from "next/server"

const products = [
  {
    id: 1,
    name: "Цемент М500 50кг",
    slug: "cement-m500-50kg",
    description: "Высококачественный портландцемент марки М500 в мешках по 50 кг",
    shortDescription: "Портландцемент М500 для строительных работ",
    price: 450,
    oldPrice: 500,
    sku: "CEM-M500-50",
    stockQuantity: 150,
    categoryId: 1,
    category: "Строительные материалы",
    brand: "СтройЦемент",
    weight: 50,
    dimensions: "60x40x10",
    specifications: {
      Марка: "М500",
      Вес: "50 кг",
      Тип: "Портландцемент",
      Применение: "Универсальное",
    },
    images: ["/cement-bag-front.png"],
    isFeatured: true,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    name: "Дрель ударная Bosch GSB 13 RE",
    slug: "drill-bosch-gsb-13-re",
    description: "Профессиональная ударная дрель с патроном 13 мм",
    shortDescription: "Ударная дрель Bosch 600Вт",
    price: 8500,
    oldPrice: 9200,
    sku: "BOSCH-GSB-13",
    stockQuantity: 25,
    categoryId: 2,
    category: "Инструменты",
    brand: "Bosch",
    weight: 1.8,
    dimensions: "25x8x20",
    specifications: {
      Мощность: "600 Вт",
      Патрон: "13 мм",
      Обороты: "0-2800 об/мин",
      Ударов: "0-44800 уд/мин",
    },
    images: ["/placeholder-p46z1.png"],
    isFeatured: true,
    isActive: true,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search")
  const category = searchParams.get("category")
  const status = searchParams.get("status")

  try {
    let filteredProducts = [...products]

    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.categoryId === Number.parseInt(category))
    }

    if (status && status !== "all") {
      filteredProducts = filteredProducts.filter((p) => (status === "active" ? p.isActive : !p.isActive))
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении товаров" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    if (!productData.name || !productData.price || !productData.categoryId) {
      return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 })
    }

    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      slug: productData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json(
      {
        message: "Товар успешно создан",
        product: newProduct,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при создании товара" }, { status: 500 })
  }
}
