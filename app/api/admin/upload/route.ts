import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getServiceSupabase } from '@/lib/supabase';

function checkAdminAuth(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;
  return authHeader.replace('Bearer ', '') === process.env.ADMIN_PASSWORD;
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Ruxsat berilmagan (Unauthorized)' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Fayl tanlanmadi' }, { status: 400 });
    }

    // Fayl turini tekshirish
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: `Faqat rasm fayllari yuklanishi mumkin (JPEG, PNG, WEBP, SVG, GIF). Tanlangan format: ${file.type}`
      }, { status: 400 });
    }

    // Maksimal hajm: 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Rasm hajmi 10MB dan oshmasligi kerak' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Fayl nomini tozalash va unikal qilish
    const ext = path.extname(file.name) || '.webp';
    const cleanBaseName = path.basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 30);
    const uniqueFileName = `${cleanBaseName}-${Date.now()}${ext}`;

    // 1. Faylni public/uploads papkasiga yozish
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    const localFilePath = path.join(uploadsDir, uniqueFileName);
    await writeFile(localFilePath, buffer);

    let publicUrl = `/uploads/${uniqueFileName}`;

    // 2. Ixtiyoriy ravishda Supabase Storage bucket 'images' ga ham yuklashga urinib ko'ramiz
    try {
      const supabase = getServiceSupabase();
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('images')
        .upload(`uploads/${uniqueFileName}`, buffer, {
          contentType: file.type,
          upsert: true
        });

      if (!uploadErr && uploadData) {
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`uploads/${uniqueFileName}`);
        if (publicUrlData?.publicUrl) {
          // Supabase public URL muvaffaqiyatli olindi
          publicUrl = publicUrlData.publicUrl;
        }
      }
    } catch (storageErr) {
      // Supabase storage bo'lmasa ham lokal public/uploads/ fayli ishlaydi
      console.log('Supabase storage upload optional fallback:', storageErr);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Rasm yuklashda xatolik' }, { status: 500 });
  }
}
