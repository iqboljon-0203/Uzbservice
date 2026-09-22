import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/admin-auth';

export async function GET(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('services').select('*').order('sort_order');
    if (!error && data && data.length > 0) return NextResponse.json({ data });
  } catch {
    console.warn('Supabase services query failed, using static fallback');
  }

  // Fallback: build from static siteContent
  const { siteContent } = await import('@/data/content');
  const ruItems = siteContent.ru.services.items;
  const uzItems = siteContent.uz.services.items;

  const fallback = ruItems.map((ru, idx) => {
    const uz = uzItems.find(u => u.id === ru.id) || uzItems[idx];
    return {
      service_id: ru.id,
      title_ru: ru.title,
      title_uz: uz?.title || ru.title,
      desc_ru: ru.desc,
      desc_uz: uz?.desc || ru.desc,
      image: ru.image,
      price_note_ru: ru.priceNote,
      price_note_uz: uz?.priceNote || ru.priceNote,
      badge_ru: ru.badge,
      badge_uz: uz?.badge || ru.badge,
      sort_order: idx + 1,
    };
  });

  return NextResponse.json({ data: fallback });
}

export async function POST(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from('services').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, service_id, created_at, ...updates } = body;
  if (!id && !service_id) return NextResponse.json({ error: 'id yoki service_id kerak' }, { status: 400 });
  const supabase = getServiceSupabase();
  updates.updated_at = new Date().toISOString();
  
  let query = supabase.from('services').update(updates);
  if (id) {
    query = query.eq('id', id);
  } else {
    query = query.eq('service_id', service_id);
  }
  const { error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await checkAdminAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const service_id = url.searchParams.get('service_id');
  if (!id && !service_id) return NextResponse.json({ error: 'id yoki service_id kerak' }, { status: 400 });
  const supabase = getServiceSupabase();
  let query = supabase.from('services').delete();
  if (id) {
    query = query.eq('id', id);
  } else if (service_id) {
    query = query.eq('service_id', service_id);
  }
  const { error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
