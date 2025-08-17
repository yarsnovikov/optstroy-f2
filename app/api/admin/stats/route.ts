import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // В реальном приложении здесь будут запросы к БД для получения статистики
    const stats = {
      totalOrders: 1247,
      totalRevenue: 2850000,
      totalProducts: 1856,
      totalUsers: 342,
      recentOrders: [
        {
          id: 1001,
          customerName: "Иван Петров",
          total: 15750,
          status: "processing",
          createdAt: "2024-01-20T14:30:00Z",
        },
        {
          id: 1002,
          customerName: "Мария Сидорова",
          total: 8900,
          status: "completed",
          createdAt: "2024-01-20T12:15:00Z",
        },
        {
          id: 1003,
          customerName: "Алексей Иванов",
          total: 23400,
          status: "pending",
          createdAt: "2024-01-20T10:45:00Z",
        },
      ],
      monthlyRevenue: [
        { month: "Янв", revenue: 245000 },
        { month: "Фев", revenue: 289000 },
        { month: "Мар", revenue: 312000 },
        { month: "Апр", revenue: 298000 },
        { month: "Май", revenue: 356000 },
        { month: "Июн", revenue: 378000 },
      ],
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении статистики" }, { status: 500 })
  }
}
