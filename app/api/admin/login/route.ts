import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = body.password?.trim();
    let email = body.email?.trim() || '';

    if (!password) {
      return NextResponse.json(
        { ok: false, error: 'Iltimos, parolni kiriting' },
        { status: 400 }
      );
    }

    // Agar foydalanuvchi email o'rniga "admin" yozsa yoki bo'sh qoldirsa:
    if (!email || email.toLowerCase() === 'admin') {
      email = 'admin@toshkentservice.uz';
    }

    // 1. Supabase Auth orqali tekshirish
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data?.session) {
      return NextResponse.json({
        ok: true,
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        message: 'Muvaffaqiyatli kirildi',
      });
    }

    // 2. Fallback tekshiruv: agar env paroli bilan kirilayotgan bo'lsa
    if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({
        ok: true,
        token: process.env.ADMIN_PASSWORD,
        user: { email: 'admin@toshkentservice.uz' },
        message: 'Muvaffaqiyatli kirildi',
      });
    }

    return NextResponse.json(
      { ok: false, error: 'Login yoki parol noto\'g\'ri' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || 'Server xatosi yuz berdi' },
      { status: 500 }
    );
  }
}
