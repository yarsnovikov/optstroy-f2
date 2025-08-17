import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { ProductGrid } from "@/components/catalog/product-grid"
import { ProductFilters } from "@/components/catalog/product-filters"
import { ProductSort } from "@/components/catalog/product-sort"
import { ProductSearch } from "@/components/catalog/product-search"

export const metadata: Metadata = {
  title: "Строительные материалы в Ярославле - ОптСтрой | Кирпич, цемент, арматура",
  description:
    "Купить строительные материалы в Ярославле: кирпич, цемент, бетон, арматура, блоки, песок, щебень. Низкие цены, быстрая доставка. ОптСтрой - 20+ лет на рынке.",
  keywords: "строительные материалы Ярославль, кирпич, цемент, арматура, блоки, песок, щебень, ОптСтрой",
  openGraph: {
    title: "Строительные материалы в Ярославле - ОптСтрой",
    description: "Широкий ассортимент качественных строительных материалов с доставкой по Ярославлю",
    type: "website",
  },
}

const constructionMaterials = [
  {
    id: 1,
    name: "Кирпич керамический красный",
    price: 15,
    oldPrice: 18,
    image: "/red-ceramic-brick.png",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    category: "Кирпич",
    brand: "КирпичСтрой",
    slug: "red-ceramic-brick",
    description: "Полнотелый керамический кирпич М150. Морозостойкость F50.",
  },
  {
    id: 2,
    name: "Цемент М500 50кг",
    price: 320,
    image: "/cement-bag.png",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    category: "Цемент",
    brand: "ЦементПром",
    slug: "cement-m500-50kg",
    description: "Портландцемент М500 Д0. Высокое качество, быстрое схватывание.",
  },
  {
    id: 3,
    name: "Арматура А500С 12мм",
    price: 45,
    image: "/steel-rebar-pile.png",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    category: "Арматура",
    brand: "МеталлСтрой",
    slug: "rebar-a500s-12mm",
    description: "Стальная арматура периодического профиля. Длина 11,7м.",
  },
  {
    id: 4,
    name: "Пеноблок D600 200x300x600",
    price: 85,
    image: "/foam-concrete-block.png",
    rating: 4.6,
    reviews: 45,
    inStock: true,
    category: "Блоки",
    brand: "ПеноСтрой",
    slug: "foam-block-d600",
    description: "Автоклавный газобетонный блок. Теплоизоляционно-конструкционный.",
  },
  {
    id: 5,
    name: "Песок строительный 1м³",
    price: 1200,
    image: "/construction-sand.png",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    category: "Сыпучие материалы",
    brand: "ПескКарьер",
    slug: "construction-sand-1m3",
    description: "Мытый речной песок. Модуль крупности 2,0-2,5мм.",
  },
  {
    id: 6,
    name: "Щебень гранитный 5-20мм",
    price: 1500,
    image: "/granite-gravel.png",
    rating: 4.8,
    reviews: 92,
    inStock: false,
    category: "Сыпучие материалы",
    brand: "ГранитКарьер",
    slug: "granite-gravel-5-20mm",
    description: "Гранитный щебень фракции 5-20мм. Марка прочности М1200.",
  },
  {
    id: 7,
    name: "Кирпич силикатный белый",
    price: 12,
    oldPrice: 14,
    image: "/white-silicate-brick.png",
    rating: 4.4,
    reviews: 56,
    inStock: true,
    category: "Кирпич",
    brand: "СиликатСтрой",
    slug: "white-silicate-brick",
    description: "Силикатный кирпич одинарный М150. Точные геометрические размеры.",
  },
  {
    id: 8,
    name: "Цемент М400 50кг",
    price: 280,
    image: "/placeholder-6dx8p.png",
    rating: 4.6,
    reviews: 73,
    inStock: true,
    category: "Цемент",
    brand: "ЦементПром",
    slug: "cement-m400-50kg",
    description: "Портландцемент М400 Д20. Универсальный цемент для строительства.",
  },
  {
    id: 9,
    name: "Арматура А500С 10мм",
    price: 38,
    image: "/steel-rebar-10mm.png",
    rating: 4.7,
    reviews: 84,
    inStock: true,
    category: "Арматура",
    brand: "МеталлСтрой",
    slug: "rebar-a500s-10mm",
    description: "Стальная арматура диаметром 10мм. Класс А500С.",
  },
  {
    id: 10,
    name: "Керамзитоблок 390x190x188",
    price: 65,
    image: "/keramzit-block.png",
    rating: 4.5,
    reviews: 39,
    inStock: true,
    category: "Блоки",
    brand: "КерамзитСтрой",
    slug: "keramzit-block-390",
    description: "Керамзитобетонный блок стеновой. Плотность D1000.",
  },
  {
    id: 11,
    name: "Гравий 5-20мм 1м³",
    price: 1300,
    image: "/gravel-construction.png",
    rating: 4.6,
    reviews: 62,
    inStock: true,
    category: "Сыпучие материалы",
    brand: "ГравийКарьер",
    slug: "gravel-5-20mm-1m3",
    description: "Гравий речной фракции 5-20мм. Для бетонных работ.",
  },
  {
    id: 12,
    name: "Кирпич облицовочный желтый",
    price: 22,
    image: "/placeholder-cfeae.png",
    rating: 4.9,
    reviews: 41,
    inStock: true,
    category: "Кирпич",
    brand: "ОблицовкаПро",
    slug: "yellow-facing-brick",
    description: "Керамический облицовочный кирпич. Морозостойкость F75.",
  },
  {
    id: 13,
    name: "Бетон М300 В22.5",
    price: 3200,
    image: "/concrete-mixer-truck.png",
    rating: 4.8,
    reviews: 95,
    inStock: true,
    category: "Бетон",
    brand: "БетонМикс",
    slug: "concrete-m300-b225",
    description: "Товарный бетон М300. Подвижность П3. Доставка миксером.",
  },
  {
    id: 14,
    name: "Арматура А500С 14мм",
    price: 52,
    image: "/steel-rebar-14mm.png",
    rating: 4.7,
    reviews: 58,
    inStock: true,
    category: "Арматура",
    brand: "МеталлСтрой",
    slug: "rebar-a500s-14mm",
    description: "Стальная арматура диаметром 14мм. Длина 11,7м.",
  },
  {
    id: 15,
    name: "Шлакоблок 390x190x188",
    price: 45,
    image: "/slag-concrete-block.png",
    rating: 4.3,
    reviews: 33,
    inStock: true,
    category: "Блоки",
    brand: "ШлакоСтрой",
    slug: "slag-block-390",
    description: "Шлакобетонный блок стеновой. Пустотность 40%.",
  },
  {
    id: 16,
    name: "Песок карьерный 1м³",
    price: 900,
    image: "/quarry-sand-pile.png",
    rating: 4.2,
    reviews: 67,
    inStock: true,
    category: "Сыпучие материалы",
    brand: "ПескКарьер",
    slug: "quarry-sand-1m3",
    description: "Карьерный песок немытый. Для подсыпки и растворов.",
  },
  {
    id: 17,
    name: "Цемент М500 Д20 50кг",
    price: 340,
    image: "/cement-bag-d20.png",
    rating: 4.7,
    reviews: 76,
    inStock: true,
    category: "Цемент",
    brand: "ЦементТех",
    slug: "cement-m500-d20-50kg",
    description: "Портландцемент М500 с минеральными добавками 20%.",
  },
  {
    id: 18,
    name: "Кирпич огнеупорный ША-8",
    price: 35,
    image: "/refractory-brick.png",
    rating: 4.8,
    reviews: 29,
    inStock: true,
    category: "Кирпич",
    brand: "ОгнеупорСтрой",
    slug: "refractory-brick-sha8",
    description: "Шамотный огнеупорный кирпич. Температура применения до 1300°C.",
  },
  {
    id: 19,
    name: "Арматура А240 8мм",
    price: 28,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    reviews: 42,
    inStock: true,
    category: "Арматура",
    brand: "АрматураПлюс",
    slug: "rebar-a240-8mm",
    description: "Гладкая арматура класса А240. Диаметр 8мм.",
  },
  {
    id: 20,
    name: "Газоблок D400 625x250x100",
    price: 95,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 87,
    inStock: true,
    category: "Блоки",
    brand: "ГазоблокПро",
    slug: "gas-block-d400",
    description: "Автоклавный газобетон D400. Теплоизоляционный блок.",
  },
  {
    id: 21,
    name: "Щебень известняковый 20-40мм",
    price: 1100,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 54,
    inStock: true,
    category: "Сыпучие материалы",
    brand: "ИзвестнякКарьер",
    slug: "limestone-gravel-20-40mm",
    description: "Известняковый щебень фракции 20-40мм. Марка М600.",
  },
  {
    id: 22,
    name: "Бетон М200 В15",
    price: 2800,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 71,
    inStock: true,
    category: "Бетон",
    brand: "БетонМикс",
    slug: "concrete-m200-b15",
    description: "Товарный бетон М200 для фундаментов. Подвижность П2.",
  },
  {
    id: 23,
    name: "Кирпич клинкерный коричневый",
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 38,
    inStock: false,
    category: "Кирпич",
    brand: "КлинкерПремиум",
    slug: "brown-clinker-brick",
    description: "Клинкерный облицовочный кирпич. Водопоглощение менее 6%.",
  },
  {
    id: 24,
    name: "Керамзит фракция 10-20мм",
    price: 1800,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 46,
    inStock: true,
    category: "Сыпучие материалы",
    brand: "КерамзитПро",
    slug: "keramzit-10-20mm",
    description: "Керамзитовый гравий для утепления и легких бетонов.",
  },
]

export default function ConstructionMaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600 flex items-center">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalog" className="hover:text-green-600">
            Каталог
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Строительные материалы</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Строительные материалы</h1>
          <p className="text-gray-600 text-lg">
            Качественные строительные материалы для любых строительных проектов. Кирпич, цемент, арматура, блоки и
            сыпучие материалы от проверенных производителей с доставкой по Ярославлю.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center">✓ Сертифицированная продукция</span>
            <span className="flex items-center">✓ Складские запасы</span>
            <span className="flex items-center">✓ Быстрая доставка</span>
            <span className="flex items-center">✓ Оптовые цены</span>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <ProductSearch />
          </div>
          <ProductSort />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">Найдено {constructionMaterials.length} товаров</p>
              <p className="text-sm text-green-600">
                {constructionMaterials.filter((p) => p.inStock).length} в наличии
              </p>
            </div>
            <ProductGrid products={constructionMaterials} />
          </div>
        </div>
      </div>
    </div>
  )
}
