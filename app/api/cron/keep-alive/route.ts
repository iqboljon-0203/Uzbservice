import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    // Vercel Cron xavfsizlik tekshiruvi (agar CRON_SECRET o'rnatilgan bo'lsa)
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized: Noto\'g\'ri yoki yetishmayotgan CRON_SECRET' },
        { status: 401 }
      );
    }

    const startTime = Date.now();

    // Supabase ma'lumotlar bazasiga yengil so'rov yuborish (faollikni saqlash uchun)
    let client;
    try {
      client = getServiceSupabase();
    } catch {
      client = supabase;
    }

    // Har qanday mavjud jadvaldan bitta yozuv o'qish (DB ga haqiqiy tranzaksiya/so'rov boradi)
    const { data, error } = await client
      .from('services')
      .select('id')
      .limit(1);

    if (error) {
      // Agar 'services' jadvali bo'lmasa, zaxira sifatida 'site_content' jadvalini tekshirish
      const fallback = await client.from('site_content').select('id').limit(1);
      if (fallback.error) {
        console.error('Supabase keep-alive xatosi:', fallback.error);
        return NextResponse.json(
          {
            success: false,
            error: fallback.error.message,
            timestamp: new Date().toISOString(),
          },
          { status: 500 }
        );
      }
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Supabase muvaffaqiyatli uyg\'otildi va faol saqlanmoqda (7 kunda pauza bo\'lmaydi)',
      latencyMs: duration,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Keep-alive xatolik:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Kutilmagan xatolik' },
      { status: 500 }
    );
  }
}
