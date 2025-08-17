import type { Metadata } from "next"
import ContactsClientPage from "./ContactsClientPage"

export const metadata: Metadata = {
  title: "Контакты - ОптСтрой",
  description:
    "Контактная информация ОптСтрой в Ярославле. Телефоны, адрес, часы работы, схема проезда. Свяжитесь с нами удобным способом.",
}

export default function ContactsPage() {
  return <ContactsClientPage />
}
