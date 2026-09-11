import type { PhotoRef } from "@/components/photo";

/**
 * Фотографии хостела: public/photos/NN-1600.webp и NN-800.webp.
 * Источник: карточка Luxx Aparts на Hostelworld, список файлов в docs/photos/index.txt.
 * Alt-тексты по правилу ТЗ: что на фото и где.
 */
const L = [1600, 1067] as const; // горизонтальные
const P = [1067, 1600] as const; // вертикальные

const p = (id: string, alt: string, [width, height]: readonly [number, number] = L): PhotoRef => ({
  id,
  alt,
  width,
  height,
});

export const PHOTOS = {
  hero: p("03", "Стойка регистрации хостела Luxx Aparts с логотипом L.A, Алматы"),
  loungeSofa: p(
    "17",
    "Лаундж и коворкинг хостела Luxx Aparts в Алматы: диван и рабочие места",
    [1600, 1122],
  ),
  reception: p("03", "Стойка регистрации Luxx Aparts с логотипом, Алматы"),
  dorm: p("04", "Капсульные койко-места со шторками в общей комнате Luxx Aparts, Алматы"),
  dormNumbered: p("16", "Нумерованные капсулы в общей комнате Luxx Aparts, Алматы", [1200, 1600]),
  single: p("07", "Одноместный номер Luxx Aparts с кроватью у окна, Алматы", [1600, 1200]),
  privateRoom: p("18", "Двухместный номер Luxx Aparts с полотенцами на кровати, Алматы"),
  doubleGreen: p("06", "Двухместный номер Luxx Aparts с зелёной шторой, Алматы", P),
  kitchen: p("28", "Общая кухня Luxx Aparts: плита и посуда, Алматы"),
  kitchenSink: p("12", "Общая кухня Luxx Aparts: столешница, раковина и холодильник, Алматы"),
  lounge: p("27", "Лаундж Luxx Aparts с телевизором и общим столом, Алматы"),
  coworking: p("01", "Коворкинг Luxx Aparts: общий стол и полки, Алматы"),
  bathroom: p("13", "Санузел Luxx Aparts: раковины и душевые кабины, Алматы"),
  lockers: p("02", "Коридор с запирающимися шкафчиками в Luxx Aparts, Алматы", P),
  detail: p("15", "Лаундж Luxx Aparts с диваном и столами для работы, Алматы"),
  capsuleLaptop: p("22", "Капсула Luxx Aparts с ноутбуком на кровати, Алматы", [1200, 1600]),
} as const;

/** Галерея на главной. */
export const GALLERY: PhotoRef[] = [
  PHOTOS.loungeSofa,
  PHOTOS.dorm,
  PHOTOS.privateRoom,
  PHOTOS.kitchenSink,
  PHOTOS.bathroom,
  PHOTOS.lockers,
  PHOTOS.single,
  PHOTOS.lounge,
  PHOTOS.doubleGreen,
];

/** Фото для страниц типов номеров /nomera/<slug>: 5–8 на тип (ТЗ, раздел 5.2). */
export const ROOM_PHOTOS: Record<string, PhotoRef[]> = {
  "koyko-mesto": [
    PHOTOS.dorm,
    PHOTOS.dormNumbered,
    p("21", "Капсулы 29 и 30 в общей комнате Luxx Aparts, Алматы", P),
    p("09", "Капсульные кровати Luxx Aparts, вид сбоку, Алматы", [900, 1600]),
    PHOTOS.capsuleLaptop,
    p("25", "Капсулы 23 и 24 со шторками в Luxx Aparts, Алматы", P),
    PHOTOS.lockers,
    PHOTOS.bathroom,
  ],
  odnomestny: [
    PHOTOS.single,
    p("19", "Одноместный номер Luxx Aparts с рабочим столом, Алматы", [1200, 1600]),
    p("24", "Одноместный номер Luxx Aparts: кровать и стол, Алматы"),
    p("26", "Одноместный номер Luxx Aparts с окном, Алматы", [1200, 1600]),
    PHOTOS.bathroom,
    PHOTOS.kitchen,
  ],
  dvukhmestny: [
    PHOTOS.privateRoom,
    PHOTOS.doubleGreen,
    p("29", "Двухместный номер Luxx Aparts: изголовье кровати, Алматы"),
    p("30", "Двухместный номер Luxx Aparts с ноутбуком на кровати, Алматы", P),
    PHOTOS.bathroom,
    PHOTOS.kitchenSink,
  ],
};

