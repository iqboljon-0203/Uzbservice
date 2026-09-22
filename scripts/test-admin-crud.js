const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[match[1]] = val;
  }
});

const BASE_URL = 'http://localhost:3000';
const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin2025';

async function testAll() {
  console.log('=== ADMIN CRUD VA RASM YUKLASH TEKSHIRUVI BOSHLANDI ===\n');

  // 1. LOGIN
  console.log('1. Admin avtorizatsiyasini tekshirish...');
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: ADMIN_PASSWORD }),
  });
  const loginData = await loginRes.json();
  if (!loginRes.ok || !loginData.token) {
    throw new Error(`Login muvaffaqiyatsiz: ${JSON.stringify(loginData)}`);
  }
  const token = loginData.token;
  console.log('   ✅ Login muvaffaqiyatli, token olindi.\n');

  const authHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // 2. IMAGE UPLOAD TEST
  console.log('2. Kompyuterdan rasm yuklash (/api/admin/upload) tekshiruvi...');
  // 1x1 transparent PNG buffer
  const samplePngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  const formData = new FormData();
  const blob = new Blob([samplePngBuffer], { type: 'image/png' });
  formData.append('file', blob, 'test-upload-sample.png');

  const uploadRes = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  const uploadData = await uploadRes.json();
  if (!uploadRes.ok || !uploadData.url) {
    throw new Error(`Rasm yuklash muvaffaqiyatsiz: ${JSON.stringify(uploadData)}`);
  }
  console.log(`   ✅ Rasm muvaffaqiyatli yuklandi! URL: ${uploadData.url}\n`);

  // 3. SERVICES CRUD
  console.log('3. Xizmatlar (Services) CRUD tekshiruvi...');
  // A: POST new service
  const newServiceData = {
    service_id: `test-srv-${Date.now()}`,
    title_uz: 'Test Xizmat UZ',
    title_ru: 'Тест Услуга RU',
    desc_uz: 'Test tavsif',
    desc_ru: 'Тест описание',
    price_note_uz: '100 000 so\'m',
    price_note_ru: '100 000 сум',
    badge_uz: 'Test',
    badge_ru: 'Тест',
    image: uploadData.url,
    sort_order: 99,
  };
  const createSrvRes = await fetch(`${BASE_URL}/api/admin/services`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(newServiceData),
  });
  const createdSrv = await createSrvRes.json();
  if (!createSrvRes.ok || !createdSrv.data) {
    throw new Error(`Xizmat qo'shishda xatolik: ${JSON.stringify(createdSrv)}`);
  }
  const srvDbId = createdSrv.data.id;
  console.log(`   ✅ Yangi xizmat qo'shildi (ID: ${srvDbId})`);

  // B: PUT update service
  const updateSrvRes = await fetch(`${BASE_URL}/api/admin/services`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      id: srvDbId,
      title_uz: 'Test Xizmat UZ (Tahrirlandi)',
      price_note_uz: '150 000 so\'m',
    }),
  });
  if (!updateSrvRes.ok) {
    const err = await updateSrvRes.json();
    throw new Error(`Xizmatni tahrirlashda xatolik: ${JSON.stringify(err)}`);
  }
  console.log('   ✅ Xizmat muvaffaqiyatli tahrirlandi');

  // C: DELETE service
  const deleteSrvRes = await fetch(`${BASE_URL}/api/admin/services?id=${srvDbId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!deleteSrvRes.ok) {
    const err = await deleteSrvRes.json();
    throw new Error(`Xizmatni o'chirishda xatolik: ${JSON.stringify(err)}`);
  }
  console.log('   ✅ Xizmat muvaffaqiyatli o\'chirildi\n');

  // 4. REVIEWS CRUD
  console.log('4. Sharhlar (Reviews) CRUD tekshiruvi...');
  // A: POST new review
  const newReviewData = {
    author_uz: 'Test Mijoz',
    author_ru: 'Тест Клиент',
    text_uz: 'Zo\'r xizmat!',
    text_ru: 'Отличный сервис!',
    service_uz: 'Gaz qozoni',
    service_ru: 'Газовый котел',
    rating: 5,
    avatar: uploadData.url,
    is_visible: true,
  };
  const createRevRes = await fetch(`${BASE_URL}/api/admin/reviews`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(newReviewData),
  });
  const createdRev = await createRevRes.json();
  if (!createRevRes.ok || !createdRev.data) {
    throw new Error(`Sharh qo'shishda xatolik: ${JSON.stringify(createdRev)}`);
  }
  const revDbId = createdRev.data.id;
  console.log(`   ✅ Yangi sharh qo'shildi (ID: ${revDbId})`);

  // B: PUT update review
  const updateRevRes = await fetch(`${BASE_URL}/api/admin/reviews`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      id: revDbId,
      text_uz: 'Zo\'r xizmat! (Tahrirlandi)',
      rating: 4,
    }),
  });
  if (!updateRevRes.ok) {
    const err = await updateRevRes.json();
    throw new Error(`Sharhni tahrirlashda xatolik: ${JSON.stringify(err)}`);
  }
  console.log('   ✅ Sharh muvaffaqiyatli tahrirlandi');

  // C: DELETE review
  const deleteRevRes = await fetch(`${BASE_URL}/api/admin/reviews?id=${revDbId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!deleteRevRes.ok) {
    const err = await deleteRevRes.json();
    throw new Error(`Sharhni o'chirishda xatolik: ${JSON.stringify(err)}`);
  }
  console.log('   ✅ Sharh muvaffaqiyatli o\'chirildi\n');

  // 5. SERVICE DETAILS SAVE & FETCH
  console.log('5. Ichki sahifalar (Service Details) saqlash tekshiruvi...');
  const testSlug = 'remont-gazovyh-kotlov-v-tashkente';
  const getDetailRes = await fetch(`${BASE_URL}/api/admin/service-details?slug=${testSlug}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const detailJson = await getDetailRes.json();
  if (!getDetailRes.ok || !detailJson.data) {
    throw new Error(`Service detail olishda xatolik: ${JSON.stringify(detailJson)}`);
  }
  const existingDetail = detailJson.data;

  // PUT update detail with safe payload
  const updateDetailRes = await fetch(`${BASE_URL}/api/admin/service-details`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      slug: testSlug,
      title_uz: existingDetail.title_uz,
      title_ru: existingDetail.title_ru,
      subtitle_uz: existingDetail.subtitle_uz,
      subtitle_ru: existingDetail.subtitle_ru,
      badge_uz: existingDetail.badge_uz,
      badge_ru: existingDetail.badge_ru,
      price_from_uz: existingDetail.price_from_uz,
      price_from_ru: existingDetail.price_from_ru,
      hero_image: existingDetail.hero_image,
      brands: existingDetail.brands,
      symptom_title_uz: existingDetail.symptom_title_uz,
      symptom_title_ru: existingDetail.symptom_title_ru,
      symptom_desc_uz: existingDetail.symptom_desc_uz,
      symptom_desc_ru: existingDetail.symptom_desc_ru,
      symptom_items: existingDetail.symptom_items,
      breakdowns: existingDetail.breakdowns,
    }),
  });
  if (!updateDetailRes.ok) {
    const err = await updateDetailRes.json();
    throw new Error(`Service detail saqlashda xatolik: ${JSON.stringify(err)}`);
  }
  console.log(`   ✅ Ichki sahifa (${testSlug}) va uning barcha nosozliklari muvaffaqiyatli saqlandi\n`);

  // 6. SETTINGS (Landing)
  console.log('6. Landing sozlamalari (Settings) saqlash tekshiruvi...');
  const putSettingRes = await fetch(`${BASE_URL}/api/admin/settings`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      section: 'hero',
      lang: 'uz',
      data: {
        title: 'Toshkentda gaz qozonlarini ta\'mirlash',
        subtitle: 'Professional ustalar tomonidan tezkor ta\'mirlash xizmati',
        ctaBtn: 'Ustani chaqirish',
        urgency: 'Qo\'ng\'iroq qiling va usta 60 daqiqada yetib boradi.',
        image: uploadData.url,
      },
    }),
  });
  if (!putSettingRes.ok) {
    const err = await putSettingRes.json();
    throw new Error(`Sozlamalarni saqlashda xatolik: ${JSON.stringify(err)}`);
  }
  console.log('   ✅ Landing Hero sozlamalari va rasm manzili muvaffaqiyatli saqlandi\n');

  console.log('🎉 BARCHA OPERATSIYALAR (YUKLASH, QO\'SHISH, TAHRIRLASH, SAQLASH VA O\'CHIRISH) 100% XATOSIZ ISHLADI!');
}

testAll().catch(err => {
  console.error('\n❌ XATOLIK ANIQLANDI:', err);
  process.exit(1);
});
