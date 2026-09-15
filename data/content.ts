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
      title: '«UZBService» / Ремонт бытовой техники в Ташкенте',
      description: 'Наши специалисты готовы выполнить любой ремонт бытовой техники в Ташкенте: кондиционер, холодильник, газовый котел, стиральную машину.',
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
      title: 'Ремонт бытовой техники в Ташкенте',
      subtitle: 'Быстрый и качественный ремонт любой сложности с гарантией до 1 года и выездом мастера на дом',
      pills: [
        { title: 'Диагностика 80 000 сум', highlight: '80 000 сум' },
        { title: 'Выезд мастера бесплатный', highlight: 'бесплатный' },
        { title: 'Гарантия от 1 месяца до года', highlight: 'до 1 года' },
        { title: 'Опыт мастеров больше 10 лет', highlight: 'больше 10 лет' },
      ],
      ctaBtn: 'Вызвать мастера',
      urgency: 'Позвоните и мастер бесплатно приедет через 60 мин.',
    },
    services: {
      badge: 'Качественные услуги',
      title: 'Наши услуги',
      subtitle: 'Ремонтируем и обслуживаем бытовую технику всех ведущих брендов',
      orderBtn: 'Заказать ремонт',
      items: [
        {
          id: 'gas-boilers',
          title: 'Ремонт газовых котлов',
          desc: 'Диагностика, чистка теплообменника, ремонт плат управления, устранение ошибок и утечек газа.',
          image: '/images/service-gas-boiler.png',
          priceNote: 'От 100 000 сум',
          badge: 'Срочный выезд',
        },
        {
          id: 'refrigerators',
          title: 'Ремонт холодильников',
          desc: 'Заправка фреоном, замена компрессора, ремонт термостата, устранение засоров дренажной системы.',
          image: '/images/service-fridge.png',
          priceNote: 'От 120 000 сум',
          badge: 'Все марки',
        },
        {
          id: 'air-conditioners',
          title: 'Ремонт кондиционеров',
          desc: 'Чистка и антибактериальная обработка, дозаправка фреона, устранение шума и протечек, пайка трубок.',
          image: '/images/service-ac.png',
          priceNote: 'От 90 000 сум',
          badge: 'Гарантия качества',
        },
        {
          id: 'washing-machines',
          title: 'Ремонт стиральных машин',
          desc: 'Замена подшипников, насоса, ТЭНа, ремонт электронного модуля, устранение вибраций и течи.',
          image: '/images/service-washing.png',
          priceNote: 'От 95 000 сум',
          badge: 'Оригинальные запчасти',
        },
      ] as ServiceItem[],
    },
    about: {
      badge: 'О компании UZBService',
      title: 'Ремонт любой бытовой техники',
      description: 'Наши специалисты готовы выполнить любой ремонт бытовой техники в Ташкенте круглосуточно и без выходных. Все мастера имеют высокую квалификацию и многолетний опыт по ремонту и установке бытовой техники.',
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
          desc: 'Мы ремонтируем бытовую технику для Вас ежедневно: 24/7.',
        },
      ],
    },
    facts: {
      title: 'Ремонт любой бытовой техники',
      description: 'Наши специалисты готовы выполнить любой ремонт бытовой техники в Ташкенте круглосуточно и без выходных. Все мастера имеют высокую квалификацию и многолетний опыт по ремонту и установке бытовой техники.',
      points: [
        'Работаем круглосуточно. Выезд возможен 24/7',
        'В нашей команде только специалисты с многолетним стажем работы.',
        'Расчёт после ремонта, мы не берём аванс за предстоящую работу.',
      ],
      counters: [
        { id: '1', target: 6900, suffix: '+', label: 'Выполненных работ', icon: '/images/icon-counter-1.svg' },
        { id: '2', target: 2015, suffix: '+', label: 'Год основания', icon: '/images/icon-counter-2.svg' },
        { id: '3', target: 5500, suffix: '+', label: 'Удовлетворенных клиентов', icon: '/images/icon-counter-3.svg' },
        { id: '4', target: 20, suffix: '+', label: 'Опытных мастеров', icon: '/images/icon-counter-4.svg' },
      ] as CounterItem[],
    },
    reviews: {
      badge: 'Мнения людей',
      title: 'Отзывы наших клиентов',
      subtitle: 'Реальные впечатления клиентов после выполненного ремонта техники в Ташкенте',
      items: [
        {
          id: '1',
          author: 'Азамат Р.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Обратился по поводу ремонта кондиционера — мастер приехал в тот же день, быстро нашёл проблему и всё устранил. Теперь кондиционер работает как новый. Рекомендую!',
          service: 'Ремонт кондиционера',
          date: 'Вчера',
        },
        {
          id: '2',
          author: 'Шахло М.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Очень довольна сервисом! Холодильник не морозил, думала придётся менять, но специалисты всё отремонтировали быстро и недорого.',
          service: 'Ремонт холодильника',
          date: '3 дня назад',
        },
        {
          id: '3',
          author: 'Бобур Т.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Ремонтировали двухконтурный котёл. Приехали вовремя, всё сделали аккуратно, объяснили, как правильно пользоваться, чтобы не ломался. Спасибо!',
          service: 'Ремонт котла',
          date: '1 неделя назад',
        },
        {
          id: '4',
          author: 'Мухлиса К.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Профессиональный подход и вежливые мастера. Кондиционер стал работать тихо и эффективно. Цены адекватные. Буду обращаться ещё.',
          service: 'Ремонт кондиционера',
          date: '2 недели назад',
        },
        {
          id: '5',
          author: 'Сардор Ж.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Ремонт холодильника прошёл быстро, мастер знал своё дело. Уже на следующий день всё работало как надо. Спасибо за качественную работу!',
          service: 'Ремонт холодильника',
          date: '3 недели назад',
        },
        {
          id: '6',
          author: 'Гуля Д.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Очень благодарна за срочный ремонт котла! Без горячей воды тяжело, особенно зимой. Все сделали за один визит.',
          service: 'Ремонт газового котла',
          date: 'Месяц назад',
        },
      ] as ReviewItem[],
    },
    urgencyBanner: {
      title: 'Не откладывайте ремонт, обращайтесь сейчас!',
      desc: 'Выезд мастера в день заявки. Обращайтесь к нам и мы поможем вернуть вашу технику в рабочее состояние!',
      btn: 'Вызвать мастера',
      or: 'или',
      callLabel: 'Позвоните в любое время',
      formTitle: 'Быстрая онлайн заявка',
      formSubtitle: 'Мастер перезвонит в течение 5 минут для консультации',
      namePlaceholder: 'Ваше имя',
      phonePlaceholder: '+998 (__) ___-__-__',
      servicePlaceholder: 'Выберите технику для ремонта',
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
      phoneVal: '+998 99 123 13 73',
      scheduleLabel: 'График работы:',
      scheduleWeekdays: 'Пн - Пт с 10:00 - 19:00',
      scheduleWeekend: 'Сб - Вс и праздники: с 11:00 - 18:00',
      scheduleEmergency: 'Срочный выезд мастеров — круглосуточно 24/7',
    },
    footer: {
      copyright: 'Copyright © 2025 Все права защищены.',
      telegram: 'https://t.me/servisekotlov',
      instagram: 'https://www.instagram.com/serveskotlov.uz/',
      phone: '+998991231373',
      serviceCenter: 'Сервисный центр бытовой техники в Ташкенте. Быстрый и качественный ремонт всех видов техники с гарантией.',
    },
    modal: {
      title: 'Оставьте заявку',
      subtitle: 'Заполните форму и мастер приедет в течение 60 минут',
      name: 'Имя',
      namePlaceholder: 'Введите ваше имя',
      phone: 'Телефон',
      phonePlaceholder: '+998 (__) ___-__-__',
      service: 'Тип техники',
      servicePlaceholder: 'Выберите услугу',
      servicesList: [
        'Ремонт газовых котлов',
        'Ремонт холодильников',
        'Ремонт кондиционеров',
        'Ремонт стиральных машин',
        'Другая бытовая техника',
      ],
      comment: 'Что именно не работает? (необязательно)',
      commentPlaceholder: 'Например: не морозит верхняя камера',
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
      title: '«UZBService» / Toshkentda maishiy texnika ta\'mirlash',
      description: 'Bizning mutaxassislarimiz Toshkentda har qanday maishiy texnikani ta\'mirlashga tayyor: konditsioner, muzlatgich, gaz qozoni, kir yuvish mashinasi.',
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
      title: 'Toshkentda maishiy texnika ta\'mirlash',
      subtitle: 'Har qanday murakkablikdagi tezkor va sifatli ta\'mirlash, 1 yilgacha kafolat va ustaning xonadoningizga bepul yetib borishi',
      pills: [
        { title: 'Diagnostika 80 000 so\'m', highlight: '80 000 so\'m' },
        { title: 'Usta yetib borishi bepul', highlight: 'bepul' },
        { title: '1 oydan 1 yilgacha kafolat', highlight: '1 yilgacha' },
        { title: 'Ustalarning tajribasi 10 yildan ortiq', highlight: '10 yildan ortiq' },
      ],
      ctaBtn: 'Ustani chaqirish',
      urgency: 'Qo\'ng\'iroq qiling va usta 60 daqiqada bepul yetib boradi.',
    },
    services: {
      badge: 'Sifatli xizmatlar',
      title: 'Bizning xizmatlar',
      subtitle: 'Barcha yetakchi brendlarning maishiy texnikasini ta\'mirlaymiz va xizmat ko\'rsatamiz',
      orderBtn: 'Ta\'mirlashga buyurtma',
      items: [
        {
          id: 'gas-boilers',
          title: 'Gaz qozonlarini ta\'mirlash',
          desc: 'Diagnostika, issiqlik almashinuvchini tozalash, boshqaruv platasini tuzatish, nosozlik va gaz sizib chiqishini bartaraf etish.',
          image: '/images/service-gas-boiler.png',
          priceNote: '100 000 so\'mdan',
          badge: 'Tezkor chiqish',
        },
        {
          id: 'refrigerators',
          title: 'Muzlatgichlarni ta\'mirlash',
          desc: 'Freon quyish, kompressorni almashtirish, termostat ta\'miri, drenaj tizimi tiqilib qolishini bartaraf qilish.',
          image: '/images/service-fridge.png',
          priceNote: '120 000 so\'mdan',
          badge: 'Barcha modellar',
        },
        {
          id: 'air-conditioners',
          title: 'Konditsionerlarni ta\'mirlash',
          desc: 'Tozalash va antibakterial ishlov berish, freon to\'ldirish, shovqin va suv oqishini to\'xtatish, quvurlarni payvandlash.',
          image: '/images/service-ac.png',
          priceNote: '90 000 so\'mdan',
          badge: 'Kafolatli sifat',
        },
        {
          id: 'washing-machines',
          title: 'Kir yuvish mashinalarini ta\'mirlash',
          desc: 'Podshipniklar, nasos, TENni almashtirish, elektron modul ta\'miri, tebranish va oqishni bartaraf etish.',
          image: '/images/service-washing.png',
          priceNote: '95 000 so\'mdan',
          badge: 'Asl ehtiyot qismlar',
        },
      ] as ServiceItem[],
    },
    about: {
      badge: 'UZBService kompaniyasi haqida',
      title: 'Har qanday maishiy texnikani ta\'mirlash',
      description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz va dam olish kunlarisiz maishiy texnika ta\'mirini amalga oshirishga tayyor. Barcha ustalarning malakasi yuqori va ko\'p yillik tajribaga ega.',
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
          desc: 'Siz uchun maishiy texnikalarni har kuni ta\'mirlaymiz: 24/7.',
        },
      ],
    },
    facts: {
      title: 'Har qanday maishiy texnikani ta\'mirlash',
      description: 'Bizning mutaxassislarimiz Toshkent shahrida kechayu-kunduz va dam olish kunlarisiz har qanday maishiy texnika ta\'mirini amalga oshirishga tayyor.',
      points: [
        'Kechayu-kunduz ishlaymiz. 24/7 usta yetib borishi mumkin',
        'Jamoamizda faqat ko\'p yillik ish tajribasiga ega mutaxassislar.',
        'To\'lov ta\'mirdan so\'ng qilinadi, oldindan avans olmaymiz.',
      ],
      counters: [
        { id: '1', target: 6900, suffix: '+', label: 'Bajarilgan ishlar', icon: '/images/icon-counter-1.svg' },
        { id: '2', target: 2015, suffix: '+', label: 'Tashkil etilgan yil', icon: '/images/icon-counter-2.svg' },
        { id: '3', target: 5500, suffix: '+', label: 'Mamnun mijozlar', icon: '/images/icon-counter-3.svg' },
        { id: '4', target: 20, suffix: '+', label: 'Tajribali ustalar', icon: '/images/icon-counter-4.svg' },
      ] as CounterItem[],
    },
    reviews: {
      badge: 'Mijozlar fikri',
      title: 'Mijozlarimizning sharhlari',
      subtitle: 'Toshkentda amalga oshirilgan maishiy texnika ta\'mirlash bo\'yicha haqiqiy fikrlar',
      items: [
        {
          id: '1',
          author: 'Azamat R.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Konditsioner ta\'miri bo\'yicha murojaat qildim — usta o\'sha kunning o\'zidayoq keldi, muammoni tezda topdi va tuzatdi. Hozir yangidek ishlamoqda. Tavsiya qilaman!',
          service: 'Konditsioner ta\'miri',
          date: 'Kecha',
        },
        {
          id: '2',
          author: 'Shahlo M.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Xizmatdan juda mamnunman! Muzlatgich sovitmay qo\'ygandi, almashtirish kerak deb o\'ylagandim, ammo ustalar tez va arzon ta\'mirlab berishdi.',
          service: 'Muzlatgich ta\'miri',
          date: '3 kun oldin',
        },
        {
          id: '3',
          author: 'Bobur T.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Ikki konturli qozonni ta\'mirlashdi. Vaqtida yetib kelishdi, barchasini saranjom bajarishdi, qayta buzilmasligi uchun qanday foydalanishni tushuntirishdi.',
          service: 'Qozon ta\'miri',
          date: '1 hafta oldin',
        },
        {
          id: '4',
          author: 'Muxlisa K.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Professional yondashuv va xushmuomala ustalar. Konditsioner sokin va samarali ishlay boshladi. Narxlar juda maqbul. Yana murojaat qilaman.',
          service: 'Konditsioner ta\'miri',
          date: '2 hafta oldin',
        },
        {
          id: '5',
          author: 'Sardor J.',
          avatar: '/images/author-2.jpg',
          rating: 5,
          text: 'Muzlatgich ta\'miri juda tez kechdi, usta o\'z ishining ustasi ekan. Ertasigayoq hammasi risoladagidek ishlay boshladi. Rahmat!',
          service: 'Muzlatgich ta\'miri',
          date: '3 hafta oldin',
        },
        {
          id: '6',
          author: 'Gulya D.',
          avatar: '/images/author-1.jpg',
          rating: 5,
          text: 'Qozonni tezda tuzatib berishgani uchun kattakon rahmat! Ayniqsa qishda issiq suvsiz juda qiyin. Barchasini bitta tashrifda to\'g\'rilab ketishdi.',
          service: 'Gaz qozoni ta\'miri',
          date: '1 oy oldin',
        },
      ] as ReviewItem[],
    },
    urgencyBanner: {
      title: 'Ta\'mirlashni kechiktirmang, hoziroq murojaat qiling!',
      desc: 'Ustaning tashrifi buyurtma kunining o\'zida. Bizga murojaat qiling va texnikangizni ishchi holatiga qaytaramiz!',
      btn: 'Ustani chaqirish',
      or: 'yoki',
      callLabel: 'Istalgan vaqtda qo\'ng\'iroq qiling',
      formTitle: 'Tezkor onlayn buyurtma',
      formSubtitle: 'Usta 5 daqiqa ichida maslahat uchun bog\'lanadi',
      namePlaceholder: 'Ismingiz',
      phonePlaceholder: '+998 (__) ___-__-__',
      servicePlaceholder: 'Ta\'mirlanadigan texnikani tanlang',
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
      phoneVal: '+998 99 123 13 73',
      scheduleLabel: 'Ish tartibi:',
      scheduleWeekdays: 'Dush - Juma: 10:00 - 19:00',
      scheduleWeekend: 'Shan - Yak va bayramlar: 11:00 - 18:00',
      scheduleEmergency: 'Ustalarning tezkor chiqishi — 24/7 kechayu-kunduz',
    },
    footer: {
      copyright: 'Copyright © 2025 Barcha huquqlar himoyalangan.',
      telegram: 'https://t.me/servisekotlov',
      instagram: 'https://www.instagram.com/serveskotlov.uz/',
      phone: '+998991231373',
      serviceCenter: 'Toshkentda maishiy texnika xizmat ko\'rsatish markazi. Barcha turdagi maishiy texnikalarni kafolat bilan tezkor va sifatli ta\'mirlaymiz.',
    },
    modal: {
      title: 'Buyurtma qoldiring',
      subtitle: 'Formani to\'ldiring va usta 60 daqiqada yetib boradi',
      name: 'Ism',
      namePlaceholder: 'Ismingizni kiriting',
      phone: 'Telefon',
      phonePlaceholder: '+998 (__) ___-__-__',
      service: 'Texnika turi',
      servicePlaceholder: 'Xizmat turini tanlang',
      servicesList: [
        'Gaz qozonlarini ta\'mirlash',
        'Muzlatgichlarni ta\'mirlash',
        'Konditsionerlarni ta\'mirlash',
        'Kir yuvish mashinalarini ta\'mirlash',
        'Boshqa maishiy texnika',
      ],
      comment: 'Aniq nima ishlamayapti? (ixtiyoriy)',
      commentPlaceholder: 'Masalan: muzlatgichning yuqori kamerasi muzlatmayapti',
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
