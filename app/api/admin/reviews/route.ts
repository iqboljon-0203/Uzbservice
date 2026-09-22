import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/admin-auth';

export async function GET(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('reviews').select('*').order('sort_order');
    if (!error && data && data.length > 0) return NextResponse.json({ data });
  } catch {
    console.warn('Supabase reviews query failed, using static fallback');
  }

  // Fallback: build from static siteContent
  const { siteContent } = await import('@/data/content');
  const ruItems = siteContent.ru.reviews.items;
  const uzItems = siteContent.uz.reviews.items;

  const fallback = ruItems.map((ru, idx) => {
    const uz = uzItems.find(u => u.id === ru.id) || uzItems[idx] || ru;
    return {
      id: ru.id,
      author_ru: ru.author,
      author_uz: uz.author,
      avatar: ru.avatar,
      rating: ru.rating,
      text_ru: ru.text,
      text_uz: uz.text,
      service_ru: ru.service,
      service_uz: uz.service,
      date_ru: ru.date,
      date_uz: uz.date,
      sort_order: idx + 1,
      is_visible: true,
    };
  });

  return NextResponse.json({ data: fallback });
}

export async function POST(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from('reviews').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, created_at, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id kerak' }, { status: 400 });
  const supabase = getServiceSupabase();
  const { error } = await supabase.from('reviews').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id kerak' }, { status: 400 });
  const supabase = getServiceSupabase();
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
