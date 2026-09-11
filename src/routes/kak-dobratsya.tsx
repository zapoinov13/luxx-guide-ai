import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { MapEmbed } from "@/components/map-embed";
import { DISTANCES, SITE, breadcrumbSchema, hostelSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/kak-dobratsya")({
  head: () => ({
    ...pageHead(
      "Как добраться до хостела Luxx Aparts в Алматы",
      "Хостел рядом с автовокзалом Сайран в Алматы: как доехать до Luxx Aparts от вокзала Алматы-2 (7 км), из аэропорта (около 20 км), на метро. Карта и вход.",
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
      title="Как добраться до хостела Luxx Aparts"
      intro={`Хостел Luxx Aparts находится в Алматы по адресу ${SITE.address}, вход через ${SITE.complex}. Автовокзал Сайран на той же улице, метро «Сайран» в 1,9 км, вокзал Алматы-2 в 7 км, аэропорт примерно в 20 км. Ночью удобнее всего такси: назовите водителю «Толе би 286/8».`}
      photo={PHOTOS.reception}
    >
      <AnswerSection title="Где хостел на карте?">
        <MapEmbed className="lg:min-h-[280px]" />
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
