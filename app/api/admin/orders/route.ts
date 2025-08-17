import { type NextRequest, NextResponse } from "next/server"

const orders = [
  {
    id: "ОС-123456",
    customerId: 2,
    customerName: "Иван Петров",
    customerEmail: "ivan@example.com",
    customerPhone: "+7 (999) 123-45-67",
    status: "pending",
    total: 15600,
    subtotal: 15100,
    deliveryCost: 500,
    items: [
      {
        id: 1,
        productId: 1,
        name: "Цемент М500 50кг",
        price: 450,
        quantity: 20,
        image: "/cement-bag-front.png",
      },
      {
        id: 2,
        productId: 3,
        name: "Кирпич керамический рядовой",
        price: 12.5,
        quantity: 500,
        image: "/red-ceramic-brick.png",
      },
    ],
    shipping: {
      address: "г. Ярославль, ул. Советская, д. 15, кв. 25",
      method: "Доставка курьером",
      cost: 500,
    },
    payment: {
      method: "Наличными при получении",
      status: "pending",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search")
  const status = searchParams.get("status")

  try {
    let filteredOrders = [...orders]

    if (search) {
      filteredOrders = filteredOrders.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customerName.toLowerCase().includes(search.toLowerCase()) ||
          o.customerEmail.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status && status !== "all") {
      filteredOrders = filteredOrders.filter((o) => o.status === status)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    return NextResponse.json({
      orders: paginatedOrders,
      total: filteredOrders.length,
      page,
      totalPages: Math.ceil(filteredOrders.length / limit),
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении заказов" }, { status: 500 })
  }
}
