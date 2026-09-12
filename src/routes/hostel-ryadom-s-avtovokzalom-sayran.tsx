import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { MapEmbed } from "@/components/map-embed";
import { TariffCards } from "@/components/tariff-cards";
import { PHOTOS } from "@/lib/photos";
import {
  DISTANCES,
  NEARBY,
  SITE,
  breadcrumbSchema,
  faqSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webPageSchema,
  type QA,
} from "@/lib/site";

const PATH = "/hostel-ryadom-s-avtovokzalom-sayran";

/** Вопросы транзитных гостей: те же факты, что на /kak-dobratsya и /pravila. */
const FAQ: QA[] = [
  [
    "Как далеко хостел от автовокзала Сайран?",
    `Luxx Aparts стоит на той же улице Толе би, дом 286/8, ${SITE.complex}, второй этаж. От автовокзала несколько минут пешком, с тяжёлым багажом можно взять такси на одну остановку.`,
  ],
  [
    "Можно ли заселиться ночью, если автобус приходит поздно?",
    `Стойка работает круглосуточно. Стандартный заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}; если приезжаете позже, заранее напишите время в WhatsApp, администратор подтвердит ночной заезд и встретит у входа.`,
  ],
  [
    "Сколько стоит переночевать одну ночь рядом с автовокзалом?",
    `Койко-место в капсуле ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, одноместный номер 10 000 ₸ без окна или 11 000 ₸ с окном, двухместный 15 000 ₸ за номер (цены на ${SITE.factsUpdated}). Оплата при заселении наличными или картой, предоплаты нет.`,
  ],
  [
    "Где оставить вещи до автобуса или после выезда?",
    "В камере хранения на стойке, бесплатно, до заезда и после выезда. В общих комнатах у каждого гостя шкафчик с замком.",
  ],
  [
    "Как доехать от хостела до вокзала Алматы-2 и аэропорта?",
    "Вокзал Алматы-2 в 7 км, на такси 15–25 минут. Аэропорт примерно в 20 км, удобнее всего такси. Метро «Сайран» в 1,9 км, «Москва» в 2,4 км.",
  ],
];

export const Route = createFileRoute("/hostel-ryadom-s-avtovokzalom-sayran")({
  head: () => ({
    ...pageHead(
      "Хостел рядом с автовокзалом Сайран в Алматы — Luxx Aparts",
      `Хостел Luxx Aparts на той же улице, что автовокзал Сайран: койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, номера от 10 000 ₸, заезд круглосуточно, камера хранения. Толе би 286/8.`,
      PATH,
    ),
    scripts: jsonLd(
      webPageSchema(PATH),
      breadcrumbSchema("Рядом с автовокзалом Сайран", PATH),
      hostelSchema(),
      faqSchema(FAQ),
    ),
  }),
  component: SayranPage,
});

function SayranPage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  const sayran = DISTANCES[0];
  return (
    <ContentPage
      eyebrow="Рядом с автовокзалом Сайран"
      title="Хостел рядом с автовокзалом Сайран в Алматы"
      intro={`Luxx Aparts — хостел на той же улице, что автовокзал Сайран: Толе би, дом 286/8, ${sayran.how}. Койко-место ${price} ₸, отдельные номера от 10 000 ₸, стойка и заезд круглосуточно, камера хранения бесплатно. Удобно, если приехали автобусом поздно вечером или уезжаете рано утром.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.reception}
    >
      <AnswerSection title="Как далеко хостел от автовокзала Сайран?">
        <p>
          Автовокзал и хостел стоят на одной улице Толе би, между ними {sayran.how}. Ориентир —{" "}
          {SITE.complex}, вход со двора, хостел на втором этаже. Если сомневаетесь, позвоните на
          стойку <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>, вас встретят.
        </p>
        <MapEmbed className="h-[300px] lg:h-[360px]" />
        <table>
          <thead>
            <tr>
              <th>Откуда</th>
              <th>Расстояние</th>
              <th>Как добраться</th>
            </tr>
          </thead>
          <tbody>
            {DISTANCES.map((d) => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.value}</td>
                <td>{d.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Подробные маршруты от вокзалов и аэропорта — на странице{" "}
          <Link to="/kak-dobratsya">«Как добраться»</Link>.
        </p>
      </AnswerSection>

      <AnswerSection title="Сколько стоит переночевать рядом с автовокзалом?">
        <p>
          Цены за ночь на {SITE.factsUpdated}: койко-место — за место, номера — за номер целиком. В
          стоимость входят бельё, Wi-Fi, кухня и стирка.
        </p>
        <TariffCards />
        <Button asChild className="mt-2">
          <Link to="/bronirovanie">Забронировать напрямую</Link>
        </Button>
      </AnswerSection>

      <AnswerSection title="Что рядом, кроме автовокзала?">
        <ul>
          {NEARBY.slice(1, 6).map((n) => (
            <li key={n.name}>
              <strong className="text-foreground">{n.name}</strong>: {n.distance}
            </li>
          ))}
        </ul>
        <p>
          Полный список мест с расстояниями — на странице <Link to="/ryadom">«Что рядом»</Link>.
        </p>
      </AnswerSection>

      <QaList items={FAQ} />
    </ContentPage>
  );
}
