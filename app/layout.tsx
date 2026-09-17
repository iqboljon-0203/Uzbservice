import type { Metadata, Viewport } from "next";
import { Rubik, Onest } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1390FC",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://toshkentservice.uz'),
  title: "Ремонт бытовой техники в Ташкенте / Toshkent Service",
  description: "Toshkentda maishiy texnika ta'mirlash: konditsioner, xolodilnik, kir yuvish mashinasi, gaz qozonlari. Наши специалисты готовы выполнить срочный ремонт бытовой техники в Ташкенте. Выезд мастера в течение 60 минут.",
  keywords: [
    "ремонт бытовой техники",
    "ремонт бытовой техники Ташкент",
    "ремонт газовых котлов",
    "ремонт холодильников",
    "ремонт кондиционеров",
    "ремонт стиральных машин",
    "мастер по ремонту Ташкент",
    "toshkentda maishiy texnika ta'mirlash",
    "toshkentservice",
    "toshkent service",
    "konditsioner remont toshkent",
    "xolodilnik remont toshkent",
    "kir yuvish mashinasi ustasi",
    "заправка фреоном кондиционера ташкент",
    "konditsionerlarga freon quyish toshkent",
    "konditsioner tozalash",
    "ремонт плат управления стиральных машин",
    "kir yuvish mashinasi platasini tuzatish",
    "замена подшипника стиральной машины",
    "ремонт холодильников на дому ташкент",
    "xolodilnik motorini almashtirish",
    "промывка газовых котлов ташкент",
    "gaz qozonlarini yuvish",
    "maishiy texnika ustasi uyga chaqirish",
    "срочный ремонт бытовой техники 24/7"
  ],
  authors: [{ name: "Toshkent Service" }],
  creator: "Toshkent Service",
  icons: {
    icon: "/images/favicon.webp",
    shortcut: "/images/favicon.webp",
    apple: "/images/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "uz_UZ",
    url: "https://toshkentservice.uz/",
    siteName: "Toshkent Service",
    title: "Ремонт бытовой техники в Ташкенте / Toshkent Service",
    description: "Профессиональный ремонт бытовой техники в Ташкенте. Выезд мастера за 60 минут, гарантия до 1 года.",
    images: [
      {
        url: "/images/hero-img.png",
        width: 1152,
        height: 600,
        alt: "Toshkent Service - Ремонт бытовой техники в Ташкенте",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Toshkent Service",
    "image": "https://toshkentservice.uz/images/hero-img.png",
    "@id": "https://toshkentservice.uz",
    "url": "https://toshkentservice.uz",
    "telephone": "+998991231373",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tashkent",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2995,
      "longitude": 69.2401
    },
    "priceRange": "$$",
    "description": "Профессиональный ремонт бытовой техники в Ташкенте. Кондиционеры, холодильники, стиральные машины и газовые котлы."
  };

  return (
    <html lang="ru" className={`${rubik.variable} ${onest.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
