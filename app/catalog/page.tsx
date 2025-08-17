import type { Metadata } from "next"
import CatalogClientPage from "./catalog-client"

export const metadata: Metadata = {
  title: "Каталог строительных материалов - ОптСтрой Ярославль",
  description:
    "Полный каталог строительных материалов, инструментов, электрики и сантехники в Ярославле. Низкие цены, быстрая доставка. Более 500 товаров в наличии.",
  keywords: "каталог строительных материалов, цемент, кирпич, инструменты Bosch, электрика, сантехника, Ярославль",
  openGraph: {
    title: "Каталог строительных материалов - ОптСтрой",
    description: "Полный каталог строительных материалов, инструментов, электрики и сантехники в Ярославле.",
    url: "https://optstroy.shop/catalog",
    images: ["/og-image.png"],
  },
}

export default function CatalogPage() {
  return <CatalogClientPage />
}
