import { type NextRequest, NextResponse } from "next/server"

const mockProducts = [
  {
    id: 1,
    name: "Цемент М500 50кг",
    slug: "cement-m500-50kg",
    price: 450,
    oldPrice: 520,
    images: ["/cement-bag-front.png", "/cement-bag-side.png", "/placeholder-tx7ll.png"],
    rating: 4.8,
    reviews: 124,
    category: "Строительные материалы",
    brand: "ЕвроЦемент",
    inStock: true,
    stockQuantity: 150,
    description: `Высококачественный портландцемент марки М500 в мешках по 50кг. 
      Идеально подходит для строительных и ремонтных работ любой сложности.`,
    specifications: {
      Марка: "М500",
      Вес: "50 кг",
      Тип: "Портландцемент",
      Морозостойкость: "F100",
      Водонепроницаемость: "W6",
      "Время схватывания": "45-60 мин",
      "Прочность на сжатие": "50 МПа",
      "Срок хранения": "12 месяцев",
    },
    isFeatured: true,
  },
  {
    id: 2,
    name: "Кирпич красный керамический",
    slug: "red-ceramic-brick",
    price: 12,
    images: ["/red-ceramic-brick.png", "/placeholder.svg"],
    rating: 4.6,
    reviews: 89,
    category: "Строительные материалы",
    brand: "КирпичСтрой",
    inStock: true,
    stockQuantity: 5000,
    description: `Качественный красный керамический кирпич для строительства стен и перегородок.`,
    specifications: {
      Размер: "250x120x65 мм",
      Вес: "3.5 кг",
      Марка: "М150",
      Морозостойкость: "F50",
      Водопоглощение: "8-10%",
    },
  },
  {
    id: 3,
    name: "Молоток 500г",
    slug: "500g-hammer",
    price: 850,
    images: ["/500g-hammer.png", "/placeholder.svg"],
    rating: 4.9,
    reviews: 67,
    category: "Инструменты",
    brand: "ИнструментПро",
    inStock: true,
    stockQuantity: 45,
    description: `Профессиональный молоток весом 500г с удобной рукояткой.`,
    specifications: {
      Вес: "500 г",
      Материал: "Сталь",
      Рукоятка: "Фибергласс",
      Длина: "330 мм",
    },
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Поиск товара по ID или slug
    const product = mockProducts.find((p) => p.id.toString() === productId || p.slug === productId)

    if (!product) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении товара" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productData = await request.json()
    const productId = params.id

    // В реальном приложении здесь будет обновление товара в БД
    const updatedProduct = {
      id: Number.parseInt(productId),
      ...productData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Товар успешно обновлен",
      product: updatedProduct,
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении товара" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // В реальном приложении здесь будет удаление товара из БД
    return NextResponse.json({
      message: "Товар успешно удален",
      productId: Number.parseInt(productId),
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении товара" }, { status: 500 })
  }
}
