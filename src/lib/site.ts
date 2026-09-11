/**
 * Единый источник фактов о хостеле. Всё, что видно на сайте и в разметке,
 * берётся отсюда: поменял здесь — поменялось везде.
 *
 * Источники: ТЗ заказчика (docs/tz-sait-luxx-aparts.md), карточки Luxx Aparts
 * на Hostelworld, Ostrovok, 2GIS и Booking. Там, где источники расходятся,
 * приоритет у ТЗ. Даты актуальности — в SITE.factsUpdated.
 */

/** Адрес сайта. Когда появится свой домен — заменить здесь, и все canonical,
 *  og:url, sitemap и JSON-LD станут ссылаться на него. */
export const SITE_URL = "https://luxx-guide-ai.lovable.app";

export type QA = [question: string, answer: string];

export const SITE = {
  name: "Luxx Aparts",
  url: SITE_URL,
  tagline: "Хостел и апартаменты в Алматы",
  /** Фраза «кто мы» из ТЗ, раздел 3. Используется дословно. */
  whoWeAre:
    "Luxx Aparts — хостел и апартаменты в Алматы на Толе би 286/8: 44 номера, общая кухня, круглосуточная стойка, Wi-Fi, 7 км от вокзала Алматы-2",
  phoneDisplay: "+7 771 877 7765",
  phoneHref: "+77718777765",
  whatsapp: "https://wa.me/77718777765",
  email: "luxxaparts@gmail.com",
  address: "ул. Толе би 286/8, 2 этаж, Алматы",
  streetAddress: "улица Толе би 286/8, 2 этаж",
  city: "Алматы",
  complex: "ЖК «Каусар»",
  postalCode: "050005",
  geo: { lat: 43.2476791, lng: 76.8680911 },
  rooms: 44,
  checkIn: { from: "13:00", to: "23:30" },
  checkOut: "12:00",
  distanceToStation: "7 км от вокзала Алматы-2",
  /** Цены от заказчика, сентябрь 2026: минимальная (койко-место) и максимальная (двухместный). */
  priceFrom: 6000,
  priceTo: 15000,
  languages: ["русский", "английский"],
  links: {
    booking: "https://www.booking.com/hotel/kz/luxx-aparts.ru.html",
    hostelworld: "https://www.hostelworld.com/hostels/p/335147/luxx-aparts/",
    ostrovok: "https://ostrovok.ru/hotel/kazakhstan/almaty/mid13341876/luxx_aparts_hostel/",
    /** Ссылка на карточку 2GIS от заказчика. */
    twoGis: "https://go.2gis.com/DFrEx",
    instagram: "https://www.instagram.com/luxx.aparts",
    yandexMaps: "https://yandex.ru/maps/org/luxx_aparts/136439991889/",
  },
  /** Месяц, на который подтверждены правила, цены и факты на сайте. */
  factsUpdated: "сентябрь 2026",
  factsUpdatedIso: "2026-09-11",
} as const;

/**
 * Дата последней содержательной правки каждой страницы: идёт в lastmod sitemap.xml
 * и в dateModified разметки. Меняйте дату только вместе с текстом страницы, иначе
 * поисковики перестанут доверять sitemap. Статьи блога берут дату из frontmatter.
 */
export const PAGE_DATES: Record<string, string> = {
  "/": "2026-09-11",
  "/nomera": "2026-09-11",
  "/nomera/koyko-mesto": "2026-09-11",
  "/nomera/odnomestny": "2026-09-11",
  "/nomera/dvukhmestny": "2026-09-11",
  "/bronirovanie": "2026-09-11",
  "/udobstva": "2026-09-11",
  "/kak-dobratsya": "2026-09-11",
  "/ryadom": "2026-09-11",
  "/otzyvy": "2026-09-11",
  "/pravila": "2026-09-11",
  "/faq": "2026-09-11",
  "/kontakty": "2026-09-11",
  "/foto": "2026-09-11",
  "/blog": "2026-09-11",
  "/blog/avtor": "2026-09-11",
};

export const pageDate = (path: string) => PAGE_DATES[path] ?? SITE.factsUpdatedIso;

