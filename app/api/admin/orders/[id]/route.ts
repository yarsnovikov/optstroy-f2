import { type NextRequest, NextResponse } from "next/server"

const orders = [
  {
    id: "ОС-123456",
    customerId: 2,
    customerName: "Иван Петров",
    customerEmail: "ivan@example.com",
    status: "pending",
    total: 15600,
    createdAt: "2024-01-15T10:30:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id
    const order = orders.find((o) => o.id === orderId)

    if (!order) {
      return NextResponse.json({ error: "Заказ не найден" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении заказа" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id
    const { status } = await request.json()

    const orderIndex = orders.findIndex((o) => o.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Заказ не найден" }, { status: 404 })
    }

    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      message: "Статус заказа успешно обновлен",
      order: orders[orderIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении заказа" }, { status: 500 })
  }
}
