import { BookingButton } from "@/components/booking-context";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { TariffCards } from "@/components/tariff-cards";
import { PHOTOS } from "@/lib/photos";
import {
  SITE,
  breadcrumbSchema,
  faqSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webPageSchema,
  type QA,
} from "@/lib/site";

const PATH = "/hostel-posutochno-v-almaty";

/** Посуточный интент: те же цифры, что на /nomera и /pravila, другой вопрос гостя. */
const FAQ: QA[] = [
  [
    "Можно ли снять койко-место в Алматы на одну ночь?",
    `Да. Минимальный срок — одни сутки. Койко-место в капсуле стоит ${SITE.priceFrom.toLocaleString("ru-RU")} ₸ за ночь, одноместный номер 10 000 ₸ без окна и 11 000 ₸ с окном, двухместный 15 000 ₸ за номер (цены на ${SITE.factsUpdated}).`,
  ],
  [
    "Нужна ли предоплата при посуточном бронировании?",
    "Нет. Предоплату мы не берём: оплата на месте при заселении, наличными в тенге или картой. Бронь ничего не стоит и ничем не рискует, если планы поменяются.",
  ],
  [
    "Что дешевле в Алматы посуточно: хостел или квартира?",
    "На одного человека на одну-две ночи хостел выходит дешевле: за квартиру посуточно в Алматы платят целиком, плюс часто просят залог и уборку. От двух-трёх человек разница сокращается. Подробный расчёт — в статье «Хостел или квартира посуточно».",
  ],
  [
    "До скольки можно заехать?",
    `Стандартный заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}, выезд до ${SITE.checkOut}. Стойка работает круглосуточно: если поезд или самолёт приходит ночью, напишите время в WhatsApp — администратор подтвердит ночное заселение.`,
  ],
  [
    "Что входит в цену за сутки?",
    "Постельное бельё, бесплатный интернет Wi-Fi, общая кухня с посудой, стиральная машина, коворкинг и лаундж, камера хранения, чай и кофе. Полотенце и глажка — за отдельную плату на стойке.",
  ],
  [
    "Есть ли скидка, если остаться на несколько суток?",
    "Цена за ночь одинаковая до недели. Для срока от недели и от месяца администратор считает индивидуально — условия на странице «Проживание на месяц».",
  ],
];

export const Route = createFileRoute("/hostel-posutochno-v-almaty")({
  head: () => ({
    ...pageHead(
      "Хостел в Алматы посуточно: цены за сутки — Luxx Aparts",
      `Снять место или номер в Алматы посуточно: койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸ за ночь, номера 10 000–15 000 ₸. Без предоплаты, оплата при заселении, стойка 24/7. Толе би 286/8.`,
      PATH,
    ),
    scripts: jsonLd(
      webPageSchema(PATH),
      breadcrumbSchema("Посуточно", PATH),
      hostelSchema(),
      faqSchema(FAQ),
    ),
  }),
  component: PosutochnoPage,
});

function PosutochnoPage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <ContentPage
      eyebrow="Посуточно"
      title="Хостел в Алматы посуточно"
      intro={`Luxx Aparts сдаёт места и номера посуточно: минимальный срок — одни сутки, койко-место ${price} ₸ за ночь, отдельный номер от 10 000 ₸. Предоплаты нет, оплата при заселении наличными или картой. Адрес — ${SITE.address}, на той же улице, что автовокзал Сайран.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.reception}
    >
      <AnswerSection title="Сколько стоит переночевать в Алматы одну ночь?">
        <p>
          Цены за сутки на {SITE.factsUpdated}. Койко-место считается за место в комнате, номер — за
          комнату целиком, сколько бы человек в ней ни жило.
        </p>
        <TariffCards />
        <p>
          Полная таблица тарифов и что входит в каждый — на странице{" "}
          <Link to="/nomera">«Номера и цены»</Link>.
        </p>
        <Button asChild className="mt-2">
          <BookingButton to="/bronirovanie">Забронировать на сегодня</BookingButton>
        </Button>
      </AnswerSection>

      <AnswerSection title="Хостел, отель или квартира посуточно — что выбрать?">
        <p>
          Нас часто ищут как отель или гостиницу у Сайрана, поэтому скажем прямо: Luxx Aparts —
          хостел, но с отдельными номерами на ключ. То есть выбирать нужно не между зданиями, а
          между тремя форматами ночёвки.
        </p>
        <ul>
          <li>
            <strong className="text-foreground">Койко-место в общей комнате</strong> — самая низкая
            цена за ночь из трёх форматов: {price} ₸ за место, капсула со шторкой, свой шкафчик и
            розетка.
          </li>
          <li>
            <strong className="text-foreground">Отдельный номер в хостеле</strong> — то же, что
            недорогая гостиница: комната запирается на ключ, санузел общий на этаже, 10 000–15 000 ₸
            за ночь.
          </li>
          <li>
            <strong className="text-foreground">Квартира посуточно</strong> — дороже на одного, но
            имеет смысл на компанию от трёх человек; обычно просят залог и плату за уборку.
          </li>
        </ul>
        <p>
          Как считать разницу на конкретных цифрах — в статье{" "}
          <Link to="/blog/$slug" params={{ slug: "hostel-ili-kvartira-posutochno-v-almaty" }}>
            «Хостел или квартира посуточно в Алматы»
          </Link>
          . Если ищете просто недорогое жильё на несколько дней, начните с обзора{" "}
          <Link to="/blog/$slug" params={{ slug: "gde-ostanovitsya-v-almaty-byudzhetno" }}>
            «Где остановиться в Алматы бюджетно»
          </Link>
          .
        </p>
      </AnswerSection>

      <AnswerSection title="Как забронировать сутки без предоплаты?">
        <p>
          Напишите в WhatsApp дату заезда, дату выезда и сколько вас — администратор ответит в любое
          время суток, назовёт цену на эти даты и придержит место. Карту привязывать не нужно,
          деньги берут только при заселении.
        </p>
        <p>
          Приезжаете ночью — предупредите заранее: стойка работает круглосуточно, но так вас
          встретят у входа. Правила заезда, выезда и отмены — на странице{" "}
          <Link to="/pravila">«Правила проживания»</Link>, маршруты от вокзала и аэропорта — на{" "}
          <Link to="/kak-dobratsya">«Как добраться»</Link>.
        </p>
        <Button asChild className="mt-2">
          <BookingButton to="/bronirovanie">Написать в WhatsApp</BookingButton>
        </Button>
      </AnswerSection>

      <QaList items={FAQ} />
    </ContentPage>
  );
}
