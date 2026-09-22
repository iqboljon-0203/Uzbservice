import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'ADMIN_PASSWORD server sozlamalarida kiritilmagan' },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      return NextResponse.json({
        ok: true,
        token: adminPassword,
        message: 'Muvaffaqiyatli kirildi'
      });
    }

    return NextResponse.json(
      { ok: false, error: 'Parol noto\'g\'ri' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Server xatosi' },
      { status: 500 }
    );
  }
}
