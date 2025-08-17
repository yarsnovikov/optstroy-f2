import { type NextRequest, NextResponse } from "next/server"

const users = [
  {
    id: 1,
    email: "admin@optstroy.shop",
    name: "Администратор ОптСтрой",
    role: "admin",
    phone: "+7 (901) 040-09-77",
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    last_login: "2024-01-20T10:30:00Z",
  },
  {
    id: 2,
    email: "user@example.com",
    name: "Иван Петров",
    role: "user",
    phone: "+7 (999) 123-45-67",
    status: "active",
    created_at: "2024-01-15T00:00:00Z",
    last_login: "2024-01-19T15:45:00Z",
  },
]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = Number.parseInt(params.id)
    const body = await request.json()

    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...body }

    return NextResponse.json({ user: users[userIndex] })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении пользователя" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = Number.parseInt(params.id)

    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }

    // Don't allow deleting admin users
    if (users[userIndex].role === "admin") {
      return NextResponse.json({ error: "Нельзя удалить администратора" }, { status: 403 })
    }

    users.splice(userIndex, 1)

    return NextResponse.json({ message: "Пользователь удален" })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении пользователя" }, { status: 500 })
  }
}
