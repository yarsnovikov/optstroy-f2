import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "month"

  try {
    // В реальном приложении здесь будут запросы к БД для получения аналитики
    const analytics = {
      revenue: {
        current: 1250000,
        previous: 980000,
        growth: 27.6,
        data: [
          { period: "Янв", value: 850000, orders: 45 },
          { period: "Фев", value: 920000, orders: 52 },
          { period: "Мар", value: 1100000, orders: 61 },
          { period: "Апр", value: 980000, orders: 67 },
          { period: "Май", value: 1250000, orders: 89 },
        ],
      },
      orders: {
        current: 89,
        previous: 67,
        growth: 32.8,
        averageValue: 14045,
      },
      conversion: {
        current: 3.2,
        previous: 2.8,
        growth: 14.3,
      },
      topProducts: [
        { id: 1, name: "Цемент М500 50кг", sales: 245, revenue: 110250, growth: 15.2 },
        { id: 2, name: "Кирпич керамический", sales: 1200, revenue: 15000, growth: -5.1 },
        { id: 3, name: "Дрель ударная Bosch", sales: 15, revenue: 127500, growth: 28.7 },
      ],
      topCategories: [
        { name: "Строительные материалы", sales: 65, revenue: 780000, growth: 12.3 },
        { name: "Инструменты", sales: 20, revenue: 340000, growth: 8.9 },
        { name: "Электрика", sales: 10, revenue: 85000, growth: -2.1 },
        { name: "Сантехника", sales: 5, revenue: 45000, growth: 5.4 },
      ],
      customerMetrics: {
        newCustomers: 23,
        returningCustomers: 66,
        customerLifetimeValue: 45600,
        churnRate: 12.5,
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении аналитики" }, { status: 500 })
  }
}
