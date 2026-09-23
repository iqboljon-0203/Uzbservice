import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Hostnomadan portni olib tashlash (masalan: admin.localhost:3000 -> admin.localhost)
  const currentHost = hostname.replace(/:\d+$/, '').toLowerCase();

  // Admin subdomenini aniqlash: admin.toshkentservice.uz yoki lokal test uchun admin.localhost
  const isAdminSubdomain =
    currentHost === 'admin.toshkentservice.uz' ||
    currentHost === 'admin.localhost' ||
    currentHost.startsWith('admin.');

  // Statik fayllar, API so'rovlari va Next.js ichki resurslariga tegilmaydi
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/images') ||
    url.pathname === '/favicon.ico' ||
    url.pathname === '/robots.txt' ||
    url.pathname === '/sitemap.xml' ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. Agar so'rov admin.toshkentservice.uz subdomenidan kelsa:
  if (isAdminSubdomain) {
    // Agar yo'l allaqachon /admin bilan boshlansa (masalan: /admin/leads)
    if (url.pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    // Subdomenda / bo'lsa -> /admin ga rewrite qiladi
    // Subdomenda /login bo'lsa -> /admin/login ga rewrite qiladi
    // Subdomenda /leads bo'lsa -> /admin/leads ga rewrite qiladi
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. Agar asosiy domenda (toshkentservice.uz yoki www.toshkentservice.uz) /admin ga kirilsa:
  if (
    currentHost === 'toshkentservice.uz' ||
    currentHost === 'www.toshkentservice.uz'
  ) {
    if (url.pathname.startsWith('/admin')) {
      const subPath = url.pathname.replace(/^\/admin/, '') || '/';
      const redirectUrl = new URL(
        `${subPath}${url.search}`,
        'https://admin.toshkentservice.uz'
      );
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
