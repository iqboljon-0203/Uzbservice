export type Language = 'ru' | 'uz';

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  priceNote: string;
  badge: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export interface CounterItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  icon: string;
}

export const siteContent = {
  ru: {
    meta: {
      title: '«Toshkent Service» / Ремонт газовых котлов в Ташкенте',
      description: 'Наши специалисты готовы выполнить профессиональный ремонт газовых котлов в Ташкенте любой сложности.',
    },
    nav: {
      services: 'Услуги',
      about: 'О нас',
      whyUs: 'Почему мы?',
      reviews: 'Отзывы',
      contacts: 'Контакты',
      orderBtn: 'Заказать',
      callNow: 'Позвонить',
    },
    hero: {
      title: 'Ремонт газовых котлов в Ташкенте',
      subtitle: 'Быстрый и качественный ремонт любой сложности с гарантией до 1 года и выездом мастера на дом',
      pills: [
        { title: 'Диагностика 80 000 сум', highlight: '80 000 сум' },
        { title: 'Выезд мастера бесплатный', highlight: 'бесплатный' },
        { title: 'Гарантия от 1 месяца до года', highlight: 'до 1 года' },
        { title: 'Опыт мастеров больше 10 лет', highlight: 'больше 10 лет' },
      ],
      image: '/images/hero-img.png',
      ctaBtn: 'Вызвать мастера',
      urgency: 'Позвоните и мастер бесплатно приедет через 60 мин.',
    },
    services: {
      badge: 'Качественные услуги',
      title: 'Наши услуги',
      subtitle: 'Ремонтируем и обслуживаем газовые котлы всех ведущих брендов',
      orderBtn: 'Заказать ремонт',
      items: [
        {
          id: 'gas-boilers',
          title: 'Ремонт газовых котлов',
          desc: 'Диагностика, ремонт плат управления, замена датчиков и промывка теплообменников.',
          image: '/images/service-gas-boiler.png',
          priceNote: 'От 100 000 сум',
          badge: 'Срочный выезд',
        },
        {
          id: 'refrigerators',
          title: 'Ремонт холодильников',
          desc: 'Заправка фреоном, замена мотора-компрессора, устранение утечек и ремонт электроники.',
          image: '/images/service-fridge.png',
          priceNote: 'От 120 000 сум',
          badge: 'Все марки',
        },
        {
          id: 'air-conditioners',
          title: 'Ремонт кондиционеров',
          desc: 'Профессиональная чистка, заправка фреоном, устранение утечек и устранение ошибок.',
          image: '/images/service-ac.png',
          priceNote: 'От 150 000 сум',
          badge: 'Гарантия качества',
        },
        {
          id: 'washing-machines',
          title: 'Ремонт стиральных машин',
          desc: 'Замена подшипников, сливных насосов, ТЭНов. Ремонт плат управления и двигателей.',
          image: '/images/service-washing.png',
          priceNote: 'От 140 000 сум',
          badge: 'Оригинальные запчасти',
        },
      ] as ServiceItem[],
    },
    about: {
      badge: 'О компании Toshkent Service',
      title: 'Ремонт газовых котлов и бытовой техники',
      description: 'Наши специалисты готовы выполнить срочный ремонт бытовой техники 24/7 в Ташкенте. Мы специализируемся на ремонте газовых котлов (включая промывку газовых котлов), а также предлагаем ремонт холодильников на дому, заправку фреоном кондиционера, и ремонт плат управления стиральных машин.',
      experienceBox: {
        title: 'Гарантируем качество',
        desc: 'Гарантия на работу и запчасти – от 3 до 24 месяцев, мы несём полную ответственность.',
      },
      features: [
        {
          icon: '/images/icon-service-1.svg',
          title: 'Выезд в день заявки',
          desc: 'Оперативная помощь – срочный выезд мастера по Ташкенту, в день заявки.',
        },
        {
          icon: '/images/icon-service-2.svg',
          title: 'Работаем ежедневно',
          desc: 'Мы ремонтируем котлы для Вас ежедневно: 24/7.',
        },
      ],
    },
    facts: {
      title: 'Профессиональный ремонт котлов',
      description: 'Наши специалисты готовы выполнить любой ремонт газовых котлов в Ташкенте круглосуточно и без выходных.',
      points: [
        'Работаем круглосуточно. Выезд возможен 24/7',
        'В нашей команде только специалисты с многолетним стажем работы.',
        'Расчёт после ремонта, мы не берём аванс за предстоящую работу.',
      ],
      counters: [
        { id: '1', target: 3500, suffix: '+', label: 'Отремонтированных котлов', icon: '/images/icon-counter-1.svg' },
        { id: '2', target: 2015, suffix: '+', label: 'Год основания', icon: '/images/icon-counter-2.svg' },
        { id: '3', target: 3400, suffix: '+', label: 'Удовлетворенных клиентов', icon: '/images/icon-counter-3.svg' },
        { id: '4', target: 15, suffix: '+', label: 'Опытных мастеров', icon: '/images/icon-counter-4.svg' },
      ] as CounterItem[],
    },
    reviews: {
      badge: 'Мнения людей',
      title: 'Отзывы наших клиентов',
      subtitle: 'Реальные впечатления клиентов после выполненного ремонта газовых котлов в Ташкенте',
      items: [
        {
          id: '1',
          author: 'Азамат Р.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Обратился по поводу ремонта двухконтурного котла — мастер приехал в тот же день, быстро нашёл проблему и всё устранил. Теперь отопление работает как новое. Рекомендую!',
          service: 'Ремонт котла',
          date: 'Вчера',
        },
        {
          id: '2',
          author: 'Шахло М.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Очень довольна сервисом! Котел не грел воду, думала придётся менять деталь, но специалисты просто промыли теплообменник быстро и недорого.',
          service: 'Чистка теплообменника',
          date: '3 дня назад',
        },
        {
          id: '3',
          author: 'Бобур Т.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Ремонтировали напольный котёл. Приехали вовремя, всё сделали аккуратно, объяснили, как правильно пользоваться, чтобы не ломался. Спасибо!',
          service: 'Ремонт напольного котла',
          date: '1 неделя назад',
        },
        {
          id: '4',
          author: 'Мухлиса К.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Профессиональный подход и вежливые мастера. Котел стал работать тихо, батареи горячие. Цены адекватные. Буду обращаться ещё.',
          service: 'Обслуживание котла',
          date: '2 недели назад',
        },
        {
          id: '5',
          author: 'Сардор Ж.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Ремонт платы управления прошёл быстро, мастер знал своё дело. Уже на следующий день всё работало как надо. Спасибо за качественную работу!',
          service: 'Ремонт платы',
          date: '3 недели назад',
        },
        {
          id: '6',
          author: 'Гуля Д.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Очень благодарна за срочный ремонт котла! Без горячей воды и отопления тяжело, особенно зимой. Все сделали за один визит.',
          service: 'Срочный ремонт котла',
          date: 'Месяц назад',
        },
      ] as ReviewItem[],
    },
    urgencyBanner: {
      title: 'Не откладывайте ремонт, обращайтесь сейчас!',
      desc: 'Выезд мастера в день заявки. Обращайтесь к нам и мы поможем вернуть тепло в ваш дом!',
      btn: 'Вызвать мастера',
      or: 'или',
      callLabel: 'Позвоните в любое время',
      formTitle: 'Быстрая онлайн заявка',
      formSubtitle: 'Мастер перезвонит в течение 5 минут для консультации',
      namePlaceholder: 'Ваше имя',
      phonePlaceholder: '+998 (__) ___-__-__',
      servicePlaceholder: 'Выберите проблему с котлом',
      submitBtn: 'Отправить заявку',
      sending: 'Отправка заявки...',
      successTitle: 'Заявка принята!',
      successDesc: 'Мастер свяжется с вами в течение 5-10 минут.',
    },
    contacts: {
      badge: 'Как нас найти',
      title: 'Контакты',
      addressLabel: 'Адрес',
      addressVal: 'город Ташкент, Яшнабадский район, улица Талимаржан, 15',
      phoneLabel: 'Телефон',
      phoneVal: '+998 95 848 40 40',
      scheduleLabel: 'График работы:',
      scheduleWeekdays: 'Пн - Пт с 10:00 - 19:00',
      scheduleWeekend: 'Сб - Вс и праздники: с 11:00 - 18:00',
      scheduleEmergency: 'Срочный выезд мастеров — круглосуточно 24/7',
    },
    footer: {
      copyright: 'Copyright © 2025 Все права защищены.',
      telegram: 'https://t.me/BURON_YG',
      instagram: 'https://www.instagram.com/serveskotlov.uz/',
      phone: '+998958484040',
      serviceCenter: 'Специализированный центр по ремонту в Ташкенте. Быстрый и качественный ремонт газовых котлов, замена подшипника стиральной машины, чистка кондиционеров и замена компрессора холодильника с гарантией.',
    },
    modal: {
      title: 'Оставьте заявку',
      subtitle: 'Заполните форму и мастер приедет в течение 60 минут',
      name: 'Имя',
      namePlaceholder: 'Введите ваше имя',
      phone: 'Телефон',
      phonePlaceholder: '+998 (__) ___-__-__',
      service: 'Тип услуги',
      servicePlaceholder: 'Выберите проблему',
      servicesList: [
        'Ремонт газовых котлов',
        'Ремонт холодильников',
        'Ремонт кондиционеров',
        'Ремонт стиральных машин',
        'Другая проблема',
      ],
      comment: 'Что именно не работает? (необязательно)',
      commentPlaceholder: 'Например: не греет воду, выдает ошибку E01',
      submit: 'Отправить',
      submitting: 'Отправка...',
      success: 'Спасибо! Ваша заявка успешно отправлена.',
      successSub: 'Дежурный мастер свяжется с вами через пару минут.',
      close: 'Закрыть',
      privacy: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных',
    },
    fab: {
      call: 'Позвонить',
      telegram: 'Написать в Telegram',
    }
  },
  uz: {
    meta: {
      title: '«Toshkent Service» / Toshkentda gaz qozonlarini ta\'mirlash',
      description: 'Bizning mutaxassislarimiz Toshkentda har qanday turdagi gaz qozonlarini kafolat bilan ta\'mirlashga tayyor.',
    },
    nav: {
      services: 'Xizmatlar',
      about: 'Biz haqimizda',
      whyUs: 'Nega biz?',
      reviews: 'Sharhlar',
      contacts: 'Bog\'lanish',
      orderBtn: 'Buyurtma berish',
      callNow: 'Qo\'ng\'iroq qilish',
    },
    hero: {
      title: 'Toshkentda gaz qozonlarini ta\'mirlash',
      subtitle: 'Har qanday murakkablikdagi tezkor va sifatli ta\'mirlash, 1 yilgacha kafolat va ustaning xonadoningizga bepul yetib borishi',
      pills: [
        { title: 'Diagnostika 80 000 so\'m', highlight: '80 000 so\'m' },
        { title: 'Usta yetib borishi bepul', highlight: 'bepul' },
        { title: '1 oydan 1 yilgacha kafolat', highlight: '1 yilgacha' },
        { title: 'Ustalarning tajribasi 10 yildan ortiq', highlight: '10 yildan ortiq' },
      ],
      image: '/images/hero-img.png',
      ctaBtn: 'Ustani chaqirish',
      urgency: 'Qo\'ng\'iroq qiling va usta 60 daqiqada bepul yetib boradi.',
    },
    services: {
      badge: 'Sifatli xizmatlar',
      title: 'Bizning xizmatlar',
      subtitle: 'Barcha yetakchi brendlarning gaz qozonlarini ta\'mirlaymiz va xizmat ko\'rsatamiz',
      orderBtn: 'Ta\'mirlashga buyurtma',
      items: [
        {
          id: 'gas-boilers',
          title: 'Gaz qozonlarini ta\'mirlash',
          desc: 'Diagnostika, boshqaruv platalarini tuzatish, datchiklarni almashtirish va xatoliklarni bartaraf etish.',
          image: '/images/service-gas-boiler.png',
          priceNote: '100 000 so\'mdan',
          badge: 'Tezkor chiqish',
        },
        {
          id: 'refrigerators',
          title: 'Xolodilniklarni ta\'mirlash',
          desc: 'Freon quyish, motor-kompressorni almashtirish, gaz sizishini yo\'qotish va elektronikani ta\'mirlash.',
          image: '/images/service-fridge.png',
          priceNote: '120 000 so\'mdan',
          badge: 'Barcha modellar',
        },
        {
          id: 'air-conditioners',
          title: 'Konditsionerlarni ta\'mirlash',
          desc: 'Professional tozalash, freon bilan to\'ldirish, nosozliklarni izlash va plata ta\'miri.',
          image: '/images/service-ac.png',
          priceNote: '150 000 so\'mdan',
          badge: 'Kafolatli sifat',
        },
        {
          id: 'washing-machines',
          title: 'Kir yuvish mashinalarini ta\'mirlash',
          desc: 'Podshipniklar, nasoslar va isitkich (TEN)larni almashtirish. Boshqaruv platalari ta\'miri.',
          image: '/images/service-washing.png',
          priceNote: '140 000 so\'mdan',
          badge: 'Asl ehtiyot qismlar',
        },
      ] as ServiceItem[],
    },
    about: {
      badge: 'Toshkent Service kompaniyasi haqida',
      title: 'Gaz qozonlari va maishiy texnikani kafolatli ta\'mirlash',
      description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz maishiy texnika ustasi uyga chaqirish xizmatini taqdim etadilar. Asosiy ixtisoslashuvimiz – gaz qozonlarini yuvish va ta\'mirlash, shuningdek, konditsionerlarga freon quyish toshkent, kir yuvish mashinasi platasini tuzatish va xolodilnik motorini almashtirish.',
      experienceBox: {
        title: 'Sifatga kafolat beramiz',
        desc: 'Ishga va ehtiyot qismlarga 3 oydan 24 oygacha kafolat beramiz, to\'liq javobgarlikni zimmamizga olamiz.',
      },
      features: [
        {
          icon: '/images/icon-service-1.svg',
          title: 'Buyurtma kunida yetib borish',
          desc: 'Tezkor yordam – Toshkent bo\'ylab usta murojaat qilingan kunning o\'zidayoq yetib boradi.',
        },
        {
          icon: '/images/icon-service-2.svg',
          title: 'Har kuni ishlaymiz',
          desc: 'Siz uchun qozonlarni har kuni ta\'mirlaymiz: 24/7.',
        },
      ],
    },
    facts: {
      title: 'Professional qozon ta\'mirlash',
      description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz va dam olish kunlarisiz gaz qozonlarini ta\'mirlashga tayyor.',
      points: [
        'Kechayu-kunduz ishlaymiz. 24/7 usta yetib borishi mumkin',
        'Jamoamizda faqat ko\'p yillik ish tajribasiga ega mutaxassislar.',
        'To\'lov ta\'mirdan so\'ng qilinadi, oldindan avans olmaymiz.',
      ],
      counters: [
        { id: '1', target: 3500, suffix: '+', label: 'Ta\'mirlangan qozonlar', icon: '/images/icon-counter-1.svg' },
        { id: '2', target: 2015, suffix: '+', label: 'Tashkil etilgan yil', icon: '/images/icon-counter-2.svg' },
        { id: '3', target: 3400, suffix: '+', label: 'Mamnun mijozlar', icon: '/images/icon-counter-3.svg' },
        { id: '4', target: 15, suffix: '+', label: 'Tajribali ustalar', icon: '/images/icon-counter-4.svg' },
      ] as CounterItem[],
    },
    reviews: {
      badge: 'Mijozlar fikri',
      title: 'Mijozlarimizning sharhlari',
      subtitle: 'Toshkentda amalga oshirilgan gaz qozoni ta\'mirlash bo\'yicha haqiqiy fikrlar',
      items: [
        {
          id: '1',
          author: 'Azamat R.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Ikki konturli qozonni ta\'mirlash bo\'yicha murojaat qildim — usta o\'sha kunning o\'zidayoq keldi, muammoni tezda topdi va tuzatdi. Endi isitish tizimi yangidek ishlayapti.',
          service: 'Qozon ta\'miri',
          date: 'Kecha',
        },
        {
          id: '2',
          author: 'Shahlo M.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Xizmatdan juda mamnunman! Qozon issiq suv bermay qo\'ygandi, almashtirish kerak deb o\'ylagandim, ammo ustalar teploobmennikni tozalab berishdi.',
          service: 'Teploobmennik yuvish',
          date: '3 kun oldin',
        },
        {
          id: '3',
          author: 'Bobur T.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Yerga o\'rnatiladigan qozonni ta\'mirlashdi. Vaqtida yetib kelishdi, barchasini saranjom bajarishdi, qayta buzilmasligi uchun qanday foydalanishni tushuntirishdi.',
          service: 'Qozon ta\'miri',
          date: '1 hafta oldin',
        },
        {
          id: '4',
          author: 'Muxlisa K.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Professional yondashuv va xushmuomala ustalar. Qozon sokin va samarali ishlay boshladi. Narxlar juda maqbul. Yana murojaat qilaman.',
          service: 'Profilaktika',
          date: '2 hafta oldin',
        },
        {
          id: '5',
          author: 'Sardor J.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Platani ta\'mirlash juda tez kechdi, usta o\'z ishining ustasi ekan. Ertasigayoq hammasi risoladagidek ishlay boshladi. Rahmat!',
          service: 'Platani ta\'mirlash',
          date: '3 hafta oldin',
        },
        {
          id: '6',
          author: 'Gulya D.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Qozonni tezda tuzatib berishgani uchun kattakon rahmat! Ayniqsa qishda issiq suvsiz juda qiyin. Barchasini bitta tashrifda to\'g\'rilab ketishdi.',
          service: 'Tezkor ta\'mirlash',
          date: '1 oy oldin',
        },
      ] as ReviewItem[],
    },
    urgencyBanner: {
      title: 'Ta\'mirlashni kechiktirmang, hoziroq murojaat qiling!',
      desc: 'Ustaning tashrifi buyurtma kunining o\'zida. Uyingizga issiqlikni qaytarishga yordam beramiz!',
      btn: 'Ustani chaqirish',
      or: 'yoki',
      callLabel: 'Istalgan vaqtda qo\'ng\'iroq qiling',
      formTitle: 'Tezkor onlayn buyurtma',
      formSubtitle: 'Usta 5 daqiqa ichida maslahat uchun bog\'lanadi',
      namePlaceholder: 'Ismingiz',
      phonePlaceholder: '+998 (__) ___-__-__',
      servicePlaceholder: 'Muammoni tanlang',
      submitBtn: 'Buyurtmani yuborish',
      sending: 'Yuborilmoqda...',
      successTitle: 'Buyurtma qabul qilindi!',
      successDesc: 'Usta 5-10 daqiqa ichida siz bilan bog\'lanadi.',
    },
    contacts: {
      badge: 'Bizni qayerdan topasiz',
      title: 'Bog\'lanish',
      addressLabel: 'Manzil',
      addressVal: 'Toshkent shahri, Yashnobod tumani, Talimarjon ko\'chasi, 15-uy',
      phoneLabel: 'Telefon',
      phoneVal: '+998 95 848 40 40',
      scheduleLabel: 'Ish tartibi:',
      scheduleWeekdays: 'Dush - Juma: 10:00 - 19:00',
      scheduleWeekend: 'Shan - Yak va bayramlar: 11:00 - 18:00',
      scheduleEmergency: 'Ustalarning tezkor chiqishi — 24/7 kechayu-kunduz',
    },
    footer: {
      copyright: 'Copyright © 2025 Barcha huquqlar himoyalangan.',
      telegram: 'https://t.me/BURON_YG',
      instagram: 'https://www.instagram.com/serveskotlov.uz/',
      phone: '+998958484040',
      serviceCenter: 'Toshkentda maishiy texnika ta\'mirlash bo\'yicha ixtisoslashgan markaz. Gaz qozonlarini yuvish, konditsioner tozalash, xolodilnik remont uyga chaqirish, va kir yuvish mashinalari platalarini kafolat bilan tezkor ta\'mirlaymiz.',
    },
    modal: {
      title: 'Buyurtma qoldiring',
      subtitle: 'Formani to\'ldiring va usta 60 daqiqada yetib boradi',
      name: 'Ism',
      namePlaceholder: 'Ismingizni kiriting',
      phone: 'Telefon',
      phonePlaceholder: '+998 (__) ___-__-__',
      service: 'Xizmat turi',
      servicePlaceholder: 'Muammoni tanlang',
      servicesList: [
        'Gaz qozonlari ta\'miri',
        'Xolodilniklar ta\'miri',
        'Konditsionerlar ta\'miri',
        'Kir yuvish mashinalari ta\'miri',
        'Boshqa muammo',
      ],
      comment: 'Aniq nima ishlamayapti? (ixtiyoriy)',
      commentPlaceholder: 'Masalan: suv isitmayapti, E01 xatosi chiqyapti',
      submit: 'Yuborish',
      submitting: 'Yuborilmoqda...',
      success: 'Rahmat! Buyurtmangiz muvaffaqiyatli qabul qilindi.',
      successSub: 'Navbatchi usta bir necha daqiqa ichida siz bilan bog\'lanadi.',
      close: 'Yopish',
      privacy: 'Tugmani bosish orqali siz shaxsiy ma\'lumotlarni qayta ishlashga rozilik bildirasiz',
    },
    fab: {
      call: 'Qo\'ng\'iroq qilish',
      telegram: 'Telegram orqali yozish',
    }
  }
};
