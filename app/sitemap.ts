import { MetadataRoute } from 'next';
import { servicesData } from '@/data/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toshkentservice.uz';
  const lastUpdated = new Date('2025-02-15T00:00:00.000Z');

  const services: MetadataRoute.Sitemap = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...services,
  ];
}
