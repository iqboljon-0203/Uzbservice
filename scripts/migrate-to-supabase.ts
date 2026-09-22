/**
 * Supabase migratsiya skripti
 * Jadvallar yaratadi va barcha statik ma'lumotlarni ko'chiradi
 * 
 * Ishga tushirish: npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL yoki SUPABASE_SERVICE_ROLE_KEY topilmadi .env faylda');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ======= JADVALLAR YARATISH =======
async function createTables() {
  console.log('📦 Jadvallar yaratilmoqda...');

  // 1. site_settings
  const { error: e1 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS site_settings (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        section text NOT NULL,
        lang text NOT NULL DEFAULT 'ru',
        data jsonb NOT NULL DEFAULT '{}',
        updated_at timestamptz DEFAULT now(),
        UNIQUE(section, lang)
      );
    `
  });
  if (e1) {
    // rpc mavjud bo'lmasa, REST orqali yaratamiz
    console.log('⚠️ RPC mavjud emas, SQL Editor orqali jadvallar yarating yoki davom etamiz...');
  }

  // 2. services
  const { error: e2 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS services (
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
      );
    `
  });

  // 3. reviews
  const { error: e3 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS reviews (
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
      );
    `
  });

  // 4. counters
  const { error: e4 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS counters (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        counter_id text UNIQUE NOT NULL,
        target int NOT NULL DEFAULT 0,
        suffix text DEFAULT '+',
        label_ru text NOT NULL DEFAULT '',
        label_uz text NOT NULL DEFAULT '',
        icon text DEFAULT '',
        sort_order int DEFAULT 0
      );
    `
  });

  // 5. service_details
  const { error: e5 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS service_details (
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
      );
    `
  });

  // 6. breakdowns
  const { error: e6 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS breakdowns (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        service_detail_slug text NOT NULL REFERENCES service_details(slug) ON DELETE CASCADE,
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
      );
    `
  });

  // 7. leads
  const { error: e7 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS leads (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text DEFAULT '',
        phone text NOT NULL,
        service text DEFAULT '',
        comment text DEFAULT '',
        lang text DEFAULT 'ru',
        status text DEFAULT 'new',
        created_at timestamptz DEFAULT now()
      );
    `
  });

  console.log('✅ Jadvallar yaratildi (yoki mavjud)');
}

// ======= MA'LUMOTLARNI KO'CHIRISH =======

async function migrateSettings() {
  console.log('⚙️ Site settings migratsiya qilinmoqda...');

  const settingsData = [
    // META
    {
      section: 'meta', lang: 'ru',
      data: {
        title: '«Toshkent Service» / Ремонт газовых котлов в Ташкенте',
        description: 'Наши специалисты готовы выполнить профессиональный ремонт газовых котлов в Ташкенте любой сложности.',
      }
    },
    {
      section: 'meta', lang: 'uz',
      data: {
        title: '«Toshkent Service» / Toshkentda gaz qozonlarini ta\'mirlash',
        description: 'Bizning mutaxassislarimiz Toshkentda har qanday turdagi gaz qozonlarini kafolat bilan ta\'mirlashga tayyor.',
      }
    },
    // NAV
    {
      section: 'nav', lang: 'ru',
      data: { services: 'Услуги', about: 'О нас', whyUs: 'Почему мы?', reviews: 'Отзывы', contacts: 'Контакты', orderBtn: 'Заказать', callNow: 'Позвонить' }
    },
    {
      section: 'nav', lang: 'uz',
      data: { services: 'Xizmatlar', about: 'Biz haqimizda', whyUs: 'Nega biz?', reviews: 'Sharhlar', contacts: 'Bog\'lanish', orderBtn: 'Buyurtma berish', callNow: 'Qo\'ng\'iroq qilish' }
    },
    // HERO
    {
      section: 'hero', lang: 'ru',
      data: {
        title: 'Ремонт газовых котлов в Ташкенте',
        subtitle: 'Быстрый и качественный ремонт любой сложности с гарантией до 1 года и выездом мастера на дом',
        pills: [
          { title: 'Диагностика 80 000 сум', highlight: '80 000 сум' },
          { title: 'Выезд мастера бесплатный', highlight: 'бесплатный' },
          { title: 'Гарантия от 1 месяца до года', highlight: 'до 1 года' },
          { title: 'Опыт мастеров больше 10 лет', highlight: 'больше 10 лет' },
        ],
        ctaBtn: 'Вызвать мастера',
        urgency: 'Позвоните и мастер бесплатно приедет через 60 мин.',
      }
    },
    {
      section: 'hero', lang: 'uz',
      data: {
        title: 'Toshkentda gaz qozonlarini ta\'mirlash',
        subtitle: 'Har qanday murakkablikdagi tezkor va sifatli ta\'mirlash, 1 yilgacha kafolat va ustaning xonadoningizga bepul yetib borishi',
        pills: [
          { title: 'Diagnostika 80 000 so\'m', highlight: '80 000 so\'m' },
          { title: 'Usta yetib borishi bepul', highlight: 'bepul' },
          { title: '1 oydan 1 yilgacha kafolat', highlight: '1 yilgacha' },
          { title: 'Ustalarning tajribasi 10 yildan ortiq', highlight: '10 yildan ortiq' },
        ],
        ctaBtn: 'Ustani chaqirish',
        urgency: 'Qo\'ng\'iroq qiling va usta 60 daqiqada bepul yetib boradi.',
      }
    },
    // ABOUT
    {
      section: 'about', lang: 'ru',
      data: {
        badge: 'О компании Toshkent Service',
        title: 'Ремонт газовых котлов и бытовой техники',
        description: 'Наши специалисты готовы выполнить срочный ремонт бытовой техники 24/7 в Ташкенте. Мы специализируемся на ремонте газовых котлов (включая промывку газовых котлов), а также предлагаем ремонт холодильников на дому, заправку фреоном кондиционера, и ремонт плат управления стиральных машин.',
        experienceBox: { title: 'Гарантируем качество', desc: 'Гарантия на работу и запчасти – от 3 до 24 месяцев, мы несём полную ответственность.' },
        features: [
          { icon: '/images/icon-service-1.svg', title: 'Выезд в день заявки', desc: 'Оперативная помощь – срочный выезд мастера по Ташкенту, в день заявки.' },
          { icon: '/images/icon-service-2.svg', title: 'Работаем ежедневно', desc: 'Мы ремонтируем котлы для Вас ежедневно: 24/7.' },
        ],
      }
    },
    {
      section: 'about', lang: 'uz',
      data: {
        badge: 'Toshkent Service kompaniyasi haqida',
        title: 'Gaz qozonlari va maishiy texnikani kafolatli ta\'mirlash',
        description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz maishiy texnika ustasi uyga chaqirish xizmatini taqdim etadilar. Asosiy ixtisoslashuvimiz – gaz qozonlarini yuvish va ta\'mirlash, shuningdek, konditsionerlarga freon quyish toshkent, kir yuvish mashinasi platasini tuzatish va xolodilnik motorini almashtirish.',
        experienceBox: { title: 'Sifatga kafolat beramiz', desc: 'Ishga va ehtiyot qismlarga 3 oydan 24 oygacha kafolat beramiz, to\'liq javobgarlikni zimmamizga olamiz.' },
        features: [
          { icon: '/images/icon-service-1.svg', title: 'Buyurtma kunida yetib borish', desc: 'Tezkor yordam – Toshkent bo\'ylab usta murojaat qilingan kunning o\'zidayoq yetib boradi.' },
          { icon: '/images/icon-service-2.svg', title: 'Har kuni ishlaymiz', desc: 'Siz uchun qozonlarni har kuni ta\'mirlaymiz: 24/7.' },
        ],
      }
    },
    // FACTS
    {
      section: 'facts', lang: 'ru',
      data: {
        title: 'Профессиональный ремонт котлов',
        description: 'Наши специалисты готовы выполнить любой ремонт газовых котлов в Ташкенте круглосуточно и без выходных.',
        points: [
          'Работаем круглосуточно. Выезд возможен 24/7',
          'В нашей команде только специалисты с многолетним стажем работы.',
          'Расчёт после ремонта, мы не берём аванс за предстоящую работу.',
        ],
      }
    },
    {
      section: 'facts', lang: 'uz',
      data: {
        title: 'Professional qozon ta\'mirlash',
        description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz va dam olish kunlarisiz gaz qozonlarini ta\'mirlashga tayyor.',
        points: [
          'Kechayu-kunduz ishlaymiz. 24/7 usta yetib borishi mumkin',
          'Jamoamizda faqat ko\'p yillik ish tajribasiga ega mutaxassislar.',
          'To\'lov ta\'mirdan so\'ng qilinadi, oldindan avans olmaymiz.',
        ],
      }
    },
    // URGENCY BANNER
    {
      section: 'urgencyBanner', lang: 'ru',
      data: {
        title: 'Не откладывайте ремонт, обращайтесь сейчас!',
        desc: 'Выезд мастера в день заявки. Обращайтесь к нам и мы поможем вернуть тепло в ваш дом!',
        btn: 'Вызвать мастера', or: 'или', callLabel: 'Позвоните в любое время',
        formTitle: 'Быстрая онлайн заявка', formSubtitle: 'Мастер перезвонит в течение 5 минут для консультации',
        namePlaceholder: 'Ваше имя', phonePlaceholder: '+998 (__) ___-__-__', servicePlaceholder: 'Выберите проблему с котлом',
        submitBtn: 'Отправить заявку', sending: 'Отправка заявки...', successTitle: 'Заявка принята!', successDesc: 'Мастер свяжется с вами в течение 5-10 минут.',
      }
    },
    {
      section: 'urgencyBanner', lang: 'uz',
      data: {
        title: 'Ta\'mirlashni kechiktirmang, hoziroq murojaat qiling!',
        desc: 'Ustaning tashrifi buyurtma kunining o\'zida. Uyingizga issiqlikni qaytarishga yordam beramiz!',
        btn: 'Ustani chaqirish', or: 'yoki', callLabel: 'Istalgan vaqtda qo\'ng\'iroq qiling',
        formTitle: 'Tezkor onlayn buyurtma', formSubtitle: 'Usta 5 daqiqa ichida maslahat uchun bog\'lanadi',
        namePlaceholder: 'Ismingiz', phonePlaceholder: '+998 (__) ___-__-__', servicePlaceholder: 'Muammoni tanlang',
        submitBtn: 'Buyurtmani yuborish', sending: 'Yuborilmoqda...', successTitle: 'Buyurtma qabul qilindi!', successDesc: 'Usta 5-10 daqiqa ichida siz bilan bog\'lanadi.',
      }
    },
    // CONTACTS
    {
      section: 'contacts', lang: 'ru',
      data: {
        badge: 'Как нас найти', title: 'Контакты',
        addressLabel: 'Адрес', addressVal: 'город Ташкент, Яшнабадский район, улица Талимаржан, 15',
        phoneLabel: 'Телефон', phoneVal: '+998 95 848 40 40',
        scheduleLabel: 'График работы:', scheduleWeekdays: 'Пн - Пт с 10:00 - 19:00',
        scheduleWeekend: 'Сб - Вс и праздники: с 11:00 - 18:00', scheduleEmergency: 'Срочный выезд мастеров — круглосуточно 24/7',
      }
    },
    {
      section: 'contacts', lang: 'uz',
      data: {
        badge: 'Bizni qayerdan topasiz', title: 'Bog\'lanish',
        addressLabel: 'Manzil', addressVal: 'Toshkent shahri, Yashnobod tumani, Talimarjon ko\'chasi, 15-uy',
        phoneLabel: 'Telefon', phoneVal: '+998 95 848 40 40',
        scheduleLabel: 'Ish tartibi:', scheduleWeekdays: 'Dush - Juma: 10:00 - 19:00',
        scheduleWeekend: 'Shan - Yak va bayramlar: 11:00 - 18:00', scheduleEmergency: 'Ustalarning tezkor chiqishi — 24/7 kechayu-kunduz',
      }
    },
    // FOOTER
    {
      section: 'footer', lang: 'ru',
      data: {
        copyright: 'Copyright © 2025 Все права защищены.',
        telegram: 'https://t.me/BURON_YG', instagram: 'https://www.instagram.com/serveskotlov.uz/',
        phone: '+998958484040',
        serviceCenter: 'Специализированный центр по ремонту в Ташкенте. Быстрый и качественный ремонт газовых котлов, замена подшипника стиральной машины, чистка кондиционеров и замена компрессора холодильника с гарантией.',
      }
    },
    {
      section: 'footer', lang: 'uz',
      data: {
        copyright: 'Copyright © 2025 Barcha huquqlar himoyalangan.',
        telegram: 'https://t.me/BURON_YG', instagram: 'https://www.instagram.com/serveskotlov.uz/',
        phone: '+998958484040',
        serviceCenter: 'Toshkentda maishiy texnika ta\'mirlash bo\'yicha ixtisoslashgan markaz. Gaz qozonlarini yuvish, konditsioner tozalash, xolodilnik remont uyga chaqirish, va kir yuvish mashinalari platalarini kafolat bilan tezkor ta\'mirlaymiz.',
      }
    },
    // MODAL
    {
      section: 'modal', lang: 'ru',
      data: {
        title: 'Оставьте заявку', subtitle: 'Заполните форму и мастер приедет в течение 60 минут',
        name: 'Имя', namePlaceholder: 'Введите ваше имя', phone: 'Телефон', phonePlaceholder: '+998 (__) ___-__-__',
        service: 'Тип услуги', servicePlaceholder: 'Выберите проблему',
        servicesList: ['Ремонт газовых котлов', 'Ремонт холодильников', 'Ремонт кондиционеров', 'Ремонт стиральных машин', 'Другая проблема'],
        comment: 'Что именно не работает? (необязательно)', commentPlaceholder: 'Например: не греет воду, выдает ошибку E01',
        submit: 'Отправить', submitting: 'Отправка...', success: 'Спасибо! Ваша заявка успешно отправлена.',
        successSub: 'Дежурный мастер свяжется с вами через пару минут.', close: 'Закрыть',
        privacy: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных',
      }
    },
    {
      section: 'modal', lang: 'uz',
      data: {
        title: 'Buyurtma qoldiring', subtitle: 'Formani to\'ldiring va usta 60 daqiqada yetib boradi',
        name: 'Ism', namePlaceholder: 'Ismingizni kiriting', phone: 'Telefon', phonePlaceholder: '+998 (__) ___-__-__',
        service: 'Xizmat turi', servicePlaceholder: 'Muammoni tanlang',
        servicesList: ['Gaz qozonlari ta\'miri', 'Xolodilniklar ta\'miri', 'Konditsionerlar ta\'miri', 'Kir yuvish mashinalari ta\'miri', 'Boshqa muammo'],
        comment: 'Aniq nima ishlamayapti? (ixtiyoriy)', commentPlaceholder: 'Masalan: suv isitmayapti, E01 xatosi chiqyapti',
        submit: 'Yuborish', submitting: 'Yuborilmoqda...', success: 'Rahmat! Buyurtmangiz muvaffaqiyatli qabul qilindi.',
        successSub: 'Navbatchi usta bir necha daqiqa ichida siz bilan bog\'lanadi.', close: 'Yopish',
        privacy: 'Tugmani bosish orqali siz shaxsiy ma\'lumotlarni qayta ishlashga rozilik bildirasiz',
      }
    },
    // FAB
    {
      section: 'fab', lang: 'ru',
      data: { call: 'Позвонить', telegram: 'Написать в Telegram' }
    },
    {
      section: 'fab', lang: 'uz',
      data: { call: 'Qo\'ng\'iroq qilish', telegram: 'Telegram orqali yozish' }
    },
    // SERVICES SECTION (badges, title, subtitle)
    {
      section: 'servicesSection', lang: 'ru',
      data: { badge: 'Качественные услуги', title: 'Наши услуги', subtitle: 'Ремонтируем и обслуживаем газовые котлы всех ведущих брендов', orderBtn: 'Заказать ремонт' }
    },
    {
      section: 'servicesSection', lang: 'uz',
      data: { badge: 'Sifatli xizmatlar', title: 'Bizning xizmatlar', subtitle: 'Barcha yetakchi brendlarning gaz qozonlarini ta\'mirlaymiz va xizmat ko\'rsatamiz', orderBtn: 'Ta\'mirlashga buyurtma' }
    },
    // REVIEWS SECTION
    {
      section: 'reviewsSection', lang: 'ru',
      data: { badge: 'Мнения людей', title: 'Отзывы наших клиентов', subtitle: 'Реальные впечатления клиентов после выполненного ремонта газовых котлов в Ташкенте' }
    },
    {
      section: 'reviewsSection', lang: 'uz',
      data: { badge: 'Mijozlar fikri', title: 'Mijozlarimizning sharhlari', subtitle: 'Toshkentda amalga oshirilgan gaz qozoni ta\'mirlash bo\'yicha haqiqiy fikrlar' }
    },
  ];

  for (const setting of settingsData) {
    const { error } = await supabase
      .from('site_settings')
      .upsert(setting, { onConflict: 'section,lang' });
    if (error) console.error(`  ❌ ${setting.section}/${setting.lang}:`, error.message);
  }

  console.log('  ✅ Site settings migratsiya qilindi');
}

async function migrateServices() {
  console.log('🔧 Services migratsiya qilinmoqda...');

  const items = [
    {
      service_id: 'gas-boilers', sort_order: 1,
      title_ru: 'Ремонт газовых котлов', title_uz: 'Gaz qozonlarini ta\'mirlash',
      desc_ru: 'Диагностика, ремонт плат управления, замена датчиков и промывка теплообменников.',
      desc_uz: 'Diagnostika, boshqaruv platalarini tuzatish, datchiklarni almashtirish va xatoliklarni bartaraf etish.',
      image: '/images/service-gas-boiler.png',
      price_note_ru: 'От 100 000 сум', price_note_uz: '100 000 so\'mdan',
      badge_ru: 'Срочный выезд', badge_uz: 'Tezkor chiqish',
    },
    {
      service_id: 'refrigerators', sort_order: 2,
      title_ru: 'Ремонт холодильников', title_uz: 'Xolodilniklarni ta\'mirlash',
      desc_ru: 'Заправка фреоном, замена мотора-компрессора, устранение утечек и ремонт электроники.',
      desc_uz: 'Freon quyish, motor-kompressorni almashtirish, gaz sizishini yo\'qotish va elektronikani ta\'mirlash.',
      image: '/images/service-fridge.png',
      price_note_ru: 'От 120 000 сум', price_note_uz: '120 000 so\'mdan',
      badge_ru: 'Все марки', badge_uz: 'Barcha modellar',
    },
    {
      service_id: 'air-conditioners', sort_order: 3,
      title_ru: 'Ремонт кондиционеров', title_uz: 'Konditsionerlarni ta\'mirlash',
      desc_ru: 'Профессиональная чистка, заправка фреоном, устранение утечек и устранение ошибок.',
      desc_uz: 'Professional tozalash, freon bilan to\'ldirish, nosozliklarni izlash va plata ta\'miri.',
      image: '/images/service-ac.png',
      price_note_ru: 'От 150 000 сум', price_note_uz: '150 000 so\'mdan',
      badge_ru: 'Гарантия качества', badge_uz: 'Kafolatli sifat',
    },
    {
      service_id: 'washing-machines', sort_order: 4,
      title_ru: 'Ремонт стиральных машин', title_uz: 'Kir yuvish mashinalarini ta\'mirlash',
      desc_ru: 'Замена подшипников, сливных насосов, ТЭНов. Ремонт плат управления и двигателей.',
      desc_uz: 'Podshipniklar, nasoslar va isitkich (TEN)larni almashtirish. Boshqaruv platalari ta\'miri.',
      image: '/images/service-washing.png',
      price_note_ru: 'От 140 000 сум', price_note_uz: '140 000 so\'mdan',
      badge_ru: 'Оригинальные запчасти', badge_uz: 'Asl ehtiyot qismlar',
    },
  ];

  for (const item of items) {
    const { error } = await supabase
      .from('services')
      .upsert(item, { onConflict: 'service_id' });
    if (error) console.error(`  ❌ ${item.service_id}:`, error.message);
  }

  console.log('  ✅ Services migratsiya qilindi');
}

async function migrateReviews() {
  console.log('⭐ Reviews migratsiya qilinmoqda...');

  const reviews = [
    { author_ru: 'Азамат Р.', author_uz: 'Azamat R.', avatar: '/images/author-2.jpg', rating: 5, text_ru: 'Обратился по поводу ремонта двухконтурного котла — мастер приехал в тот же день, быстро нашёл проблему и всё устранил. Теперь отопление работает как новое. Рекомендую!', text_uz: 'Ikki konturli qozonni ta\'mirlash bo\'yicha murojaat qildim — usta o\'sha kunning o\'zidayoq keldi, muammoni tezda topdi va tuzatdi. Endi isitish tizimi yangidek ishlayapti.', service_ru: 'Ремонт котла', service_uz: 'Qozon ta\'miri', date_ru: 'Вчера', date_uz: 'Kecha', sort_order: 1 },
    { author_ru: 'Шахло М.', author_uz: 'Shahlo M.', avatar: '/images/author-1.jpg', rating: 5, text_ru: 'Очень довольна сервисом! Котел не грел воду, думала придётся менять деталь, но специалисты просто промыли теплообменник быстро и недорого.', text_uz: 'Xizmatdan juda mamnunman! Qozon issiq suv bermay qo\'ygandi, almashtirish kerak deb o\'ylagandim, ammo ustalar teploobmennikni tozalab berishdi.', service_ru: 'Чистка теплообменника', service_uz: 'Teploobmennik yuvish', date_ru: '3 дня назад', date_uz: '3 kun oldin', sort_order: 2 },
    { author_ru: 'Бобур Т.', author_uz: 'Bobur T.', avatar: '/images/author-2.jpg', rating: 5, text_ru: 'Ремонтировали напольный котёл. Приехали вовремя, всё сделали аккуратно, объяснили, как правильно пользоваться, чтобы не ломался. Спасибо!', text_uz: 'Yerga o\'rnatiladigan qozonni ta\'mirlashdi. Vaqtida yetib kelishdi, barchasini saranjom bajarishdi, qayta buzilmasligi uchun qanday foydalanishni tushuntirishdi.', service_ru: 'Ремонт напольного котла', service_uz: 'Qozon ta\'miri', date_ru: '1 неделя назад', date_uz: '1 hafta oldin', sort_order: 3 },
    { author_ru: 'Мухлиса К.', author_uz: 'Muxlisa K.', avatar: '/images/author-1.jpg', rating: 5, text_ru: 'Профессиональный подход и вежливые мастера. Котел стал работать тихо, батареи горячие. Цены адекватные. Буду обращаться ещё.', text_uz: 'Professional yondashuv va xushmuomala ustalar. Qozon sokin va samarali ishlay boshladi. Narxlar juda maqbul. Yana murojaat qilaman.', service_ru: 'Обслуживание котла', service_uz: 'Profilaktika', date_ru: '2 недели назад', date_uz: '2 hafta oldin', sort_order: 4 },
    { author_ru: 'Сардор Ж.', author_uz: 'Sardor J.', avatar: '/images/author-2.jpg', rating: 5, text_ru: 'Ремонт платы управления прошёл быстро, мастер знал своё дело. Уже на следующий день всё работало как надо. Спасибо за качественную работу!', text_uz: 'Platani ta\'mirlash juda tez kechdi, usta o\'z ishining ustasi ekan. Ertasigayoq hammasi risoladagidek ishlay boshladi. Rahmat!', service_ru: 'Ремонт платы', service_uz: 'Platani ta\'mirlash', date_ru: '3 недели назад', date_uz: '3 hafta oldin', sort_order: 5 },
    { author_ru: 'Гуля Д.', author_uz: 'Gulya D.', avatar: '/images/author-1.jpg', rating: 5, text_ru: 'Очень благодарна за срочный ремонт котла! Без горячей воды и отопления тяжело, особенно зимой. Все сделали за один визит.', text_uz: 'Qozonni tezda tuzatib berishgani uchun kattakon rahmat! Ayniqsa qishda issiq suvsiz juda qiyin. Barchasini bitta tashrifda to\'g\'rilab ketishdi.', service_ru: 'Срочный ремонт котла', service_uz: 'Tezkor ta\'mirlash', date_ru: 'Месяц назад', date_uz: '1 oy oldin', sort_order: 6 },
  ];

  // Avval tozalaymiz
  await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { error } = await supabase.from('reviews').insert(reviews);
  if (error) console.error('  ❌ Reviews:', error.message);
  else console.log('  ✅ Reviews migratsiya qilindi');
}

async function migrateCounters() {
  console.log('📊 Counters migratsiya qilinmoqda...');

  const counters = [
    { counter_id: 'repaired', target: 3500, suffix: '+', label_ru: 'Отремонтированных котлов', label_uz: 'Ta\'mirlangan qozonlar', icon: '/images/icon-counter-1.svg', sort_order: 1 },
    { counter_id: 'founded', target: 2015, suffix: '+', label_ru: 'Год основания', label_uz: 'Tashkil etilgan yil', icon: '/images/icon-counter-2.svg', sort_order: 2 },
    { counter_id: 'clients', target: 3400, suffix: '+', label_ru: 'Удовлетворенных клиентов', label_uz: 'Mamnun mijozlar', icon: '/images/icon-counter-3.svg', sort_order: 3 },
    { counter_id: 'masters', target: 15, suffix: '+', label_ru: 'Опытных мастеров', label_uz: 'Tajribali ustalar', icon: '/images/icon-counter-4.svg', sort_order: 4 },
  ];

  for (const c of counters) {
    const { error } = await supabase.from('counters').upsert(c, { onConflict: 'counter_id' });
    if (error) console.error(`  ❌ ${c.counter_id}:`, error.message);
  }

  console.log('  ✅ Counters migratsiya qilindi');
}

async function migrateServiceDetails() {
  console.log('📋 Service Details migratsiya qilinmoqda...');

  // Fridge
  const fridge = {
    slug: 'remont-holodilnikov-v-tashkente',
    title_ru: 'Ремонт холодильников в Ташкенте', title_uz: 'Toshkentda xolodilniklarni ta\'mirlash',
    subtitle_ru: 'Ремонт холодильников в Ташкенте недорого и с гарантией. Мастера по ремонту холодильников в Ташкенте с выездом на дом.',
    subtitle_uz: 'Toshkentda xolodilniklarni arzon va kafolatli ta\'mirlash. Usta uyingizga kelib xizmat ko\'rsatadi.',
    hero_image: '/images/service-fridge.png',
    badge_ru: 'Мастер по холодильникам', badge_uz: 'Xolodilnik ustasi',
    price_from_ru: 'От 80 000 сум', price_from_uz: '80 000 so\'mdan',
    brands: ['Bosch', 'Samsung', 'LG', 'Miele', 'Electrolux', 'Ariston', 'Beko', 'Siemens', 'AEG', 'Gorenje', 'Hansa', 'Zanussi', 'Whirlpool', 'Ardo', 'Liebherr', 'Atlant', 'Biryusa', 'Sharp'],
    symptom_title_ru: 'Как избежать поломок', symptom_title_uz: 'Buzilishlarning oldini olish',
    symptom_desc_ru: 'Качественный ремонт стоит дорого, поэтому лучше не допускать аварийного отказа техники. Для этого достаточно соблюдать такие рекомендации:',
    symptom_desc_uz: 'Sifatli ta\'mir qimmatga tushadi, shuning uchun texnikaning to\'satdan buzilishiga yo\'l qo\'ymaslik kerak. Buning uchun quyidagi tavsiyalarga amal qilish yetarli:',
    symptom_items: [
      { ru: 'Устанавливать оборудование нужно на расстоянии минимум 50 сантиметров от источников тепла', uz: 'Uskunani issiqlik manbalaridan kamida 50 santimetr masofada o\'rnatish kerak' },
      { ru: 'Не превышать лимит загрузки – если камера забита продуктами, нарушается циркуляция воздуха, что мешает нормальному охлаждению', uz: 'Yuklash me\'yoridan oshirmang - agar kamera mahsulotga to\'la bo\'lsa, havo aylanishi buziladi va normal sovishiga to\'sqinlik qiladi' },
      { ru: 'Ежемесячно проводить разморозку, если в модель оборудована функцией No Frost, техника размораживается раз в год', uz: 'Har oy muzdan tushiring, agar model No Frost funksiyasiga ega bo\'lsa, texnika yilda bir marta muzdan tushiriladi' },
      { ru: 'Регулярно очищать заднюю решётку от пыли, что повышает эффективность работы компрессора', uz: 'Orqa panjarani muntazam ravishda changdan tozalab turing, bu kompressor samaradorligini oshiradi' },
    ],
    seo_text: {
      title: { ru: 'Ремонт холодильника в Ташкенте', uz: 'Toshkentda xolodilniklarni ta\'mirlash' },
      paragraphs1: {
        ru: ['Чтобы не переплачивать за услуги мастера, владельцам этой электробытовой техники важно уметь определять неисправности, возникающие в работе.', 'Чтобы оформить вызов, достаточно найти на нашем сайте контактный номер или заполнить форму обратной связи.'],
        uz: ['Usta xizmatlari uchun ortiqcha pul to\'lamaslik uchun, ushbu maishiy texnika egalari ish paytida yuzaga keladigan nosozliklarni aniqlay olishi muhimdir.', 'Usta chaqirish uchun saytimizdagi aloqa raqamini topish yoki qayta aloqa formasini to\'ldirish kifoya.']
      },
      listTitle: { ru: 'Ремонт холодильника поможет, если техника:', uz: 'Xolodilnikni ta\'mirlash quyidagi hollarda yordam beradi:' },
      listItems: {
        ru: ['Отказывается включаться;', 'Генерирует недостаточно холода;', 'Не реагирует на изменение настроек;', 'Работает не отключаясь.'],
        uz: ['Yonishdan bosh tortmoqda;', 'Yetarli darajada sovuq chiqarmayapti;', 'Sozlamalar o\'zgarishiga munosabat bildirmayapti;', 'To\'xtovsiz ishlamoqda.']
      },
      paragraphs2: { ru: ['Наш мастер решит любую техническую проблему.'], uz: ['Bizning ustamiz har qanday texnik muammoni hal qiladi.'] }
    },
  };

  // Gas boilers
  const gasBoiler = {
    slug: 'remont-gazovyh-kotlov-v-tashkente',
    title_ru: 'Ремонт газовых котлов в Ташкенте', title_uz: 'Toshkentda gaz qozonlarini ta\'mirlash',
    subtitle_ru: 'Ремонт газовых котлов в Ташкенте. Чистка котла. Обслуживание котлов. Профилактика котлов Ремонт котлов.',
    subtitle_uz: 'Toshkentda gaz qozonlarini ta\'mirlash. Qozonni tozalash va profilaktika qilish xizmatlari.',
    hero_image: '/images/service-gas-boiler.png',
    badge_ru: 'Мастер по газовым котлам', badge_uz: 'Gaz qozonlari ustasi',
    price_from_ru: 'От 80 000 сум', price_from_uz: '80 000 so\'mdan',
    brands: ['Navien', 'Baxi', 'Ariston', 'Immergas', 'Ferroli', 'Viessmann', 'Vaillant', 'Protherm', 'Bosch', 'Rinnai', 'Chaffoteaux', 'Fondital', 'Artel', 'Hydrosta'],
    symptom_title_ru: 'Типичные симптомы', symptom_title_uz: 'Odatiy belgilar',
    symptom_desc_ru: 'Если вы заметили один из этих признаков, лучше не откладывать ремонт:',
    symptom_desc_uz: 'Agar ushbu belgilardan birini sezsangiz, ta\'mirlashni kechiktirmaganingiz ma\'qul:',
    symptom_items: [
      { ru: 'Котел издает необычные звуки (гул, свист)', uz: 'Kotyol noodatiy tovushlar chiqarmoqda' },
      { ru: 'Часто падает давление на манометре', uz: 'Manometrda bosim tez-tez tushib ketmoqda' },
      { ru: 'Вода из крана идет то горячая, то холодная', uz: 'Kranda suv goh issiq, goh sovuq kelyapti' },
    ],
    seo_text: {
      title: { ru: 'Ремонт газовых котлов в Ташкенте', uz: 'Toshkentda gaz kotyollarini ta\'mirlash' },
      paragraphs1: { ru: ['Газовое отопление считается востребованным, эффективным способом обогрева жилья.'], uz: ['Gazli isitish uylarni isitishning talab qilinadigan va samarali usuli hisoblanadi.'] },
      listTitle: { ru: 'Часто ремонт газового котла требуется из-за следующих причин:', uz: 'Ko\'pincha gaz qozonini ta\'mirlash quyidagi sabablarga ko\'ra talab qilinadi:' },
      listItems: { ru: ['разгерметизация отопительной системы;', 'недостаточное количество теплоносителя;', 'засор фильтров;'], uz: ['isitish tizimi germetikligining buzilishi;', 'issiqlik tashuvchining yetarli emasligi;', 'filtrlar tiqilib qolishi;'] },
      paragraphs2: { ru: ['Предварительно выполняем тщательную диагностику для определения первопричины неисправности.'], uz: ['Dastlab nosozlikning tub sababini aniqlash uchun ehtiyotkorlik bilan diagnostika o\'tkazamiz.'] }
    },
  };

  // Washing machines
  const washing = {
    slug: 'remont-stiralnyh-mashin-v-tashkente',
    title_ru: 'Ремонт стиральных машин в Ташкенте', title_uz: 'Toshkentda kir yuvish mashinalarini ta\'mirlash',
    subtitle_ru: 'Срочный выезд мастера за 60 минут. Диагностика, оригинальные запчасти и гарантия на ремонт.',
    subtitle_uz: 'Ustaning 60 daqiqada tezkor yetib borishi. Diagnostika, asl ehtiyot qismlar va kafolat.',
    hero_image: '/images/service-washing.png',
    badge_ru: 'Мастер по стиральным машинам', badge_uz: 'Kir yuvish mashinasi ustasi',
    price_from_ru: 'От 80 000 сум', price_from_uz: '80 000 so\'mdan',
    brands: ['Samsung', 'LG', 'Bosch', 'Miele', 'Electrolux', 'Indesit', 'Beko', 'Siemens', 'Hotpoint-Ariston', 'AEG', 'Whirlpool', 'Gorenje', 'Candy', 'Artel'],
    symptom_title_ru: 'Когда пора вызывать мастера', symptom_title_uz: 'Qachon usta chaqirish kerak',
    symptom_desc_ru: 'Если вы заметили один из следующих симптомов, рекомендуем вызвать мастера:',
    symptom_desc_uz: 'Agar quyidagi belgilardan birini sezsangiz, zudlik bilan usta chaqiring:',
    symptom_items: [
      { ru: 'Выводит на дисплей коды ошибок (E1, E2, UE, 4E, dE)', uz: 'Displeyda xatolik kodlari chiqmoqda (E1, E2, UE, 4E, dE)' },
      { ru: 'Не сливает воду или сливает слишком медленно', uz: 'Suvni chiqarmayapti yoki juda sekin chiqarmoqda' },
      { ru: 'Издает сильный металлический скрежет или вибрацию при отжиме', uz: 'Siqish paytida kuchli temir ishqalanishi yoki tebranish hosil bo\'ladi' },
    ],
    seo_text: {
      title: { ru: 'Ремонт стиральных машин в Ташкенте', uz: 'Toshkentda kir yuvish mashinalarini ta\'mirlash' },
      paragraphs1: { ru: ['При поломке такой техники, отключите оборудование от электросети, и обратитесь к инструкции по эксплуатации.'], uz: ['Bunday uskunalar buzilganida uni elektr tarmog\'idan uzing va foydalanish bo\'yicha qo\'llanmaga murojaat qiling.'] },
      listTitle: { ru: 'Позвоните нам, если ваша машинка:', uz: 'Agar kir yuvish mashinangiz quyidagi holatlarga tushsa, bizga qo\'ng\'iroq qiling:' },
      listItems: { ru: ['Выводит на дисплей коды ошибок;', 'Не сливает или не набирает воду;', 'Издаёт посторонние звуки;'], uz: ['Displeyga xatolik kodlarini chiqarsa;', 'Suvni chiqarmasa yoki tortmasa;', 'Begona tovushlar chiqarsa;'] },
      paragraphs2: { ru: ['Все поломки устраняются в день обращения.'], uz: ['Barcha nosozliklar murojaat qilingan kunning o\'zida bartaraf etiladi.'] }
    },
  };

  // AC
  const ac = {
    slug: 'remont-kondiczionerov-v-tashkente',
    title_ru: 'Ремонт кондиционеров в Ташкенте', title_uz: 'Toshkentda konditsionerlarni ta\'mirlash',
    subtitle_ru: 'Профессиональная заправка фреоном R410/R22/R32, чистка паром, пайка медных трубок и ремонт плат инвертора.',
    subtitle_uz: 'R410/R22/R32 freonlarini quyish, bug\' bilan tozalash, mis quvurlarni payvandlash va invertor platalari ta\'miri.',
    hero_image: '/images/service-ac.png',
    badge_ru: 'Мастер по кондиционерам', badge_uz: 'Konditsionerlar ustasi',
    price_from_ru: 'От 90 000 сум', price_from_uz: '90 000 so\'mdan',
    brands: ['Gree', 'Midea', 'Artel', 'Samsung', 'LG', 'Chigo', 'AUX', 'Haier', 'Daikin', 'Mitsubishi Electric', 'TCL', 'Electrolux', 'Shivaki', 'Zanussi'],
    symptom_title_ru: 'Симптомы поломки сплит-системы', symptom_title_uz: 'Split-tizim nosozligini bildiruvchi alomatlar',
    symptom_desc_ru: 'Регулярное техобслуживание снижает расход электроэнергии на 30% и продлевает срок службы:',
    symptom_desc_uz: 'Muntazam profilaktika elektr sarfini 30% tejaydi va kompressor umrini uzaytiradi:',
    symptom_items: [
      { ru: 'Обмерзание медных трубок и кранов на внешнем блоке', uz: 'Tashqi blokdagi mis quvurlar va jo\'mraklarda muz qatlami hosil bo\'lishi' },
      { ru: 'Кондиционер потребляет много энергии, но плохо охлаждает', uz: 'Konditsioner ko\'p elektr sarflaydi, ammo sovutishi juda sust' },
    ],
    seo_text: {
      title: { ru: 'Ремонт кондиционера в Ташкенте', uz: 'Toshkentda konditsionerlarni ta\'mirlash' },
      paragraphs1: { ru: ['Даже брендовые модели климатического оборудования могут выйти из строя в самый неподходящий момент.'], uz: ['Hatto iqlim uskunasining brend modellari ham eng kutilmagan vaqtda ishdan chiqishi mumkin.'] },
      listTitle: { ru: 'Причины поломки сплит-систем:', uz: 'Split-tizimlar buzilishining sabablari:' },
      listItems: { ru: ['Нарушение технологии монтажа;', 'Перепады напряжения в домашней сети;', 'Отсутствие сервисного обслуживания.'], uz: ['O\'rnatish texnologiyasining buzilishi;', 'Uy tarmog\'idagi kuchlanishning keskin o\'zgarishi;', 'Servis xizmatining yo\'qligi.'] },
      paragraphs2: { ru: ['Ремонт кондиционера выполняется в тот же день.'], uz: ['Konditsionerni ta\'mirlash o\'sha kunning o\'zida amalga oshiriladi.'] }
    },
  };

  const details = [fridge, gasBoiler, washing, ac];

  for (const d of details) {
    const { error } = await supabase.from('service_details').upsert(d, { onConflict: 'slug' });
    if (error) console.error(`  ❌ ${d.slug}:`, error.message);
  }

  console.log('  ✅ Service Details migratsiya qilindi');
}

async function migrateBreakdowns() {
  console.log('🔩 Breakdowns migratsiya qilinmoqda...');

  // Avval tozalaymiz
  await supabase.from('breakdowns').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const allBreakdowns = [
    // Fridge breakdowns
    { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'not-freezing', title_ru: 'Не морозит', title_uz: 'Muzlatmayapti', description_ru: '- Замена термостата\n- Заправка фреоном\n- Ремонт модуля управления', description_uz: '- Termostatni almashtirish\n- Freon quyish\n- Boshqaruv modulini ta\'mirlash', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'ice', image: '/images/service-fridge.png', sort_order: 1 },
    { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'no-power-fridge', title_ru: 'Не включается', title_uz: 'Yonmayapti', description_ru: '- Замена термостата\n- Замена мотор-компрессора', description_uz: '- Termostatni almashtirish\n- Motor-kompressorni almashtirish', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'power', image: '/images/service-fridge.png', sort_order: 2 },
    { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'noisy-fridge', title_ru: 'Гудит или вибрирует', title_uz: 'Guvullaydi yoki tebranadi', description_ru: '- Замена мотор-компрессора\n- Замена реле', description_uz: '- Motor-kompressorni almashtirish\n- Releni almashtirish', price_ru: 'от 150 000 сум', price_uz: '150 000 so\'mdan', icon_type: 'noise', image: '/images/service-fridge.png', sort_order: 3 },
    { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'leak-fridge', title_ru: 'Протекает', title_uz: 'Suv oqyapti', description_ru: '- Замена фильтра осушителя\n- Заправка фреоном', description_uz: '- Quritgich filtrini almashtirish\n- Freon quyish', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'water', image: '/images/service-fridge.png', sort_order: 4 },
    { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'ice-build', title_ru: 'Покрывается льдом', title_uz: 'Muz bilan qoplanmoqda', description_ru: '- Замена термостата\n- Устранение утечки фреона', description_uz: '- Termostatni almashtirish\n- Freon qochishini bartaraf etish', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'temp', image: '/images/service-fridge.png', sort_order: 5 },
    { service_detail_slug: 'remont-holodilnikov-v-tashkente', breakdown_id: 'shock', title_ru: 'Бьет током', title_uz: 'Tok uryapti', description_ru: '- Замена реле\n- Мелкий ремонт', description_uz: '- Releni almashtirish\n- Mayda ta\'mirlash ishlari', price_ru: 'от 80 000 сум', price_uz: '80 000 so\'mdan', icon_type: 'power', image: '/images/service-fridge.png', sort_order: 6 },

    // Gas boiler breakdowns
    { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'no-ignition', title_ru: 'Не зажигается горелка', title_uz: 'Gorelka yonmayapti', description_ru: 'Ремонт системы розжига', description_uz: 'Yoqish tizimini ta\'mirlash', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'power', image: '/images/service-gas-boiler.png', sort_order: 1 },
    { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'weak-heating', title_ru: 'Слабый нагрев воды', title_uz: 'Suv isitish past darajada', description_ru: 'Чистка теплообменника', description_uz: 'Issiqlik almashtirgichni tozalash', price_ru: 'от 150 000 сум', price_uz: '150 000 so\'mdan', icon_type: 'temp', image: '/images/service-gas-boiler.png', sort_order: 2 },
    { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'water-leak', title_ru: 'Капает вода из котла', title_uz: 'Kotyoldan suv tomyapti', description_ru: 'Устранение протечки', description_uz: 'Suv oqishini bartaraf etish', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'water', image: '/images/service-gas-boiler.png', sort_order: 3 },
    { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'pressure-error', title_ru: 'Ошибка давления', title_uz: 'Bosim xatosi', description_ru: 'Настройка/замена расширительного бака', description_uz: 'Kengaytirish bakini sozlash/almashtirish', price_ru: 'от 150 000 сум', price_uz: '150 000 so\'mdan', icon_type: 'sensor', image: '/images/service-gas-boiler.png', sort_order: 4 },
    { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'noise', title_ru: 'Котёл шумит при работе', title_uz: 'Kotyol ishlaganda shovqin qilyapti', description_ru: 'Удаление воздуха из системы', description_uz: 'Tizimdan havoni chiqarib tashlash', price_ru: 'от 80 000 сум', price_uz: '80 000 so\'mdan', icon_type: 'noise', image: '/images/service-gas-boiler.png', sort_order: 5 },
    { service_detail_slug: 'remont-gazovyh-kotlov-v-tashkente', breakdown_id: 'no-hot-water', title_ru: 'Не работает горячая вода', title_uz: 'Issiq suv ishlamayapti', description_ru: 'Ремонт трехходового клапана', description_uz: 'Uch yo\'lli klapanni ta\'mirlash', price_ru: 'от 180 000 сум', price_uz: '180 000 so\'mdan', icon_type: 'temp', image: '/images/service-gas-boiler.png', sort_order: 6 },

    // Washing machine breakdowns
    { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-heat', title_ru: 'Не греет воду', title_uz: 'Suvni isitmayapti', description_ru: 'Перегорел ТЭН, неисправен модуль управления', description_uz: 'TEN kuygan, boshqaruv moduli nosoz', price_ru: 'от 120 000 сум', price_uz: '120 000 so\'mdan', icon_type: 'temp', image: '/images/service-washing.png', sort_order: 1 },
    { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-power', title_ru: 'Не включается', title_uz: 'Yonmayapti', description_ru: 'Неисправна вилка или шнур, плата управления', description_uz: 'Elektr vilkasi, shnur yoki plata shikastlangan', price_ru: 'от 95 000 сум', price_uz: '95 000 so\'mdan', icon_type: 'power', image: '/images/service-washing.png', sort_order: 2 },
    { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-spin-drum', title_ru: 'Не крутит барабан', title_uz: 'Baraban aylanmayapti', description_ru: 'Износ щёток, поломка двигателя, ремень', description_uz: 'Motor cho\'tkalari yeyilgan, motor buzilgan', price_ru: 'от 130 000 сум', price_uz: '130 000 so\'mdan', icon_type: 'spin', image: '/images/service-washing.png', sort_order: 3 },
    { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-drain', title_ru: 'Не отжимает', title_uz: 'Siqmayapti (Suv chiqarmayapti)', description_ru: 'Неисправен сливной насос или засорился слив', description_uz: 'Drenaj nasosi nosoz yoki drenaj tiqilib qolgan', price_ru: 'от 110 000 сум', price_uz: '110 000 so\'mdan', icon_type: 'drain', image: '/images/service-washing.png', sort_order: 4 },
    { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'no-water', title_ru: 'Не набирает воду', title_uz: 'Suv tortmayapti', description_ru: 'Неисправен замок дверцы или заливной клапан', description_uz: 'Eshik qulfi yoki suv kirish klapani nosoz', price_ru: 'от 90 000 сум', price_uz: '90 000 so\'mdan', icon_type: 'water', image: '/images/service-washing.png', sort_order: 5 },
    { service_detail_slug: 'remont-stiralnyh-mashin-v-tashkente', breakdown_id: 'door-locked', title_ru: 'Не открывается', title_uz: 'Eshik ochilmayapti', description_ru: 'Защита от детей, сбой платы или УБЛ', description_uz: 'Bolalardan himoya, plata nosoz yoki UBL singan', price_ru: 'от 85 000 сум', price_uz: '85 000 so\'mdan', icon_type: 'lock', image: '/images/service-washing.png', sort_order: 6 },

    // AC breakdowns
    { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'no-cold', title_ru: 'Не охлаждает', title_uz: 'Sovutmayapti', description_ru: 'Заправка фреоном или замена компрессора', description_uz: 'Freon quyish yoki kompressorni almashtirish', price_ru: 'от 100 000 сум', price_uz: '100 000 so\'mdan', icon_type: 'temp', image: '/images/service-ac.png', sort_order: 1 },
    { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'no-turn-on', title_ru: 'Не включается', title_uz: 'Yonmayapti', description_ru: 'Ремонт платы управления или замена компрессора', description_uz: 'Boshqaruv platasini ta\'mirlash yoki kompressorni almashtirish', price_ru: 'от 90 000 сум', price_uz: '90 000 so\'mdan', icon_type: 'power', image: '/images/service-ac.png', sort_order: 2 },
    { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'noise-ac', title_ru: 'Шумит', title_uz: 'Shovqin qilyapti', description_ru: 'Замена датчика температуры или вентилятора', description_uz: 'Harorat datchigi yoki ventilyatorni almashtirish', price_ru: 'от 110 000 сум', price_uz: '110 000 so\'mdan', icon_type: 'noise', image: '/images/service-ac.png', sort_order: 3 },
    { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'water-leak-ac', title_ru: 'Течет', title_uz: 'Suv oqyapti', description_ru: 'Засор дренажа или внутреннего блока', description_uz: 'Drenaj yoki ichki blok tiqilib qolishi', price_ru: 'от 80 000 сум', price_uz: '80 000 so\'mdan', icon_type: 'leak', image: '/images/service-ac.png', sort_order: 4 },
    { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'bad-air', title_ru: 'Плохо дует', title_uz: 'Yomon puflayapti', description_ru: 'Очистка внутреннего блока, замена вентилятора', description_uz: 'Ichki blokni tozalash, ventilyatorni almashtirish', price_ru: 'от 95 000 сум', price_uz: '95 000 so\'mdan', icon_type: 'sensor', image: '/images/service-ac.png', sort_order: 5 },
    { service_detail_slug: 'remont-kondiczionerov-v-tashkente', breakdown_id: 'inverter-error', title_ru: 'Мигают индикаторы', title_uz: 'Indikatorlar miltillamoqda', description_ru: 'Ремонт блока управления', description_uz: 'Boshqaruv blokini ta\'mirlash', price_ru: 'от 130 000 сум', price_uz: '130 000 so\'mdan', icon_type: 'motor', image: '/images/service-ac.png', sort_order: 6 },
  ];

  const { error } = await supabase.from('breakdowns').insert(allBreakdowns);
  if (error) console.error('  ❌ Breakdowns:', error.message);
  else console.log('  ✅ Breakdowns migratsiya qilindi');
}

// ======= ASOSIY FUNKSIYA =======
async function main() {
  console.log('🚀 Supabase migratsiya boshlanmoqda...\n');

  // Jadvallar yaratish (RPC orqali yoki qo'lda)
  await createTables();

  // Ma'lumotlarni ko'chirish
  await migrateSettings();
  await migrateServices();
  await migrateReviews();
  await migrateCounters();
  await migrateServiceDetails();
  await migrateBreakdowns();

  console.log('\n✅ Migratsiya muvaffaqiyatli yakunlandi!');
  console.log('📌 Eslatma: Agar jadvallar avtomatik yaratilmagan bo\'lsa,');
  console.log('   Supabase SQL Editor orqali createTables() dagi SQL so\'rovlarni qo\'lda bajaring.');
}

main().catch(console.error);
