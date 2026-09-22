import { supabase } from '@/lib/supabase';
import { siteContent, Language, ServiceItem, ReviewItem, CounterItem } from '@/data/content';
import { servicesData, ServiceDetail, BreakdownItem } from '@/data/servicesData';

// 1. Asosiy xizmatlar (4 ta karta)
export async function getServices(lang: Language): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order');

    if (error || !data || data.length === 0) {
      return siteContent[lang].services.items;
    }

    return data.map((item: any) => ({
      id: item.service_id,
      title: lang === 'uz' ? (item.title_uz || item.title_ru) : (item.title_ru || item.title_uz),
      desc: lang === 'uz' ? (item.desc_uz || item.desc_ru) : (item.desc_ru || item.desc_uz),
      image: item.image,
      priceNote: lang === 'uz' ? (item.price_note_uz || item.price_note_ru) : (item.price_note_ru || item.price_note_uz),
      badge: lang === 'uz' ? (item.badge_uz || item.badge_ru) : (item.badge_ru || item.badge_uz),
    }));
  } catch {
    return siteContent[lang].services.items;
  }
}

// 2. Sharhlar
export async function getReviews(lang: Language): Promise<ReviewItem[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order');

    if (error || !data || data.length === 0) {
      return siteContent[lang].reviews.items;
    }

    return data.map((item: any) => ({
      id: item.id,
      author: lang === 'uz' ? (item.author_uz || item.author_ru) : (item.author_ru || item.author_uz),
      avatar: item.avatar,
      rating: item.rating,
      text: lang === 'uz' ? (item.text_uz || item.text_ru) : (item.text_ru || item.text_uz),
      service: lang === 'uz' ? (item.service_uz || item.service_ru) : (item.service_ru || item.service_uz),
      date: lang === 'uz' ? (item.date_uz || item.date_ru) : (item.date_ru || item.date_uz),
    }));
  } catch {
    return siteContent[lang].reviews.items;
  }
}

// 3. Statistika hisoblagichlari
export async function getCounters(lang: Language): Promise<CounterItem[]> {
  try {
    const { data, error } = await supabase
      .from('counters')
      .select('*')
      .order('sort_order');

    if (error || !data || data.length === 0) {
      return siteContent[lang].facts.counters;
    }

    return data.map((item: any) => ({
      id: item.counter_id,
      target: item.target,
      suffix: item.suffix || '+',
      label: lang === 'uz' ? (item.label_uz || item.label_ru) : (item.label_ru || item.label_uz),
      icon: item.icon,
    }));
  } catch {
    return siteContent[lang].facts.counters;
  }
}

// 4. Barcha Landing bo'limlari (site_settings dan)
export async function getSiteContent(lang: Language) {
  const fallback = siteContent[lang];
  try {
    const { data: rows, error } = await supabase
      .from('site_settings')
      .select('*')
      .in('lang', [lang, 'all']);

    if (error || !rows || rows.length === 0) {
      return fallback;
    }

    const merged = JSON.parse(JSON.stringify(fallback));
    for (const row of rows) {
      if (row.section && row.data) {
        if (merged[row.section]) {
          merged[row.section] = { ...merged[row.section], ...row.data };
        } else {
          merged[row.section] = row.data;
        }
      }
    }
    return merged;
  } catch {
    return fallback;
  }
}

// 5. Batafsil xizmat sahifasi ma'lumotlari (slug bo'yicha)
export async function getServiceDetail(slug: string): Promise<ServiceDetail | null> {
  const fallback = servicesData[slug];
  try {
    const { data: detail, error } = await supabase
      .from('service_details')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !detail) return fallback || null;

    const { data: breakdowns } = await supabase
      .from('breakdowns')
      .select('*')
      .eq('service_detail_slug', slug)
      .order('sort_order');

    const mappedBreakdowns: BreakdownItem[] = (breakdowns && breakdowns.length > 0)
      ? breakdowns.map((b: any) => ({
          id: b.breakdown_id,
          title: { ru: b.title_ru || '', uz: b.title_uz || '' },
          description: { ru: b.description_ru || '', uz: b.description_uz || '' },
          symptoms: { ru: '', uz: '' },
          price: { ru: b.price_ru || '', uz: b.price_uz || '' },
          iconType: (b.icon_type || 'power') as any,
          image: b.image || fallback?.heroImage || '/images/service-fridge.png',
        }))
      : fallback ? fallback.breakdowns : [];

    // Symptom items mapping
    let mappedSymptomItems = fallback ? fallback.symptomChecklist.items : [];
    if (Array.isArray(detail.symptom_items) && detail.symptom_items.length > 0) {
      mappedSymptomItems = detail.symptom_items.map((si: any) => {
        if (typeof si === 'string') return { ru: si, uz: si };
        return { ru: si.ru || '', uz: si.uz || '' };
      });
    }

    return {
      slug,
      title: { ru: detail.title_ru || fallback?.title.ru || '', uz: detail.title_uz || fallback?.title.uz || '' },
      subtitle: { ru: detail.subtitle_ru || fallback?.subtitle.ru || '', uz: detail.subtitle_uz || fallback?.subtitle.uz || '' },
      heroImage: detail.hero_image || fallback?.heroImage || '',
      badge: { ru: detail.badge_ru || fallback?.badge.ru || '', uz: detail.badge_uz || fallback?.badge.uz || '' },
      priceFrom: { ru: detail.price_from_ru || fallback?.priceFrom.ru || '', uz: detail.price_from_uz || fallback?.priceFrom.uz || '' },
      brands: (detail.brands && detail.brands.length > 0) ? detail.brands : (fallback?.brands || []),
      breakdowns: mappedBreakdowns,
      symptomChecklist: {
        title: { ru: detail.symptom_title_ru || fallback?.symptomChecklist.title.ru || '', uz: detail.symptom_title_uz || fallback?.symptomChecklist.title.uz || '' },
        desc: { ru: detail.symptom_desc_ru || fallback?.symptomChecklist.desc.ru || '', uz: detail.symptom_desc_uz || fallback?.symptomChecklist.desc.uz || '' },
        items: mappedSymptomItems,
      },
      seoText: (detail.seo_text && Object.keys(detail.seo_text).length > 0) ? detail.seo_text : fallback?.seoText,
    };
  } catch {
    return fallback || null;
  }
}
