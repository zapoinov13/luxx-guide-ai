import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";
import { AMENITY_ITEMS } from "@/lib/qa";
import {
  breadcrumbSchema,
  faqSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webPageSchema,
} from "@/lib/site";

export const Route = createFileRoute("/udobstva")({
  head: () => ({
    ...pageHead(
      "Хостел с кухней, интернетом и коворкингом в Алматы — Luxx Aparts",
      "Что есть в хостеле Luxx Aparts в Алматы: общая кухня, стиральная машина, бесплатный интернет Wi-Fi, коворкинг, шкафчики, камера хранения, кондиционер, стойка 24/7.",
      "/udobstva",
    ),
    scripts: jsonLd(
      webPageSchema("/udobstva"),
      breadcrumbSchema("Удобства", "/udobstva"),
      hostelSchema(),
      faqSchema(AMENITY_ITEMS),
    ),
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  return (
    <ContentPage
      eyebrow="Удобства"
      title="Удобства хостела Luxx Aparts в Алматы"
      intro="Luxx Aparts — хостел в Алматы с общей кухней, стиральной машиной, бесплатным интернетом Wi-Fi и коворкингом. Стойка и охрана работают круглосуточно, комнаты звукоизолированы, вещи можно запереть в шкафчике или сдать в камеру хранения. Ниже ответы на вопросы про каждое удобство."
      photo={PHOTOS.kitchen}
    >
      <AnswerSection title="Как выглядят кухня, лаундж и санузлы?">
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
      <QaList items={AMENITY_ITEMS} />
    </ContentPage>
  );
}
