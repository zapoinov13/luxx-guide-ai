import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, QaList } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, pageHead } from "@/lib/site";
import { EN, RULES_EN } from "@/lib/site-en";

export const Route = createFileRoute("/en/house-rules")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts house rules: check-in, documents, children",
      `Check-in ${SITE.checkIn.from}–${SITE.checkIn.to}, check-out by ${SITE.checkOut}, ID or passport, children with parents, no pets, no smoking indoors, payment at check-in, cancellation terms.`,
      "/en/house-rules",
    ),
    scripts: jsonLd(breadcrumbSchema("House rules", "/en/house-rules"), faqSchema(RULES_EN)),
  }),
  component: RulesPageEn,
});

function RulesPageEn() {
  return (
    <ContentPage
      eyebrow="House rules"
      title="Luxx Aparts house rules"
      intro={`Check-in from ${SITE.checkIn.from} to ${SITE.checkIn.to}, check-out by ${SITE.checkOut}, the desk works 24/7. Bring a photo ID, foreign guests a passport. Children stay with parents in private rooms; pets, parties and smoking indoors are not allowed. Pay at check-in in cash or by card.`}
      updated={EN.factsUpdated}
      photo={PHOTOS.reception}
    >
      <QaList items={RULES_EN} />
    </ContentPage>
  );
}
