import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const mockUsers = [
  {
    id: 1,
    email: "admin@optstroy.shop",
    password: "$2a$12$LQv3c1yqBwEHFl5yCuHJ2uIvne8u8S1GRqn9hGEfcuHAHG.oHyS02", // admin123
    role: "admin",
    first_name: "Админ",
    last_name: "ОптСтрой",
    is_active: 1,
  },
  {
    id: 2,
    email: "user@example.com",
    password: "$2a$12$LQv3c1yqBwEHFl5yCuHJ2uIvne8u8S1GRqn9hGEfcuHAHG.oHyS02", // user123
    role: "user",
    first_name: "Тест",
    last_name: "Пользователь",
    is_active: 1,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 })
    }

    const user = mockUsers.find((u) => u.email === email && u.is_active === 1)

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 401 })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: `${user.first_name} ${user.last_name}`,
    }

    const response = NextResponse.json({
      message: "Успешный вход",
      user: userResponse,
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
