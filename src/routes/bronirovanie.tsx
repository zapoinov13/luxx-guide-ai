import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { BookingForm, type BookingLabels, type BookingOption } from "@/components/booking-form";
import { PHOTOS } from "@/lib/photos";
import { ROOM_TYPES, SITE, breadcrumbSchema, hostelSchema, jsonLd, pageHead } from "@/lib/site";

type BookingSearch = { room?: string };

export const Route = createFileRoute("/bronirovanie")({
  validateSearch: (search: Record<string, unknown>): BookingSearch =>
    typeof search["room"] === "string" && ROOM_TYPES.some((r) => r.slug === search["room"])
      ? { room: search["room"] }
      : {},
  head: () => ({
    ...pageHead(
      "Забронировать хостел в Алматы напрямую — Luxx Aparts",
      `Бронирование хостела Luxx Aparts в Алматы без комиссии: заявка в WhatsApp или звонок ${SITE.phoneDisplay}. Койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, номера от 10 000 ₸, ответ 24/7.`,
      "/bronirovanie",
    ),
    scripts: jsonLd(breadcrumbSchema("Бронирование", "/bronirovanie"), hostelSchema()),
  }),
  component: BookingPage,
});

/** Варианты формы. Цены на SITE.factsUpdated: койко-место — за место, номера — за номер. */
const OPTIONS: readonly BookingOption[] = [
  { label: "Койко-место в мужской комнате", price: 6000, perBed: true },
  { label: "Койко-место в женской комнате", price: 6000, perBed: true },
  { label: "Одноместный номер с окном", price: 11000, perBed: false },
  { label: "Одноместный номер без окна", price: 10000, perBed: false },
  { label: "Двухместный номер", price: 15000, perBed: false },
  { label: "Пока не решил(а)", price: null, perBed: false },
];

/** Предвыбор по ?room=<slug> из карточек тарифов. */
const PRESET: Record<string, string> = {
  "koyko-mesto": OPTIONS[0]!.label,
  odnomestny: OPTIONS[2]!.label,
  dvukhmestny: OPTIONS[4]!.label,
};

const pluralDays = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} день`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return `${n} дня`;
  return `${n} дней`;
};

const LABELS: BookingLabels = {
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

function BookingPage() {
  const { room } = Route.useSearch();
  return (
    <ContentPage
      eyebrow="Бронирование"
      title="Забронировать хостел в Алматы напрямую"
      intro={`Заполните форму — заявка откроется готовым сообщением в WhatsApp. Администратор подтвердит свободные места и способ оплаты. Койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, одноместный номер от 10 000 ₸, двухместный 15 000 ₸. Предоплаты нет, отвечаем круглосуточно. Быстрее позвонить: ${SITE.phoneDisplay}.`}
      photo={PHOTOS.privateRoom}
    >
      <AnswerSection title="Как отправить заявку?">
        <BookingForm
          locale="ru"
          options={OPTIONS}
          preset={room ? PRESET[room] : undefined}
          labels={LABELS}
        />
      </AnswerSection>

      <AnswerSection title="Почему бронировать напрямую выгоднее?">
        <ul>
          <li>Нет комиссии агрегатора.</li>
          <li>Все детали в одном чате: формат комнаты, время приезда, оплата.</li>
          <li>Ночной заезд можно согласовать сразу.</li>
        </ul>
        <p>
          Карточка хостела есть и на{" "}
          <a href={SITE.links.booking} target="_blank" rel="noreferrer">
            Booking
          </a>
          , но условия там могут отличаться.
        </p>
      </AnswerSection>

      <AnswerSection title="Какие условия отмены?">
        <p>
          При бронировании через площадки бесплатная отмена действует за сутки до заезда, при более
          поздней отмене или незаезде удерживается стоимость первой ночи. Условия прямого
          бронирования администратор подтвердит до оплаты. Оплата при заселении наличными или
          картой.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
