import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

function checkAdminAuth(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;
  return authHeader.replace('Bearer ', '') === process.env.ADMIN_PASSWORD;
}

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('services').select('*').order('sort_order');
    if (!error && data && data.length > 0) return NextResponse.json({ data });
  } catch (err) {
    console.warn('Supabase services query failed, using static fallback');
  }

  // Fallback: build from static siteContent
  const { siteContent } = await import('@/data/content');
  const ruItems = siteContent.ru.services.items;
  const uzItems = siteContent.uz.services.items;

  const fallback = ruItems.map((ru, idx) => {
    const uz = uzItems.find(u => u.id === ru.id) || uzItems[idx] || ru;
    return {
      id: ru.id,
      service_id: ru.id,
      title_ru: ru.title,
      title_uz: uz.title,
      desc_ru: ru.desc,
      desc_uz: uz.desc,
      image: ru.image,
      price_note_ru: ru.priceNote,
      price_note_uz: uz.priceNote,
      badge_ru: ru.badge,
      badge_uz: uz.badge,
      sort_order: idx + 1,
    };
  });

  return NextResponse.json({ data: fallback });
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from('services').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
