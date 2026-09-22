import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

// Admin autentifikatsiya tekshiruvi
function checkAdminAuth(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === process.env.ADMIN_PASSWORD;
}

// GET — barcha leadlarni olish
export async function GET(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const search = url.searchParams.get('search');
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = (page - 1) * limit;

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  try {
    const { data, error, count } = await query;
    if (!error && data) {
      return NextResponse.json({ data, total: count, page, limit });
    }
  } catch (err) {
    console.warn('Supabase leads query failed, falling back to data/leads.json');
  }

  // Fallback: Read from local data/leads.json
  try {
    const fs = await import('fs');
    const path = await import('path');
    const leadsFile = path.join(process.cwd(), 'data', 'leads.json');
    if (fs.existsSync(leadsFile)) {
      const content = fs.readFileSync(leadsFile, 'utf8');
      const allLeads = JSON.parse(content);
      return NextResponse.json({ data: allLeads, total: allLeads.length, page: 1, limit: allLeads.length });
    }
  } catch (fsErr) {
    console.error('Failed to read fallback leads:', fsErr);
  }

  return NextResponse.json({ data: [], total: 0, page: 1, limit: 50 });
}

// PATCH — lead statusini o'zgartirish
export async function PATCH(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'id va status kerak' }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// DELETE — leadni o'chirish
export async function DELETE(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id kerak' }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { error } = await supabase.from('leads').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
