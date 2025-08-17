import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "ID пользователя обязателен" }, { status: 400 })
    }

    // В реальном приложении здесь будет запрос к БД
    const favorites = [
      {
        id: "1",
        name: "Цемент М500 50кг",
        price: 450,
        image: "/cement-bag.png",
        category: "Строительные материалы",
        inStock: true,
      },
    ]

    return NextResponse.json({ favorites })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, productId } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json({ error: "ID пользователя и товара обязательны" }, { status: 400 })
    }

    // В реальном приложении здесь будет добавление в БД
    return NextResponse.json({ message: "Товар добавлен в избранное" })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId, productId } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json({ error: "ID пользователя и товара обязательны" }, { status: 400 })
    }

    // В реальном приложении здесь будет удаление из БД
    return NextResponse.json({ message: "Товар удален из избранного" })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
