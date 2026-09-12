import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";
import { breadcrumbSchema, faqSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";
import { AMENITIES_EN, AMENITY_QA_EN, hostelSchemaEn } from "@/lib/site-en";

export const Route = createFileRoute("/en/amenities")({
  head: () => ({
    ...pageHead(
      "Hostel with kitchen and coworking in Almaty: Luxx Aparts",
      "What Luxx Aparts hostel in Almaty offers: shared kitchen, washing machine, free Wi-Fi, coworking, lockers, luggage storage, air conditioning, 24/7 front desk.",
      "/en/amenities",
    ),
    scripts: jsonLd(
      webPageSchema("/en/amenities"),
      breadcrumbSchema("Amenities", "/en/amenities"),
      hostelSchemaEn(),
      faqSchema(AMENITY_QA_EN),
    ),
  }),
  component: AmenitiesPageEn,
});

function AmenitiesPageEn() {
  return (
    <ContentPage
      eyebrow="Amenities"
      title="Luxx Aparts hostel amenities in Almaty"
      intro="Luxx Aparts is a hostel in Almaty with a shared kitchen, a washing machine, free Wi-Fi and a coworking area. The desk and security work 24/7, rooms are soundproofed, and you can lock your things in a locker or leave them in the luggage room. Below are answers about each amenity."
      photo={PHOTOS.kitchen}
    >
      <AnswerSection title="What is there in the hostel?">
        <ul className="grid gap-2 sm:grid-cols-2">
          {AMENITIES_EN.map((a) => (
            <li key={a.name}>
              <strong className="text-foreground">{a.name}</strong>: {a.detail.toLowerCase()}
            </li>
          ))}
        </ul>
      </AnswerSection>
      <AnswerSection title="What do the kitchen, lounge and bathrooms look like?">
        <div className="grid gap-3 sm:grid-cols-2">
          <Photo
            photo={PHOTOS.lounge}
            sizes="(min-width: 640px) 30vw, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <Photo
            photo={PHOTOS.bathroom}
            sizes="(min-width: 640px) 30vw, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </AnswerSection>
      <QaList items={AMENITY_QA_EN} />
    </ContentPage>
  );
}
