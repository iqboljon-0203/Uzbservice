export interface BreakdownItem {
  id: string;
  title: { ru: string; uz: string };
  description: { ru: string; uz: string };
  symptoms: { ru: string; uz: string };
  price: { ru: string; uz: string };
  iconType: 'heater' | 'power' | 'spin' | 'drain' | 'water' | 'lock' | 'temp' | 'ice' | 'motor' | 'noise' | 'leak' | 'sensor';
  image: string;
}

export interface ServiceDetail {
  slug: string;
  title: { ru: string; uz: string };
  subtitle: { ru: string; uz: string };
  heroImage: string;
  badge: { ru: string; uz: string };
  priceFrom: { ru: string; uz: string };
  breakdowns: BreakdownItem[];
  symptomChecklist: {
    title: { ru: string; uz: string };
    desc: { ru: string; uz: string };
    items: { ru: string; uz: string }[];
  };
  brands: string[];
}

export const servicesData: Record<string, ServiceDetail> = {
  'remont-stiralnyh-mashin-v-tashkente': {
    slug: 'remont-stiralnyh-mashin-v-tashkente',
    title: {
      ru: 'Ремонт стиральных машин в Ташкенте',
      uz: 'Toshkentda kir yuvish mashinalarini ta\'mirlash',
    },
    subtitle: {
      ru: 'Срочный выезд мастера за 60 минут. Диагностика, оригинальные запчасти и гарантия на ремонт до 12 месяцев.',
      uz: 'Ustaning 60 daqiqada tezkor yetib borishi. Diagnostika, asl ehtiyot qismlar va 12 oygacha rasmiy kafolat.',
    },
    heroImage: '/images/service-washing.png',
    badge: {
      ru: 'Мастер по стиральным машинам',
      uz: 'Kir yuvish mashinasi ustasi',
    },
    priceFrom: {
      ru: 'От 95 000 сум',
      uz: '95 000 so\'mdan',
    },
    breakdowns: [
      {
        id: 'water-heater',
        title: {
          ru: 'Не греет воду',
          uz: 'Suvni isitmayapti',
        },
        description: {
          ru: 'Выход из строя нагревательного элемента (ТЭНа) из-за накипи или сбой датчика температуры.',
          uz: 'Qasmoq to\'planishi tufayli isitish elementi (TEN) ishdan chiqqan yoki harorat datchigi nosoz.',
        },
        symptoms: {
          ru: 'Стирка идет в холодной воде, белье плохо отстирывается.',
          uz: 'Yuvish sovuq suvda ketmoqda, kiyimlar yaxshi yuvilmayapti.',
        },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'heater',
        image: '/images/service-washing.png',
      },
      {
        id: 'no-power',
        title: {
          ru: 'Не включается',
          uz: 'Umuman yoqilmayapti',
        },
        description: {
          ru: 'Неисправность сетевого фильтра, сетевого шнура или электронной платы управления.',
          uz: 'Elektr ta\'minoti filtri, kabel yoki asosiy elektron boshqaruv platasi shikastlangan.',
        },
        symptoms: {
          ru: 'Индикаторы не горят, машина не реагирует на кнопку пуска.',
          uz: 'Chiroqlar yonmaydi, mashina yoqish tugmasiga javob bermaydi.',
        },
        price: { ru: 'от 95 000 сум', uz: '95 000 so\'mdan' },
        iconType: 'power',
        image: '/images/about-2.png',
      },
      {
        id: 'drum-spin',
        title: {
          ru: 'Не крутит барабан',
          uz: 'Baraban aylanmayapti',
        },
        description: {
          ru: 'Разрыв приводного ремня, износ щеток двигателя или поломка мотора.',
          uz: 'Harakatlantiruvchi tasmali uzilgan, motor cho\'tkalari yeyilgan yoki motor nosoz.',
        },
        symptoms: {
          ru: 'Вода набирается, но барабан стоит на месте и гудит.',
          uz: "Suv to'ladi, lekin baraban aylanmasdan faqat g'o'ng'illaydi.",
        },
        price: { ru: 'от 130 000 сум', uz: '130 000 so\'mdan' },
        iconType: 'spin',
        image: '/images/about-1.png',
      },
      {
        id: 'no-spin',
        title: {
          ru: 'Не отжимает',
          uz: 'Kiyimlarni siqmayapti',
        },
        description: {
          ru: 'Засор дренажного фильтра, поломка сливной помпы (насоса) или износ подшипников.',
          uz: 'Drenaj filtri tiqilib qolgan, suv chiqarish nasosi buzilgan yoki podshipnik yeyilgan.',
        },
        symptoms: {
          ru: 'Стирка завершается, но вещи остаются абсолютно мокрыми.',
          uz: 'Dastur tugaydi, biroq kiyimlar butunlay ho\'l holatda qoladi.',
        },
        price: { ru: 'от 110 000 сум', uz: '110 000 so\'mdan' },
        iconType: 'drain',
        image: '/images/service-washing.png',
      },
      {
        id: 'no-water',
        title: {
          ru: 'Не набирает воду',
          uz: 'Suv olmayapti',
        },
        description: {
          ru: 'Засор фильтра грубой очистки, неисправность электромагнитного впускного клапана.',
          uz: 'Kirish filtri tozalanishi lozim yoki suv quyuvchi elektromagnit klapan buzilgan.',
        },
        symptoms: {
          ru: 'Машина гудит, но вода не поступает в бак.',
          uz: "Mashina g'o'ng'illaydi, lekin bakka suv kirmaydi.",
        },
        price: { ru: 'от 90 000 сум', uz: '90 000 so\'mdan' },
        iconType: 'water',
        image: '/images/about-2.png',
      },
      {
        id: 'door-lock',
        title: {
          ru: 'Не открывается люк',
          uz: 'Eshigi ochilmayapti',
        },
        description: {
          ru: 'Выход из строя устройства блокировки люка (УБЛ) или поломка ручки двери.',
          uz: 'Lyukni qulflash mexanizmi (UBL) kuygan yoki eshik tutqichi singan.',
        },
        symptoms: {
          ru: 'Стирка закончилась, но замок двери не разблокируется.',
          uz: 'Yuvish yakunlangan bo\'lsa ham, eshik qulfi ochilmayapti.',
        },
        price: { ru: 'от 85 000 сум', uz: '85 000 so\'mdan' },
        iconType: 'lock',
        image: '/images/service-washing.png',
      },
    ],
    symptomChecklist: {
      title: {
        ru: 'Признаки необходимости срочного ремонта',
        uz: 'Tezkor ta\'mir zarurligini bildiruvchi belgilar',
      },
      desc: {
        ru: 'Если вы заметили один из следующих симптомов, рекомендуем вызвать мастера, чтобы избежать дорогостоящей замены ключевых узлов:',
        uz: 'Agar quyidagi belgilardan birini sezsangiz, qimmatbaho ehtiyot qismlarni to\'liq almashtirishga to\'g\'ri kelmasligi uchun zudlik bilan usta chaqiring:',
      },
      items: [
        { ru: 'Выводит на дисплей коды ошибок (E1, E2, UE, 4E, dE)', uz: 'Displeyda xatolik kodlari chiqmoqda (E1, E2, UE, 4E, dE)' },
        { ru: 'Не сливает воду или сливает слишком медленно', uz: 'Suvni chiqarmayapti yoki juda sekin chiqarmoqda' },
        { ru: 'Издает сильный металлический скрежет или вибрацию при отжиме', uz: 'Siqish paytida kuchli temir ishqalanishi yoki tebranish hosil bo\'ladi' },
        { ru: 'Протекает вода снизу стиральной машины', uz: 'Kir yuvish mashinasining ostidan suv oqmoqda' },
        { ru: 'Бьет током при прикосновении к корпусу или барабану', uz: 'Korpusga yoki barabanga tekkanda elektr toki urmoqda' },
        { ru: 'Слишком долго стирает, зависает посреди программы', uz: 'Juda uzoq yuvmoqda, dastur o\'rtasida qotib qolmoqda' },
      ],
    },
    brands: [
      'Samsung', 'LG', 'Bosch', 'Miele', 'Electrolux', 'Indesit', 'Beko', 'Siemens', 'Hotpoint-Ariston', 'AEG', 'Whirlpool', 'Gorenje', 'Candy', 'Artel'
    ],
  },

  'remont-holodilnikov-v-tashkente': {
    slug: 'remont-holodilnikov-v-tashkente',
    title: {
      ru: 'Ремонт холодильников в Ташкенте',
      uz: 'Toshkentda muzlatgichlarni ta\'mirlash',
    },
    subtitle: {
      ru: 'Круглосуточный выезд мастера. Заправка фреоном, замена компрессора, ремонт системы No Frost с гарантией.',
      uz: 'Kechayu-kunduz ustaning chiqishi. Freon quyish, kompressorni almashtirish, No Frost tizimi ta\'miri.',
    },
    heroImage: '/images/service-fridge.png',
    badge: {
      ru: 'Мастер по холодильникам',
      uz: 'Muzlatgichlar ustasi',
    },
    priceFrom: {
      ru: 'От 120 000 сум',
      uz: '120 000 so\'mdan',
    },
    breakdowns: [
      {
        id: 'no-cooling',
        title: {
          ru: 'Не морозит (нет холода)',
          uz: 'Muzlatmayapti (sovuq yo\'q)',
        },
        description: {
          ru: 'Утечка хладагента (фреона) в запененной части или выход из строя компрессора.',
          uz: 'Freon sizib chiqqan yoki motor-kompressor bosim bermayapti.',
        },
        symptoms: {
          ru: 'Компрессор работает, но температура в камерах повышается.',
          uz: 'Motor ishlayapti, lekin kameralar ichi isib bormoqda.',
        },
        price: { ru: 'от 140 000 сум', uz: '140 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-fridge.png',
      },
      {
        id: 'no-frost',
        title: {
          ru: 'Намерзает снег и лёд',
          uz: 'Qor va qalin muz qatlami to\'planyapti',
        },
        description: {
          ru: 'Сбой системы оттайки No Frost: перегорел ТЭН испарителя, датчик или таймер оттайки.',
          uz: 'No Frost muz eritish tizimi buzilgan: TEN yoki taymer ishlamayapti.',
        },
        symptoms: {
          ru: 'Задняя стенка покрыта толстым слоем инея, перекрыты воздуховоды.',
          uz: 'Orqa devor qalin qor bilan qoplangan, sovuq havo yo\'li to\'silgan.',
        },
        price: { ru: 'от 130 000 сум', uz: '130 000 so\'mdan' },
        iconType: 'ice',
        image: '/images/about-1.png',
      },
      {
        id: 'constant-running',
        title: {
          ru: 'Работает без остановки',
          uz: 'To\'xtovsiz tinmay ishlayapti',
        },
        description: {
          ru: 'Неисправность терморегулятора (термостата) или неплотное прилегание уплотнителя двери.',
          uz: 'Termostat buzilgan yoki eshik rezinkasi havo o\'tkazib yubormoqda.',
        },
        symptoms: {
          ru: 'Мотор не отключается часами, сильно нагревается корпус.',
          uz: 'Motor soatlab o\'chmaydi, korpus haddan tashqari qiziydi.',
        },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'motor',
        image: '/images/about-2.png',
      },
      {
        id: 'water-leak',
        title: {
          ru: 'Вода под ящиками или лужа',
          uz: 'Pastki qismidan suv oqmoqda',
        },
        description: {
          ru: 'Засор дренажной трубки или смещение водоотводного лотка над компрессором.',
          uz: 'Drenaj naychasi tiqilib qolgan yoki suv tushadigan maxsus idish surilgan.',
        },
        symptoms: {
          ru: 'Под овощными ящиками собирается вода и вытекает наружу.',
          uz: 'Sabzavot qutilari ostida suv to\'planib tashqariga oqib chiqadi.',
        },
        price: { ru: 'от 80 000 сум', uz: '80 000 so\'mdan' },
        iconType: 'leak',
        image: '/images/service-fridge.png',
      },
      {
        id: 'clicks-noise',
        title: {
          ru: 'Щелкает и не запускается',
          uz: 'Chiqillaydi va o\'chib qoladi',
        },
        description: {
          ru: 'Сгорело пускозащитное реле или межвитковое замыкание обмоток компрессора.',
          uz: 'Ishga tushirish relesi (puskovoy rele) kuygan yoki motor zanglagan.',
        },
        symptoms: {
          ru: 'Мотор пытается запуститься на 3–5 секунд и со щелчком отключается.',
          uz: 'Motor 3-5 soniya ishlashga harakat qiladi va chiqillab o\'chadi.',
        },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'noise',
        image: '/images/about-1.png',
      },
      {
        id: 'display-error',
        title: {
          ru: 'Мигает дисплей / пищит',
          uz: 'Displey miltillaydi / signal beradi',
        },
        description: {
          ru: 'Сбой модуля управления (электронной платы) из-за перепадов напряжения.',
          uz: 'Elektr kuchlanishi sakrashi tufayli boshqaruv platasi nosoz holatga kelgan.',
        },
        symptoms: {
          ru: 'Постоянный звуковой сигнал, мигают индикаторы температурных зон.',
          uz: 'Doimiy tovushli signal chiqadi, harorat ko\'rsatkichlari o\'chib-yonadi.',
        },
        price: { ru: 'от 150 000 сум', uz: '150 000 so\'mdan' },
        iconType: 'sensor',
        image: '/images/service-fridge.png',
      },
    ],
    symptomChecklist: {
      title: {
        ru: 'Когда пора вызывать мастера по холодильникам',
        uz: 'Qachon muzlatgich ustasini chaqirish kerak',
      },
      desc: {
        ru: 'При первых же отклонениях от нормы своевременный ремонт обходится в разы дешевле:',
        uz: 'Ilk nosozlik alomatlaridayoq ta\'mirlash kompressor kuyishining oldini oladi:',
      },
      items: [
        { ru: 'Морозилка работает, а холодильное отделение теплое', uz: 'Muzlatkich ishlayapti, ammo oddiy sovutish qismi iliq' },
        { ru: 'Компрессор сильно греется и горячий на ощупь', uz: 'Kompressor haddan tashqari qizib ketmoqda' },
        { ru: 'Внутри появился стойкий химический запах фреона', uz: 'Ichkarida o\'tkir kimyoviy hid paydo bo\'lgan' },
        { ru: 'Сильный шум, дребезжание или вибрация мотора', uz: 'Kuchli shovqin, g\'alati g\'o\'ng\'illash yoki tebranish' },
        { ru: 'Быстро тает мороженое и портятся продукты', uz: 'Muzqaymoq eriyapti va oziq-ovqatlar tez aynamoqda' },
      ],
    },
    brands: [
      'Samsung', 'LG', 'Bosch', 'Liebherr', 'Haier', 'Beko', 'Indesit', 'Atlant', 'Artel', 'Whirlpool', 'Hitachi', 'Electrolux', 'Sharp', 'Shivaki'
    ],
  },

  'remont-kondiczionerov-v-tashkente': {
    slug: 'remont-kondiczionerov-v-tashkente',
    title: {
      ru: 'Ремонт кондиционеров в Ташкенте',
      uz: 'Toshkentda konditsionerlarni ta\'mirlash',
    },
    subtitle: {
      ru: 'Профессиональная заправка фреоном R410/R22/R32, чистка паром, пайка медных трубок и ремонт плат инвертора.',
      uz: 'R410/R22/R32 freonlarini quyish, bug\' bilan tozalash, mis quvurlarni payvandlash va invertor platalari ta\'miri.',
    },
    heroImage: '/images/service-ac.png',
    badge: {
      ru: 'Мастер по кондиционерам',
      uz: 'Konditsionerlar ustasi',
    },
    priceFrom: {
      ru: 'От 90 000 сум',
      uz: '90 000 so\'mdan',
    },
    breakdowns: [
      {
        id: 'no-cold',
        title: {
          ru: 'Дует теплым воздухом',
          uz: 'Sovutmayapti, iliq havo haydamoqda',
        },
        description: {
          ru: 'Недостаток фреона в трассе, утечка через вальцовочные соединения или поломка компрессора.',
          uz: 'Trassada freon yetishmayapti, birlashmalardan sizib chiqqan yoki kompressor nosoz.',
        },
        symptoms: {
          ru: 'Кондиционер включен на 16°C, но воздух в комнате не охлаждается.',
          uz: 'Konditsioner 16°C ga qo\'yilgan, lekin xona sovimayapti.',
        },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'temp',
        image: '/images/service-ac.png',
      },
      {
        id: 'water-drips',
        title: {
          ru: 'Капает вода из блока',
          uz: 'Ichki blokdan xonaga suv oqmoqda',
        },
        description: {
          ru: 'Засор дренажной ванночки и шланга грязью, плесенью или перекос внутреннего блока.',
          uz: 'Drenaj naychasi chang va mog\'or bilan tiqilib qolgan yoki blok qiyshaygan.',
        },
        symptoms: {
          ru: 'Вода течет прямо по обоям или капает на пол из-под жалюзи.',
          uz: 'Devor qog\'ozi bo\'ylab yoki polga jalyuzi ostidan suv tommoqda.',
        },
        price: { ru: 'от 80 000 сум', uz: '80 000 so\'mdan' },
        iconType: 'leak',
        image: '/images/about-2.png',
      },
      {
        id: 'no-turn-on',
        title: {
          ru: 'Не реагирует на пульт',
          uz: 'Pultga javob bermayapti',
        },
        description: {
          ru: 'Неисправность фотоприемника, трансформатора питания или сгорел предохранитель.',
          uz: 'Fotopriyomnik datchigi yoki quvvat transformatori kuygan.',
        },
        symptoms: {
          ru: 'Звукового сигнала нет, кондиционер не запускается.',
          uz: 'Ovozli signal chiqmaydi, konditsioner mutlaqo yoqilmaydi.',
        },
        price: { ru: 'от 90 000 сум', uz: '90 000 so\'mdan' },
        iconType: 'power',
        image: '/images/about-1.png',
      },
      {
        id: 'bad-smell',
        title: {
          ru: 'Неприятный запах сырости',
          uz: 'Noxush namlik va chirigan hid kelmoqda',
        },
        description: {
          ru: 'Размножение бактерий и грибка на крыльчатке вентилятора и радиаторе испарителя.',
          uz: 'Radiator va ventilyator parragida bakteriyalar va mog\'or to\'plangan.',
        },
        symptoms: {
          ru: 'При включении чувствуется тяжелый затхлый запах.',
          uz: 'Yoqilishi bilan xonaga dim va badbo\'y hid tarqaladi.',
        },
        price: { ru: 'от 95 000 сум', uz: '95 000 so\'mdan' },
        iconType: 'sensor',
        image: '/images/service-ac.png',
      },
      {
        id: 'fan-noise',
        title: {
          ru: 'Шумит или трещит вентилятор',
          uz: 'Kuchli shovqin yoki shitirlash eshitilmoqda',
        },
        description: {
          ru: 'Износ подшипника вентилятора, разбалансировка крыльчатки или поломка жалюзи.',
          uz: 'Ventilyator vtulkasi yeyilgan yoki qanotlar muvozanati buzilgan.',
        },
        symptoms: {
          ru: 'Громкий гул или стук в наружном или внутреннем блоке.',
          uz: 'Tashqi yoki ichki blokdan qattiq shovqin va dukurlash ovozi chiqadi.',
        },
        price: { ru: 'от 110 000 сум', uz: '110 000 so\'mdan' },
        iconType: 'noise',
        image: '/images/about-2.png',
      },
      {
        id: 'inverter-error',
        title: {
          ru: 'Выключается через 5 минут',
          uz: '5 daqiqadan so\'ng o\'zi o\'chib qolyapti',
        },
        description: {
          ru: 'Перегрев компрессора, неисправность пускового конденсатора или ошибка IPM модуля.',
          uz: 'Kompressor qizib ketgan, ishga tushirish kondensatori yoki IPM modul xatosi.',
        },
        symptoms: {
          ru: 'Запускается, начинает дуть, затем выключается и мигает таймер.',
          uz: 'Ishga tushadi, biroz puflaydi va chirog\'i miltillab o\'chadi.',
        },
        price: { ru: 'от 130 000 сум', uz: '130 000 so\'mdan' },
        iconType: 'motor',
        image: '/images/service-ac.png',
      },
    ],
    symptomChecklist: {
      title: {
        ru: 'Симптомы поломки сплит-системы',
        uz: 'Split-tizim nosozligini bildiruvchi alomatlar',
      },
      desc: {
        ru: 'Регулярное техобслуживание снижает расход электроэнергии на 30% и продлевает срок службы:',
        uz: 'Muntazam profilaktika elektr sarfini 30% tejaydi va kompressor umrini uzaytiradi:',
      },
      items: [
        { ru: 'Обмерзание медных трубок и кранов на внешнем блоке', uz: 'Tashqi blokdagi mis quvurlar va jo\'mraklarda muz qatlami hosil bo\'lishi' },
        { ru: 'Кондиционер потребляет много энергии, но плохо охлаждает', uz: 'Konditsioner ko\'p elektr sarflaydi, ammo sovutishi juda sust' },
        { ru: 'Слабый воздушный поток из внутреннего блока', uz: 'Ichki blokdan havo oqimi juda sust chiqmoqda' },
        { ru: 'Появление кодов ошибок на табло (E1, F1, H6, C5)', uz: 'Tabloda xatolik kodlari chiqishi (E1, F1, H6, C5)' },
        { ru: 'Внешний блок сильно вибрирует на кронштейнах', uz: 'Tashqi blok kronshteynlarda qattiq silkinmoqda' },
      ],
    },
    brands: [
      'Gree', 'Midea', 'Artel', 'Samsung', 'LG', 'Chigo', 'AUX', 'Haier', 'Daikin', 'Mitsubishi Electric', 'TCL', 'Electrolux', 'Shivaki', 'Zanussi'
    ],
  },

  'remont-gazovyh-kotlov-v-tashkente': {
    slug: 'remont-gazovyh-kotlov-v-tashkente',
    title: {
      ru: 'Ремонт газовых котлов в Ташкенте',
      uz: 'Toshkentda gaz qozonlarini ta\'mirlash',
    },
    subtitle: {
      ru: 'Срочный выезд мастера 24/7. Промывка теплообменника, ремонт плат, устранение утечек и настройка автоматики.',
      uz: '24/7 ustaning tezkor yetib borishi. Issiqlik almashtirgichni yuvish, platani tuzatish, gaz sizishini bartaraf qilish.',
    },
    heroImage: '/images/service-gas-boiler.png',
    badge: {
      ru: 'Мастер по газовым котлам',
      uz: 'Gaz qozonlari ustasi',
    },
    priceFrom: {
      ru: 'От 100 000 сум',
      uz: '100 000 so\'mdan',
    },
    breakdowns: [
      {
        id: 'no-flame',
        title: {
          ru: 'Тухнет пламя / не зажигается',
          uz: 'Olov o\'chib qolyapti / yoqilmayapti',
        },
        description: {
          ru: 'Засор электрода ионизации, неисправность газового клапана или датчика тяги.',
          uz: 'Ionizatsiya elektrodi kirlangan, gaz klapani yoki tortish datchigi nosoz.',
        },
        symptoms: {
          ru: 'Котел делает попытки розжига, щелкает, но пламя не удерживается.',
          uz: 'Qozon yoqilishga harakat qiladi, chiqillaydi, lekin alanga ushlanmaydi.',
        },
        price: { ru: 'от 120 000 сум', uz: '120 000 so\'mdan' },
        iconType: 'heater',
        image: '/images/service-gas-boiler.png',
      },
      {
        id: 'no-hot-water',
        title: {
          ru: 'Не греет горячую воду (ГВС)',
          uz: 'Issiq suv bermayapti (GVS)',
        },
        description: {
          ru: 'Выход из строя трехходового клапана, забит вторичный теплообменник накипью.',
          uz: 'Uch tomonlama klapan buzilgan, ikkilamchi issiqlik almashinuvchi qasmoq bilan tiqilgan.',
        },
        symptoms: {
          ru: 'Отопление работает, но при открытии крана вода идет холодная.',
          uz: 'Isitish ishlayapti, biroq jo\'mrak ochilganda sovuq suv oqmoqda.',
        },
        price: { ru: 'от 130 000 сум', uz: '130 000 so\'mdan' },
        iconType: 'water',
        image: '/images/about-1.png',
      },
      {
        id: 'pressure-drop',
        title: {
          ru: 'Падает давление в котле',
          uz: 'Tizimda bosim tushib ketyapti',
        },
        description: {
          ru: 'Утечка в контуре отопления, спуск воздуха из расширительного бака или пробита мембрана.',
          uz: 'Isitish tizimidan suv sizmoqda yoki kengaytirish idishining (bak) membranasi teshilgan.',
        },
        symptoms: {
          ru: 'Стрелка манометра падает ниже 1 бар, котел блокируется по ошибке.',
          uz: 'Manometr strelkasi 1 bardan tushib ketadi va qozon xatolik bilan to\'xtaydi.',
        },
        price: { ru: 'от 100 000 сум', uz: '100 000 so\'mdan' },
        iconType: 'drain',
        image: '/images/about-2.png',
      },
      {
        id: 'boiling-noise',
        title: {
          ru: 'Шумит, трещит и кипит',
          uz: 'Shovqin qiladi, qaynaydi va dukurlaydi',
        },
        description: {
          ru: 'Сильное отложение солей жесткости в первичном теплообменнике или заклинил циркуляционный насос.',
          uz: 'Asosiy issiqlik almashinuvchi qasmoqqa to\'lgan yoki sirkulyatsiya nasosi qotib qolgan.',
        },
        symptoms: {
          ru: 'При включении горелки слышен звук закипающего чайника и стуки.',
          uz: 'Gorelka yonganda xuddi choynak qaynagandek qattiq gursillash ovozi keladi.',
        },
        price: { ru: 'от 150 000 сум', uz: '150 000 so\'mdan' },
        iconType: 'noise',
        image: '/images/service-gas-boiler.png',
      },
      {
        id: 'board-error',
        title: {
          ru: 'Выбивает ошибки (E01, E03, E10)',
          uz: 'Xatolik kodlari chiqmoqda (E01, E03, E10)',
        },
        description: {
          ru: 'Поломка электронной платы розжига и контроля горения от перепада напряжения в сети.',
          uz: 'Tarmoqdagi kuchlanish sakrashidan elektron boshqaruv platasi shikastlangan.',
        },
        symptoms: {
          ru: 'На табло мигает красная лампочка или цифровой код неисправности.',
          uz: 'Tabloda qizil chiroq yonadi yoki xatolik raqami miltillaydi.',
        },
        price: { ru: 'от 140 000 сум', uz: '140 000 so\'mdan' },
        iconType: 'sensor',
        image: '/images/about-2.png',
      },
      {
        id: 'pump-stuck',
        title: {
          ru: 'Не циркулирует тепло (насос)',
          uz: 'Aylanish nasosi (nasos) aylanmayapti',
        },
        description: {
          ru: 'Заклинивание ротора циркуляционного насоса, сгорел конденсатор или забит грязевой фильтр.',
          uz: 'Sirkulyatsiya nasosining rotori qotib qolgan yoki kondensatori kuygan.',
        },
        symptoms: {
          ru: 'Котел быстро нагревается и сразу гаснет, а батареи остаются холодными.',
          uz: 'Qozon tez qizib darhol o\'chadi, radiatorlar esa isimasdan sovuq qoladi.',
        },
        price: { ru: 'от 110 000 сум', uz: '110 000 so\'mdan' },
        iconType: 'motor',
        image: '/images/service-gas-boiler.png',
      },
    ],
    symptomChecklist: {
      title: {
        ru: 'Критически важные сигналы неисправности котла',
        uz: 'Gaz qozonining xavfli nosozlik belgilari',
      },
      desc: {
        ru: 'Газовое оборудование требует строгого профессионального вмешательства для безопасности вашего дома:',
        uz: 'Xonadon xavfsizligi uchun gaz uskunalarini faqat tajribali ustalar ta\'mirlashi shart:',
      },
      items: [
        { ru: 'Запах газа или угарного газа в котельной', uz: 'Qozonxona yoki xonada gaz yoki is hidi sezilishi' },
        { ru: 'Частый сброс воды через предохранительный клапан', uz: 'Xavfsizlik klapanidan tez-tez suv oqib ketishi' },
        { ru: 'Котел постоянно тактует (включается и гаснет каждые 2 минуты)', uz: 'Qozon har 2 daqiqada o\'chib-yonishi (taktlash)' },
        { ru: 'Копоть или желтое коптящее пламя вместо ровного синего', uz: 'Moviy olov o\'rniga sariq va qora kuyali alanga yonishi' },
        { ru: 'Отказ работать при наступлении сильных морозов', uz: 'Qattiq sovuq tushganda o\'z-o\'zidan o\'chib qolishi' },
      ],
    },
    brands: [
      'Navien', 'Baxi', 'Ariston', 'Immergas', 'Ferroli', 'Viessmann', 'Vaillant', 'Protherm', 'Bosch', 'Rinnai', 'Chaffoteaux', 'Fondital', 'Artel', 'Hydrosta'
    ],
  },
};
