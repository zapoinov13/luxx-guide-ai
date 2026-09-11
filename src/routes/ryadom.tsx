import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { SITE, breadcrumbSchema, jsonLd, pageHead } from "@/lib/site";

/** Ориентиры рядом с хостелом. Расстояния из брифа заказчика, ориентировочные. */
const places = [
  {
    name: "Автовокзал Сайран",
    distance: "на той же улице Толе би",
    how: "пешком или на такси",
    note: "Удобно для тех, кто приезжает или уезжает междугородним автобусом.",
  },
  {
    name: "Аквапарк Family Park",
    distance: "около 2,5 км",
    how: "на такси или автобусе",
    note: "Крытый аквапарк, подходит для семей с детьми.",
  },
  {
    name: "Парк развлечений Fantasy World",
    distance: "около 10 минут на автомобиле",
    how: "на такси",
    note: "Аттракционы для детей и взрослых.",
  },
  {
    name: "Немецкий театр",
    distance: "около 25 минут пешком",
    how: "пешком или на автобусе",
    note: "Спектакли на немецком и русском языках.",
  },
  {
    name: "Вокзал Алматы-2",
    distance: "7 км",
    how: "на такси или автобусе",
    note: "Главный железнодорожный вокзал города.",
  },
] as const;

const itemListSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Что рядом с хостелом Luxx Aparts",
  itemListElement: places.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: `${p.distance}, ${p.how}. ${p.note}`,
  })),
});

export const Route = createFileRoute("/ryadom")({
  head: () => ({
    ...pageHead(
      "Что рядом с Luxx Aparts: автовокзал, аквапарк, парк, театр",
      "Что находится рядом с хостелом Luxx Aparts на Толе би 286/8 в Алматы: автовокзал Сайран, аквапарк Family Park, Fantasy World, Немецкий театр. Расстояния и как доехать.",
      "/ryadom",
    ),
    scripts: jsonLd(breadcrumbSchema("Что рядом", "/ryadom"), itemListSchema()),
  }),
  component: NearbyPage,
});

function NearbyPage() {
  return (
    <ContentPage
      eyebrow="Что рядом"
      title="Что находится рядом с хостелом"
      intro={`Luxx Aparts стоит на улице Толе би в Алматы, рядом с автовокзалом Сайран. В нескольких километрах — аквапарк Family Park и парк развлечений Fantasy World, до Немецкого театра можно дойти пешком. До вокзала Алматы-2 — 7 км. Расстояния ниже ориентировочные, актуальны на ${SITE.factsUpdated}; точный маршрут проверьте в картах перед выходом.`}
      updated={SITE.factsUpdated}
    >
      <AnswerSection title="Что посмотреть и куда съездить рядом?">
        <table>
          <thead>
            <tr>
              <th>Место</th>
              <th>Расстояние</th>
              <th>Как добраться</th>
              <th>Что это</th>
            </tr>
          </thead>
          <tbody>
            {places.map((p) => (
              <tr key={p.name}>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td>{p.distance}</td>
                <td>{p.how}</td>
                <td>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AnswerSection>

      <AnswerSection title="Где поесть рядом?">
        <p>
          Кафе и магазины у дома есть вдоль улицы Толе би. Готовить можно и в хостеле: на общей
          кухне есть посуда и чайник. Список проверенных мест рядом администратор подскажет на
          стойке.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать до центра и Кок-Тобе?">
        <p>
          До центра города и подъёмника на Кок-Тобе удобно ехать на такси или общественном
          транспорте по улице Толе би в сторону центра. Время в пути зависит от часа и пробок,
          поэтому уточните маршрут у администратора перед выходом.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
