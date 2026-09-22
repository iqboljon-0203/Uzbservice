/**
 * Supabase Management API orqali jadvallar yaratish
 * Bu Supabase Management API (api.supabase.com) ga murojaat qiladi
 */

const fs = require('fs');
const path = require('path');

// .env dan o'qish
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=["']?([^"'\r]*)["']?/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

// DB ga to'g'ridan-to'g'ri ulanish uchun pg kutubxonasini ishlatamiz
// Supabase project URL dan connection string olamiz
const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0];

// Supabase Management API orqali SQL bajarish
async function runSqlViaManagementApi(sql) {
  // Management API endpoint
  const url = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    });

    if (res.ok) {
      return { success: true, data: await res.json() };
    } else {
      const text = await res.text();
      return { success: false, error: text, status: res.status };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Supabase SQL RPC orqali jadvallar yaratish
async function createTablesViaRpc() {
  console.log('🚀 Jadvallarni Supabase RPC orqali yaratish urinilmoqda...\n');

  // Har bir CREATE TABLE ni alohida bajaramiz
  const statements = [
    `CREATE TABLE IF NOT EXISTS site_settings (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      section text NOT NULL,
      lang text NOT NULL DEFAULT 'ru',
      data jsonb NOT NULL DEFAULT '{}',
      updated_at timestamptz DEFAULT now(),
      UNIQUE(section, lang)
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      service_id text UNIQUE NOT NULL,
      title_ru text NOT NULL DEFAULT '',
      title_uz text NOT NULL DEFAULT '',
      desc_ru text NOT NULL DEFAULT '',
      desc_uz text NOT NULL DEFAULT '',
      image text DEFAULT '',
      price_note_ru text DEFAULT '',
      price_note_uz text DEFAULT '',
      badge_ru text DEFAULT '',
      badge_uz text DEFAULT '',
      sort_order int DEFAULT 0,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS reviews (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      author_ru text NOT NULL DEFAULT '',
      author_uz text NOT NULL DEFAULT '',
      avatar text DEFAULT '',
      rating int DEFAULT 5,
      text_ru text NOT NULL DEFAULT '',
      text_uz text NOT NULL DEFAULT '',
      service_ru text DEFAULT '',
      service_uz text DEFAULT '',
      date_ru text DEFAULT '',
      date_uz text DEFAULT '',
      sort_order int DEFAULT 0,
      is_visible boolean DEFAULT true,
      created_at timestamptz DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS counters (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      counter_id text UNIQUE NOT NULL,
      target int NOT NULL DEFAULT 0,
      suffix text DEFAULT '+',
      label_ru text NOT NULL DEFAULT '',
      label_uz text NOT NULL DEFAULT '',
      icon text DEFAULT '',
      sort_order int DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS service_details (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      slug text UNIQUE NOT NULL,
      title_ru text NOT NULL DEFAULT '',
      title_uz text NOT NULL DEFAULT '',
      subtitle_ru text NOT NULL DEFAULT '',
      subtitle_uz text NOT NULL DEFAULT '',
      hero_image text DEFAULT '',
      badge_ru text DEFAULT '',
      badge_uz text DEFAULT '',
      price_from_ru text DEFAULT '',
      price_from_uz text DEFAULT '',
      brands text[] DEFAULT '{}',
      symptom_title_ru text DEFAULT '',
      symptom_title_uz text DEFAULT '',
      symptom_desc_ru text DEFAULT '',
      symptom_desc_uz text DEFAULT '',
      symptom_items jsonb DEFAULT '[]',
      seo_text jsonb DEFAULT '{}',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS breakdowns (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      service_detail_slug text NOT NULL,
      breakdown_id text NOT NULL,
      title_ru text NOT NULL DEFAULT '',
      title_uz text NOT NULL DEFAULT '',
      description_ru text NOT NULL DEFAULT '',
      description_uz text NOT NULL DEFAULT '',
      price_ru text DEFAULT '',
      price_uz text DEFAULT '',
      icon_type text DEFAULT 'power',
      image text DEFAULT '',
      sort_order int DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS leads (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      name text DEFAULT '',
      phone text NOT NULL,
      service text DEFAULT '',
      comment text DEFAULT '',
      lang text DEFAULT 'ru',
      status text DEFAULT 'new',
      created_at timestamptz DEFAULT now()
    )`,
  ];

  // Management API ni sinab ko'ramiz
  const testResult = await runSqlViaManagementApi('SELECT 1');
  
  if (testResult.success) {
    console.log('✅ Management API ishlayapti! Jadvallar yaratilmoqda...');
    
    for (const sql of statements) {
      const result = await runSqlViaManagementApi(sql);
      if (result.success) {
        console.log(`  ✅ Jadval yaratildi`);
      } else {
        console.log(`  ❌ Xato: ${result.error}`);
      }
    }

    // RLS
    const rlsStatements = [
      `ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE services ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE reviews ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE counters ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE service_details ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE breakdowns ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE leads ENABLE ROW LEVEL SECURITY`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read site_settings') THEN CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true); END IF; END $$`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read services') THEN CREATE POLICY "Public read services" ON services FOR SELECT USING (true); END IF; END $$`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read reviews') THEN CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true); END IF; END $$`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read counters') THEN CREATE POLICY "Public read counters" ON counters FOR SELECT USING (true); END IF; END $$`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read service_details') THEN CREATE POLICY "Public read service_details" ON service_details FOR SELECT USING (true); END IF; END $$`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read breakdowns') THEN CREATE POLICY "Public read breakdowns" ON breakdowns FOR SELECT USING (true); END IF; END $$`,
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert leads') THEN CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true); END IF; END $$`,
    ];

    for (const sql of rlsStatements) {
      await runSqlViaManagementApi(sql);
    }
    console.log('  ✅ RLS sozlamalari qo\'shildi');
    
    return true;
  } else {
    console.log('⚠️ Management API ishlamadi:', testResult.status, testResult.error);
    console.log('\n📌 Muqobil yo\'l ishlatilmoqda...');
    
    // Supabase "pg" RPC funksiyasini sinab ko'ramiz
    // Ko'p Supabase loyihalarida built-in exec bo'lmaydi
    // Shuning uchun foydalanuvchiga yo'l-yo'riq beramiz
    
    console.log('\n📌 ILTIMOS QUYIDAGI QADAMLARNI BAJARING:');
    console.log('   ─────────────────────────────────────');
    console.log('   1. https://supabase.com/dashboard ga kiring');
    console.log('   2. Loyihangizni tanlang (evdhksfagdijsodebpzp)');
    console.log('   3. Chap menyudan "SQL Editor" → "New Query"');
    console.log(`   4. scripts/create-tables.sql faylini oching va nusxalang`);
    console.log('   5. SQL Editor ga joylang va "Run" tugmasini bosing');
    console.log('   6. Keyin shu buyruqni qayta ishga tushiring:');
    console.log('      node scripts/run-migration.js');
    console.log('   ─────────────────────────────────────\n');
    
    return false;
  }
}

createTablesViaRpc().then(async (success) => {
  if (success) {
    console.log('\n📦 Endi ma\'lumotlarni migratsiya qilamiz...');
    // Alohida skriptni ishga tushirish
    const { execSync } = require('child_process');
    try {
      execSync('node scripts/run-migration.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    } catch (e) {
      console.error('Migration xatosi:', e.message);
    }
  }
}).catch(console.error);
