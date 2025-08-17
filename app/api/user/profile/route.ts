import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, address } = body

    // Input validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ message: "Имя должно содержать минимум 2 символа" }, { status: 400 })
    }

    if (phone && !/^\+?[\d\s\-$$$$]{10,}$/.test(phone)) {
      return NextResponse.json({ message: "Неверный формат телефона" }, { status: 400 })
    }

    // Mock user update (in real app, update database)
    const updatedUser = {
      name: name.trim(),
      phone: phone?.trim() || "",
      address: address?.trim() || "",
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Профиль успешно обновлен",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
