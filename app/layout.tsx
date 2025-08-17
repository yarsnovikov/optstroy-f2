import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context" // Added AuthProvider import
import { Toaster } from "@/components/ui/toaster"

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "ОптСтрой - Строительные материалы в Ярославле | Доставка по области",
  description:
    "Строительные материалы, инструменты, электрика, сантехника в Ярославле. 20+ лет на рынке. Быстрая доставка. Склад в ТД Аркада. ☎ +7 (901) 040-09-77",
  keywords: "строительные материалы Ярославль, стройматериалы, инструменты, электрика, сантехника, доставка, ОптСтрой",
  authors: [{ name: "ОптСтрой" }],
  creator: "ОптСтрой",
  publisher: "ОптСтрой",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://optstroy.shop"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ОптСтрой - Строительные материалы в Ярославле",
    description:
      "Строительные материалы, инструменты, электрика, сантехника. 20+ лет на рынке. Быстрая доставка по Ярославлю и области.",
    url: "https://optstroy.shop",
    siteName: "ОптСтрой",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ОптСтрой - Строительные материалы в Ярославле",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ОптСтрой - Строительные материалы в Ярославле",
    description: "Строительные материалы, инструменты, электрика, сантехника. 20+ лет на рынке. Быстрая доставка.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={dmSans.variable}>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          {" "}
          {/* Added AuthProvider wrapper */}
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
