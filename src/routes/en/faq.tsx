import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, QaList } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, pageHead } from "@/lib/site";
import { EN, FAQ_EN } from "@/lib/site-en";

export const Route = createFileRoute("/en/faq")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts hostel FAQ: prices, check-in, kitchen",
      "Answers for guests of Luxx Aparts in Almaty: price per night, private rooms, monthly stays, card payment, kitchen, children, getting from the station, walk-ins.",
      "/en/faq",
    ),
    scripts: jsonLd(breadcrumbSchema("FAQ", "/en/faq"), faqSchema(FAQ_EN)),
  }),
  component: FaqPageEn,
});

function FaqPageEn() {
  return (
    <ContentPage
      eyebrow="FAQ"
      title="Questions and answers about Luxx Aparts hostel"
      intro={`The questions guests ask most often: how much a night costs, whether there are private rooms and a kitchen, how to get from the station, whether children can stay. If your question is not here, message us on WhatsApp or call ${SITE.phoneDisplay}, we answer around the clock.`}
      updated={EN.factsUpdated}
      photo={PHOTOS.lounge}
    >
      <QaList items={FAQ_EN} />
    </ContentPage>
  );
}
