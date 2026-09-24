import { MetadataRoute } from 'next';
import { servicesData } from '@/data/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toshkentservice.uz';
  const currentDate = new Date();

  const services: MetadataRoute.Sitemap = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        ru: `${baseUrl}/${slug}?lang=ru`,
        uz: `${baseUrl}/${slug}?lang=uz`,
      },
    },
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          ru: `${baseUrl}?lang=ru`,
          uz: `${baseUrl}?lang=uz`,
        },
      },
    },
    ...services,
  ];
}
