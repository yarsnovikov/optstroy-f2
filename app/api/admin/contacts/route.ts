import { type NextRequest, NextResponse } from "next/server"

// Mock data for managers
const managers = [
  {
    id: 1,
    name: "Анна Петрова",
    position: "Старший менеджер",
    phone: "+7 (901) 234-56-78",
    whatsapp: "79012345678",
    telegram: "@anna_optstroy",
    email: "anna@optstroy.shop",
    specialization: "Строительные материалы, кирпич, блоки, цемент",
    avatar: "/professional-manager-woman.png",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Дмитрий Иванов",
    position: "Менеджер по продажам",
    phone: "+7 (901) 345-67-89",
    whatsapp: "79013456789",
    telegram: "@dmitry_optstroy",
    email: "dmitry@optstroy.shop",
    specialization: "Инструменты, электрооборудование, крепеж",
    avatar: "/professional-manager-man.png",
    isActive: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: 3,
    name: "Елена Сидорова",
    position: "Технический консультант",
    phone: "+7 (901) 456-78-90",
    whatsapp: "79014567890",
    telegram: "@elena_optstroy",
    email: "elena@optstroy.shop",
    specialization: "Сантехника, отопление, водоснабжение",
    avatar: "/professional-manager-woman-2.png",
    isActive: true,
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: 4,
    name: "Михаил Козлов",
    position: "Менеджер по работе с клиентами",
    phone: "+7 (901) 567-89-01",
    whatsapp: "79015678901",
    telegram: "@mikhail_optstroy",
    email: "mikhail@optstroy.shop",
    specialization: "Отделочные материалы, краски, обои",
    avatar: "/professional-manager-man-2.png",
    isActive: false,
    createdAt: "2024-02-10T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredManagers = [...managers]

    // Apply search filter
    if (search) {
      filteredManagers = filteredManagers.filter(
        (manager) =>
          manager.name.toLowerCase().includes(search.toLowerCase()) ||
          manager.position.toLowerCase().includes(search.toLowerCase()) ||
          manager.specialization.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply status filter
    if (status === "active") {
      filteredManagers = filteredManagers.filter((manager) => manager.isActive)
    } else if (status === "inactive") {
      filteredManagers = filteredManagers.filter((manager) => !manager.isActive)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedManagers = filteredManagers.slice(startIndex, endIndex)

    return NextResponse.json({
      managers: paginatedManagers,
      total: filteredManagers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredManagers.length / limit),
    })
  } catch (error) {
    console.error("Error fetching managers:", error)
    return NextResponse.json({ error: "Failed to fetch managers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, position, phone, whatsapp, telegram, email, specialization, avatar, isActive } = body

    // Validate required fields
    if (!name || !position || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new manager
    const newManager = {
      id: Math.max(...managers.map((m) => m.id)) + 1,
      name,
      position,
      phone,
      whatsapp: whatsapp || "",
      telegram: telegram || "",
      email,
      specialization: specialization || "",
      avatar: avatar || "/professional-manager-woman.png",
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString(),
    }

    managers.push(newManager)

    return NextResponse.json(
      {
        message: "Manager created successfully",
        manager: newManager,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating manager:", error)
    return NextResponse.json({ error: "Failed to create manager" }, { status: 500 })
  }
}
