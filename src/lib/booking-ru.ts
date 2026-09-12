import type { BookingLabels, BookingOption } from "@/components/booking-form";
import { SITE } from "@/lib/site";

/** Варианты формы. Цены на SITE.factsUpdated: койко-место — за место, номера — за номер. */
export const OPTIONS: readonly BookingOption[] = [
  { label: "Койко-место в мужской комнате", price: 6000, perBed: true },
  { label: "Койко-место в женской комнате", price: 6000, perBed: true },
  { label: "Одноместный номер с окном", price: 11000, perBed: false },
  { label: "Одноместный номер без окна", price: 10000, perBed: false },
  { label: "Двухместный номер", price: 15000, perBed: false },
  { label: "Пока не решил(а)", price: null, perBed: false },
];

/** Предвыбор по ?room=<slug> из карточек тарифов. */
export const PRESET: Record<string, string> = {
  "koyko-mesto": OPTIONS[0]!.label,
  odnomestny: OPTIONS[2]!.label,
  dvukhmestny: OPTIONS[4]!.label,
};

export const VARIANT_PRESET: Record<string, string> = {
  "Спальное место в общем номере для мужчин": OPTIONS[0]!.label,
  "Спальное место в общем номере для женщин": OPTIONS[1]!.label,
  "Одноместный номер с окном": OPTIONS[2]!.label,
  "Одноместный номер без окна": OPTIONS[3]!.label,
  "Двухместный номер": OPTIONS[4]!.label,
};

const pluralDays = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} день`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return `${n} дня`;
  return `${n} дней`;
};

export const LABELS: BookingLabels = {
  checkIn: "Дата заезда",
  checkOut: "Дата выезда",
  guests: "Гостей",
  room: "Формат размещения",
  name: "Имя",
  phone: "Телефон",
  comment: "Комментарий",
  commentPlaceholder: "Например: приеду ночью, нужна комната с окном",
  estimateTitle: "Ориентировочная стоимость",
  estimateNote: (perBed) =>
    `По базовым ценам на ${SITE.factsUpdated}, ${perBed ? "за каждого гостя" : "за номер целиком"}. Итоговую сумму подтвердит администратор, оплата при заселении.`,
  estimateEmpty:
    "Укажите даты и формат — покажем ориентировочную стоимость по базовым ценам: койко-место 6 000 ₸, одноместный 10 000–11 000 ₸, двухместный 15 000 ₸.",
  submit: "Отправить в WhatsApp",
  call: "Позвонить",
  sentText: "Заявка открыта в WhatsApp, осталось нажать «Отправить». Если окно не появилось,",
  sentLink: "откройте его по ссылке",
  privacy:
    "Данные никуда не сохраняются: текст заявки открывается в вашем WhatsApp, отправляете его вы.",
  nights: pluralDays,
  message: (f) =>
    [
      "Здравствуйте! Хочу забронировать в Luxx Aparts.",
      f.dates ? `Даты: ${f.dates}.` : "",
      `Гостей: ${f.guests}.`,
      `Формат: ${f.room}.`,
      f.estimate ? `Ориентировочно: ${f.estimate}.` : "",
      f.name ? `Меня зовут ${f.name}.` : "",
      f.phone ? `Телефон: ${f.phone}.` : "",
      f.comment ? `Комментарий: ${f.comment}` : "",
    ]
      .filter(Boolean)
      .join(" "),
};
