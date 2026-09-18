import { PHOTOS } from "@/lib/photos";
import { SITE, getRoomType } from "@/lib/site";
import type { PhotoRef } from "../photo";

export type Point = [number, number, number];
type Stop = {
  id: string;
  label: string;
  title: string;
  text: string;
  photo: PhotoRef;
  position: Point;
  target: Point;
  room?: string;
  detail: string;
};
// Spatial staging is editorial, not a measured reconstruction of the property.
export const STOPS: Stop[] = [
  {
    id: "entrance",
    label: "Начало",
    title: "Большой город.\nВаш уютный маленький мир.",
    text: `Luxx Aparts в Алматы. ${SITE.rooms} номера, капсульные места от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸ и отдельные комнаты. Начните с ресепшена.`,
    photo: PHOTOS.reception,
    position: [0, 0, 0],
    target: [0, 0, -5.5],
    detail:
      "Снимка внешнего входа в текущем наборе нет. Поэтому просмотр начинается с реального ресепшена, без выдуманного фасада.",
  },
  {
    id: "reception",
    label: "Ресепшен",
    title: "Добро пожаловать\nв ваш Алматы.",
    text: `${SITE.rooms} номера. Стойка работает круглосуточно. Мы рядом, когда нужны.`,
    photo: { id: "11", alt: "Ресепшен Luxx Aparts, вид сбоку", width: 1600, height: 1067 },
    position: [0.5, 0, -12],
    target: [0.5, 0, -17.5],
    detail: `Заезд ${SITE.checkIn.from}–${SITE.checkIn.to}. Выезд до ${SITE.checkOut}.`,
  },
  {
    id: "corridor",
    label: "Номера",
    title: "У каждого путешествия\nсвоя комната.",
    text: "Капсульное место или отдельный номер — выбирайте свой ритм.",
    photo: PHOTOS.lockers,
    position: [-0.4, 0, -24],
    target: [-0.4, 0, -29.5],
    detail: "Одноместные номера также доступны в разделе «Номера». Все категории и цены сохранены.",
  },
  {
    id: "dorm-room",
    label: "Капсулы",
    title: "Личное пространство.\nНовые знакомства.",
    text: "Койко-места со шторками в мужских и женских комнатах.",
    room: "koyko-mesto",
    photo: PHOTOS.dorm,
    position: [-0.3, 0, -36],
    target: [-0.3, 0, -41.5],
    detail: "Шкафчик для вещей, Wi-Fi, общая кухня. Наличие на ваши даты подтвердит администратор.",
  },
  {
    id: "private-room",
    label: "Приватность",
    title: "Ваш тихий уголок\nв большом городе.",
    text: "Двухместный номер для отдыха вдвоём.",
    room: "dvukhmestny",
    photo: PHOTOS.privateRoom,
    position: [0.4, 0, -48],
    target: [0.4, 0, -53.5],
    detail: "Реальные фотографии номера доступны по кнопке «Фото». Санузлы общие на этаже.",
  },
  {
    id: "kitchen",
    label: "Кухня",
    title: "Утро начинается\nпо-вашему.",
    text: "Общая кухня с посудой — для завтрака, ужина и разговоров.",
    photo: PHOTOS.kitchen,
    position: [0, 0, -60],
    target: [0, 0, -65.5],
    detail:
      "В хостеле также есть стиральная машина и камера хранения. Условия уточняйте у администратора.",
  },
  {
    id: "lounge",
    label: "Лаундж",
    title: "Поработать.\nВыдохнуть. Остаться.",
    text: "Wi-Fi, рабочие столы и места для спокойного отдыха.",
    photo: PHOTOS.loungeSofa,
    position: [0.2, 0, -72],
    target: [0.2, 0, -77.5],
    detail: "Оригинальная фотография лаунджа Luxx Aparts. Мебель и отделка не дорисованы.",
  },
  {
    id: "location",
    label: "Алматы",
    title: "Город — снаружи.\nУют — здесь.",
    text: SITE.address,
    photo: PHOTOS.coworking,
    position: [0, 0, -84],
    target: [0, 0, -89.5],
    detail: `${SITE.complex}. ${SITE.distanceToStation}. Карта откроется по реальным координатам объекта.`,
  },
  {
    id: "booking",
    label: "Ваш заезд",
    title: "Теперь представьте\nсебя здесь.",
    text: "Выберите даты и формат проживания. Мы подтвердим свободные места.",
    photo: PHOTOS.privateRoom,
    position: [0, 0, -96],
    target: [0, 0, -101.5],
    detail:
      "Форма отправляет запрос на бронирование. Места не считаются забронированными до подтверждения администратора.",
  },
];
export const clampProgress = (p: number) => (Number.isFinite(p) ? Math.max(0, Math.min(1, p)) : 0);
export const stopIndex = (p: number) =>
  Math.min(STOPS.length - 1, Math.floor(clampProgress(p) * (STOPS.length - 1) + 0.1));
export const stopProgress = (index: number) => clampProgress(index / (STOPS.length - 1));
export const sceneProgress = (id: string | null) =>
  stopProgress(
    Math.max(
      0,
      STOPS.findIndex((stop) => stop.id === id),
    ),
  );
export function priceForStop(stop: Stop) {
  const room = stop.room ? getRoomType(stop.room) : undefined;
  return room ? `${room.price} / ${stop.room === "koyko-mesto" ? "место" : "номер"} за ночь` : "";
}
// Uniform Catmull-Rom, split from renderer so route continuity can be tested without WebGL.
export function cameraPose(progress: number): { position: Point; target: Point } {
  const scaled = clampProgress(progress) * (STOPS.length - 1);
  const index = Math.min(STOPS.length - 2, Math.floor(scaled));
  const t = scaled - index;
  const sample = (key: "position" | "target"): Point =>
    [0, 1, 2].map((axis) => {
      const at = (i: number) => STOPS[Math.max(0, Math.min(STOPS.length - 1, i))]![key][axis]!;
      const a = at(index - 1),
        b = at(index),
        c = at(index + 1),
        d = at(index + 2);
      return (
        0.5 *
        (2 * b +
          (-a + c) * t +
          (2 * a - 5 * b + 4 * c - d) * t * t +
          (-a + 3 * b - 3 * c + d) * t * t * t)
      );
    }) as Point;
  return { position: sample("position"), target: sample("target") };
}
export function advanceProgress(current: number, target: number, seconds: number) {
  const dt = Math.max(0, Math.min(seconds, 0.05));
  const delta = (clampProgress(target) - current) * (1 - Math.exp(-7 * dt));
  return clampProgress(current + Math.max(-0.16 * dt, Math.min(0.16 * dt, delta)));
}
