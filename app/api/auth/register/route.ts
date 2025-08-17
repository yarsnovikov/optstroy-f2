import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const mockUsers = [
  {
    id: 1,
    email: "admin@optstroy.shop",
    password: "$2a$12$LQv3c1yqBwEHFl5yCuHJ2uIvne8u8S1GRqn9hGEfcuHAHG.oHyS02",
    role: "admin",
    first_name: "Админ",
    last_name: "ОптСтрой",
    is_active: 1,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone } = await request.json()

    // Валидация данных
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Все поля обязательны для заполнения" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль должен содержать минимум 6 символов" }, { status: 400 })
    }

    const existingUser = mockUsers.find((u) => u.email === email)

    if (existingUser) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUserId = mockUsers.length + 1

    const newUser = {
      id: newUserId,
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
      role: "user",
      is_active: 1,
    }

    mockUsers.push(newUser)

    return NextResponse.json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: newUserId,
        email,
        name: `${firstName} ${lastName}`,
        role: "user",
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
