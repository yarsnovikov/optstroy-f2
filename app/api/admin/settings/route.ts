import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // В реальном приложении здесь будет получение настроек из БД
    const settings = {
      siteName: "ОптСтрой",
      siteDescription: "Строительные материалы и инструменты в Ярославле",
      contactEmail: "info@optstroy.shop",
      contactPhone: "+7 (901) 040-09-77",
      address: 'г. Ярoslavль, ул. Магистральная, д. 7 ТД "Аркада"',
      workingHours: "Пн-Пт 9:00-17:00",
      deliverySettings: {
        freeDeliveryThreshold: 5000,
        deliveryPrice: 500,
        deliveryRadius: 50,
      },
      emailNotifications: true,
      smsNotifications: false,
      maintenanceMode: false,
    }

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении настроек" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json()

    // В реальном приложении здесь будет сохранение настроек в БД
    return NextResponse.json({
      message: "Настройки успешно сохранены",
      settings,
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при сохранении настроек" }, { status: 500 })
  }
}