export const mapEmbedUrl = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=16&hl=ru&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${SITE.geo.lat},${SITE.geo.lng}`;

/** Удобства: ТЗ (раздел 5.1) плюс подтверждённые карточками на площадках. */
export const AMENITIES = [
  {
    name: "Общая кухня с посудой и чайником",
    detail: "Плита, микроволновка, холодильник, бесплатный чай и кофе",
  },
  { name: "Wi-Fi", detail: "Бесплатный, во всех зонах" },
  { name: "Коворкинг и лаундж", detail: "Столы для работы с ноутбуком, телевизор в лобби" },
  { name: "Стиральная машина", detail: "Утюг и гладильные принадлежности" },
  { name: "Кондиционер и отопление", detail: "Вентиляция в комнатах" },
  { name: "Звукоизолированные комнаты", detail: "У каждой кровати розетка и лампа для чтения" },
  { name: "Запирающиеся шкафчики", detail: "Для личных вещей в общих комнатах" },
  { name: "Камера хранения", detail: "Багаж до заезда и после выезда" },
  { name: "Круглосуточная стойка и охрана", detail: "Персонал говорит по-русски и по-английски" },
  { name: "Горячий душ и фен", detail: "Фен выдают на стойке по запросу" },
  { name: "Детская площадка и настольные игры", detail: "Для семей с детьми" },
  { name: "Парковка рядом", detail: "Уточните место у администратора" },
] as const;

/**
 * Форматы размещения. У каждого типа своя страница /nomera/<slug> с разметкой
 * HotelRoom + Offer. Цены (variants) прислал заказчик в сентябре 2026: за день,
 * койко-место — за место, номера — за номер целиком. priceValue = минимальная цена типа.
 * Фото по типам — src/lib/photos.ts (ROOM_PHOTOS).
 */
export const ROOM_TYPES = [
  {
    slug: "koyko-mesto",
    name: "Койко-место в общей комнате",
    short: "Капсульные кровати со шторками в мужских и женских комнатах на 10–14 мест",
    capacity: "1 гость",
    occupancy: 1,
    beds: "Односпальная капсульная кровать со шторкой",
    bath: "Общий санузел на этаже",
    price: "6 000 ₸",
    priceValue: 6000,
    priceNote: "за место, мужская или женская комната, сентябрь 2026",
    variants: [
      { name: "Спальное место в общем номере для мужчин", price: 6000 },
      { name: "Спальное место в общем номере для женщин", price: 6000 },
    ],
    includes: [
      "Постельное бельё",
      "Шкафчик с замком",
      "Розетка и лампа у кровати",
      "Кухня, Wi-Fi, стирка",
    ],
    forWhom: "Одиночным путешественникам, студентам, транзитным гостям",
    /** Мета и первый абзац страницы типа. */
    title: "Койко-место в хостеле Luxx Aparts, Алматы — 6 000 ₸",
    description:
      "Капсульное койко-место со шторкой в мужской или женской комнате хостела Luxx Aparts в Алматы: 6 000 ₸. Шкафчик, розетка, бельё включено. Фото и что входит в цену.",
    intro:
      "Койко-место в Luxx Aparts стоит 6 000 ₸ на сентябрь 2026, одинаково в мужской и женской комнате. Это капсульная кровать со шторкой, розеткой и лампой в мужской или женской комнате на 10–14 мест. У каждого гостя запирающийся шкафчик, бельё включено, санузел с душевыми общий на этаже. Кухня, Wi-Fi и стиральная машина бесплатно.",
    details: [
      [
        "Как устроена общая комната?",
        "Кровати капсульного типа в один и два яруса, у каждой шторка, розетка и лампа для чтения. Комнаты раздельные для мужчин и женщин, на 10–14 мест, с кондиционером, отоплением и вентиляцией. Ценные вещи хранятся в запирающемся шкафчике в коридоре: замок можно принести свой или взять на стойке.",
      ],
      [
        "Что входит в цену койко-места?",
        "Постельное бельё, шкафчик, Wi-Fi, общая кухня с посудой, чай и кофе, стиральная машина, камера хранения и круглосуточная стойка. Полотенце выдаётся за отдельную плату, фен по запросу на стойке.",
      ],
      [
        "Сколько стоит койко-место на неделю или месяц?",
        "Койко-место стоит 6 000 ₸, неделя по этому тарифу — 42 000 ₸. Для проживания от недели и от месяца администратор считает индивидуально: напишите срок в WhatsApp, и в ответ придёт точная сумма. Прямое бронирование без комиссии агрегатора.",
      ],
    ] as QA[],
  },
  {
    slug: "odnomestny",
    name: "Одноместный номер Economy",
    short: "Отдельная комната на ключ, с окном или без окна",
    capacity: "1 гость",
    occupancy: 1,
    beds: "Односпальная кровать",
    bath: "Общий санузел на этаже",
    price: "от 10 000 ₸",
    priceValue: 10000,
    priceNote: "10 000 ₸ без окна, 11 000 ₸ с окном, сентябрь 2026",
    variants: [
      { name: "Одноместный номер без окна", price: 10000 },
      { name: "Одноместный номер с окном", price: 11000 },
    ],
    includes: ["Постельное бельё", "Кондиционер и отопление", "Кухня, Wi-Fi, стирка"],
    forWhom: "Командировочным и тем, кто остаётся надолго",
    title: "Одноместный номер в хостеле Luxx Aparts, Алматы — от 10 000 ₸",
    description:
      "Одноместный номер Economy в Luxx Aparts: 10 000 ₸ без окна, 11 000 ₸ с окном. Отдельная комната на ключ, стол, санузел на этаже. Фото, что входит в цену.",
    intro:
      "Одноместный номер Economy в Luxx Aparts стоит 10 000 ₸ без окна и 11 000 ₸ с окном на сентябрь 2026. Это отдельная комната с односпальной кроватью и столом для работы, дверь закрывается на ключ. Санузел с душевыми общий на этаже. Кондиционер, отопление и Wi-Fi включены, бельё выдают при заселении.",
    details: [
      [
        "Что есть в одноместном номере?",
        "Кровать, стол и стул для работы с ноутбуком, кондиционер и отопление, розетки. Дверь закрывается на ключ. Номера двух видов: с окном за 11 000 ₸ и без окна за 10 000 ₸, в остальном комплектация одинаковая. Бельё включено, полотенце выдаётся за отдельную плату на стойке.",
      ],
      [
        "Санузел в номере или общий?",
        "Общий на этаже: раковины, душевые кабины и туалеты, горячая вода. Фен по запросу на стойке. Гости в отзывах отдельно отмечают чистоту санузлов.",
      ],
      [
        "Сколько стоит одноместный номер?",
        "10 000 ₸ без окна и 11 000 ₸ с окном (сентябрь 2026). Для срока от недели и от месяца цена считается индивидуально: напишите даты в WhatsApp или позвоните, ответ круглосуточно. Оплата при заселении наличными или картой.",
      ],
    ] as QA[],
  },
  {
    slug: "dvukhmestny",
    name: "Двухместный номер Economy",
    short: "Отдельная комната с двуспальной кроватью и окном",
    capacity: "2 гостя",
    occupancy: 2,
    beds: "Двуспальная кровать",
    bath: "Общий санузел на этаже",
    price: "15 000 ₸",
    priceValue: 15000,
    priceNote: "за номер на двоих, сентябрь 2026",
    variants: [{ name: "Двухместный номер", price: 15000 }],
    includes: ["Постельное бельё", "Кондиционер и отопление", "Кухня, Wi-Fi, стирка"],
    forWhom: "Парам и семьям",
    title: "Двухместный номер в хостеле Luxx Aparts, Алматы — 15 000 ₸",
    description:
      "Двухместный номер Economy в Luxx Aparts: 15 000 ₸ за номер. Отдельная комната с двуспальной кроватью и окном для пары или семьи, санузел на этаже. Фото, что включено.",
    intro:
      "Двухместный номер Economy в Luxx Aparts стоит 15 000 ₸ за номер на сентябрь 2026, то есть 7 500 ₸ с человека. Это отдельная комната с двуспальной кроватью и окном для пары, двух друзей или родителя с ребёнком. Дверь закрывается на ключ, санузел с душевыми общий на этаже. Кондиционер, отопление и Wi-Fi включены.",
    details: [
      [
        "Что есть в двухместном номере?",
        "Двуспальная кровать, окно, кондиционер и отопление, розетки. Дверь закрывается на ключ. Бельё на двоих включено, полотенца выдаются за отдельную плату на стойке.",
      ],
      [
        "Можно ли с ребёнком?",
        "Да, семьи с детьми Luxx Aparts размещает именно в отдельных номерах. Гости до 18 лет заселяются только с родителем или опекуном. В хостеле есть детская площадка и настольные игры.",
      ],
      [
        "Сколько стоит двухместный номер?",
        "15 000 ₸ за номер целиком, независимо от того, живёт один гость или двое (сентябрь 2026). Для срока от недели и от месяца цена считается индивидуально: напишите даты в WhatsApp. Оплата при заселении наличными или картой.",
      ],
    ] as QA[],
  },
] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const getRoomType = (slug: string): RoomType | undefined =>
  ROOM_TYPES.find((r) => r.slug === slug);

/** Расстояния, которые хостел сам указывает в карточке на Hostelworld. */
export const DISTANCES = [
  {
    name: "Автовокзал Сайран",
    value: "рядом, на той же улице Толе би",
    short: "на той же улице",
    how: "пешком несколько минут",
    kind: "bus",
  },
  {
    name: "Станция метро «Сайран»",
    value: "1,9 км",
    short: "1,9 км",
    how: "20–25 мин пешком или 5 мин на такси",
    kind: "metro",
  },
  {
    name: "Станция метро «Москва»",
    value: "2,4 км",
    short: "2,4 км",
    how: "25 мин пешком или 5 мин на такси",
    kind: "metro",
  },
  {
    name: "Вокзал Алматы-2",
    value: "7 км",
    short: "7 км",
    how: "15–25 мин на такси",
    kind: "train",
  },
  {
    name: "Вокзал Алматы-1",
    value: "14 км",
    short: "14 км",
    how: "около 30 мин на такси",
    kind: "train",
  },
  {
    name: "Аэропорт Алматы",
    value: "около 20 км",
    short: "≈ 20 км",
    how: "такси, ночью тоже",
    kind: "plane",
  },
] as const;

/** Что рядом: расстояния по данным Ostrovok и брифа заказчика, ориентировочные. */
export const NEARBY = [
  {
    name: "Автовокзал Сайран",
    distance: "на той же улице",
    how: "пешком",
    note: "Междугородние автобусы по всему Казахстану",
  },
  {
    name: "Аквапарк Family Park",
    distance: "около 2,5 км",
    how: "такси, автобус",
    note: "Крытый аквапарк для семей с детьми",
  },
  {
    name: "Ботанический сад",
    distance: "4,5 км",
    how: "такси, автобус",
    note: "Прогулки в тени, особенно летом",
  },
  {
    name: "Центральный стадион",
    distance: "4,6 км",
    how: "такси, автобус",
    note: "Матчи и концерты",
  },
  { name: "Оперный театр им. Абая", distance: "6,3 км", how: "такси, метро", note: "Центр города" },
  {
    name: "Площадь Республики",
    distance: "6,3 км",
    how: "такси, метро",
    note: "Главная площадь Алматы",
  },
  {
    name: "Парк Первого Президента",
    distance: "6,6 км",
    how: "такси",
    note: "Вид на горы, фонтаны",
  },
  { name: "Зелёный базар", distance: "7,2 км", how: "такси, метро", note: "Главный рынок города" },
] as const;

export type Review = {
  author: string;
  date: string;
  score: string;
  scale: string;
  room: string;
  text: string;
  source: "Ostrovok" | "Hostelworld";
  url: string;
};

/** Реальные отзывы с площадок. Имя и дата — как на площадке. */
export const REVIEWS: Review[] = [
  {
    author: "Dim",
    date: "июнь 2026",
    score: "10",
    scale: "10",
    room: "Койко-место в мужской комнате",
    text: "Хостел оказался уютным, приятным местом. Чисто, продуманы все необходимые бытовые мелочи. Вежливые админы всегда идут навстречу. Есть коворкинг, кондиционер, кухня.",
    source: "Ostrovok",
    url: SITE.links.ostrovok,
  },
  {
    author: "Vladislavna",
    date: "январь 2026",
    score: "9,8",
    scale: "10",
    room: "Койко-место в женской комнате",
    text: "Весь хостел очень чистый, персонал вежливый, всё очень тихо. Кровать ощущается как маленький отдельный мир. В ванной имеется фен, душевые чистые. В следующий раз также остановлюсь в Luxx Aparts.",
    source: "Ostrovok",
    url: SITE.links.ostrovok,
  },
  {
    author: "Viktoria",
    date: "сентябрь 2025",
    score: "9,2",
    scale: "10",
    room: "Койко-место в женской комнате",
    text: "Очень чисто, буквально стерильно. Приветливый персонал, разговаривают на четырёх языках. Все с ноутбуками сидят работают. Кровать удобная, просторная, розетка, вентиляция работает.",
    source: "Ostrovok",
    url: SITE.links.ostrovok,
  },
  {
    author: "Ilfat",
    date: "август 2025",
    score: "9,0",
    scale: "10",
    room: "Одноместный номер Economy",
    text: "Рядом набережная и автовокзал, ходят многие рейсы. Современный отель с хорошим ремонтом, своя система кондиционирования, можно постирать вещи. Удобная кровать и вид на горы из номера.",
    source: "Ostrovok",
    url: SITE.links.ostrovok,
  },
  {
    author: "Anna",
    date: "апрель 2026",
    score: "9,2",
    scale: "10",
    room: "Двухместный номер Economy",
    text: "Хорошая сантехника. Район чистый, транспорта много. Достаточно места в столовой, просторная зона для работы.",
    source: "Ostrovok",
    url: SITE.links.ostrovok,
  },
  {
    author: "Nursa",
    date: "март 2026",
    score: "10",
    scale: "10",
    room: "Койко-место в женской комнате",
    text: "Отличный хостел, всё чисто, есть все удобства, дружелюбный персонал. В следующий раз приеду только сюда.",
    source: "Ostrovok",
    url: SITE.links.ostrovok,
  },
  {
    author: "Marouane",
    date: "июль 2026",
    score: "10",
    scale: "10",
    room: "Койко-место",
    text: "Amazing hostel! The place is clean, the atmosphere is great, and the staff are incredibly friendly. Highly recommended!",
    source: "Hostelworld",
    url: SITE.links.hostelworld,
  },
];

/** Оценки на площадках на SITE.factsUpdated. Порядок = порядок показа. */
export const RATINGS = [
  {
    source: "Booking",
    label: "Потрясающе",
    score: "8,8",
    scale: "10",
    count: 315,
    url: SITE.links.booking,
  },
  {
    source: "Яндекс Карты",
    label: "",
    score: "5,0",
    scale: "5",
    count: 192,
    url: SITE.links.yandexMaps,
  },
  { source: "2GIS", label: "", score: "4,8", scale: "5", count: 83, url: SITE.links.twoGis },
  {
    source: "Ostrovok",
    label: "Отлично",
    score: "8,7",
    scale: "10",
    count: 11,
    url: SITE.links.ostrovok,
  },
  {
    source: "Hostelworld",
    label: "",
    score: "10",
    scale: "10",
    count: 1,
    url: SITE.links.hostelworld,
  },
] as const;

/** Ссылки, которых нет в шапке: подвал и внутренние переходы. */
export const EXTRA_NAV = [["/foto", "Фото хостела"]] as const;

export const NAV = [
  ["/nomera", "Номера"],
  ["/udobstva", "Удобства"],
  ["/kak-dobratsya", "Как добраться"],
  ["/ryadom", "Рядом"],
  ["/otzyvy", "Отзывы"],
  ["/pravila", "Правила"],
  ["/faq", "Вопросы"],
  ["/blog", "Блог"],
  ["/kontakty", "Контакты"],
] as const;

export const absolute = (path: string) => new URL(path, SITE.url).toString();

export const whatsappWithText = (text: string) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export type Crumb = [name: string, path: string];

/** Хлебные крошки: «Главная» добавляется автоматически. */
export const breadcrumbsSchema = (crumbs: readonly Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Главная", "/"] as Crumb, ...crumbs].map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absolute(path),
  })),
});

export const breadcrumbSchema = (name: string, path: string) => breadcrumbsSchema([[name, path]]);

export const faqSchema = (items: readonly QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
});

/** Предложения по типу номера: по одному Offer на каждый тариф (variants). */
export const roomOfferSchema = (room: RoomType) =>
  room.variants.map((v) => ({
    "@type": "Offer",
    name: v.name,
    url: absolute(`/nomera/${room.slug}`),
    price: String(v.price),
    priceCurrency: "KZT",
    availability: "https://schema.org/InStock",
    validFrom: SITE.factsUpdatedIso,
    itemOffered: { "@id": absolute(`/nomera/${room.slug}#room`) },
  }));

