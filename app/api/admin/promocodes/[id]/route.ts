import { type NextRequest, NextResponse } from "next/server"

// Используем тот же массив промокодов
const promocodes = [
  {
    id: 1,
    code: "WELCOME20",
    description: "Скидка 20% для новых клиентов",
    type: "percentage" as const,
    value: 20,
    minOrderAmount: 5000,
    maxDiscount: 3000,
    usageLimit: 100,
    usedCount: 23,
    isActive: true,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    code: "SUMMER500",
    description: "Летняя скидка 500 рублей",
    type: "fixed" as const,
    value: 500,
    minOrderAmount: 3000,
    usageLimit: 50,
    usedCount: 12,
    isActive: true,
    validFrom: "2024-06-01T00:00:00Z",
    validTo: "2024-08-31T23:59:59Z",
    createdAt: "2024-05-15T00:00:00Z",
  },
  {
    id: 3,
    code: "BIGORDER15",
    description: "15% скидка на крупные заказы",
    type: "percentage" as const,
    value: 15,
    minOrderAmount: 20000,
    maxDiscount: 5000,
    usageLimit: 30,
    usedCount: 8,
    isActive: true,
    validFrom: "2024-01-01T00:00:00Z",
    validTo: "2024-12-31T23:59:59Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    code: "OLDCLIENT10",
    description: "10% для постоянных клиентов",
    type: "percentage" as const,
    value: 10,
    minOrderAmount: 1000,
    maxDiscount: 2000,
    usageLimit: 200,
    usedCount: 156,
    isActive: false,
    validFrom: "2023-01-01T00:00:00Z",
    validTo: "2023-12-31T23:59:59Z",
    createdAt: "2023-01-01T00:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const promocode = promocodes.find((p) => p.id === id)

    if (!promocode) {
      return NextResponse.json({ error: "Промокод не найден" }, { status: 404 })
    }

    return NextResponse.json(promocode)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении промокода" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const promocodeIndex = promocodes.findIndex((p) => p.id === id)

    if (promocodeIndex === -1) {
      return NextResponse.json({ error: "Промокод не найден" }, { status: 404 })
    }

    // Если передан только isActive, обновляем только статус
    if (Object.keys(body).length === 1 && "isActive" in body) {
      promocodes[promocodeIndex].isActive = body.isActive
    } else {
      // Полное обновление промокода
      promocodes[promocodeIndex] = {
        ...promocodes[promocodeIndex],
        code: body.code,
        description: body.description,
        type: body.type,
        value: body.value,
        minOrderAmount: body.minOrderAmount,
        maxDiscount: body.maxDiscount,
        usageLimit: body.usageLimit,
        isActive: body.isActive,
        validFrom: new Date(body.validFrom).toISOString(),
        validTo: new Date(body.validTo).toISOString(),
      }
    }

    return NextResponse.json(promocodes[promocodeIndex])
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении промокода" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const promocodeIndex = promocodes.findIndex((p) => p.id === id)

    if (promocodeIndex === -1) {
      return NextResponse.json({ error: "Промокод не найден" }, { status: 404 })
    }

    promocodes.splice(promocodeIndex, 1)

    return NextResponse.json({ message: "Промокод удален" })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении промокода" }, { status: 500 })
  }
}
