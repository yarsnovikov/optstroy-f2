import { type NextRequest, NextResponse } from "next/server"

const mockOrders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { userId, items, total, shippingAddress, paymentMethod, deliveryMethod } = await request.json()

    const orderId = mockOrders.length + 1
    const newOrder = {
      id: orderId,
      user_id: userId,
      total_amount: total,
      status: "pending",
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      delivery_method: deliveryMethod,
      items,
      created_at: new Date(),
    }

    mockOrders.push(newOrder)

    return NextResponse.json({
      message: "Заказ успешно оформлен",
      orderId,
    })
  } catch (error) {
    console.error("Orders POST error:", error)
    return NextResponse.json({ error: "Ошибка при оформлении заказа" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredOrders = mockOrders

    if (userId) {
      filteredOrders = mockOrders.filter((o) => o.user_id === Number.parseInt(userId))
    }

    const startIndex = (page - 1) * limit
    const orders = filteredOrders.slice(startIndex, startIndex + limit)

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Orders GET error:", error)
    return NextResponse.json({ error: "Ошибка при получении заказов" }, { status: 500 })
  }
}
