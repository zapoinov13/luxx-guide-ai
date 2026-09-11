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
