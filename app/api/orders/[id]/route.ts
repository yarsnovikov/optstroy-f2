import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    // Демонстрационные данные заказа
    const order = {
      id: Number.parseInt(orderId),
      userId: 1,
      customerName: "Иван Петров",
      customerEmail: "ivan@example.com",
      customerPhone: "+7 (901) 234-56-78",
      total: 15750,
      status: "processing",
      createdAt: "2024-01-15T10:30:00Z",
      deliveryAddress: "г. Ярославль, ул. Советская, д. 25, кв. 10",
      paymentMethod: "card",
      items: [
        {
          id: 1,
          name: "Кирпич керамический красный",
          quantity: 500,
          price: 15.5,
          image: "/red-ceramic-brick.png",
        },
        {
          id: 2,
          name: "Цемент М400 50кг",
          quantity: 20,
          price: 350,
          image: "/cement-bag.png",
        },
      ],
    }

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении заказа" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const orderId = params.id

    // В реальном приложении здесь будет обновление статуса заказа в БД
    return NextResponse.json({
      message: "Статус заказа успешно обновлен",
      orderId: Number.parseInt(orderId),
      status,
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении статуса заказа" }, { status: 500 })
  }
}
