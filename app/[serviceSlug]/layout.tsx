import type { Metadata } from 'next';
import { servicesData } from '@/data/servicesData';

type Props = {
  params: Promise<{ serviceSlug: string }>;
  children: React.ReactNode;
};

// SSG: Pre-render all 4 service routes at build time
export function generateStaticParams() {
  return Object.keys(servicesData).map((serviceSlug) => ({
    serviceSlug,
  }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = servicesData[serviceSlug];

  if (!service) {
    return {
      title: 'Услуга не найдена / Xizmat topilmadi',
    };
  }

  const serviceKeywords: Record<string, string[]> = {
    'remont-kondiczionerov-v-tashkente': [
      'ремонт кондиционеров в ташкенте',
      'заправка кондиционера фреоном ташкент',
      'чистка кондиционеров ташкент',
      'мастер по кондиционерам ташкент',
      'konditsioner remont toshkent',
      'konditsioner ustasi toshkent',
      'konditsionerga freon quyish',
      'konditsioner tozalash narxi',
      'срочный ремонт сплит систем',
      'toshkent service кондиционеры'
    ],
    'remont-holodilnikov-v-tashkente': [
      'ремонт холодильников в ташкенте',
      'ремонт холодильников на дому ташкент',
      'мастер по ремонту холодильников ташкент',
      'заправка фреоном холодильника ташкент',
      'замена компрессора холодильника',
      'xolodilnik ustasi toshkent',
      'xolodilnik remont toshkent uyga borish',
      'xolodilnik motorini almashtirish',
      'toshkent service холодильники'
    ],
    'remont-stiralnyh-mashin-v-tashkente': [
      'ремонт стиральных машин ташкент',
      'ремонт стиральных машин на дому ташкент',
      'мастер по стиральным машинам ташкент',
      'замена подшипника стиральной машины ташкент',
      'ремонт платы стиральной машины',
      'kir yuvish mashinasi ustasi toshkent',
      'kir yuvish mashinasini tuzatish toshkent',
      'toshkent service стиральные машины'
    ],
    'remont-gazovyh-kotlov-v-tashkente': [
      'ремонт газовых котлов в ташкенте',
      'ремонт двухконтурных котлов ташкент',
      'промывка теплообменника котла ташкент',
      'мастер по газовым котлам ташкент',
      'gaz qozonlarini ta\'mirlash toshkent',
      'kotyol ustasi toshkent',
      'ikki konturli kotel remont',
      'toshkent service газовые котлы'
    ],
  };

  const currentKeywords = serviceKeywords[serviceSlug] || [
    service.title.ru.toLowerCase(),
    service.title.uz.toLowerCase(),
    'ремонт бытовой техники ташкент',
    'toshkent service',
    'toshkentda ta\'mirlash',
    'мастер по ремонту',
    'usta chaqirish'
  ];

  const fullUrl = `https://toshkentservice.uz/${serviceSlug}`;
  const pageTitle = `${service.title.ru} с выездом мастера за 60 мин | Toshkent Service`;
  const pageDescription = `${service.subtitle.ru} Срочный выезд мастера во все районы Ташкента. Гарантия до 1 года. Звоните: +998 (77) 002-67-76`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: currentKeywords,
    alternates: {
      canonical: fullUrl,
      languages: {
        'ru-RU': `${fullUrl}?lang=ru`,
        'uz-UZ': `${fullUrl}?lang=uz`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: 'ru_RU',
      alternateLocale: 'uz_UZ',
      title: `${service.title.ru} | Toshkent Service`,
      description: pageDescription,
      url: fullUrl,
      images: [
        {
          url: `https://toshkentservice.uz${service.heroImage}`,
          width: 800,
          height: 600,
          alt: service.title.ru,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`https://toshkentservice.uz${service.heroImage}`],
    },
  };
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const service = servicesData[serviceSlug];

  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://toshkentservice.uz/${serviceSlug}#service`,
    "name": service.title.ru,
    "alternateName": service.title.uz,
    "description": service.subtitle.ru,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Toshkent Service",
      "telephone": "+998770026776",
      "url": "https://toshkentservice.uz"
    },
    "areaServed": {
      "@type": "City",
      "name": "Ташкент / Toshkent"
    },
    "offers": {
      "@type": "Offer",
      "price": service.priceFrom.ru.replace(/[^0-9]/g, '') || "100000",
      "priceCurrency": "UZS",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    }
  } : null;

  const breadcrumbSchema = service ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://toshkentservice.uz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Услуги",
        "item": "https://toshkentservice.uz/#uslugi"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title.ru,
        "item": `https://toshkentservice.uz/${serviceSlug}`
      }
    ]
  } : null;

  const faqSchema = service ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Сколько стоит ${service.title.ru.toLowerCase()} в Ташкенте?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Диагностика начинается от 80 000 сум, выезд мастера при согласии на ремонт — бесплатный. Базовый ремонт от ${service.priceFrom.ru}.`
        }
      },
      {
        "@type": "Question",
        "name": "Как быстро мастер выезжает на дом по Ташкенту?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мастер выезжает во все 12 районов Ташкента в течение 45–60 минут после подтверждения заявки."
        }
      },
      {
        "@type": "Question",
        "name": "Какая гарантия предоставляется на выполненные работы?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "После завершения ремонта мастер выписывает официальный гарантийный талон сроком от 1 месяца до 1 года на выполненные работы и установленные запчасти."
        }
      }
    ]
  } : null;

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {children}
    </>
  );
}
