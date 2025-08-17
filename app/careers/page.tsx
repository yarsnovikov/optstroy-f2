import type { Metadata } from "next"
import { Users, MapPin, Clock, Star, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Вакансии - ОптСтрой",
  description:
    "Работа в ОптСтрой - присоединяйтесь к команде профессионалов строительной отрасли. Открытые вакансии и карьерные возможности.",
}

const vacancies = [
  {
    id: 1,
    title: "Менеджер по продажам",
    department: "Отдел продаж",
    location: "Ярославль",
    type: "Полная занятость",
    salary: "от 45 000 ₽",
    description: "Ищем активного менеджера для работы с клиентами. Опыт работы в строительной сфере приветствуется.",
    requirements: ["Опыт продаж от 1 года", "Знание строительных материалов", "Коммуникабельность", "Ответственность"],
  },
  {
    id: 2,
    title: "Кладовщик",
    department: "Склад",
    location: "Ярославль",
    type: "Полная занятость",
    salary: "от 35 000 ₽",
    description: "Требуется кладовщик на склад строительных материалов. Работа с документооборотом и учетом товара.",
    requirements: ["Опыт работы кладовщиком", "Знание 1С", "Внимательность", "Физическая выносливость"],
  },
  {
    id: 3,
    title: "Водитель-экспедитор",
    department: "Логистика",
    location: "Ярославль",
    type: "Полная занятость",
    salary: "от 40 000 ₽",
    description: "Ищем водителя для доставки строительных материалов. Категория В, опыт вождения от 3 лет обязательно.",
    requirements: ["Права категории В", "Опыт вождения от 3 лет", "Знание города", "Ответственность"],
  },
  {
    id: 4,
    title: "Специалист по закупкам",
    department: "Закупки",
    location: "Ярославль",
    type: "Полная занятость",
    salary: "от 50 000 ₽",
    description:
      "Требуется специалист для работы с поставщиками строительных материалов. Ведение переговоров, заключение договоров.",
    requirements: [
      "Высшее образование",
      "Опыт в закупках от 2 лет",
      "Знание рынка стройматериалов",
      "Навыки переговоров",
    ],
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Работа в ОптСтрой</h1>
          <p className="text-gray-600">
            Присоединяйтесь к команде профессионалов! Мы предлагаем стабильную работу, достойную зарплату и возможности
            для карьерного роста.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Benefits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Почему выбирают нас</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">20+</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Лет на рынке</h3>
                      <p className="text-sm text-gray-600">Стабильная компания с богатой историей</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Дружный коллектив</h3>
                      <p className="text-sm text-gray-600">Команда профессионалов и единомышленников</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Карьерный рост</h3>
                      <p className="text-sm text-gray-600">Возможности для профессионального развития</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">₽</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Достойная зарплата</h3>
                      <p className="text-sm text-gray-600">Конкурентная оплата труда и премии</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Гибкий график</h3>
                      <p className="text-sm text-gray-600">Возможность обсуждения рабочего времени</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Удобное расположение</h3>
                      <p className="text-sm text-gray-600">Офис в центре Ярославля</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Open Vacancies */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Открытые вакансии</h2>
              <div className="space-y-6">
                {vacancies.map((vacancy) => (
                  <div key={vacancy.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{vacancy.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">{vacancy.department}</span>
                          <span className="bg-blue-100 px-2 py-1 rounded text-blue-700">{vacancy.location}</span>
                          <span className="bg-green-100 px-2 py-1 rounded text-green-700">{vacancy.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{vacancy.salary}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{vacancy.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Требования:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vacancy.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button className="bg-primary hover:bg-primary/90">Откликнуться на вакансию</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Отправить резюме</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                <Input placeholder="Ваше имя" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                <Input placeholder="+7 (___) ___-__-__" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Желаемая должность</label>
                <Input placeholder="Например: Менеджер по продажам" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Сопроводительное письмо</label>
                <Textarea placeholder="Расскажите о себе и своем опыте..." rows={4} />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Отправить резюме</Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Контакты HR-отдела</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+7 (4852) 123-45-67 доб. 105</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hr@optstroy.shop</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Пн-Пт: 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
