import type { Metadata } from 'next';
import { servicesData } from '@/data/servicesData';

type Props = {
  params: Promise<{ serviceSlug: string }>;
  children: React.ReactNode;
};

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

  return {
    title: `${service.title.ru} / ${service.title.uz} | Toshkent Service`,
    description: `${service.subtitle.ru} ${service.subtitle.uz}`,
    keywords: [
      service.title.ru.toLowerCase(),
      service.title.uz.toLowerCase(),
      'ремонт бытовой техники ташкент',
      'toshkent service',
      'toshkentda ta\'mirlash',
      'мастер по ремонту',
      'usta chaqirish'
    ],
    openGraph: {
      title: `${service.title.ru} | Toshkent Service`,
      description: service.subtitle.ru,
      url: `https://toshkentservice.uz/${serviceSlug}`,
      images: [
        {
          url: `https://toshkentservice.uz${service.heroImage}`,
          width: 800,
          height: 600,
          alt: service.title.ru,
        },
      ],
    },
  };
}

export default async function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
