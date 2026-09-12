import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { Gallery } from "@/components/gallery";
import { PHOTO_SECTIONS } from "@/lib/photos";
import { SITE, absolute, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";

const gallerySchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Фото хостела Luxx Aparts в Алматы",
  url: absolute("/foto"),
  about: { "@id": absolute("/#hostel") },
  image: PHOTO_SECTIONS.flatMap((s) =>
    s.photos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: absolute(`/photos/${p.id}-1600.webp`),
      caption: p.alt,
      width: p.width,
      height: p.height,
    })),
  ),
});

export const Route = createFileRoute("/foto")({
  head: () => ({
    ...pageHead(
      "Фото хостела Luxx Aparts в Алматы: номера, кухня, санузлы",
      "30 фотографий хостела Luxx Aparts на Толе би 286/8: капсульные койко-места, одноместные и двухместные номера, кухня, коворкинг, душевые, шкафчики и стойка.",
      "/foto",
      { image: "/photos/04-1600.webp" },
    ),
    scripts: jsonLd(webPageSchema("/foto"), breadcrumbSchema("Фото", "/foto"), gallerySchema()),
  }),
  component: PhotoPage,
});

function PhotoPage() {
  const total = PHOTO_SECTIONS.reduce((n, s) => n + s.photos.length, 0);
  return (
    <ContentPage
      eyebrow="Фото"
      title="Как выглядит хостел Luxx Aparts"
      intro={`${total} фотографий хостела по разделам: капсулы и номера, кухня с лаунджем и коворкингом, санузлы и коридоры со шкафчиками, стойка регистрации. Фото сделаны в самом хостеле на ${SITE.address}; нажмите на любое, чтобы открыть крупнее.`}
      updated={SITE.factsUpdated}
    >
      {PHOTO_SECTIONS.map((s) => (
        <AnswerSection key={s.title} title={s.title}>
          <p>{s.text}</p>
          <Gallery photos={s.photos} />
        </AnswerSection>
      ))}
    </ContentPage>
  );
}
