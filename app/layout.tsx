import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  title: {
    default: "Toshkent Service — Ремонт бытовой техники в Ташкенте с выездом 24/7",
    template: "%s | Toshkent Service",
  },
  description: "Профессиональный ремонт бытовой техники в Ташкенте с выездом на дом за 60 минут: кондиционеры, холодильники, стиральные машины, газовые котлы. Гарантия до 1 года! Звоните: +998 (77) 002-67-76",
  keywords: [
    // Ruscha yuqori qidiruv kalit so'zlari
    "ремонт бытовой техники ташкент",
    "ремонт бытовой техники в ташкенте на дому",
    "мастер по ремонту ташкент",
    "ремонт кондиционеров в ташкенте",
    "заправка кондиционера фреоном ташкент",
    "чистка кондиционеров ташкент",
    "ремонт холодильников в ташкенте",
    "ремонт холодильников на дому ташкент",
    "ремонт стиральных машин ташкент",
    "ремонт стиральных машин на дому ташкент",
    "ремонт газовых котлов в ташкенте",
    "промывка теплообменников ташкент",
    "ремонт двухконтурных котлов ташкент",
    "срочный ремонт техники ташкент",
    "вызов мастера ташкент",
    // O'zbekcha qidiruv kalit so'zlari
    "toshkentda maishiy texnika ta'mirlash",
    "toshkentservice",
    "toshkent service",
    "konditsioner remont toshkent",
    "konditsioner ustasi toshkent",
    "konditsionerga freon quyish toshkent",
    "konditsioner tozalash toshkent",
    "xolodilnik ustasi toshkent",
    "xolodilnik remont toshkent uyga borish",
    "kir yuvish mashinasi ustasi toshkent",
    "kir yuvish mashinasini tuzatish",
    "gaz qozonlarini ta'mirlash toshkent",
    "kotyol ustasi toshkent",
    "ikki konturli kotel ustasi",
    "maishiy texnika ustasi uyga chaqirish",
    "toshkent usta xizmati 24/7"
  ],
  authors: [{ name: "Toshkent Service", url: "https://toshkentservice.uz" }],
  creator: "Toshkent Service",
  publisher: "Toshkent Service",
  applicationName: "Toshkent Service",
  alternates: {
    canonical: 'https://toshkentservice.uz',
    languages: {
      'ru-RU': 'https://toshkentservice.uz?lang=ru',
      'uz-UZ': 'https://toshkentservice.uz?lang=uz',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: "/images/favicon.png?v=4", type: "image/png" },
      { url: "/images/logo.svg?v=4", type: "image/svg+xml" },
      { url: "/images/favicon.webp?v=4", type: "image/webp" },
      { url: "/favicon.ico?v=4" }
    ],
    shortcut: "/images/favicon.png?v=4",
    apple: "/images/favicon.png?v=4",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "uz_UZ",
    url: "https://toshkentservice.uz/",
    siteName: "Toshkent Service",
    title: "Toshkent Service — Ремонт бытовой техники в Ташкенте | Срочный выезд мастера",
    description: "Профессиональный ремонт бытовой техники в Ташкенте с выездом за 60 минут: газовые котлы, кондиционеры, холодильники, стиральные машины. Гарантия до 1 года.",
    images: [
      {
        url: "/images/hero-img.png",
        width: 1200,
        height: 630,
        alt: "Toshkent Service - Профессиональный ремонт бытовой техники в Ташкенте",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toshkent Service — Ремонт бытовой техники в Ташкенте 24/7",
    description: "Срочный выезд мастера за 60 минут. Ремонт газовых котлов, кондиционеров, холодильников, стиральных машин в Ташкенте.",
    images: ["https://toshkentservice.uz/images/hero-img.png"],
  },
  other: {
    "geo.region": "UZ-TK",
    "geo.placename": "Tashkent",
    "geo.position": "41.2995;69.2401",
    "ICBM": "41.2995, 69.2401",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced Schema.org Structured Data
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": "https://toshkentservice.uz/#business",
    "name": "Toshkent Service",
    "alternateName": [
      "Ремонт бытовой техники Toshkent Service",
      "Toshkent Service maishiy texnika ta'mirlash markazi"
    ],
    "image": "https://toshkentservice.uz/images/hero-img.png",
    "logo": "https://toshkentservice.uz/images/logo.svg",
    "url": "https://toshkentservice.uz",
    "telephone": "+998770026776",
    "priceRange": "80 000 - 450 000 UZS",
    "currenciesAccepted": "UZS",
    "paymentAccepted": "Cash, Payme, Click, Uzum Bank",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Талимаржан, 15",
      "addressLocality": "Ташкент",
      "addressRegion": "Ташкент",
      "postalCode": "100015",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2995,
      "longitude": 69.2401
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "348",
      "reviewCount": "348"
    },
    "areaServed": [
      { "@type": "City", "name": "Ташкент / Toshkent" },
      { "@type": "AdministrativeArea", "name": "Юнусабадский район / Yunusobod" },
      { "@type": "AdministrativeArea", "name": "Чиланзарский район / Chilonzor" },
      { "@type": "AdministrativeArea", "name": "Мирзо-Улугбекский район / Mirzo Ulug'bek" },
      { "@type": "AdministrativeArea", "name": "Сергелийский район / Sergeli" },
      { "@type": "AdministrativeArea", "name": "Яккасарайский район / Yakkasaroy" },
      { "@type": "AdministrativeArea", "name": "Шайхантахурский район / Shayxontohur" },
      { "@type": "AdministrativeArea", "name": "Алмазарский район / Olmazor" },
      { "@type": "AdministrativeArea", "name": "Мирабадский район / Mirobod" },
      { "@type": "AdministrativeArea", "name": "Яшнабадский район / Yashnobod" },
      { "@type": "AdministrativeArea", "name": "Учтепинский район / Uchtepa" },
      { "@type": "AdministrativeArea", "name": "Бектемирский район / Bektemir" },
      { "@type": "AdministrativeArea", "name": "Янгихаётский район / Yangihayot" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги ремонта бытовой техники в Ташкенте",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт кондиционеров в Ташкенте (чистка, заправка фреоном)",
            "url": "https://toshkentservice.uz/remont-kondiczionerov-v-tashkente"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "150000",
            "priceCurrency": "UZS"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт холодильников в Ташкенте с выездом на дом",
            "url": "https://toshkentservice.uz/remont-holodilnikov-v-tashkente"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "120000",
            "priceCurrency": "UZS"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт стиральных машин в Ташкенте",
            "url": "https://toshkentservice.uz/remont-stiralnyh-mashin-v-tashkente"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "140000",
            "priceCurrency": "UZS"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт газовых котлов в Ташкенте",
            "url": "https://toshkentservice.uz/remont-gazovyh-kotlov-v-tashkente"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "100000",
            "priceCurrency": "UZS"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Сколько стоит выезд мастера и диагностика техники в Ташкенте?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "При согласии на ремонт выезд мастера по Ташкенту — бесплатный. Диагностика неисправности начинается от 80 000 сум и учитывается в итоговой стоимости работы."
        }
      },
      {
        "@type": "Question",
        "name": "Как быстро мастер приезжает по Ташкенту?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "В каждом из 12 районов Ташкента дежурят наши специалисты. В среднем мастер приезжает по адресу в течение 45–60 минут после подтверждения заявки."
        }
      },
      {
        "@type": "Question",
        "name": "Предоставляется ли официальная гарантия на ремонт?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, после завершения ремонта мастер выписывает официальный гарантийный талон сроком от 1 месяца до 1 года на выполненные работы и установленные запчасти."
        }
      },
      {
        "@type": "Question",
        "name": "В какие районы Ташкента вы выезжаете?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы обслуживаем все районы столицы: Юнусабад, Чиланзар, Мирзо-Улугбек, Сергели, Яккасарай, Шайхантахур, Алмазар, Мирабад, Яшнабад, Учтепа, Бектемир, Янгихаёт."
        }
      }
    ]
  };

  return (
    <html lang="ru" className={`${rubik.variable} ${onest.variable} scroll-smooth`}>
      <head>
        {/* Google Ads Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18472124791"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18472124791');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
