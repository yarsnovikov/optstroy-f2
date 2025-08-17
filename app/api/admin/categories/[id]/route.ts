import { type NextRequest, NextResponse } from "next/server"

// Импортируем categories из основного файла (в реальном приложении это будет БД)
const categories = [
  {
    id: 1,
    name: "Строительные материалы",
    slug: "construction-materials",
    description: "Цемент, кирпич, блоки и другие строительные материалы",
    productsCount: 45,
    isActive: true,
  },
]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = Number.parseInt(params.id)
    const updateData = await request.json()

    // В реальном приложении здесь будет обновление в БД
    const categoryIndex = categories.findIndex((c) => c.id === categoryId)
    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Категория не найдена" }, { status: 404 })
    }

    categories[categoryIndex] = { ...categories[categoryIndex], ...updateData }

    return NextResponse.json({
      message: "Категория успешно обновлена",
      category: categories[categoryIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении категории" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryId = Number.parseInt(params.id)

    // В реальном приложении здесь будет удаление из БД
    const categoryIndex = categories.findIndex((c) => c.id === categoryId)
    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Категория не найдена" }, { status: 404 })
    }

    categories.splice(categoryIndex, 1)

    return NextResponse.json({
      message: "Категория успешно удалена",
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении категории" }, { status: 500 })
  }
}
