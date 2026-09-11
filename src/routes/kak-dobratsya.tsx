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
      intro={`Luxx Aparts находится по адресу ${SITE.address}, вход через ${SITE.complex}, хостел на втором этаже. Автовокзал Сайран на той же улице, станция метро «Сайран» в 1,9 км, вокзал Алматы-2 в 7 км, аэропорт примерно в 20 км. Ночью удобнее всего такси: назовите водителю «Толе би 286/8».`}
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
          От вокзала Алматы-2 до хостела 7 км. Самый простой вариант — такси до адреса «Толе би
          286/8»: дорога занимает 15–25 минут в зависимости от пробок. На общественном транспорте
          нужно доехать до автовокзала Сайран или остановки на Толе би у ЖК «Каусар»; номер маршрута
          уточните у администратора, они меняются.
        </p>
        <ol>
          <li>Вызовите такси через приложение или уточните у администратора номер автобуса.</li>
          <li>Назовите адрес: улица Толе би 286/8, ЖК «Каусар».</li>
          <li>По прибытии позвоните на стойку, администратор объяснит, как найти вход.</li>
        </ol>
      </AnswerSection>

      <AnswerSection title="Как доехать от автовокзала Сайран?">
        <p>
          Автовокзал Сайран находится на той же улице Толе би, в нескольких минутах ходьбы. С
          багажом можно дойти пешком или взять такси на одну остановку. Это удобно, если вы
          приезжаете или уезжаете междугородним автобусом.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать из аэропорта Алматы?">
        <p>
          Аэропорт находится примерно в 20 км от хостела. Удобнее всего такси, особенно ночью:
          назовите водителю адрес «Толе би 286/8». Если прилетаете поздно, заранее напишите
          администратору время прилёта: стойка работает круглосуточно, но ночной заезд нужно
          согласовать.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать на метро?">
        <p>
          Ближайшие станции — «Сайран» (1,9 км) и «Москва» (2,4 км). От станции до хостела можно
          дойти пешком за 20–25 минут или доехать на такси за несколько минут.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать от вокзала Алматы-1?">
        <p>
          Вокзал Алматы-1 находится в 14 км. На такси дорога занимает около 30 минут; маршрут на
          общественном транспорте уточните у администратора.
        </p>
      </AnswerSection>

      <AnswerSection title="Есть ли парковка?">
        <p>
          Рядом с хостелом есть парковка. Место и условия уточните у администратора при
          бронировании.
        </p>
      </AnswerSection>

      <AnswerSection title="Как найти вход?">
        <p>
          Ориентир — {SITE.complex} по адресу Толе би 286/8. Хостел занимает второй этаж. По
          прибытии позвоните по номеру <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>:
          администратор подскажет точный вход и встретит у стойки. Это особенно удобно, если
          приезжаете впервые или ночью.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