/** Все тарифы всех типов для таблицы цен на /nomera. */
export const PRICE_LIST = ROOM_TYPES.flatMap((r) =>
  r.variants.map((v) => ({
    ...v,
    slug: r.slug,
    capacity: r.capacity,
    bath: r.bath,
    includes: r.includes
      .join(", ")
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase()),
  })),
);

/** Страница типа номера (ТЗ, раздел 5.2): HotelRoom + Offer. */
export const hotelRoomSchema = (room: RoomType, images: readonly string[]) => ({
  "@context": "https://schema.org",
  "@type": "HotelRoom",
  "@id": absolute(`/nomera/${room.slug}#room`),
  name: room.name,
  description: room.intro,
  url: absolute(`/nomera/${room.slug}`),
  image: images.map((id) => absolute(`/photos/${id}-1600.webp`)),
  bed: { "@type": "BedDetails", typeOfBed: room.beds, numberOfBeds: 1 },
  occupancy: { "@type": "QuantitativeValue", maxValue: room.occupancy, unitCode: "C62" },
  amenityFeature: room.includes.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  containedInPlace: { "@id": absolute("/#hostel") },
  offers: roomOfferSchema(room),
  dateModified: SITE.factsUpdatedIso,
});

/** Фото хостела для разметки: ImageObject с подписью, а не голые ссылки. */
const HOSTEL_IMAGES: { id: string; caption: string; width: number; height: number }[] = [
  {
    id: "03",
    caption: "Стойка регистрации хостела Luxx Aparts, Алматы",
    width: 1600,
    height: 1067,
  },
  {
    id: "04",
    caption: "Капсульные койко-места со шторками в общей комнате Luxx Aparts",
    width: 1600,
    height: 1067,
  },
  { id: "18", caption: "Двухместный номер Economy в Luxx Aparts", width: 1600, height: 1067 },
  { id: "07", caption: "Одноместный номер Economy в Luxx Aparts", width: 1600, height: 1200 },
  { id: "28", caption: "Общая кухня Luxx Aparts", width: 1600, height: 1067 },
  { id: "17", caption: "Лаундж и коворкинг Luxx Aparts", width: 1600, height: 1122 },
];

