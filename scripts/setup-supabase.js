/**
 * Supabase SQL executor — Management API orqali jadvallar yaratish
 * Bu skript Service Role Key orqali SQL bajaradi
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// .env dan o'qish
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=["']?([^"'\r]*)["']?/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Supabase credentials topilmadi');
  process.exit(1);
}

// Supabase project ref ni URL dan olish
const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0];
console.log('Project ref:', projectRef);

const sqlContent = fs.readFileSync(path.join(__dirname, 'create-tables.sql'), 'utf8');

async function executeSqlViaRest() {
  console.log('🚀 SQL ni Supabase Management API orqali bajarilmoqda...\n');
  
  // Supabase postgREST orqali SQL bajara olmaymiz,
  // lekin pg_net extension orqali bajara olamiz
  // Eng oddiy usul - HTTP orqali supabase-js SDK dan foydalanish

  // Approach: jadvallarni REST API orqali tekshiramiz
  // Agar jadval mavjud bo'lmasa, xatolik beradi va foydalanuvchiga aytamiz

  try {
    // Test: site_settings jadvalini tekshirish
    const testRes = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?limit=1`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
    });

    if (testRes.ok) {
      console.log('✅ Jadvallar allaqachon mavjud! Ma\'lumotlarni migratsiya qilishga o\'tamiz...');
      return true;
    } else {
      const text = await testRes.text();
      if (text.includes('does not exist') || text.includes('relation') || testRes.status === 404) {
        console.log('⚠️ Jadvallar hali yaratilmagan.');
        console.log('');
        console.log('📌 ILTIMOS QUYIDAGINI BAJARING:');
        console.log('   1. Supabase Dashboard ga kiring: https://supabase.com/dashboard');
        console.log('   2. Loyihangizni tanlang');
        console.log('   3. Chap menyudan "SQL Editor" ni bosing');
        console.log('   4. "New Query" tugmasini bosing');
        console.log(`   5. scripts/create-tables.sql faylining tarkibini nusxalang va bajaring`);
        console.log('   6. "Run" tugmasini bosing');
        console.log('   7. Keyin quyidagi buyruqni bajaring: node scripts/run-migration.js');
        console.log('');
        return false;
      }
      console.log('Response:', testRes.status, text);
      return false;
    }
  } catch (err) {
    console.error('Xato:', err.message);
    return false;
  }
}

executeSqlViaRest().then(async (tablesExist) => {
  if (!tablesExist) {
    process.exit(1);
  }
  
  // Jadvallar mavjud, ma'lumotlarni migratsiya qilamiz
  console.log('\n📦 Ma\'lumotlarni migratsiya qilish boshlanmoqda...\n');
  
  // run-migration.js dagi migratsiya funksiyalarini import qilamiz
  require('./run-migration.js');
}).catch(console.error);
