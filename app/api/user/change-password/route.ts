import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json()

    // Валидация данных
    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Новый пароль должен содержать минимум 6 символов" }, { status: 400 })
    }

    // В реальном приложении здесь будет:
    // 1. Получение пользователя из БД по userId
    // 2. Проверка текущего пароля
    // 3. Хеширование и сохранение нового пароля

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    return NextResponse.json({
      message: "Пароль успешно изменен",
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
