"use client"

import { Phone, Mail, MapPin, Clock, Car, Bus, Send, MessageCircle, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ContactsClientPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Контакты</h1>
          <p className="text-gray-600">
            Свяжитесь с нами удобным способом. Наши специалисты готовы ответить на все ваши вопросы и помочь с выбором
            строительных материалов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Office */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Главный офис и склад</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Адрес</h3>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <div>
                        <p>г. Ярославль</p>
                        <p>ул. Магистральная, д. 7</p>
                        <p>ТД "Аркада"</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Телефон</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>+7 (901) 040-09-77</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>info@optstroy.shop</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Часы работы</h3>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Пн-Пт: 9:00 - 17:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Сб, Вс: выходной</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Managers */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Наши менеджеры</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Manager 1 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/professional-manager-woman.png" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">АС</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">Анна Сергеевна</h3>
                      <p className="text-sm text-gray-600 mb-2">Старший менеджер по продажам</p>
                      <p className="text-xs text-gray-500 mb-3">Специализация: Строительные материалы, кирпич, блоки</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href="tel:+79010400977" className="text-gray-700 hover:text-primary">
                            +7 (901) 040-09-77
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() =>
                              window.open(
                                "https://wa.me/79010400977?text=Здравствуйте! Обращаюсь по вопросу строительных материалов",
                                "_blank",
                              )
                            }
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                            onClick={() => window.open("https://t.me/optstroy_anna", "_blank")}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Telegram
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manager 2 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/professional-manager-man.png" />
                      <AvatarFallback className="bg-green-100 text-green-600 text-lg font-semibold">ДА</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">Дмитрий Александрович</h3>
                      <p className="text-sm text-gray-600 mb-2">Менеджер по инструментам</p>
                      <p className="text-xs text-gray-500 mb-3">Специализация: Электроинструмент, ручной инструмент</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href="tel:+79051234567" className="text-gray-700 hover:text-primary">
                            +7 (905) 123-45-67
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() =>
                              window.open(
                                "https://wa.me/79051234567?text=Здравствуйте! Интересует инструмент",
                                "_blank",
                              )
                            }
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                            onClick={() => window.open("https://t.me/optstroy_dmitry", "_blank")}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Telegram
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manager 3 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/professional-manager-woman-2.png" />
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-lg font-semibold">
                        ЕВ
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">Елена Викторовна</h3>
                      <p className="text-sm text-gray-600 mb-2">Менеджер по сантехнике</p>
                      <p className="text-xs text-gray-500 mb-3">Специализация: Сантехника, трубы, фитинги</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href="tel:+79061234568" className="text-gray-700 hover:text-primary">
                            +7 (906) 123-45-68
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() =>
                              window.open(
                                "https://wa.me/79061234568?text=Здравствуйте! Нужна консультация по сантехнике",
                                "_blank",
                              )
                            }
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                            onClick={() => window.open("https://t.me/optstroy_elena", "_blank")}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Telegram
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manager 4 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/professional-manager-man-2.png" />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-semibold">
                        МИ
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">Михаил Иванович</h3>
                      <p className="text-sm text-gray-600 mb-2">Менеджер по электрике</p>
                      <p className="text-xs text-gray-500 mb-3">Специализация: Электрика, кабели, автоматика</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href="tel:+79071234569" className="text-gray-700 hover:text-primary">
                            +7 (907) 123-45-69
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() =>
                              window.open(
                                "https://wa.me/79071234569?text=Здравствуйте! Вопрос по электротоварам",
                                "_blank",
                              )
                            }
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                            onClick={() => window.open("https://t.me/optstroy_mikhail", "_blank")}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Telegram
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Время работы менеджеров:</strong> Пн-Пт 9:00-17:00. В WhatsApp и Telegram отвечаем быстрее!
                </p>
              </div>
            </div>

            {/* How to Get There */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Как добраться</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">На автомобиле</h3>
                  </div>
                  <div className="text-gray-600 space-y-2">
                    <p>• От центра города по ул. Свободы до ул. Магистральной</p>
                    <p>• Поворот на ул. Магистральную</p>
                    <p>• ТД "Аркада" находится в доме 7</p>
                    <p>• Парковка на территории торгового дома</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Bus className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Общественным транспортом</h3>
                  </div>
                  <div className="text-gray-600 space-y-2">
                    <p>• Автобус до остановки "ТД Аркада"</p>
                    <p>• Маршрутки, проходящие по ул. Магистральной</p>
                    <p>• Пешком от остановки 1-2 минуты</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Расположение на карте</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Интерактивная карта</p>
                  <p className="text-sm">г. Ярославль, ул. Магистральная, д. 7, ТД "Аркада"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form and Additional Info */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Обратная связь</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тема обращения</label>
                  <Input placeholder="Например: Вопрос по товару" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение *</label>
                  <Textarea placeholder="Опишите ваш вопрос или пожелание..." rows={4} />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Отправить сообщение</Button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                * Обязательные поля. Мы свяжемся с вами в течение рабочего дня.
              </p>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Отделы</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Отдел продаж</h3>
                  <p className="text-sm text-gray-600">Консультации, оформление заказов</p>
                  <p className="text-sm text-blue-600">доб. 101</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Склад</h3>
                  <p className="text-sm text-gray-600">Самовывоз, проверка наличия</p>
                  <p className="text-sm text-green-600">доб. 102</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Доставка</h3>
                  <p className="text-sm text-gray-600">Вопросы по доставке</p>
                  <p className="text-sm text-purple-600">доб. 103</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Бухгалтерия</h3>
                  <p className="text-sm text-gray-600">Документооборот, счета</p>
                  <p className="text-sm text-orange-600">доб. 104</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-primary/5 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Быстрая связь</h3>
              </div>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => window.open("tel:+79010400977")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Заказать звонок
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() =>
                    window.open(
                      "https://wa.me/79010400977?text=Здравствуйте! Хочу получить консультацию по строительным материалам",
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Написать в WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => window.open("https://t.me/optstroy_support", "_blank")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Написать в Telegram
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => window.open("mailto:info@optstroy.shop")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Написать на почту
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Locations */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Дополнительные точки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Точка выдачи "Центр"</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>ул. Советская, 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>Пн-Сб: 10:00-19:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>+7 (4852) 123-45-70</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Склад "Северный"</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Московский пр-т, 112</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>Пн-Пт: 8:00-17:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>+7 (4852) 123-45-71</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Офис продаж "Рыбинск"</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>г. Рыбинск, ул. Крестовая, 8</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>Пн-Пт: 9:00-18:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>+7 (4855) 123-45-72</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
