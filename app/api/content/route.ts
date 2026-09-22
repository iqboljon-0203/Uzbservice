import { NextResponse } from 'next/server';
import { getServices, getReviews, getCounters, getServiceDetail, getSiteContent } from '@/lib/data-fetcher';
import { Language } from '@/data/content';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get('lang') || 'ru') as Language;
  const type = url.searchParams.get('type') || 'all';
  const slug = url.searchParams.get('slug');

  try {
    if (type === 'services') {
      const services = await getServices(lang);
      return NextResponse.json({ services });
    }

    if (type === 'reviews') {
      const reviews = await getReviews(lang);
      return NextResponse.json({ reviews });
    }

    if (type === 'counters') {
      const counters = await getCounters(lang);
      return NextResponse.json({ counters });
    }

    if (type === 'detail' && slug) {
      const detail = await getServiceDetail(slug);
      return NextResponse.json({ detail });
    }

    // All / Landing content
    const [content, services, reviews, counters] = await Promise.all([
      getSiteContent(lang),
      getServices(lang),
      getReviews(lang),
      getCounters(lang),
    ]);

    return NextResponse.json({
      content,
      services,
      reviews,
      counters,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
