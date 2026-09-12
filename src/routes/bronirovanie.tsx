import { OPTIONS, PRESET, VARIANT_PRESET, LABELS } from "@/lib/booking-ru";
import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { BookingForm } from "@/components/booking-form";
import { PHOTOS } from "@/lib/photos";
import {
  PRICE_LIST,
  ROOM_TYPES,
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webPageSchema,
} from "@/lib/site";

type BookingSearch = { room?: string; variant?: string };

export const Route = createFileRoute("/bronirovanie")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => {
    const room =
      typeof search["room"] === "string" && ROOM_TYPES.some((r) => r.slug === search["room"])
        ? search["room"]
        : undefined;
    const variant =
      typeof search["variant"] === "string" &&
      PRICE_LIST.some((option) => option.name === search["variant"])
        ? search["variant"]
        : undefined;

    return { ...(room ? { room } : {}), ...(variant ? { variant } : {}) };
  },
  head: () => ({
    ...pageHead(
      "Забронировать хостел в Алматы напрямую — Luxx Aparts",
      `Бронирование хостела Luxx Aparts в Алматы без комиссии: заявка в WhatsApp или звонок ${SITE.phoneDisplay}. Койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, номера от 10 000 ₸, ответ 24/7.`,
      "/bronirovanie",
    ),
    scripts: jsonLd(
      webPageSchema("/bronirovanie"),
      breadcrumbSchema("Бронирование", "/bronirovanie"),
      hostelSchema(),
    ),
  }),
  component: BookingPage,
});

function BookingPage() {
  const { room, variant } = Route.useSearch();
  return (
    <ContentPage
      eyebrow="Бронирование"
      title="Забронировать хостел в Алматы напрямую"
      intro="Выберите даты и формат проживания — мы подготовим готовую заявку в WhatsApp. Администратор подтвердит свободные места и итоговую стоимость. Предоплаты нет, отвечаем круглосуточно."
      photo={PHOTOS.privateRoom}
      compact
    >
      <AnswerSection title="Как отправить заявку?">
        <BookingForm
          locale="ru"
          options={OPTIONS}
          preset={variant ? VARIANT_PRESET[variant] : room ? PRESET[room] : undefined}
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
