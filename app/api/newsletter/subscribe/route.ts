import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would save this to a database
// For now, we'll simulate the subscription process
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email адрес обязателен" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Некорректный email адрес" }, { status: 400 })
    }

    // Simulate checking if email already exists
    // In a real app, you would check your database here
    const existingEmails = ["test@example.com", "admin@optstroy.shop"]
    if (existingEmails.includes(email.toLowerCase())) {
      return NextResponse.json({ error: "Этот email уже подписан на рассылку" }, { status: 409 })
    }

    // Simulate saving to database
    // In a real application, you would:
    // 1. Save email to database
    // 2. Send confirmation email
    // 3. Add to mailing list service (like Mailchimp, SendGrid, etc.)

    console.log(`New newsletter subscription: ${email}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        message: "Подписка успешно оформлена",
        email: email,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