/** Первое фото типа номера для карточек на главной и /nomera. */
export const roomCover = (slug: string): PhotoRef => ROOM_PHOTOS[slug]?.[0] ?? PHOTOS.detail;

/** Все 30 фото по разделам для страницы /foto (список — docs/photos/index.txt). */
export const PHOTO_SECTIONS: { title: string; text: string; photos: PhotoRef[] }[] = [
  {
    title: "Как выглядят капсулы и номера?",
    text: "Капсульные койко-места со шторками в мужских и женских комнатах, одноместные номера с окном и рабочим столом, двухместные номера с двуспальной кроватью.",
    photos: [
      PHOTOS.dorm,
      PHOTOS.dormNumbered,
      p("21", "Капсулы 29 и 30 в общей комнате Luxx Aparts, Алматы", P),
      p("25", "Капсулы 23 и 24 со шторками в Luxx Aparts, Алматы", P),
      p("09", "Капсульные кровати Luxx Aparts, вид сбоку, Алматы", [900, 1600]),
      p("05", "Лестница на верхний ярус капсул в Luxx Aparts, Алматы", [900, 1600]),
      PHOTOS.capsuleLaptop,
      PHOTOS.single,
      p("19", "Одноместный номер Luxx Aparts с рабочим столом, Алматы", [1200, 1600]),
      p("24", "Одноместный номер Luxx Aparts: кровать и стол, Алматы"),
      p("26", "Одноместный номер Luxx Aparts с окном, Алматы", [1200, 1600]),
      PHOTOS.privateRoom,
      PHOTOS.doubleGreen,
      p("29", "Двухместный номер Luxx Aparts: изголовье кровати, Алматы"),
      p("30", "Двухместный номер Luxx Aparts с ноутбуком на кровати, Алматы", P),
    ],
  },
  {
    title: "Что на кухне, в лаундже и коворкинге?",
    text: "Общая кухня с плитой, микроволновкой, холодильником и посудой, лаундж с телевизором и диваном, столы для работы с ноутбуком, холодильники с напитками в холле.",
    photos: [
      PHOTOS.kitchen,
      PHOTOS.kitchenSink,
      PHOTOS.lounge,
      p("08", "Лаундж Luxx Aparts с телевизором и общим столом, Алматы"),
      PHOTOS.detail,
      PHOTOS.loungeSofa,
      PHOTOS.coworking,
      p("20", "Холл Luxx Aparts с холодильниками для напитков, Алматы"),
    ],
  },
  {
    title: "Как выглядят санузлы и коридоры?",
    text: "Общие санузлы на этаже: раковины с зеркалами, душевые кабины, горячая вода. В коридорах запирающиеся шкафчики для вещей, по одному на гостя.",
    photos: [
      PHOTOS.bathroom,
      p("10", "Душевые кабины в санузле Luxx Aparts, Алматы", P),
      p("14", "Санузел Luxx Aparts с зеркалами, Алматы", P),
      PHOTOS.lockers,
      p("23", "Коридор Luxx Aparts со шкафчиками 31–48, Алматы"),
    ],
  },
  {
    title: "Где стойка регистрации?",
    text: "Стойка на втором этаже, работает круглосуточно: здесь оформляют заселение, выдают бельё, ключ от шкафчика и пароль от Wi-Fi.",
    photos: [PHOTOS.reception, p("11", "Стойка регистрации Luxx Aparts, вид сбоку, Алматы")],
  },
];

/** Фото для карточек тарифов (по названию варианта из ROOM_TYPES[].variants). */
export const TARIFF_PHOTOS: Record<string, PhotoRef> = {
  "Спальное место в общем номере для мужчин": PHOTOS.dorm,
  "Спальное место в общем номере для женщин": p(
    "21",
    "Капсулы со шторками в женской комнате Luxx Aparts, Алматы",
    P,
  ),
  "Одноместный номер без окна": p("24", "Одноместный номер Luxx Aparts: кровать и стол, Алматы"),
  "Одноместный номер с окном": PHOTOS.single,
  "Двухместный номер": PHOTOS.privateRoom,
};

export const tariffPhoto = (name: string, slug: string): PhotoRef =>
  TARIFF_PHOTOS[name] ?? roomCover(slug);
