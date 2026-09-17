import { Language } from './content';

export interface BreakdownItem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  symptoms: Record<Language, string>;
  price: Record<Language, string>;
  iconType: 'heater' | 'power' | 'spin' | 'drain' | 'water' | 'lock' | 'temp' | 'ice' | 'motor' | 'noise' | 'leak' | 'sensor';
  image: string;
}

export interface ServiceDetail {
  slug: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  heroImage: string;
  badge: Record<Language, string>;
  priceFrom: Record<Language, string>;
  breakdowns: BreakdownItem[];
  symptomChecklist: {
    title: Record<Language, string>;
    desc: Record<Language, string>;
    items: Record<Language, string>[];
  };
  brands: string[];
  seoText?: {
    title: Record<Language, string>;
    paragraphs1: Record<Language, string[]>;
    listTitle: Record<Language, string>;
    listItems: Record<Language, string[]>;
    paragraphs2: Record<Language, string[]>;
    listTitle2?: Record<Language, string>;
    listItems2?: Record<Language, string[]>;
    paragraphs3?: Record<Language, string[]>;
    listTitle3?: Record<Language, string>;
    listItems3?: Record<Language, string[]>;
    paragraphs4?: Record<Language, string[]>;
  };
}

export const servicesData: Record<string, ServiceDetail> = {
  'remont-holodilnikov-v-tashkente': {
    slug: 'remont-holodilnikov-v-tashkente',
    title: { ru: 'Ремонт холодильников в Ташкенте', uz: 'Toshkentda xolodilniklarni ta\'mirlash' },
    subtitle: { ru: 'Ремонт холодильников в Ташкенте недорого и с гарантией. Мастера по ремонту холодильников в Ташкенте с выездом на дом.', uz: 'Toshkentda xolodilniklarni arzon va kafolatli ta\'mirlash. Usta uyingizga kelib xizmat ko\'rsatadi.' },
    heroImage: '/images/service-fridge.png',
    badge: { ru: 'Мастер по холодильникам', uz: 'Xolodilnik ustasi' },
    priceFrom: { ru: 'От 80 000 сум', uz: '80 000 so\'mdan' },
    breakdowns: [
      {
        id: 'not-freezing',
        title: { ru: 'Не морозит', uz: 'Muzlatmayapti' },
        description: { ru: '- Замена термостата\n- Заправка фреоном\n- Ремонт модуля управления\n- Замена мотор-компрессора\n- Ремонт испарителя', uz: '- Termostatni almashtirish\n- Freon quyish\n- Boshqaruv modulini ta\'mirlash\n- Motor-kompressorni almashtirish\n- Evaporatorni (bug\'latgichni) ta\'mirlash' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'ice',
        image: '/images/service-fridge.png'
      },
      {
        id: 'no-power-fridge',
        title: { ru: 'Не включается', uz: 'Yonmayapti' },
        description: { ru: '- Замена термостата\n- Замена мотор-компрессора\n- Мелкий ремонт', uz: '- Termostatni almashtirish\n- Motor-kompressorni almashtirish\n- Mayda ta\'mirlash ishlari' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'power',
        image: '/images/service-fridge.png'
      },
      {
        id: 'noisy-fridge',
        title: { ru: 'Гудит или вибрирует', uz: 'Guvullaydi yoki tebranadi' },
        description: { ru: '- Замена мотор-компрессора\n- Замена реле\n- Замена вентилятора обдува испарителя', uz: '- Motor-kompressorni almashtirish\n- Releni almashtirish\n- Evaporator puflash ventilyatorini almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 150 000 сум', uz: '150 000 so\'mdan' },
        iconType: 'noise',
        image: '/images/service-fridge.png'
      },
      {
        id: 'leak-fridge',
        title: { ru: 'Протекает', uz: 'Suv oqyapti' },
        description: { ru: '- Замена фильтра осушителя\n- Замена трубопровода\n- Заправка фреоном\n- Прочистка дренажной системы', uz: '- Quritgich filtrini almashtirish\n- Quvurni almashtirish\n- Freon quyish\n- Drenaj tizimini tozalash' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'water',
        image: '/images/service-fridge.png'
      },
      {
        id: 'ice-build',
        title: { ru: 'Покрывается льдом', uz: 'Muz bilan qoplanmoqda' },
        description: { ru: '- Замена термостата\n- Устранение утечки фреона\n- Замена нагревателя оттайки\n- Замена таймера\n- Замена дефростера', uz: '- Termostatni almashtirish\n- Freon qochishini bartaraf etish\n- Muz eritish isitgichini almashtirish\n- Taymerni almashtirish\n- Defrosterni almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-fridge.png'
      },
      {
        id: 'shock',
        title: { ru: 'Бьет током', uz: 'Tok uryapti' },
        description: { ru: '- Замена реле\n- Мелкий ремонт', uz: '- Releni almashtirish\n- Mayda ta\'mirlash ishlari' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 80 000 сум', uz: '80 000 so\'mdan' },
        iconType: 'power',
        image: '/images/service-fridge.png'
      }
    ],
    symptomChecklist: {
      title: { ru: 'Как избежать поломок', uz: 'Buzilishlarning oldini olish' },
      desc: { ru: 'Качественный ремонт стоит дорого, поэтому лучше не допускать аварийного отказа техники. Для этого достаточно соблюдать такие рекомендации:', uz: 'Sifatli ta\'mir qimmatga tushadi, shuning uchun texnikaning to\'satdan buzilishiga yo\'l qo\'ymaslik kerak. Buning uchun quyidagi tavsiyalarga amal qilish yetarli:' },
      items: [
        { ru: 'Устанавливать оборудование нужно на расстоянии минимум 50 сантиметров от источников тепла', uz: 'Uskunani issiqlik manbalaridan kamida 50 santimetr masofada o\'rnatish kerak' },
        { ru: 'Не превышать лимит загрузки – если камера забита продуктами, нарушается циркуляция воздуха, что мешает нормальному охлаждению', uz: 'Yuklash me\'yoridan oshirmang - agar kamera mahsulotga to\'la bo\'lsa, havo aylanishi buziladi va normal sovishiga to\'sqinlik qiladi' },
        { ru: 'Ежемесячно проводить разморозку, если в модель оборудована функцией No Frost, техника размораживается раз в год', uz: 'Har oy muzdan tushiring, agar model No Frost funksiyasiga ega bo\'lsa, texnika yilda bir marta muzdan tushiriladi' },
        { ru: 'Регулярно очищать заднюю решётку от пыли, что повышает эффективность работы компрессора', uz: 'Orqa panjarani muntazam ravishda changdan tozalab turing, bu kompressor samaradorligini oshiradi' }
      ]
    },
    brands: ['Bosch', 'Samsung', 'LG', 'Miele', 'Electrolux', 'Ariston', 'Beko', 'Siemens', 'AEG', 'Gorenje', 'Hansa', 'Zanussi', 'Whirlpool', 'Ardo', 'Liebherr', 'Atlant', 'Biryusa', 'Sharp'],
    seoText: {
      title: { ru: 'Ремонт холодильника в Ташкенте', uz: 'Toshkentda xolodilniklarni ta\'mirlash' },
      paragraphs1: {
        ru: [
          'Чтобы не переплачивать за услуги мастера, владельцам этой электробытовой техники важно уметь определять неисправности, возникающие в работе. Даже незначительные симптомы могут указывать на серьёзную поломку, предотвратить которую поможет своевременное вмешательство профессионала. Это экономит время и деньги, помогает решить любые проблемы уже в день обращения. Наш сервисный центр предлагает срочный и недорогой ремонт холодильника на дому по низким ценам.',
          'Чтобы оформить вызов, достаточно найти на нашем сайте контактный номер или заполнить форму обратной связи. Инженер приезжает максимум через 40 минут после получения заявки. Оплачивать выезд сотрудника и проведённую диагностику оборудования не нужно даже при отказе от сервисного обслуживания. Поломки, независимо от локации и сложности устраняются уже в день обращения, если нужна замена деталей, предлагаем оригинальные и аналоговые запчасти.'
        ],
        uz: [
          'Usta xizmatlari uchun ortiqcha pul to\'lamaslik uchun, ushbu maishiy texnika egalari ish paytida yuzaga keladigan nosozliklarni aniqlay olishi muhimdir. Hatto kichik belgilar ham jiddiy buzilishni ko\'rsatishi mumkin, uning oldini olishga mutaxassisning o\'z vaqtida aralashuvi yordam beradi. Bu vaqt va pulni tejaydi, har qanday muammoni murojaat qilingan kunning o\'zida hal qilishga yordam beradi. Bizning xizmat ko\'rsatish markazimiz arzon narxlarda xolodilniklarni uyda tezkor va sifatli ta\'mirlashni taklif etadi.',
          'Usta chaqirish uchun saytimizdagi aloqa raqamini topish yoki qayta aloqa formasini to\'ldirish kifoya. Muhandis buyurtma olingandan so\'ng ko\'pi bilan 40 daqiqa ichida yetib keladi. Hatto xizmat ko\'rsatishdan bosh tortgan taqdirda ham xodimning kelishi va uskunaning diagnostikasi uchun pul to\'lashingiz shart emas. Nosozliklar joylashuvi va murakkabligidan qat\'i nazar murojaat qilingan kuniyoq bartaraf etiladi, agar ehtiyot qismlarni almashtirish zarur bo\'lsa, biz original va analog qismlarni taklif qilamiz.'
        ]
      },
      listTitle: { ru: 'Ремонт холодильника поможет, если техника:', uz: 'Xolodilnikni ta\'mirlash quyidagi hollarda yordam beradi:' },
      listItems: {
        ru: [
          'Отказывается включаться – неисправен мотор-компрессор, сетевой шнур, управляющая плата;',
          'Генерирует недостаточно холода – износ уплотнительных элементов, недостаток фреона в контуре, повреждение испарителя;',
          'Не реагирует на изменение настроек – нарушение в работе электроцепи, вызвавшее рассинхронизацию отдельных компонентов с управляющим блоком;',
          'Работает не отключаясь – утечка хладагента, что приводит к перегреву теплообменника.'
        ],
        uz: [
          'Yonishdan bosh tortmoqda – motor-kompressor, elektr shnuri, boshqaruv platasi nosoz;',
          'Yetarli darajada sovuq chiqarmayapti – zichlagich elementlarining eskirishi, konturda freon yetishmasligi, evaporatorning shikastlanishi;',
          'Sozlamalar o\'zgarishiga munosabat bildirmayapti – elektr zanjirining ishlashidagi buzilish, bu alohida komponentlarning boshqaruv bloki bilan sinxronizatsiyasini buzilishiga olib keladi;',
          'To\'xtovsiz ishlamoqda – xladagent qochishi, bu issiqlik almashtirgichning qizib ketishiga olib keladi.'
        ]
      },
      paragraphs2: {
        ru: ['Наш мастер по ремонту холодильников решит любую техническую проблему, дозаправит контур фреоном, проведёт вакуумацию трассы.'],
        uz: ['Bizning xolodilnik ta\'mirlovchi ustamiz har qanday texnik muammoni hal qiladi, konturga freon quyadi, trassani vakuumlashtiradi.']
      }
    }
  },

  'remont-gazovyh-kotlov-v-tashkente': {
    slug: 'remont-gazovyh-kotlov-v-tashkente',
    title: { ru: 'Ремонт газовых котлов в Ташкенте', uz: 'Toshkentda gaz qozonlarini ta\'mirlash' },
    subtitle: { ru: 'Ремонт газовых котлов в Ташкенте. Чистка котла. Обслуживание котлов. Профилактика котлов Ремонт котлов.', uz: 'Toshkentda gaz qozonlarini ta\'mirlash. Qozonni tozalash va profilaktika qilish xizmatlari.' },
    heroImage: '/images/service-gas-boiler.png',
    badge: { ru: 'Мастер по газовым котлам', uz: 'Gaz qozonlari ustasi' },
    priceFrom: { ru: 'От 80 000 сум', uz: '80 000 so\'mdan' },
    breakdowns: [
      {
        id: 'no-ignition',
        title: { ru: 'Не зажигается горелка', uz: 'Gorelka yonmayapti' },
        description: { ru: 'Ремонт системы розжига', uz: 'Yoqish tizimini ta\'mirlash' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'power',
        image: '/images/service-gas-boiler.png'
      },
      {
        id: 'weak-heating',
        title: { ru: 'Слабый нагрев воды', uz: 'Suv isitish past darajada' },
        description: { ru: 'Чистка теплообменника', uz: 'Issiqlik almashtirgichni tozalash' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 150 000 сум', uz: '150 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-gas-boiler.png'
      },
      {
        id: 'water-leak',
        title: { ru: 'Капает вода из котла', uz: 'Kotyoldan suv tomyapti' },
        description: { ru: 'Устранение протечки', uz: 'Suv oqishini bartaraf etish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'water',
        image: '/images/service-gas-boiler.png'
      },
      {
        id: 'pressure-error',
        title: { ru: 'Ошибка давления', uz: 'Bosim xatosi' },
        description: { ru: 'Настройка/замена расширительного бака', uz: 'Kengaytirish bakini sozlash/almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 150 000 сум', uz: '150 000 so\'mdan' },
        iconType: 'sensor',
        image: '/images/service-gas-boiler.png'
      },
      {
        id: 'noise',
        title: { ru: 'Котёл шумит при работе', uz: 'Kotyol ishlaganda shovqin qilyapti' },
        description: { ru: 'Удаление воздуха из системы', uz: 'Tizimdan havoni chiqarib tashlash' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 80 000 сум', uz: '80 000 so\'mdan' },
        iconType: 'noise',
        image: '/images/service-gas-boiler.png'
      },
      {
        id: 'no-hot-water',
        title: { ru: 'Не работает горячая вода', uz: 'Issiq suv ishlamayapti' },
        description: { ru: 'Ремонт трехходового клапана', uz: 'Uch yo\'lli klapanni ta\'mirlash' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 180 000 сум', uz: '180 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-gas-boiler.png'
      }
    ],
    symptomChecklist: {
      title: { ru: 'Типичные симптомы', uz: 'Odatiy belgilar' },
      desc: { ru: 'Если вы заметили один из этих признаков, лучше не откладывать ремонт:', uz: 'Agar ushbu belgilardan birini sezsangiz, ta\'mirlashni kechiktirmaganingiz ma\'qul:' },
      items: [
        { ru: 'Котел издает необычные звуки (гул, свист)', uz: 'Kotyol noodatiy tovushlar chiqarmoqda' },
        { ru: 'Часто падает давление на манометре', uz: 'Manometrda bosim tez-tez tushib ketmoqda' },
        { ru: 'Вода из крана идет то горячая, то холодная', uz: 'Kranda suv goh issiq, goh sovuq kelyapti' }
      ]
    },
    brands: ['Navien', 'Baxi', 'Ariston', 'Immergas', 'Ferroli', 'Viessmann', 'Vaillant', 'Protherm', 'Bosch', 'Rinnai', 'Chaffoteaux', 'Fondital', 'Artel', 'Hydrosta'],
    seoText: {
      title: { ru: 'Ремонт газовых котлов в Ташкенте', uz: 'Toshkentda gaz kotyollarini ta\'mirlash' },
      paragraphs1: {
        ru: [
          'Газовое отопление считается востребованным, эффективным способом обогрева жилья. Производители выпускают надежные, долговечные устройства. Часто неисправность котла становится неожиданной ситуацией, поэтому владельцы пытаются самостоятельно справиться с поломками, что запрещено требованиями безопасности. При первых признаках неисправности эксперты сервисного центра «Eco-service» рекомендуют обращаться за помощью специалистов.'
        ],
        uz: [
          'Gazli isitish uylarni isitishning talab qilinadigan va samarali usuli hisoblanadi. Ishlab chiqaruvchilar ishonchli, uzoq muddat xizmat qiladigan qurilmalar ishlab chiqaradilar. Ko\'pincha qozonning nosozligi kutilmagan holat bo\'ladi, shuning uchun egalari mustaqil ravishda buzilishlarni bartaraf etishga harakat qilishadi, bu esa xavfsizlik talablari bilan taqiqlangan. Nosozlikning birinchi belgilarida «Eco-service» servis markazi ekspertlari mutaxassislardan yordam so\'rashni tavsiya qiladilar.'
        ]
      },
      listTitle: { ru: 'Часто ремонт газового котла требуется из-за следующих причин:', uz: 'Ko\'pincha gaz qozonini ta\'mirlash quyidagi sabablarga ko\'ra talab qilinadi:' },
      listItems: {
        ru: [
          'разгерметизация отопительной системы;',
          'недостаточное количество теплоносителя;',
          'засор фильтров;',
          'неквалифицированный монтаж;',
          'отсутствие регулярного технического обслуживания;',
          'использование низкокачественных комплектующих.'
        ],
        uz: [
          'isitish tizimi germetikligining buzilishi;',
          'issiqlik tashuvchining yetarli emasligi;',
          'filtrlar tiqilib qolishi;',
          'malakasiz o\'rnatish;',
          'muntazam texnik xizmat ko\'rsatilmasligi;',
          'past sifatli butlovchi qismlardan foydalanish.'
        ]
      },
      paragraphs2: {
        ru: [
          'Следует учитывать, что определенные марки, модели техники предусматривают типичные поломки, которые встречаются достаточно часто. Эксперты выделяют целый ряд характерных признаков, которые помогают понять, что требуется срочный ремонт и обслуживание газовых котлов:'
        ],
        uz: [
          'Shuni yodda tutish kerakki, texnikaning ayrim rusumlari va modellari o\'ziga xos odatiy buzilishlarni ko\'zda tutadi, ular ancha tez-tez uchrab turadi. Ekspertlar zudlik bilan ta\'mirlash va xizmat ko\'rsatish zarurligini tushunishga yordam beradigan bir qator o\'ziga xos belgilarni ajratib ko\'rsatadilar:'
        ]
      },
      listTitle2: { ru: 'Признаки неисправности:', uz: 'Nosozlik belgilari:' },
      listItems2: {
        ru: [
          'техника не включается из-за низкого давления в камере, неправильного функционирования электроподжига, перегрева или отсутствия тяги;',
          'работа устройства сопровождается сильным шумом, гудением – излишнее накопление накипи в теплообменнике, засор форсунок, труб, радиаторов;',
          'наблюдается «обратная тяга»;',
          'снизилась температура нагрева воды;',
          'пламя стало коптить;',
          'отсутствует реакция на команды с панели;',
          'перестал качать циркуляционный насос.'
        ],
        uz: [
          'texnika kamerada bosim pastligi, elektr yoqishining noto\'g\'ri ishlashi, qizib ketish yoki tortishning yo\'qligi tufayli yonmaydi;',
          'qurilmaning ishlashi kuchli shovqin, g\'o\'ng\'illash bilan birga kechadi - issiqlik almashtirgichda ortiqcha qasmoq to\'planishi, forsunka, quvurlar, radiatorlar tiqilib qolishi;',
          '«teskari tortish» kuzatiladi;',
          'suvni isitish harorati pasaygan;',
          'olov tutatadigan bo\'lib qoldi;',
          'paneldan berilgan buyruqlarga reaksiya yo\'q;',
          'sirkulyatsion nasos suv tortishdan to\'xtadi.'
        ]
      },
      paragraphs3: {
        ru: [
          'Предварительно выполняем тщательную диагностику для определения первопричины неисправности. Располагаем собственным складом оригинальных запчастей.',
          'Предлагаем заказать оперативный ремонт газовых котлов Ташкент. Оформление заявки на срочный выезд мастера доступно на сайте, по указанному телефону. Менеджеры готовы предоставить дополнительную информацию.'
        ],
        uz: [
          'Dastlab nosozlikning tub sababini aniqlash uchun ehtiyotkorlik bilan diagnostika o\'tkazamiz. Bizning o\'zimizning original ehtiyot qismlar omborimiz mavjud.',
          'Toshkentda gaz qozonlarini tezkor ta\'mirlashga buyurtma berishni taklif etamiz. Ustani tezkor chaqirish uchun arizani saytda yoki ko\'rsatilgan telefon orqali rasmiylashtirish mumkin. Menejerlar qo\'shimcha ma\'lumot taqdim etishga tayyor.'
        ]
      }
    }
  },

  'remont-stiralnyh-mashin-v-tashkente': {
    slug: 'remont-stiralnyh-mashin-v-tashkente',
    title: { ru: 'Ремонт стиральных машин в Ташкенте', uz: 'Toshkentda kir yuvish mashinalarini ta\'mirlash' },
    subtitle: { ru: 'Срочный выезд мастера за 60 минут. Диагностика, оригинальные запчасти и гарантия на ремонт.', uz: 'Ustaning 60 daqiqada tezkor yetib borishi. Diagnostika, asl ehtiyot qismlar va kafolat.' },
    heroImage: '/images/service-washing.png',
    badge: { ru: 'Мастер по стиральным машинам', uz: 'Kir yuvish mashinasi ustasi' },
    priceFrom: { ru: 'От 80 000 сум', uz: '80 000 so\'mdan' },
    breakdowns: [
      {
        id: 'no-heat',
        title: { ru: 'Не греет воду', uz: 'Suvni isitmayapti' },
        description: { ru: 'Стиральная машина не греет воду: перегорел ТЭН, неисправен модуль управления или датчик температуры, повреждена проводка или контакты в цепи нагрева.', uz: 'Kir yuvish mashinasi suvni isitmayapti: TEN kuygan, harorat datchigi yoki boshqaruv moduli nosoz, simlar shikastlangan.' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-washing.png'
      },
      {
        id: 'no-power',
        title: { ru: 'Не включается', uz: 'Yonmayapti' },
        description: { ru: 'Не включается стиральная машина: неисправна вилка или шнур питания, вышел из строя сетевой фильтр, сгорела плата управления, вышла из строя кнопка включения, неисправен модуль индикации, обрыв проводки в цепи питания.', uz: 'Umuman yoqilmayapti: elektr vilkasi, shnur yoki filtr shikastlangan, boshqaruv platasi kuygan, yoqish tugmasi ishlamayapti.' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 95 000 сум', uz: '95 000 so\'mdan' },
        iconType: 'power',
        image: '/images/service-washing.png'
      },
      {
        id: 'no-spin-drum',
        title: { ru: 'Не крутит барабан', uz: 'Baraban aylanmayapti' },
        description: { ru: 'В стиральной машине не крутится барабан: износ щёток электродвигателя или поломка самого двигателя, слетел или порвался приводной ремень, подшипники вышли из строя, поломка модуля управления, неисправность датчика, повреждена проводка или контакты в электроцепи двигателя.', uz: 'Baraban aylanmayapti: motor cho\'tkalari yeyilgan yoki motor buzilgan, tasmali uzilgan, podshipniklar ishdan chiqqan, boshqaruv moduli nosoz.' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 130 000 сум', uz: '130 000 so\'mdan' },
        iconType: 'spin',
        image: '/images/service-washing.png'
      },
      {
        id: 'no-drain',
        title: { ru: 'Не отжимает', uz: 'Siqmayapti (Suv chiqarmayapti)' },
        description: { ru: 'Неисправен сливной насос или засорился слив, износились щётки электродвигателя или сломался сам двигатель, растянулся и проскальзывает приводной ремень, неисправен блок управления, износились амортизаторы, вышли из строя подшипники, неисправен датчик контроля оборотов или датчик уровня воды.', uz: 'Drenaj nasosi nosoz yoki drenaj tiqilib qolgan, motor cho\'tkalari yeyilgan, tasmali cho\'zilgan, amortizator yoki podshipnik eskirgan.' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 110 000 сум', uz: '110 000 so\'mdan' },
        iconType: 'drain',
        image: '/images/service-washing.png'
      },
      {
        id: 'no-water',
        title: { ru: 'Не набирает воду', uz: 'Suv tortmayapti' },
        description: { ru: 'Неисправен или не закрыт замок дверцы (УБЛ – устройство блокировки люка), засорился фильтр перед заливным клапаном подачи воды, повреждён заливной электроклапан подачи воды, неисправен датчик уровня воды (прессостат), вышел из строя управляющий модуль.', uz: 'Eshik qulfi (UBL) yopilmagan yoki buzilgan, suv kirish klapani oldidagi filtr tiqilib qolgan, klapan yoki suv sathi datchigi nosoz.' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 90 000 сум', uz: '90 000 so\'mdan' },
        iconType: 'water',
        image: '/images/service-washing.png'
      },
      {
        id: 'door-locked',
        title: { ru: 'Не открывается', uz: 'Eshik ochilmayapti' },
        description: { ru: 'Включена защита от детей, произошёл скачок или перебои в электричестве, случился программный сбой платы управления или неисправна сама плата, поломка устройства блокировки люка (УБЛ), сломан механизм ручки.', uz: 'Bolalardan himoya yoqilgan, elektr uzilishi sababli dastur xatosi, boshqaruv platasi nosoz, eshik qulfi (UBL) yoki tutqich mexanizmi singan.' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 85 000 сум', uz: '85 000 so\'mdan' },
        iconType: 'lock',
        image: '/images/service-washing.png'
      }
    ],
    symptomChecklist: {
      title: { ru: 'Когда пора вызывать мастера', uz: 'Qachon usta chaqirish kerak' },
      desc: { ru: 'Если вы заметили один из следующих симптомов, рекомендуем вызвать мастера:', uz: 'Agar quyidagi belgilardan birini sezsangiz, zudlik bilan usta chaqiring:' },
      items: [
        { ru: 'Выводит на дисплей коды ошибок (E1, E2, UE, 4E, dE)', uz: 'Displeyda xatolik kodlari chiqmoqda (E1, E2, UE, 4E, dE)' },
        { ru: 'Не сливает воду или сливает слишком медленно', uz: 'Suvni chiqarmayapti yoki juda sekin chiqarmoqda' },
        { ru: 'Издает сильный металлический скрежет или вибрацию при отжиме', uz: 'Siqish paytida kuchli temir ishqalanishi yoki tebranish hosil bo\'ladi' }
      ]
    },
    brands: ['Samsung', 'LG', 'Bosch', 'Miele', 'Electrolux', 'Indesit', 'Beko', 'Siemens', 'Hotpoint-Ariston', 'AEG', 'Whirlpool', 'Gorenje', 'Candy', 'Artel'],
    seoText: {
      title: { ru: 'Ремонт стиральных машин в Ташкенте', uz: 'Toshkentda kir yuvish mashinalarini ta\'mirlash' },
      paragraphs1: {
        ru: [
          'При поломке такой техники, отключите оборудование от электросети, и обратитесь к инструкции по эксплуатации. Здесь содержатся коды ошибок, которые выводятся на дисплей панели управления, приводятся рекомендации по их устранению. Таким образом, даже без обращения в сервисный центр можно решить 20%-30% проблем. Оставшуюся часть дефектов исправят инженеры нашего сервиса. Вызвать инженера можно по телефону или заполнив форму заявки. Мастер по ремонту стиральных машин в Ташкенте приедет по указанному адресу уже через 30-40 минут после получения заявки. Цена обслуживания определяется после диагностики.',
          'Последовательное тестирование помогает выявить все имеющиеся дефекты ошибки в работе, о которых даже не подозревают пользователи. При этом наши клиенты платят только за результат, поэтому оплачивать выезд сотрудника и проведённую диагностику не нужно.',
          'Чтобы не усложнять работу инженеру, не пытайтесь устранять поломки самостоятельно. Ремонт стиральных машин на дому должен выполняться только квалифицированными инженерами, с опытом работы не меньше 5 лет.'
        ],
        uz: [
          'Bunday uskunalar buzilganida uni elektr tarmog\'idan uzing va foydalanish bo\'yicha qo\'llanmaga murojaat qiling. U yerda boshqaruv paneli displeyida ko\'rsatiladigan xatolik kodlari va ularni bartaraf etish bo\'yicha tavsiyalar mavjud. Shunday qilib, xizmat ko\'rsatish markaziga murojaat qilmasdan ham 20%-30% muammolarni hal qilish mumkin. Qolgan nuqsonlarni bizning servis muhandislarimiz tuzatadilar. Ustani telefon orqali yoki ariza shaklini to\'ldirish orqali chaqirishingiz mumkin. Toshkentda kir yuvish mashinalarini ta\'mirlash ustasi ariza tushganidan so\'ng 30-40 daqiqa o\'tgach ko\'rsatilgan manzilga yetib boradi. Xizmat narxi diagnostikadan so\'ng belgilanadi.',
          'Ketma-ket sinovlar foydalanuvchilar hatto shubha qilmaydigan ishdagi barcha nuqson va xatolarni aniqlashga yordam beradi. Shu bilan birga mijozlarimiz faqat natija uchun to\'lashadi, shuning uchun xodimning tashrifi va diagnostika uchun pul to\'lash kerak emas.',
          'Ustaning ishini murakkablashtirmaslik uchun nosozliklarni o\'zingiz tuzatishga urinmang. Uyda kir yuvish mashinalarini ta\'mirlash faqat 5 yildan kam bo\'lmagan ish tajribasiga ega malakali muhandislar tomonidan amalga oshirilishi kerak.'
        ]
      },
      listTitle: { ru: 'Позвоните нам, если ваша машинка:', uz: 'Agar kir yuvish mashinangiz quyidagi holatlarga tushsa, bizga qo\'ng\'iroq qiling:' },
      listItems: {
        ru: [
          'Выводит на информативный дисплей коды ошибок, которых нет в инструкции;',
          'Не сливает или не набирает воду;',
          'Издаёт посторонние звуки;',
          'Протекает;',
          'Стирает бельё в холодной воде;',
          'Не включается;',
          'Не закрывается дверца.'
        ],
        uz: [
          'Displeyga qo\'llanmada yo\'q bo\'lgan xatolik kodlarini chiqarsa;',
          'Suvni chiqarmasa yoki tortmasa;',
          'Begona tovushlar chiqarsa;',
          'Suv oqizsa;',
          'Kiyimlarni sovuq suvda yuvsa;',
          'Yonmasa;',
          'Eshik yopilmasa.'
        ]
      },
      paragraphs2: {
        ru: [
          'Все поломки устраняются в день обращения. Для замены неисправных деталей наш сервис предлагает оригинальные или условно-совместимые запчасти. Учитывая разницу в цене между комплектующими, выбор всегда остаётся за клиентом.'
        ],
        uz: [
          'Barcha nosozliklar murojaat qilingan kunning o\'zida bartaraf etiladi. Nosoz qismlarni almashtirish uchun bizning servisimiz original yoki qisman mos keladigan ehtiyot qismlarni taklif qiladi. Butlovchi qismlar orasidagi narx farqini hisobga olgan holda, tanlov har doim mijozda qoladi.'
        ]
      }
    }
  },

  'remont-kondiczionerov-v-tashkente': {
    slug: 'remont-kondiczionerov-v-tashkente',
    title: { ru: 'Ремонт кондиционеров в Ташкенте', uz: 'Toshkentda konditsionerlarni ta\'mirlash' },
    subtitle: { ru: 'Профессиональная заправка фреоном R410/R22/R32, чистка паром, пайка медных трубок и ремонт плат инвертора.', uz: 'R410/R22/R32 freonlarini quyish, bug\' bilan tozalash, mis quvurlarni payvandlash va invertor platalari ta\'miri.' },
    heroImage: '/images/service-ac.png',
    badge: { ru: 'Мастер по кондиционерам', uz: 'Konditsionerlar ustasi' },
    priceFrom: { ru: 'От 90 000 сум', uz: '90 000 so\'mdan' },
    breakdowns: [
      {
        id: 'no-cold',
        title: { ru: 'Не охлаждает', uz: 'Sovutmayapti' },
        description: { ru: 'Заправка фреоном или замена компрессора', uz: 'Freon quyish yoki kompressorni almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-ac.png'
      },
      {
        id: 'no-turn-on',
        title: { ru: 'Не включается', uz: 'Yonmayapti' },
        description: { ru: 'Ремонт платы управления или замена компрессора', uz: 'Boshqaruv platasini ta\'mirlash yoki kompressorni almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 90 000 сум', uz: '90 000 so\'mdan' },
        iconType: 'power',
        image: '/images/service-ac.png'
      },
      {
        id: 'noise',
        title: { ru: 'Шумит', uz: 'Shovqin qilyapti' },
        description: { ru: 'Замена датчика температуры или вентилятора', uz: 'Harorat datchigi yoki ventilyatorni almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 110 000 сум', uz: '110 000 so\'mdan' },
        iconType: 'noise',
        image: '/images/service-ac.png'
      },
      {
        id: 'water-leak',
        title: { ru: 'Течет', uz: 'Suv oqyapti' },
        description: { ru: 'Засор дренажа или внутреннего блока', uz: 'Drenaj yoki ichki blok tiqilib qolishi' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 80 000 сум', uz: '80 000 so\'mdan' },
        iconType: 'leak',
        image: '/images/service-ac.png'
      },
      {
        id: 'bad-air',
        title: { ru: 'Плохо дует', uz: 'Yomon puflayapti' },
        description: { ru: 'Очистка внутреннего блока, замена вентилятора или заправка фреоном', uz: 'Ichki blokni tozalash, ventilyatorni almashtirish yoki freon quyish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 95 000 сум', uz: '95 000 so\'mdan' },
        iconType: 'sensor',
        image: '/images/service-ac.png'
      },
      {
        id: 'inverter-error',
        title: { ru: 'Мигают индикаторы', uz: 'Indikatorlar miltillamoqda' },
        description: { ru: 'Ремонт блока управления или замена датчика испарителя', uz: 'Boshqaruv blokini ta\'mirlash yoki evaporator datchigini almashtirish' },
        symptoms: { ru: '', uz: '' },
        price: { ru: 'от 130 000 сум', uz: '130 000 so\'mdan' },
        iconType: 'motor',
        image: '/images/service-ac.png'
      }
    ],
    symptomChecklist: {
      title: { ru: 'Симптомы поломки сплит-системы', uz: 'Split-tizim nosozligini bildiruvchi alomatlar' },
      desc: { ru: 'Регулярное техобслуживание снижает расход электроэнергии на 30% и продлевает срок службы:', uz: 'Muntazam profilaktika elektr sarfini 30% tejaydi va kompressor umrini uzaytiradi:' },
      items: [
        { ru: 'Обмерзание медных трубок и кранов на внешнем блоке', uz: 'Tashqi blokdagi mis quvurlar va jo\'mraklarda muz qatlami hosil bo\'lishi' },
        { ru: 'Кондиционер потребляет много энергии, но плохо охлаждает', uz: 'Konditsioner ko\'p elektr sarflaydi, ammo sovutishi juda sust' }
      ]
    },
    brands: ['Gree', 'Midea', 'Artel', 'Samsung', 'LG', 'Chigo', 'AUX', 'Haier', 'Daikin', 'Mitsubishi Electric', 'TCL', 'Electrolux', 'Shivaki', 'Zanussi'],
    seoText: {
      title: { ru: 'Ремонт кондиционера в Ташкенте', uz: 'Toshkentda konditsionerlarni ta\'mirlash' },
      paragraphs1: {
        ru: [
          'Даже брендовые модели климатического оборудования могут выйти из строя в самый неподходящий момент. В большинстве случаев, поломки бытовых сплит-систем спровоцированы следующими факторами:'
        ],
        uz: [
          'Hatto iqlim uskunasining brend modellari ham eng kutilmagan vaqtda ishdan chiqishi mumkin. Aksariyat hollarda maishiy split-tizimlarning buzilishiga quyidagi omillar sabab bo\'ladi:'
        ]
      },
      listTitle: { ru: 'Причины поломки сплит-систем:', uz: 'Split-tizimlar buzilishining sabablari:' },
      listItems: {
        ru: [
          'Нарушение технологии монтажа – актуально в ситуациях, когда пользователи заказывают установку у случайных мастеров;',
          'Перепады напряжения в домашней сети – предотвратить проблему поможет подключение через выпрямитель или стабилизатор;',
          'Недопустимые условия эксплуатации – использование техники при несоответствующем температурном режиме или в неподходящих помещениях;',
          'Отсутствие сервисного обслуживания – повышает износ узлов и механизмов.'
        ],
        uz: [
          'O\'rnatish texnologiyasining buzilishi - foydalanuvchilar o\'rnatishni tasodifiy ustalarga buyurtma qilgan holatlarga xosdir;',
          'Uy tarmog\'idagi kuchlanishning keskin o\'zgarishi - muammoning oldini olishga stabilizator orqali ulanish yordam beradi;',
          'Foydalanishning ruxsat etilmagan shartlari - uskunani noto\'g\'ri harorat rejimida yoki yaroqsiz xonalarda ishlatish;',
          'Servis xizmatining yo\'qligi - tugunlar va mexanizmlarning eskirishini oshiradi.'
        ]
      },
      paragraphs2: {
        ru: [
          'При обращении в нашу мастерскую, ремонт кондиционера выполняется в тот же день. Сколько стоит услуга, определяется после диагностики – это фиксированная стоимость, которая не изменяется в процессе работы. Вызов, выезд инженера, а также проведённая диагностика остаются бесплатными.'
        ],
        uz: [
          'Bizning ustaxonamizga murojaat qilganda, konditsionerni ta\'mirlash o\'sha kunning o\'zida amalga oshiriladi. Xizmat narxi diagnostikadan so\'ng belgilanadi - bu ish jarayonida o\'zgarmaydigan qat\'iy narx. Ustani chaqirish, muhandisning kelishi va o\'tkazilgan diagnostika bepul bo\'lib qoladi.'
        ]
      },
      listTitle2: { ru: 'На необходимость обращения к профессионалам указывают следующие признаки:', uz: 'Professionallarga murojaat qilish zaruratini quyidagi belgilar ko\'rsatadi:' },
      listItems2: {
        ru: [
          'Проблемы с выбором рабочего режима. Это симптом отказа управляющей платы либо электронных компонентов. Такой ремонт кондиционеров на дому сводится к проверке электроцепи, перепайке плат или замене неисправных деталей.',
          'Некорректная работа внешнего блока. Поломка проявляется посторонним шумом в работе, недостаточный нагрев или охлаждение помещения.',
          'Протечки внутреннего блока. В таких ситуациях, как минимум нужно проверить функциональность дренажной системы.',
          'Постоянное отключение. Ошибка программного обеспечения, точная причина устанавливается после диагностики.'
        ],
        uz: [
          'Ish rejimini tanlash bilan bog\'liq muammolar. Bu boshqaruv platasi yoki elektron komponentlarning ishlamay qolishi belgisidir. Uyda bunday ta\'mirlash elektr zanjirini tekshirish, platalarni qayta kavsharlash yoki nosoz qismlarni almashtirishni o\'z ichiga oladi.',
          'Tashqi blokning noto\'g\'ri ishlashi. Buzilish ishdagi begona shovqin, xonani yetarli darajada isitmaslik yoki sovutmaslik bilan namoyon bo\'ladi.',
          'Ichki blokdan suv oqishi. Bunday holatlarda, hech bo\'lmaganda drenaj tizimining ishlashini tekshirish kerak.',
          'Doimiy o\'chib qolish. Dasturiy ta\'minot xatosi, aniq sabab diagnostikadan keyin belgilanadi.'
        ]
      },
      paragraphs3: {
        ru: [
          'Недорогой ремонт и обслуживание кондиционеров – это комплексная услуга, в рамках которой выявляются имеющиеся дефекты, предотвращаются возможные поломки. Приехавший на вызов мастер проверяет:'
        ],
        uz: [
          'Konditsionerlarni arzon ta\'mirlash va xizmat ko\'rsatish - bu mavjud nuqsonlar aniqlanadigan va ehtimoliy buzilishlarning oldi olinadigan kompleks xizmatdir. Chaqiruv bo\'yicha kelgan usta tekshiradi:'
        ]
      },
      listTitle3: { ru: 'Мастер проверяет:', uz: 'Usta quyidagilarni tekshiradi:' },
      listItems3: {
        ru: [
          'Техническое состояние блоков и трубопроводных магистралей;',
          'Функциональность программируемых режимов;',
          'Логику работы датчиков, контроллеров и плат электронного управления;',
          'Давление фреона;',
          'Чистоту фильтров;',
          'Надёжность электрических соединений;',
          'Состояние крепежа.'
        ],
        uz: [
          'Bloklar va quvur magistrallarining texnik holatini;',
          'Dasturlashtiriladigan rejimlarning ishlashini;',
          'Datchiklar, kontrollerlar va elektron boshqaruv platalarining ishlash mantiqini;',
          'Freon bosimini;',
          'Filtrlarning tozaligini;',
          'Elektr ulanishlarining ishonchliligini;',
          'Mahkamlagichlar holatini.'
        ]
      },
      paragraphs4: {
        ru: [
          'Профессиональный ремонт кондиционеров в Ташкенте поможет сэкономить время и деньги. Инженер компании выезжает в течение 40 минут после получения заявки, устраняет неисправности любой сложности. Для замены предлагаются оригинальные и условно совместимые запчасти на усмотрение клиента.'
        ],
        uz: [
          'Toshkentda konditsionerlarni professional ta\'mirlash vaqt va pulni tejashga yordam beradi. Kompaniya muhandisi ariza olinganidan keyin 40 daqiqa ichida yetib keladi va har qanday murakkablikdagi nosozliklarni bartaraf etadi. Ehtiyot qismlarni almashtirish uchun mijozning xohishiga ko\'ra original va shartli mos keladigan qismlar taklif etiladi.'
        ]
      }
    }
  }
};
