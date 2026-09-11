import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { NEARBY, SITE, breadcrumbSchema, jsonLd, pageHead } from "@/lib/site";

const itemListSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Что рядом с хостелом Luxx Aparts",
  itemListElement: NEARBY.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: `${p.distance}, ${p.how}. ${p.note}`,
  })),
});

export const Route = createFileRoute("/ryadom")({
  head: () => ({
    ...pageHead(
      "Что рядом с Luxx Aparts: автовокзал, аквапарк, парки, центр",
      "Что рядом с хостелом Luxx Aparts на Толе би 286/8: автовокзал Сайран, аквапарк Family Park, Ботанический сад, Оперный театр. Расстояния и как доехать.",
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
      intro={`Luxx Aparts стоит на улице Толе би в западной части Алматы, рядом с автовокзалом Сайран. До аквапарка Family Park около 2,5 км, до Ботанического сада 4,5 км, до Оперного театра и площади Республики в центре 6,3 км. Расстояния по данным Ostrovok и брифа хостела на ${SITE.factsUpdated}; маршрут перед выходом проверьте в картах.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.detail}
    >
      <AnswerSection title="Что посмотреть и куда съездить рядом?">
        <div className="table-scroll">
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
              {NEARBY.map((p) => (
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
        </div>
      </AnswerSection>

      <AnswerSection title="Где поесть рядом?">
        <p>
          Кафе, столовые и магазины у дома есть вдоль улицы Толе би и у автовокзала Сайран. Готовить
          можно и в хостеле: на общей кухне есть плита, микроволновка и посуда, чай и кофе
          бесплатно. Список проверенных мест рядом подскажет администратор.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать до центра и Кок-Тобе?">
        <p>
          До центра около 6 км: на такси 15–25 минут, на метро от станции «Сайран» без пересадок до
          станций «Алмалы» и «Абая». До подъёмника на Кок-Тобе удобнее всего на такси. Время в пути
          зависит от часа и пробок.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
