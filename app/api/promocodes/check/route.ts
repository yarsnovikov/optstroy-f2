import { type NextRequest, NextResponse } from "next/server"

// Mock промокоды для демонстрации
const mockPromocodes = [
  { code: "WELCOME10", discount: 10, minOrder: 1000, active: true },
  { code: "SAVE20", discount: 20, minOrder: 5000, active: true },
  { code: "NEWCLIENT", discount: 15, minOrder: 2000, active: true },
  { code: "СТРОЙ25", discount: 25, minOrder: 10000, active: true },
]

export async function POST(request: NextRequest) {
  try {
    const { code, orderTotal } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Промокод не указан" }, { status: 400 })
    }

    // Поиск промокода
    const promocode = mockPromocodes.find((p) => p.code === code.toUpperCase() && p.active)

    if (!promocode) {
      return NextResponse.json({ error: "Промокод не найден или неактивен" }, { status: 404 })
    }

    // Проверка минимальной суммы заказа
    if (orderTotal < promocode.minOrder) {
      return NextResponse.json(
        {
          error: `Минимальная сумма заказа для этого промокода: ${promocode.minOrder.toLocaleString()} ₽`,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      discount: promocode.discount,
      code: promocode.code,
    })
  } catch (error) {
    console.error("Error checking promocode:", error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
