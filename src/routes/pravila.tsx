import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { RULES } from "@/lib/qa";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";

export const Route = createFileRoute("/pravila")({
  head: () => ({
    ...pageHead(
      "Правила заселения в хостеле Luxx Aparts, Алматы",
      `Заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}, выезд до ${SITE.checkOut}. Документы, дети, животные, курение, оплата, отмена: правила хостела Luxx Aparts в Алматы.`,
      "/pravila",
    ),
    scripts: jsonLd(
      webPageSchema("/pravila"),
      breadcrumbSchema("Правила", "/pravila"),
      faqSchema(RULES),
    ),
  }),
  component: RulesPage,
});

function RulesPage() {
  return (
    <ContentPage
      eyebrow="Правила"
      title="Правила заселения и проживания в хостеле Luxx Aparts"
      intro={`Заезд в хостел с ${SITE.checkIn.from} до ${SITE.checkIn.to}, выезд до ${SITE.checkOut}. Для заселения нужен документ с фотографией, гости до 18 лет живут только с родителем. Оплата при заселении наличными или картой. Животные, курение в помещениях и вечеринки не допускаются.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.reception}
    >
      <QaList items={RULES} />
      <AnswerSection title="Как проходит заселение?">
        <ol>
          <li>
            <strong>Свяжитесь с администратором.</strong> Назовите даты, число гостей и формат:
            койко-место или отдельная комната.
          </li>
          <li>
            <strong>Подтвердите условия.</strong> Стоимость на ваши даты, способ оплаты и время
            прибытия.
          </li>
          <li>
            <strong>Приезжайте с документом.</strong> Администратор на стойке оформит заселение,
            выдаст бельё, ключ от шкафчика и пароль от Wi-Fi.
          </li>
        </ol>
      </AnswerSection>
    </ContentPage>
  );
}
