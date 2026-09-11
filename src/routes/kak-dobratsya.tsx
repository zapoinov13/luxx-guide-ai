import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import {
  DISTANCES,
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  mapEmbedUrl,
  mapLinkUrl,
  pageHead,
} from "@/lib/site";

export const Route = createFileRoute("/kak-dobratsya")({
  head: () => ({
    ...pageHead(
      "Как добраться до Luxx Aparts: вокзал, автовокзал, аэропорт",
      "Маршруты до хостела Luxx Aparts на Толе би 286/8: автовокзал Сайран рядом, метро «Сайран» 1,9 км, вокзал Алматы-2 7 км, аэропорт около 20 км. Как найти вход.",
      "/kak-dobratsya",
    ),
    scripts: jsonLd(breadcrumbSchema("Как добраться", "/kak-dobratsya"), hostelSchema()),
  }),
  component: DirectionsPage,
});

function DirectionsPage() {
  return (
    <ContentPage
      eyebrow="Как добраться"
      title="Как добраться до Luxx Aparts"
      intro={`Адрес: ${SITE.address}, вход через ${SITE.complex}. Автовокзал Сайран на той же улице, метро «Сайран» в 1,9 км, вокзал Алматы-2 в 7 км, аэропорт примерно в 20 км. Ночью удобнее всего такси: назовите водителю «Толе би 286/8».`}
      photo={PHOTOS.reception}
    >
      <AnswerSection title="Где хостел на карте?">
        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Luxx Aparts на карте: ул. Толе би 286/8, Алматы"
            src={mapEmbedUrl}
            className="h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p>
          Координаты: {SITE.geo.lat}, {SITE.geo.lng}.{" "}
          <a href={mapLinkUrl} target="_blank" rel="noreferrer">
            Открыть в Google Картах
          </a>
          {" · "}
          <a href={SITE.links.twoGis} target="_blank" rel="noreferrer">
            Открыть в 2GIS
          </a>
          {" · "}
          <a href={SITE.links.yandexMaps} target="_blank" rel="noreferrer">
            Открыть в Яндекс Картах
          </a>
        </p>
        <table>
          <thead>
            <tr>
              <th>Откуда</th>
              <th>Расстояние</th>
            </tr>
          </thead>
          <tbody>
            {DISTANCES.map((d) => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Расстояния указаны хостелом в карточке на Hostelworld, актуальны на {SITE.factsUpdated}.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать от вокзала Алматы-2?">
        <p>
          Семь километров, на такси 15–25 минут в зависимости от пробок. На автобусе — до
          автовокзала Сайран или остановки у ЖК «Каусар» на Толе би; номер маршрута подскажет
          администратор, они меняются.
        </p>
        <ol>
          <li>Вызовите такси через приложение или спросите на стойке номер автобуса.</li>
          <li>Назовите адрес: улица Толе би 286/8, ЖК «Каусар».</li>
          <li>На месте позвоните на стойку, вас встретят у входа.</li>
        </ol>
      </AnswerSection>

      <AnswerSection title="Как доехать от автовокзала Сайран?">
        <p>
          Пешком: автовокзал на той же улице Толе би, в нескольких минутах ходьбы. С тяжёлым багажом
          можно взять такси на одну остановку.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать из аэропорта Алматы?">
        <p>
          Примерно 20 км, удобнее всего такси. Если прилетаете ночью, заранее напишите время прилёта
          в WhatsApp: стойка работает круглосуточно, но поздний заезд нужно согласовать. Подробнее —
          в статье о ночном приезде в блоге.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать на метро?">
        <p>
          Ближайшие станции — «Сайран» (1,9 км) и «Москва» (2,4 км). От них 20–25 минут пешком или
          несколько минут на такси.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать от вокзала Алматы-1?">
        <p>
          Вокзал Алматы-1 в 14 км, на такси около 30 минут. Общественным транспортом дольше и с
          пересадкой, маршрут подскажут на стойке.
        </p>
      </AnswerSection>

      <AnswerSection title="Есть ли парковка?">
        <p>Да, рядом с домом. Свободное место и условия уточните при бронировании.</p>
      </AnswerSection>

      <AnswerSection title="Как найти вход?">
        <p>
          Ориентир — {SITE.complex}, хостел на втором этаже. Если приезжаете впервые или ночью,
          позвоните по номеру <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>, и вас
          встретят у входа.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
