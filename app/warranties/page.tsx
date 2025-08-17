import type { Metadata } from "next"
import { Shield, CheckCircle, Clock, FileText, Phone, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Гарантии - ОптСтрой",
  description:
    "Гарантийные обязательства ОптСтрой на строительные материалы и товары. Качество, подтвержденное 20-летним опытом.",
}

export default function WarrantiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Гарантии качества</h1>
          <p className="text-gray-600">
            Мы гарантируем качество всех товаров и несем полную ответственность за их соответствие заявленным
            характеристикам.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Guarantee */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Наши гарантии</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Гарантия качества товара</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      Все товары соответствуют ГОСТ и техническим условиям производителя. Мы работаем только с
                      проверенными поставщиками.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      Каждая партия товара проходит входной контроль качества на нашем складе перед отгрузкой
                      покупателю.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Предоставляем сертификаты качества и паспорта на все строительные материалы.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Гарантийные сроки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Строительные материалы</h4>
                    <p className="text-sm text-gray-600">
                      Гарантия от 6 месяцев до 2 лет в зависимости от типа материала
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Инструменты</h4>
                    <p className="text-sm text-gray-600">Гарантия от 1 года до 3 лет согласно гарантии производителя</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Электротовары</h4>
                    <p className="text-sm text-gray-600">Гарантия от 1 года до 5 лет в зависимости от производителя</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Сантехника</h4>
                    <p className="text-sm text-gray-600">Гарантия от 2 до 10 лет согласно гарантии производителя</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Гарантийный отдел</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Контакты</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Телефон: +7 (4852) 123-45-67</p>
                  <p>Email: warranty@optstroy.shop</p>
                  <p>Время работы: Пн-Пт 9:00-18:00</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Адрес</h3>
                <p className="text-sm text-gray-600">
                  г. Ярославль, ул. Промышленная, 25
                  <br />
                  Офис гарантийного отдела
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Policy */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Условия возврата и обмена</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Возврат товара надлежащего качества</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Возврат в течение 14 дней с момента покупки</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Товар должен быть в оригинальной упаковке</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Сохранение товарного вида и потребительских свойств</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Наличие документов, подтверждающих покупку</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Возврат товара ненадлежащего качества</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Возврат в течение гарантийного срока</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Бесплатная экспертиза товара</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Возмещение расходов на доставку</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Обмен на аналогичный товар или возврат денег</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Важная информация</h3>
              <div className="text-amber-700 space-y-2">
                <p>
                  Некоторые категории товаров (сыпучие материалы, товары, изготовленные по индивидуальным размерам)
                  возврату не подлежат согласно действующему законодательству.
                </p>
                <p>Перед покупкой обязательно уточняйте у менеджера возможность возврата конкретного товара.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