export const imageObject = (img: {
  id: string;
  caption: string;
  width: number;
  height: number;
}) => ({
  "@type": "ImageObject",
  contentUrl: absolute(`/photos/${img.id}-1600.webp`),
  url: absolute(`/photos/${img.id}-1600.webp`),
  caption: img.caption,
  name: img.caption,
  width: img.width,
  height: img.height,
  creditText: SITE.name,
});

/**
 * Средняя оценка для разметки: только по реальным отзывам, берём площадку с
 * наибольшим числом отзывов (RATINGS[0]). Обновлять вместе с RATINGS раз в месяц.
 */
export const aggregateRatingSchema = () => {
  const r = RATINGS[0];
  return {
    "@type": "AggregateRating",
    ratingValue: r.score.replace(",", "."),
    bestRating: r.scale,
    worstRating: "1",
    ratingCount: r.count,
    reviewCount: r.count,
  };
};

/** Полный узел организации (ТЗ, раздел 6). */
export const hostelSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Hostel",
  "@id": absolute("/#hostel"),
  name: SITE.name,
  url: absolute("/"),
  image: HOSTEL_IMAGES.map(imageObject),
  photo: HOSTEL_IMAGES.map(imageObject),
  logo: absolute("/favicon.png"),
  description: SITE.whoWeAre,
  aggregateRating: aggregateRatingSchema(),
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.city,
    postalCode: SITE.postalCode,
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: mapLinkUrl,
  checkinTime: SITE.checkIn.from,
  checkoutTime: SITE.checkOut,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  numberOfRooms: SITE.rooms,
  petsAllowed: false,
  smokingAllowed: false,
  priceRange: `${SITE.priceFrom.toLocaleString("ru-RU")}–${SITE.priceTo.toLocaleString("ru-RU")} ₸`,
  currenciesAccepted: "KZT",
  paymentAccepted: "Наличные, банковская карта",
  availableLanguage: ["ru", "en"],
  amenityFeature: AMENITIES.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: a.name,
    value: true,
  })),
  makesOffer: ROOM_TYPES.flatMap((r) => roomOfferSchema(r)),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    contactType: "reservations",
    availableLanguage: ["ru", "en"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  },
  sameAs: Object.values(SITE.links),
  dateModified: SITE.factsUpdatedIso,
});

export const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: absolute("/"),
  inLanguage: "ru",
});

export const jsonLd = (...nodes: unknown[]) => [
  { type: "application/ld+json", children: JSON.stringify(nodes.length === 1 ? nodes[0] : nodes) },
];

type PageHeadOptions = {
  /** Своя картинка для соцсетей (путь от корня сайта), по умолчанию og-image.jpg. */
  image?: string;
};

export const pageHead = (
  title: string,
  description: string,
  path: string,
  { image = "/og-image.jpg" }: PageHeadOptions = {},
) => {
  const url = absolute(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: absolute(image) },
      ...(image === "/og-image.jpg"
        ? [
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
};

/** «83 отзыва», «11 отзывов», «1 отзыв». */
export const pluralReviews = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} отзыв`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} отзыва`;
  return `${n} отзывов`;
};
