import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

function checkAdminAuth(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;
  return authHeader.replace('Bearer ', '') === process.env.ADMIN_PASSWORD;
}

// GET — barcha service_details va ularning breakdowns
export async function GET(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');

  if (slug) {
    const { data: detail, error: dErr } = await supabase
      .from('service_details')
      .select('*')
      .eq('slug', slug)
      .single();

    if (dErr) return NextResponse.json({ error: dErr.message }, { status: 404 });

    const { data: breakdowns, error: bErr } = await supabase
      .from('breakdowns')
      .select('*')
      .eq('service_detail_slug', slug)
      .order('sort_order');

    return NextResponse.json({
      data: {
        ...detail,
        breakdowns: breakdowns || []
      }
    });
  }

  const { data, error } = await supabase.from('service_details').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// PUT — service_detail va uning breakdownlarini yangilash/saqlash
export async function PUT(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { slug, breakdowns, id, created_at, ...updates } = body;
  if (!slug) return NextResponse.json({ error: 'slug kerak' }, { status: 400 });

  const supabase = getServiceSupabase();
  updates.updated_at = new Date().toISOString();

  const { error: dErr } = await supabase
    .from('service_details')
    .upsert({ slug, ...updates }, { onConflict: 'slug' });

  if (dErr) return NextResponse.json({ error: dErr.message }, { status: 500 });

  // Agar breakdowns massivi berilgan bo'lsa
  if (Array.isArray(breakdowns)) {
    // Eski breakdownlarni tozalab yangilarini yozish
    await supabase.from('breakdowns').delete().eq('service_detail_slug', slug);

    if (breakdowns.length > 0) {
      const formatted = breakdowns.map((b, idx) => ({
        service_detail_slug: slug,
        breakdown_id: b.breakdown_id || `bd-${idx}`,
        title_ru: b.title_ru || '',
        title_uz: b.title_uz || '',
        description_ru: b.description_ru || '',
        description_uz: b.description_uz || '',
        price_ru: b.price_ru || '',
        price_uz: b.price_uz || '',
        icon_type: b.icon_type || 'power',
        image: b.image || '',
        sort_order: idx
      }));

      const { error: bErr } = await supabase.from('breakdowns').insert(formatted);
      if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

// DELETE — service_detail ni o'chirish
export async function DELETE(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug kerak' }, { status: 400 });

  const supabase = getServiceSupabase();
  const { error } = await supabase.from('service_details').delete().eq('slug', slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
