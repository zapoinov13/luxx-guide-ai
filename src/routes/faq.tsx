import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, QaList } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { FAQ_ITEMS } from "@/lib/qa";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead(
      "Вопросы о хостеле Luxx Aparts в Алматы: цены, заезд, кухня",
      "Ответы на вопросы гостей Luxx Aparts: цена, отдельные номера, проживание на месяц, оплата картой, кухня, дети, дорога от вокзала, заезд без брони.",
      "/faq",
    ),
    scripts: jsonLd(breadcrumbSchema("Вопросы и ответы", "/faq"), faqSchema(FAQ_ITEMS)),
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <ContentPage
      eyebrow="Вопросы и ответы"
      title="Вопросы и ответы о хостеле Luxx Aparts"
      intro={`Ответы на вопросы, которые гости задают чаще всего: сколько стоят сутки, есть ли отдельные комнаты и кухня, как доехать от вокзала, можно ли с детьми. Не нашли свой вопрос — напишите в WhatsApp или позвоните ${SITE.phoneDisplay}, отвечаем круглосуточно.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.lounge}
    >
      <QaList items={FAQ_ITEMS} />
    </ContentPage>
  );
}
