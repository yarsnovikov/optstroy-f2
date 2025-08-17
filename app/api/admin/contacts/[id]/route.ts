import { type NextRequest, NextResponse } from "next/server"

// This would be imported from the main route file in a real app
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const manager = managers.find((m) => m.id === id)

    if (!manager) {
      return NextResponse.json({ error: "Manager not found" }, { status: 404 })
    }

    return NextResponse.json({ manager })
  } catch (error) {
    console.error("Error fetching manager:", error)
    return NextResponse.json({ error: "Failed to fetch manager" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const managerIndex = managers.findIndex((m) => m.id === id)
    if (managerIndex === -1) {
      return NextResponse.json({ error: "Manager not found" }, { status: 404 })
    }

    // If only updating isActive status
    if (Object.keys(body).length === 1 && "isActive" in body) {
      managers[managerIndex].isActive = body.isActive
      return NextResponse.json({
        message: "Manager status updated successfully",
        manager: managers[managerIndex],
      })
    }

    // Full update
    const { name, position, phone, whatsapp, telegram, email, specialization, avatar, isActive } = body

    // Validate required fields
    if (!name || !position || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update manager
    managers[managerIndex] = {
      ...managers[managerIndex],
      name,
      position,
      phone,
      whatsapp: whatsapp || "",
      telegram: telegram || "",
      email,
      specialization: specialization || "",
      avatar: avatar || managers[managerIndex].avatar,
      isActive: isActive !== undefined ? isActive : managers[managerIndex].isActive,
    }

    return NextResponse.json({
      message: "Manager updated successfully",
      manager: managers[managerIndex],
    })
  } catch (error) {
    console.error("Error updating manager:", error)
    return NextResponse.json({ error: "Failed to update manager" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const managerIndex = managers.findIndex((m) => m.id === id)

    if (managerIndex === -1) {
      return NextResponse.json({ error: "Manager not found" }, { status: 404 })
    }

    const deletedManager = managers.splice(managerIndex, 1)[0]

    return NextResponse.json({
      message: "Manager deleted successfully",
      manager: deletedManager,
    })
  } catch (error) {
    console.error("Error deleting manager:", error)
    return NextResponse.json({ error: "Failed to delete manager" }, { status: 500 })
  }
}
