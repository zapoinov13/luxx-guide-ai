/**
 * Единый источник фактов о хостеле. Всё, что видно на сайте и в разметке,
 * берётся отсюда: поменял здесь — поменялось везде.
 *
 * Правило из ТЗ: на сайте только подтверждённые факты. Цены, координаты,
 * маршруты транспорта и e-mail появятся, когда их подтвердит заказчик.
 */

/** Адрес сайта. Когда появится свой домен — заменить здесь, и все canonical,
 *  og:url, sitemap и JSON-LD станут ссылаться на него. */
export const SITE_URL = "https://luxx-guide-ai.lovable.app";

export const SITE = {
  name: "Luxx Aparts",
  url: SITE_URL,
  tagline: "Хостел и апартаменты в Алматы",
  /** Фраза «кто мы» из ТЗ, раздел 3. Используется дословно. */
  whoWeAre:
    "Luxx Aparts — хостел и апартаменты в Алматы на Толе би 286/8: 44 номера, общая кухня, круглосуточная стойка, Wi-Fi, 7 км от вокзала Алматы-2",
  phoneDisplay: "+7 771 877 7765",
  phoneHref: "+77718777765",
  whatsapp: "https://wa.me/77718777765",
  address: "ул. Толе би 286/8, 2 этаж, Алматы",
  streetAddress: "улица Толе би 286/8, 2 этаж",
  city: "Алматы",
  complex: "ЖК «Каусар»",
  postalCode: "050005",
  rooms: 44,
  checkIn: { from: "13:00", to: "23:30" },
  checkOut: "12:00",
  distanceToStation: "7 км от вокзала Алматы-2",
  booking: "https://www.booking.com/hotel/kz/luxx-aparts.ru.html",
  /** Месяц, на который подтверждены правила и факты на сайте. */
  factsUpdated: "сентябрь 2026",
  factsUpdatedIso: "2026-09-11",
} as const;

/** Удобства из ТЗ, раздел 5.1 («Что есть в хостеле?»). */
export const AMENITIES = [
  "Общая кухня с посудой и чайником",
  "Стиральная машина",
  "Кондиционер и отопление",
  "Звукоизолированные комнаты",
  "Камера хранения",
  "Круглосуточная стойка и охрана",
  "Wi-Fi",
  "Гладильные принадлежности",
  "Детская площадка",
  "Настольные игры",
] as const;

export const NAV = [
  ["/nomera", "Номера"],
  ["/udobstva", "Удобства"],
  ["/kak-dobratsya", "Как добраться"],
  ["/ryadom", "Рядом"],
  ["/pravila", "Правила"],
  ["/faq", "Вопросы"],
  ["/kontakty", "Контакты"],
] as const;

export type QA = [question: string, answer: string];

export const absolute = (path: string) => new URL(path, SITE.url).toString();

export const whatsappWithText = (text: string) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const breadcrumbSchema = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: absolute("/") },
    { "@type": "ListItem", position: 2, name, item: absolute(path) },
  ],
});

export const faqSchema = (items: readonly QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
});

/** Полный узел организации (ТЗ, раздел 6). Поля geo и priceRange добавим,
 *  когда заказчик пришлёт координаты и цены. */
export const hostelSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Hostel",
  "@id": absolute("/#hostel"),
  name: SITE.name,
  url: absolute("/"),
  image: [absolute("/og-image.png")],
  description: SITE.whoWeAre,
  telephone: SITE.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.city,
    postalCode: SITE.postalCode,
    addressCountry: "KZ",
  },
  checkinTime: SITE.checkIn.from,
  checkoutTime: SITE.checkOut,
  numberOfRooms: SITE.rooms,
  petsAllowed: false,
  smokingAllowed: false,
  amenityFeature: AMENITIES.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phoneDisplay,
    contactType: "reservations",
    availableLanguage: ["ru"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  },
  sameAs: [SITE.booking],
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

export const pageHead = (title: string, description: string, path: string) => {
  const url = absolute(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: absolute("/og-image.png") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
};
