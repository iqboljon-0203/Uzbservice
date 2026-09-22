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
  const url = new URL(req.url);
  const section = url.searchParams.get('section');
  
  let query = supabase.from('site_settings').select('*').order('section');
  if (section) query = query.eq('section', section);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { section, lang, data: settingsData } = body;
  if (!section || !lang) return NextResponse.json({ error: 'section va lang kerak' }, { status: 400 });
  
  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ section, lang, data: settingsData, updated_at: new Date().toISOString() }, { onConflict: 'section,lang' });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
