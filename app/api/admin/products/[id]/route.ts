import { type NextRequest, NextResponse } from "next/server"

const products = [
  {
    id: 1,
    name: "Цемент М500 50кг",
    slug: "cement-m500-50kg",
    description: "Высококачественный портландцемент марки М500 в мешках по 50 кг",
    price: 450,
    oldPrice: 500,
    sku: "CEM-M500-50",
    stockQuantity: 150,
    categoryId: 1,
    isActive: true,
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const product = products.find((p) => p.id === productId)

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
    const productId = Number.parseInt(params.id)
    const productData = await request.json()

    const productIndex = products.findIndex((p) => p.id === productId)
    if (productIndex === -1) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 })
    }

    products[productIndex] = {
      ...products[productIndex],
      ...productData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Товар успешно обновлен",
      product: products[productIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении товара" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const productIndex = products.findIndex((p) => p.id === productId)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 })
    }

    products[productIndex].isActive = false
    products[productIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({ message: "Товар успешно удален" })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении товара" }, { status: 500 })
  }
}
