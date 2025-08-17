import type { Metadata } from "next"
import { Truck, CreditCard, Clock, Shield, CheckCircle, MapPin, AlertTriangle, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Доставка и оплата - ОптСтрой",
  description:
    "Условия доставки строительных материалов и способы оплаты в ОптСтрой. Быстрая доставка по Ярославлю и области.",
}

export default function DeliveryPaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Доставка и оплата</h1>
          <p className="text-gray-600">
            Удобные способы доставки и оплаты для вашего комфорта. Работаем быстро и надежно уже более 20 лет.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Важные условия доставки</h3>
              <p className="text-amber-700 text-sm">
                Точную стоимость доставки вы узнаете после оформления заказа. Просим обеспечить подъезд транспорта к
                месту выгрузки. При отсутствии возможности разгрузки (грязь, снег, глина, узкий въезд) водитель имеет
                право отказать в выгрузке.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Доставка</h2>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Газель 1,5т (объем до 7м³)</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>По городу Ярославль:</span>
                    <span className="font-semibold text-gray-900">1 200 - 1 800 ₽</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    • Минимальное время доставки: 2 часа
                    <br />• Каждый дополнительный час: 600 ₽<br />• Дополнительное место разгрузки: 600 ₽
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Газель 1,5т (объем до 14м³)</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>По городу Ярославль:</span>
                    <span className="font-semibold text-gray-900">1 600 - 2 400 ₽</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    • Минимальное время доставки: 2 часа
                    <br />• Каждый дополнительный час: 800 ₽<br />• Дополнительное место разгрузки: 800 ₽
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Доставка за город</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>До 30 км от склада:</span>
                    <span className="font-semibold text-gray-900">1 800 ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Свыше 30 км:</span>
                    <span className="font-semibold text-gray-900">68 ₽/км</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Услуги манипулятора</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Манипулятор 10 тонн:</span>
                    <span className="font-semibold text-gray-900">7 200 ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Манипулятор 12 тонн:</span>
                    <span className="font-semibold text-gray-900">8 400 ₽</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Доставка в отдельные районы и за город рассчитывается индивидуально
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Услуги грузчиков</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Минимальный тариф (2 часа):</span>
                    <span className="font-semibold text-gray-900">1 800 ₽</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Стоимость разгрузки и подъёма материалов рассчитывается индивидуально
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Самовывоз</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Бесплатно с нашего склада</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>г. Ярославль, ул. Промышленная, 25</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Пн-Пт: 8:00-18:00, Сб-Вс: 9:00-16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section - keeping existing content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Оплата</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Для физических лиц</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Наличными при получении</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Банковской картой при получении</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Онлайн-оплата на сайте</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Банковский перевод</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Для юридических лиц</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Безналичный расчет по счету</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Отсрочка платежа для постоянных клиентов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Работа с НДС</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Полный пакет документов</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Гарантия безопасности</h4>
                <p className="text-green-700 text-sm">
                  Все платежи защищены современными системами шифрования. Мы не храним данные ваших банковских карт.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Дополнительная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Условия доставки</h3>
              <p className="text-sm">
                Менеджер свяжется с вами для уточнения деталей доставки и точного расчета стоимости после оформления
                заказа.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Требования к месту разгрузки</h3>
              <p className="text-sm">
                Необходимо обеспечить свободный подъезд транспорта. При невозможности разгрузки водитель может отказать
                в услуге.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Время доставки</h3>
              <p className="text-sm">
                Минимальное время доставки составляет 2 часа. За каждый дополнительный час взимается доплата.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
