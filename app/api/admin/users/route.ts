import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

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
    ordersCount: 0,
    totalSpent: 0,
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
    ordersCount: 5,
    totalSpent: 45600,
  },
  {
    id: 3,
    email: "maria@example.com",
    name: "Мария Сидорова",
    role: "user",
    phone: "+7 (999) 234-56-78",
    status: "active",
    created_at: "2024-01-10T00:00:00Z",
    last_login: "2024-01-18T09:20:00Z",
    ordersCount: 3,
    totalSpent: 28900,
  },
  {
    id: 4,
    email: "blocked@example.com",
    name: "Заблокированный Пользователь",
    role: "user",
    phone: "+7 (999) 345-67-89",
    status: "blocked",
    created_at: "2024-01-05T00:00:00Z",
    last_login: "2024-01-10T12:00:00Z",
    ordersCount: 1,
    totalSpent: 5600,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search")
  const role = searchParams.get("role")

  try {
    let filteredUsers = [...users]

    if (role && role !== "all") {
      filteredUsers = filteredUsers.filter((u) => u.role === role)
    }

    if (search) {
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      totalPages: Math.ceil(filteredUsers.length / limit),
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении пользователей" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, role, password } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      email,
      name,
      role: role || "user",
      phone: phone || "",
      status: "active" as const,
      created_at: new Date().toISOString(),
      last_login: null,
      ordersCount: 0,
      totalSpent: 0,
      password: hashedPassword, // In real app, this would be stored in database
    }

    users.push(newUser)

    // Return user without password
    const { password: _, ...userResponse } = newUser
    return NextResponse.json({ user: userResponse }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при создании пользователя" }, { status: 500 })
  }
}
