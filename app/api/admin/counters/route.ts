import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

function checkAdminAuth(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;
  return authHeader.replace('Bearer ', '') === process.env.ADMIN_PASSWORD;
}

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from('counters').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from('counters').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id kerak' }, { status: 400 });
  const supabase = getServiceSupabase();
  const { error } = await supabase.from('counters').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id kerak' }, { status: 400 });
  const supabase = getServiceSupabase();
  const { error } = await supabase.from('counters').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
