/**
 * Supabase SQL Executor — jadvallarni REST API orqali yaratadi
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

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Supabase credentials topilmadi .env da');
  process.exit(1);
}

const sqlContent = fs.readFileSync(path.join(__dirname, 'create-tables.sql'), 'utf8');

// SQL ni statement larga bo'lamiz
const statements = sqlContent
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

async function executeSql(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });
  return res;
}

async function main() {
  console.log('🚀 Supabase jadvallar yaratilmoqda...\n');

  // Supabase Management API orqali SQL bajarish
  // REST endpoint: POST /pg/query (unofficial, but works with service key)
  
  // Barchasini bitta so'rov sifatida yuboramiz
  const fullSql = sqlContent;
  
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ sql: fullSql }),
    });

    if (res.ok) {
      console.log('✅ Jadvallar muvaffaqiyatli yaratildi!');
    } else {
      const text = await res.text();
      console.log('⚠️ RPC ishlamadi (kutilgan):', res.status);
      console.log('📌 Jadvallarni qo\'lda yarating:');
      console.log('   1. Supabase Dashboard → SQL Editor → New Query');
      console.log('   2. scripts/create-tables.sql faylini nusxalang va bajaring');
      console.log('   3. Keyin bu skriptni qayta ishga tushiring: node scripts/run-migration.js');
    }
  } catch (err) {
    console.log('⚠️ Xato:', err.message);
    console.log('📌 Jadvallarni qo\'lda yarating: Supabase Dashboard → SQL Editor');
  }

  // Ma'lumotlarni ko'chirish (jadvallar tayyor bo'lsa)
  console.log('\n📦 Ma\'lumotlarni migratsiya qilish...');
  await migrateData();
}

async function supabaseInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${table}: ${res.status} - ${text}`);
  }
}

async function supabaseUpsert(table, data, onConflict) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${table}: ${res.status} - ${text}`);
  }
}

async function supabaseDelete(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=neq.00000000-0000-0000-0000-000000000000`, {
    method: 'DELETE',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=minimal',
    },
  });
  return res.ok;
}

async function migrateData() {
  // ===== SITE SETTINGS =====
  try {
    console.log('  ⚙️ Site settings...');
    const settings = [
      { section: 'meta', lang: 'ru', data: { title: '«Toshkent Service» / Ремонт газовых котлов в Ташкенте', description: 'Наши специалисты готовы выполнить профессиональный ремонт газовых котлов в Ташкенте любой сложности.' } },
      { section: 'meta', lang: 'uz', data: { title: '«Toshkent Service» / Toshkentda gaz qozonlarini ta\'mirlash', description: 'Bizning mutaxassislarimiz Toshkentda har qanday turdagi gaz qozonlarini kafolat bilan ta\'mirlashga tayyor.' } },
      { section: 'nav', lang: 'ru', data: { services: 'Услуги', about: 'О нас', whyUs: 'Почему мы?', reviews: 'Отзывы', contacts: 'Контакты', orderBtn: 'Заказать', callNow: 'Позвонить' } },
      { section: 'nav', lang: 'uz', data: { services: 'Xizmatlar', about: 'Biz haqimizda', whyUs: 'Nega biz?', reviews: 'Sharhlar', contacts: 'Bog\'lanish', orderBtn: 'Buyurtma berish', callNow: 'Qo\'ng\'iroq qilish' } },
      { section: 'hero', lang: 'ru', data: { title: 'Ремонт газовых котлов в Ташкенте', subtitle: 'Быстрый и качественный ремонт любой сложности с гарантией до 1 года и выездом мастера на дом', pills: [{ title: 'Диагностика 80 000 сум', highlight: '80 000 сум' }, { title: 'Выезд мастера бесплатный', highlight: 'бесплатный' }, { title: 'Гарантия от 1 месяца до года', highlight: 'до 1 года' }, { title: 'Опыт мастеров больше 10 лет', highlight: 'больше 10 лет' }], ctaBtn: 'Вызвать мастера', urgency: 'Позвоните и мастер бесплатно приедет через 60 мин.' } },
      { section: 'hero', lang: 'uz', data: { title: 'Toshkentda gaz qozonlarini ta\'mirlash', subtitle: 'Har qanday murakkablikdagi tezkor va sifatli ta\'mirlash, 1 yilgacha kafolat va ustaning xonadoningizga bepul yetib borishi', pills: [{ title: 'Diagnostika 80 000 so\'m', highlight: '80 000 so\'m' }, { title: 'Usta yetib borishi bepul', highlight: 'bepul' }, { title: '1 oydan 1 yilgacha kafolat', highlight: '1 yilgacha' }, { title: 'Ustalarning tajribasi 10 yildan ortiq', highlight: '10 yildan ortiq' }], ctaBtn: 'Ustani chaqirish', urgency: 'Qo\'ng\'iroq qiling va usta 60 daqiqada bepul yetib boradi.' } },
      { section: 'contacts', lang: 'ru', data: { badge: 'Как нас найти', title: 'Контакты', addressLabel: 'Адрес', addressVal: 'город Ташкент, Яшнабадский район, улица Талимаржан, 15', phoneLabel: 'Телефон', phoneVal: '+998 95 848 40 40', scheduleLabel: 'График работы:', scheduleWeekdays: 'Пн - Пт с 10:00 - 19:00', scheduleWeekend: 'Сб - Вс и праздники: с 11:00 - 18:00', scheduleEmergency: 'Срочный выезд мастеров — круглосуточно 24/7' } },
      { section: 'contacts', lang: 'uz', data: { badge: 'Bizni qayerdan topasiz', title: 'Bog\'lanish', addressLabel: 'Manzil', addressVal: 'Toshkent shahri, Yashnobod tumani, Talimarjon ko\'chasi, 15-uy', phoneLabel: 'Telefon', phoneVal: '+998 95 848 40 40', scheduleLabel: 'Ish tartibi:', scheduleWeekdays: 'Dush - Juma: 10:00 - 19:00', scheduleWeekend: 'Shan - Yak va bayramlar: 11:00 - 18:00', scheduleEmergency: 'Ustalarning tezkor chiqishi — 24/7 kechayu-kunduz' } },
      { section: 'footer', lang: 'ru', data: { copyright: 'Copyright © 2025 Все права защищены.', telegram: 'https://t.me/BURON_YG', instagram: 'https://www.instagram.com/serveskotlov.uz/', phone: '+998958484040', serviceCenter: 'Специализированный центр по ремонту в Ташкенте.' } },
      { section: 'footer', lang: 'uz', data: { copyright: 'Copyright © 2025 Barcha huquqlar himoyalangan.', telegram: 'https://t.me/BURON_YG', instagram: 'https://www.instagram.com/serveskotlov.uz/', phone: '+998958484040', serviceCenter: 'Toshkentda maishiy texnika ta\'mirlash bo\'yicha ixtisoslashgan markaz.' } },
      { section: 'fab', lang: 'ru', data: { call: 'Позвонить', telegram: 'Написать в Telegram' } },
      { section: 'fab', lang: 'uz', data: { call: 'Qo\'ng\'iroq qilish', telegram: 'Telegram orqali yozish' } },
      { section: 'modal', lang: 'ru', data: { title: 'Оставьте заявку', subtitle: 'Заполните форму и мастер приедет в течение 60 минут', name: 'Имя', namePlaceholder: 'Введите ваше имя', phone: 'Телефон', phonePlaceholder: '+998 (__) ___-__-__', service: 'Тип услуги', servicePlaceholder: 'Выберите проблему', servicesList: ['Ремонт газовых котлов', 'Ремонт холодильников', 'Ремонт кондиционеров', 'Ремонт стиральных машин', 'Другая проблема'], comment: 'Что именно не работает? (необязательно)', commentPlaceholder: 'Например: не греет воду', submit: 'Отправить', submitting: 'Отправка...', success: 'Спасибо! Ваша заявка успешно отправлена.', successSub: 'Дежурный мастер свяжется с вами через пару минут.', close: 'Закрыть', privacy: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных' } },
      { section: 'modal', lang: 'uz', data: { title: 'Buyurtma qoldiring', subtitle: 'Formani to\'ldiring va usta 60 daqiqada yetib boradi', name: 'Ism', namePlaceholder: 'Ismingizni kiriting', phone: 'Telefon', phonePlaceholder: '+998 (__) ___-__-__', service: 'Xizmat turi', servicePlaceholder: 'Muammoni tanlang', servicesList: ['Gaz qozonlari ta\'miri', 'Xolodilniklar ta\'miri', 'Konditsionerlar ta\'miri', 'Kir yuvish mashinalari ta\'miri', 'Boshqa muammo'], comment: 'Aniq nima ishlamayapti? (ixtiyoriy)', commentPlaceholder: 'Masalan: suv isitmayapti', submit: 'Yuborish', submitting: 'Yuborilmoqda...', success: 'Rahmat! Buyurtmangiz muvaffaqiyatli qabul qilindi.', successSub: 'Navbatchi usta bir necha daqiqa ichida siz bilan bog\'lanadi.', close: 'Yopish', privacy: 'Tugmani bosish orqali siz shaxsiy ma\'lumotlarni qayta ishlashga rozilik bildirasiz' } },
      { section: 'urgencyBanner', lang: 'ru', data: { title: 'Не откладывайте ремонт, обращайтесь сейчас!', desc: 'Выезд мастера в день заявки.', btn: 'Вызвать мастера', or: 'или', callLabel: 'Позвоните в любое время', formTitle: 'Быстрая онлайн заявка', formSubtitle: 'Мастер перезвонит в течение 5 минут', namePlaceholder: 'Ваше имя', phonePlaceholder: '+998 (__) ___-__-__', servicePlaceholder: 'Выберите проблему', submitBtn: 'Отправить заявку', sending: 'Отправка...', successTitle: 'Заявка принята!', successDesc: 'Мастер свяжется с вами в течение 5-10 минут.' } },
      { section: 'urgencyBanner', lang: 'uz', data: { title: 'Ta\'mirlashni kechiktirmang, hoziroq murojaat qiling!', desc: 'Ustaning tashrifi buyurtma kunining o\'zida.', btn: 'Ustani chaqirish', or: 'yoki', callLabel: 'Istalgan vaqtda qo\'ng\'iroq qiling', formTitle: 'Tezkor onlayn buyurtma', formSubtitle: 'Usta 5 daqiqa ichida maslahat uchun bog\'lanadi', namePlaceholder: 'Ismingiz', phonePlaceholder: '+998 (__) ___-__-__', servicePlaceholder: 'Muammoni tanlang', submitBtn: 'Buyurtmani yuborish', sending: 'Yuborilmoqda...', successTitle: 'Buyurtma qabul qilindi!', successDesc: 'Usta 5-10 daqiqa ichida siz bilan bog\'lanadi.' } },
      { section: 'about', lang: 'ru', data: { badge: 'О компании Toshkent Service', title: 'Ремонт газовых котлов и бытовой техники', description: 'Наши специалисты готовы выполнить срочный ремонт бытовой техники 24/7 в Ташкенте.', experienceBox: { title: 'Гарантируем качество', desc: 'Гарантия на работу и запчасти – от 3 до 24 месяцев.' }, features: [{ icon: '/images/icon-service-1.svg', title: 'Выезд в день заявки', desc: 'Оперативная помощь.' }, { icon: '/images/icon-service-2.svg', title: 'Работаем ежедневно', desc: '24/7.' }] } },
      { section: 'about', lang: 'uz', data: { badge: 'Toshkent Service kompaniyasi haqida', title: 'Gaz qozonlari va maishiy texnikani kafolatli ta\'mirlash', description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz maishiy texnika ustasi uyga chaqirish xizmatini taqdim etadilar.', experienceBox: { title: 'Sifatga kafolat beramiz', desc: 'Ishga va ehtiyot qismlarga 3 oydan 24 oygacha kafolat beramiz.' }, features: [{ icon: '/images/icon-service-1.svg', title: 'Buyurtma kunida yetib borish', desc: 'Tezkor yordam.' }, { icon: '/images/icon-service-2.svg', title: 'Har kuni ishlaymiz', desc: '24/7.' }] } },
      { section: 'facts', lang: 'ru', data: { title: 'Профессиональный ремонт котлов', description: 'Наши специалисты готовы выполнить любой ремонт газовых котлов в Ташкенте.', points: ['Работаем круглосуточно. Выезд возможен 24/7', 'Только специалисты с многолетним стажем.', 'Расчёт после ремонта.'] } },
      { section: 'facts', lang: 'uz', data: { title: 'Professional qozon ta\'mirlash', description: 'Bizning mutaxassislarimiz Toshkent shahrida gaz qozonlarini ta\'mirlashga tayyor.', points: ['Kechayu-kunduz ishlaymiz. 24/7', 'Faqat ko\'p yillik tajribali mutaxassislar.', 'To\'lov ta\'mirdan so\'ng.'] } },
      { section: 'servicesSection', lang: 'ru', data: { badge: 'Качественные услуги', title: 'Наши услуги', subtitle: 'Ремонтируем и обслуживаем газовые котлы всех ведущих брендов', orderBtn: 'Заказать ремонт' } },
      { section: 'servicesSection', lang: 'uz', data: { badge: 'Sifatli xizmatlar', title: 'Bizning xizmatlar', subtitle: 'Barcha yetakchi brendlarning gaz qozonlarini ta\'mirlaymiz va xizmat ko\'rsatamiz', orderBtn: 'Ta\'mirlashga buyurtma' } },
      { section: 'reviewsSection', lang: 'ru', data: { badge: 'Мнения людей', title: 'Отзывы наших клиентов', subtitle: 'Реальные впечатления клиентов' } },
      { section: 'reviewsSection', lang: 'uz', data: { badge: 'Mijozlar fikri', title: 'Mijozlarimizning sharhlari', subtitle: 'Toshkentda amalga oshirilgan gaz qozoni ta\'mirlash bo\'yicha haqiqiy fikrlar' } },
    ];

    for (const s of settings) {
      await supabaseUpsert('site_settings', s);
    }
    console.log('  ✅ Site settings tayyor');
  } catch (err) {
    console.error('  ❌ Site settings:', err.message);
  }

  // ===== SERVICES =====
  try {
    console.log('  🔧 Services...');
    const services = [
      { service_id: 'gas-boilers', sort_order: 1, title_ru: 'Ремонт газовых котлов', title_uz: 'Gaz qozonlarini ta\'mirlash', desc_ru: 'Диагностика, ремонт плат управления, замена датчиков и промывка теплообменников.', desc_uz: 'Diagnostika, boshqaruv platalarini tuzatish, datchiklarni almashtirish va xatoliklarni bartaraf etish.', image: '/images/service-gas-boiler.png', price_note_ru: 'От 100 000 сум', price_note_uz: '100 000 so\'mdan', badge_ru: 'Срочный выезд', badge_uz: 'Tezkor chiqish' },
      { service_id: 'refrigerators', sort_order: 2, title_ru: 'Ремонт холодильников', title_uz: 'Xolodilniklarni ta\'mirlash', desc_ru: 'Заправка фреоном, замена мотора-компрессора, устранение утечек и ремонт электроники.', desc_uz: 'Freon quyish, motor-kompressorni almashtirish, gaz sizishini yo\'qotish va elektronikani ta\'mirlash.', image: '/images/service-fridge.png', price_note_ru: 'От 120 000 сум', price_note_uz: '120 000 so\'mdan', badge_ru: 'Все марки', badge_uz: 'Barcha modellar' },
      { service_id: 'air-conditioners', sort_order: 3, title_ru: 'Ремонт кондиционеров', title_uz: 'Konditsionerlarni ta\'mirlash', desc_ru: 'Профессиональная чистка, заправка фреоном, устранение утечек и устранение ошибок.', desc_uz: 'Professional tozalash, freon bilan to\'ldirish, nosozliklarni izlash va plata ta\'miri.', image: '/images/service-ac.png', price_note_ru: 'От 150 000 сум', price_note_uz: '150 000 so\'mdan', badge_ru: 'Гарантия качества', badge_uz: 'Kafolatli sifat' },
      { service_id: 'washing-machines', sort_order: 4, title_ru: 'Ремонт стиральных машин', title_uz: 'Kir yuvish mashinalarini ta\'mirlash', desc_ru: 'Замена подшипников, сливных насосов, ТЭНов. Ремонт плат управления и двигателей.', desc_uz: 'Podshipniklar, nasoslar va isitkich (TEN)larni almashtirish. Boshqaruv platalari ta\'miri.', image: '/images/service-washing.png', price_note_ru: 'От 140 000 сум', price_note_uz: '140 000 so\'mdan', badge_ru: 'Оригинальные запчасти', badge_uz: 'Asl ehtiyot qismlar' },
    ];
    for (const s of services) {
      await supabaseUpsert('services', s);
    }
    console.log('  ✅ Services tayyor');
  } catch (err) {
    console.error('  ❌ Services:', err.message);
  }

  // ===== REVIEWS =====
  try {
    console.log('  ⭐ Reviews...');
    await supabaseDelete('reviews');
    const reviews = [
      { author_ru: 'Азамат Р.', author_uz: 'Azamat R.', avatar: '/images/author-2.jpg', rating: 5, text_ru: 'Обратился по поводу ремонта двухконтурного котла — мастер приехал в тот же день, быстро нашёл проблему и всё устранил.', text_uz: 'Ikki konturli qozonni ta\'mirlash bo\'yicha murojaat qildim — usta o\'sha kunning o\'zidayoq keldi, muammoni tezda topdi va tuzatdi.', service_ru: 'Ремонт котла', service_uz: 'Qozon ta\'miri', date_ru: 'Вчера', date_uz: 'Kecha', sort_order: 1 },
      { author_ru: 'Шахло М.', author_uz: 'Shahlo M.', avatar: '/images/author-1.jpg', rating: 5, text_ru: 'Очень довольна сервисом! Котел не грел воду, думала придётся менять деталь, но специалисты просто промыли теплообменник.', text_uz: 'Xizmatdan juda mamnunman! Qozon issiq suv bermay qo\'ygandi, ammo ustalar teploobmennikni tozalab berishdi.', service_ru: 'Чистка теплообменника', service_uz: 'Teploobmennik yuvish', date_ru: '3 дня назад', date_uz: '3 kun oldin', sort_order: 2 },
      { author_ru: 'Бобур Т.', author_uz: 'Bobur T.', avatar: '/images/author-2.jpg', rating: 5, text_ru: 'Ремонтировали напольный котёл. Приехали вовремя, всё сделали аккуратно.', text_uz: 'Yerga o\'rnatiladigan qozonni ta\'mirlashdi. Vaqtida yetib kelishdi.', service_ru: 'Ремонт напольного котла', service_uz: 'Qozon ta\'miri', date_ru: '1 неделя назад', date_uz: '1 hafta oldin', sort_order: 3 },
      { author_ru: 'Мухлиса К.', author_uz: 'Muxlisa K.', avatar: '/images/author-1.jpg', rating: 5, text_ru: 'Профессиональный подход и вежливые мастера. Котел стал работать тихо.', text_uz: 'Professional yondashuv va xushmuomala ustalar. Qozon sokin ishlay boshladi.', service_ru: 'Обслуживание котла', service_uz: 'Profilaktika', date_ru: '2 недели назад', date_uz: '2 hafta oldin', sort_order: 4 },
      { author_ru: 'Сардор Ж.', author_uz: 'Sardor J.', avatar: '/images/author-2.jpg', rating: 5, text_ru: 'Ремонт платы управления прошёл быстро, мастер знал своё дело.', text_uz: 'Platani ta\'mirlash juda tez kechdi, usta o\'z ishining ustasi ekan.', service_ru: 'Ремонт платы', service_uz: 'Platani ta\'mirlash', date_ru: '3 недели назад', date_uz: '3 hafta oldin', sort_order: 5 },
      { author_ru: 'Гуля Д.', author_uz: 'Gulya D.', avatar: '/images/author-1.jpg', rating: 5, text_ru: 'Очень благодарна за срочный ремонт котла! Все сделали за один визит.', text_uz: 'Qozonni tezda tuzatib berishgani uchun kattakon rahmat!', service_ru: 'Срочный ремонт котла', service_uz: 'Tezkor ta\'mirlash', date_ru: 'Месяц назад', date_uz: '1 oy oldin', sort_order: 6 },
    ];
    await supabaseInsert('reviews', reviews);
    console.log('  ✅ Reviews tayyor');
  } catch (err) {
    console.error('  ❌ Reviews:', err.message);
  }

  // ===== COUNTERS =====
  try {
    console.log('  📊 Counters...');
    const counters = [
      { counter_id: 'repaired', target: 3500, suffix: '+', label_ru: 'Отремонтированных котлов', label_uz: 'Ta\'mirlangan qozonlar', icon: '/images/icon-counter-1.svg', sort_order: 1 },
      { counter_id: 'founded', target: 2015, suffix: '+', label_ru: 'Год основания', label_uz: 'Tashkil etilgan yil', icon: '/images/icon-counter-2.svg', sort_order: 2 },
      { counter_id: 'clients', target: 3400, suffix: '+', label_ru: 'Удовлетворенных клиентов', label_uz: 'Mamnun mijozlar', icon: '/images/icon-counter-3.svg', sort_order: 3 },
      { counter_id: 'masters', target: 15, suffix: '+', label_ru: 'Опытных мастеров', label_uz: 'Tajribali ustalar', icon: '/images/icon-counter-4.svg', sort_order: 4 },
    ];
    for (const c of counters) {
      await supabaseUpsert('counters', c);
    }
    console.log('  ✅ Counters tayyor');
  } catch (err) {
    console.error('  ❌ Counters:', err.message);
  }

  // ===== SERVICE DETAILS =====
  try {
    console.log('  📋 Service Details...');
    const details = [
      { slug: 'remont-holodilnikov-v-tashkente', title_ru: 'Ремонт холодильников в Ташкенте', title_uz: 'Toshkentda xolodilniklarni ta\'mirlash', subtitle_ru: 'Ремонт холодильников в Ташкенте недорого и с гарантией.', subtitle_uz: 'Toshkentda xolodilniklarni arzon va kafolatli ta\'mirlash.', hero_image: '/images/service-fridge.png', badge_ru: 'Мастер по холодильникам', badge_uz: 'Xolodilnik ustasi', price_from_ru: 'От 80 000 сум', price_from_uz: '80 000 so\'mdan', brands: ['Bosch','Samsung','LG','Miele','Electrolux','Ariston','Beko','Siemens'], symptom_title_ru: 'Как избежать поломок', symptom_title_uz: 'Buzilishlarning oldini olish', symptom_desc_ru: 'Качественный ремонт стоит дорого.', symptom_desc_uz: 'Sifatli ta\'mir qimmatga tushadi.', symptom_items: [{ru:'Устанавливать оборудование минимум 50 см от тепла',uz:'Uskunani issiqlik manbalaridan kamida 50 sm masofada o\'rnatish kerak'}], seo_text: {} },
      { slug: 'remont-gazovyh-kotlov-v-tashkente', title_ru: 'Ремонт газовых котлов в Ташкенте', title_uz: 'Toshkentda gaz qozonlarini ta\'mirlash', subtitle_ru: 'Ремонт газовых котлов в Ташкенте. Чистка и обслуживание.', subtitle_uz: 'Toshkentda gaz qozonlarini ta\'mirlash va profilaktika.', hero_image: '/images/service-gas-boiler.png', badge_ru: 'Мастер по газовым котлам', badge_uz: 'Gaz qozonlari ustasi', price_from_ru: 'От 80 000 сум', price_from_uz: '80 000 so\'mdan', brands: ['Navien','Baxi','Ariston','Immergas','Ferroli','Viessmann','Vaillant','Protherm','Bosch'], symptom_title_ru: 'Типичные симптомы', symptom_title_uz: 'Odatiy belgilar', symptom_desc_ru: 'Если вы заметили один из этих признаков:', symptom_desc_uz: 'Agar ushbu belgilardan birini sezsangiz:', symptom_items: [{ru:'Котел издает необычные звуки',uz:'Kotyol noodatiy tovushlar chiqarmoqda'}], seo_text: {} },
      { slug: 'remont-stiralnyh-mashin-v-tashkente', title_ru: 'Ремонт стиральных машин в Ташкенте', title_uz: 'Toshkentda kir yuvish mashinalarini ta\'mirlash', subtitle_ru: 'Срочный выезд мастера за 60 минут.', subtitle_uz: 'Ustaning 60 daqiqada tezkor yetib borishi.', hero_image: '/images/service-washing.png', badge_ru: 'Мастер по стиральным машинам', badge_uz: 'Kir yuvish mashinasi ustasi', price_from_ru: 'От 80 000 сум', price_from_uz: '80 000 so\'mdan', brands: ['Samsung','LG','Bosch','Miele','Electrolux','Indesit','Beko','Siemens'], symptom_title_ru: 'Когда пора вызывать мастера', symptom_title_uz: 'Qachon usta chaqirish kerak', symptom_desc_ru: 'Если вы заметили один из симптомов:', symptom_desc_uz: 'Agar quyidagi belgilardan birini sezsangiz:', symptom_items: [{ru:'Выводит коды ошибок',uz:'Displeyda xatolik kodlari chiqmoqda'}], seo_text: {} },
      { slug: 'remont-kondiczionerov-v-tashkente', title_ru: 'Ремонт кондиционеров в Ташкенте', title_uz: 'Toshkentda konditsionerlarni ta\'mirlash', subtitle_ru: 'Профессиональная заправка фреоном.', subtitle_uz: 'Freonlarini professional quyish.', hero_image: '/images/service-ac.png', badge_ru: 'Мастер по кондиционерам', badge_uz: 'Konditsionerlar ustasi', price_from_ru: 'От 90 000 сум', price_from_uz: '90 000 so\'mdan', brands: ['Gree','Midea','Artel','Samsung','LG','Chigo','AUX','Haier','Daikin'], symptom_title_ru: 'Симптомы поломки сплит-системы', symptom_title_uz: 'Split-tizim nosozligi belgilari', symptom_desc_ru: 'Регулярное техобслуживание снижает расход на 30%:', symptom_desc_uz: 'Muntazam profilaktika elektr sarfini 30% tejaydi:', symptom_items: [{ru:'Обмерзание медных трубок',uz:'Mis quvurlarda muz hosil bo\'lishi'}], seo_text: {} },
    ];
    for (const d of details) {
      await supabaseUpsert('service_details', d);
    }
    console.log('  ✅ Service Details tayyor');
  } catch (err) {
    console.error('  ❌ Service Details:', err.message);
  }

  // ===== BREAKDOWNS =====
  try {
    console.log('  🔩 Breakdowns...');
    await supabaseDelete('breakdowns');
    const breakdowns = [
      { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'not-freezing', title_ru: 'Не морозит', title_uz: 'Muzlatmayapti', description_ru: 'Замена термостата, заправка фреоном', description_uz: 'Termostatni almashtirish, freon quyish', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'ice', image: '/images/service-fridge.png', sort_order: 1 },
      { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'no-power-fridge', title_ru: 'Не включается', title_uz: 'Yonmayapti', description_ru: 'Замена термостата, мотор-компрессора', description_uz: 'Termostatni almashtirish, motor-kompressor', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'power', image: '/images/service-fridge.png', sort_order: 2 },
      { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'noisy-fridge', title_ru: 'Гудит или вибрирует', title_uz: 'Guvullaydi yoki tebranadi', description_ru: 'Замена мотор-компрессора, реле', description_uz: 'Motor-kompressorni almashtirish', price_ru: 'от 150 000 сум', price_uz: '150 000 so\'mdan', icon_type: 'noise', image: '/images/service-fridge.png', sort_order: 3 },
      { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'no-ignition', title_ru: 'Не зажигается горелка', title_uz: 'Gorelka yonmayapti', description_ru: 'Ремонт системы розжига', description_uz: 'Yoqish tizimini ta\'mirlash', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'power', image: '/images/service-gas-boiler.png', sort_order: 1 },
      { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'weak-heating', title_ru: 'Слабый нагрев воды', title_uz: 'Suv isitish past darajada', description_ru: 'Чистка теплообменника', description_uz: 'Issiqlik almashtirgichni tozalash', price_ru: 'от 150 000 сум', price_uz: '150 000 so\'mdan', icon_type: 'temp', image: '/images/service-gas-boiler.png', sort_order: 2 },
      { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'water-leak-boiler', title_ru: 'Капает вода из котла', title_uz: 'Kotyoldan suv tomyapti', description_ru: 'Устранение протечки', description_uz: 'Suv oqishini bartaraf etish', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'water', image: '/images/service-gas-boiler.png', sort_order: 3 },
      { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-heat-wash', title_ru: 'Не греет воду', title_uz: 'Suvni isitmayapti', description_ru: 'Перегорел ТЭН', description_uz: 'TEN kuygan', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'temp', image: '/images/service-washing.png', sort_order: 1 },
      { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-power-wash', title_ru: 'Не включается', title_uz: 'Yonmayapti', description_ru: 'Неисправна плата управления', description_uz: 'Boshqaruv platasi nosoz', price_ru: 'от 95 000 сум', price_uz: '95 000 so\'mdan', icon_type: 'power', image: '/images/service-washing.png', sort_order: 2 },
      { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-spin', title_ru: 'Не крутит барабан', title_uz: 'Baraban aylanmayapti', description_ru: 'Износ щёток, ремень', description_uz: 'Motor cho\'tkalari yeyilgan', price_ru: 'от 130 000 сум', price_uz: '130 000 so\'mdan', icon_type: 'spin', image: '/images/service-washing.png', sort_order: 3 },
      { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'no-cold-ac', title_ru: 'Не охлаждает', title_uz: 'Sovutmayapti', description_ru: 'Заправка фреоном', description_uz: 'Freon quyish', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'temp', image: '/images/service-ac.png', sort_order: 1 },
      { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'no-turn-on-ac', title_ru: 'Не включается', title_uz: 'Yonmayapti', description_ru: 'Ремонт платы управления', description_uz: 'Boshqaruv platasini ta\'mirlash', price_ru: 'от 90 000 сум', price_uz: '90 000 so\'mdan', icon_type: 'power', image: '/images/service-ac.png', sort_order: 2 },
      { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'noise-ac', title_ru: 'Шумит', title_uz: 'Shovqin qilyapti', description_ru: 'Замена вентилятора', description_uz: 'Ventilyatorni almashtirish', price_ru: 'от 110 000 сум', price_uz: '110 000 so\'mdan', icon_type: 'noise', image: '/images/service-ac.png', sort_order: 3 },
    ];
    await supabaseInsert('breakdowns', breakdowns);
    console.log('  ✅ Breakdowns tayyor');
  } catch (err) {
    console.error('  ❌ Breakdowns:', err.message);
  }

  console.log('\n🎉 Migratsiya yakunlandi!');
}

main().catch(console.error);
