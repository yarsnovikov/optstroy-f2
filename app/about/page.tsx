import type { Metadata } from "next"
import { Building2, Users, Truck, Clock, Handshake } from "lucide-react"

export const metadata: Metadata = {
  title: "О компании ОптСтрой - 20+ лет на рынке строительных материалов Ярославля",
  description:
    "ОптСтрой - ведущий поставщик строительных материалов в Ярославле. 20+ лет опыта, команда профессионалов, складские запасы, быстрое обслуживание.",
  keywords: "о компании ОптСтрой, строительные материалы Ярославль, история компании, команда профессионалов",
  openGraph: {
    title: "О компании ОптСтрой - 20+ лет на рынке Ярославля",
    description:
      "ОптСтрой - ведущий поставщик строительных материалов в Ярославле. 20+ лет опыта, команда профессионалов.",
    url: "https://optstroy.shop/about",
    images: ["/og-image.png"],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О компании ОптСтрой</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Более 20 лет успешной работы на Ярославском рынке строительных материалов
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <p className="text-lg text-gray-700 mb-6">
                Мы успешно работаем на Ярославском рынке уже более 20 лет. Основным направлением нашей деятельности
                является комплексное обеспечение клиентов строительными материалами.
              </p>
              <p className="text-lg text-gray-700">
                Это значит, что мы предлагаем большой ассортимент высококачественных товаров для использования их в
                строительных и отделочных работах любой сложности на любых объектах. В этом нам помогает сотрудничество
                с большим количеством производителей стройматериалов посредством дилерских договоров.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
                  <div className="text-gray-700">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-gray-700">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-700">видов товаров</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-gray-700">поддержка</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Наши самые сильные стороны</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Команда профессионалов</h3>
                <p className="text-gray-700">
                  Наше основное конкурентное преимущество — это команда специалистов обладающих серьезным опытом работы
                  и четким пониманием ответственности лежащей на наших плечах. Мы смотрим в будущее и потому уделяем
                  огромное внимание инвестициям в обучение своих специалистов и повышением их квалификации.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Складские запасы</h3>
                <p className="text-gray-700">
                  На наших складах, благодаря оперативной работе отдела закупок и отлаженному складскому учету всегда в
                  наличии все основные материалы, требующиеся при строительстве и ремонте. В случае если нашим клиентам
                  потребуются материалы, которых нет на складе, то мы в кратчайшие сроки доставим их заказчику за счет
                  отлаженных логистических решений.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Быстрое обслуживание</h3>
                <p className="text-gray-700">
                  Быстрое оформлении и отгрузка товара — это наш принцип работы. Все происходит оперативно, в течении
                  нескольких минут, без очередей и простоев.
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">Мы налаживаем дружеские отношения</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Персональный менеджер</h3>
                  <p className="text-green-100">
                    Персональный менеджер всегда нацелен на быстрое и гибкое решение поставленной задачи.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Самовывоз и доставка</h3>
                  <p className="text-green-100">
                    Любые строительные материалы всегда можно купить с условием самовывоза. Мы обязательно поможем вам с
                    выбором ассортимента, чтобы оптимизировать ваши затраты, а также окажем содействие в доставке
                    материалов на объект.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Если вас интересует качественный сервис и низкие цены, то выбор очевиден
            </h2>
            <p className="text-xl text-gray-700 mb-8">Мы всегда рады новым партнёрам!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalog"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Посмотреть каталог
              </a>
              <a
                href="/auth"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                Стать партнером
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
