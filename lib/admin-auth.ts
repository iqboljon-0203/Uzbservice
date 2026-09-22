import { getServiceSupabase } from '@/lib/supabase';

/**
 * Admin API so'rovlarini xavfsiz autentifikatsiyadan o'tkazish.
 * 1. Supabase Auth JWT Access Token tekshiriladi.
 * 2. Zaxira sifatida ADMIN_PASSWORD tekshiriladi.
 */
export async function checkAdminAuth(req: Request): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return false;

  // 1. Agar to'g'ridan-to'g'ri ADMIN_PASSWORD yuborilgan bo'lsa (Backward compatibility)
  if (process.env.ADMIN_PASSWORD && token === process.env.ADMIN_PASSWORD) {
    return true;
  }

  // 2. Supabase Auth JWT tokenini tekshirish
  try {
    const supabase = getServiceSupabase();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      return true;
    }
  } catch {
    // xatolik yuz bersa false qaytariladi
  }

  return false;
}
