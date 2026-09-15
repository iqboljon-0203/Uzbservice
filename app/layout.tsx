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
  metadataBase: new URL('https://uzbservice.uz'),
  title: "«UZBService» / Ремонт бытовой техники в Ташкенте",
  description: "Наши специалисты готовы выполнить любой ремонт бытовой техники в Ташкенте: кондиционер, холодильник, газовый котел, стиральную машину. Выезд мастера в течение 60 минут, гарантия до 1 года.",
  keywords: [
    "ремонт бытовой техники",
    "ремонт бытовой техники Ташкент",
    "ремонт газовых котлов",
    "ремонт холодильников",
    "ремонт кондиционеров",
    "ремонт стиральных машин",
    "мастер по ремонту Ташкент",
    "toshkentda maishiy texnika ta'mirlash",
    "uzbservice"
  ],
  authors: [{ name: "UZBService" }],
  creator: "UZBService",
  icons: {
    icon: "/images/favicon.webp",
    shortcut: "/images/favicon.webp",
    apple: "/images/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://uzbservice.uz/",
    siteName: "Uzbservice",
    title: "«UZBService» / Ремонт бытовой техники в Ташкенте",
    description: "Наши специалисты готовы выполнить любой ремонт бытовой техники в Ташкенте: кондиционер, холодильник, газовый котел, стиральную машину.",
    images: [
      {
        url: "/images/hero-img.png",
        width: 1152,
        height: 600,
        alt: "UZBService - Ремонт бытовой техники в Ташкенте",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${rubik.variable} ${onest.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-white text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
