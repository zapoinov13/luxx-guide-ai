import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { NEARBY, SITE, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";

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
      "Что рядом с хостелом Luxx Aparts в Алматы",
      "Хостел на Толе би в Алматы: что рядом с Luxx Aparts. Автовокзал Сайран, аквапарк Family Park, Ботанический сад, центр и Оперный театр. Расстояния и как доехать.",
      "/ryadom",
    ),
    scripts: jsonLd(
      webPageSchema("/ryadom"),
      breadcrumbSchema("Что рядом", "/ryadom"),
      itemListSchema(),
    ),
  }),
  component: NearbyPage,
});

function NearbyPage() {
  return (
    <ContentPage
      eyebrow="Что рядом"
      title="Что находится рядом с хостелом"
      intro={`Хостел стоит на улице Толе би в западной части Алматы, рядом с автовокзалом Сайран. До аквапарка Family Park около 2,5 км, до Ботанического сада 4,5 км, до центра с Оперным театром и площадью Республики 6,3 км. Расстояния ориентировочные, маршрут перед выходом проверьте в картах.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.detail}
    >
      <AnswerSection title="Что посмотреть и куда съездить рядом?">
        <div className="table-stack">
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
                  <td data-label="Расстояние">{p.distance}</td>
                  <td data-label="Как добраться">{p.how}</td>
                  <td data-label="">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnswerSection>

      <AnswerSection title="Где поесть рядом?">
        <p>
          Кафе, столовые и магазины — вдоль Толе би и у автовокзала Сайран. Готовить можно и в
          хостеле: на кухне плита, микроволновка и посуда, чай и кофе бесплатно. Проверенные места
          рядом подскажут на стойке.
        </p>
      </AnswerSection>

      <AnswerSection title="Как доехать до центра и Кок-Тобе?">
        <p>
          До центра около 6 км: 15–25 минут на такси или на метро от «Сайрана» без пересадок до
          «Алмалы» и «Абая». До подъёмника на Кок-Тобе проще на такси.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
