import { type NextRequest, NextResponse } from "next/server"

const mockProducts = [
  {
    id: 1,
    name: "Кирпич керамический красный",
    description: "Высококачественный керамический кирпич для строительства",
    price: 15.5,
    category_id: 1,
    category_name: "Строительные материалы",
    category_slug: "construction-materials",
    brand: "КирпичСтрой",
    image: "/red-ceramic-brick.png",
    specifications: { size: "250x120x65мм", weight: "3.5кг" },
    in_stock: 1000,
    is_active: 1,
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Дрель электрическая 500Вт",
    description: "Профессиональная электрическая дрель",
    price: 3500,
    category_id: 2,
    category_name: "Инструменты",
    category_slug: "tools",
    brand: "ИнструментПро",
    image: "/500g-hammer.png",
    specifications: { power: "500Вт", speed: "3000об/мин" },
    in_stock: 50,
    is_active: 1,
    created_at: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    let filteredProducts = mockProducts.filter((p) => p.is_active === 1)

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category_slug === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
      )
    }

    const total = filteredProducts.length
    const startIndex = (page - 1) * limit
    const products = filteredProducts.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Products GET error:", error)
    return NextResponse.json({ error: "Ошибка при получении товаров" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, categoryId, brand, image, specifications, inStock } = await request.json()

    const newId = mockProducts.length + 1
    const newProduct = {
      id: newId,
      name,
      description,
      price,
      category_id: categoryId,
      category_name: "Новая категория",
      category_slug: "new-category",
      brand,
      image,
      specifications,
      in_stock: inStock,
      is_active: 1,
      created_at: new Date(),
    }

    mockProducts.push(newProduct)

    return NextResponse.json({
      message: "Товар успешно добавлен",
      product: newProduct,
    })
  } catch (error) {
    console.error("Products POST error:", error)
    return NextResponse.json({ error: "Ошибка при добавлении товара" }, { status: 500 })
  }
}
