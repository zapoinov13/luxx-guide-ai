import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import {
  RATINGS,
  REVIEWS,
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  pluralReviews,
} from "@/lib/site";

const reviewsSchema = () => ({
  ...hostelSchema(),
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    datePublished: r.date,
    reviewBody: r.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.score.replace(",", "."),
      bestRating: r.scale,
    },
    publisher: { "@type": "Organization", name: r.source, url: r.url },
  })),
});

export const Route = createFileRoute("/otzyvy")({
  head: () => ({
    ...pageHead(
      "Отзывы гостей о хостеле Luxx Aparts в Алматы",
      "Реальные отзывы о Luxx Aparts: Booking 8,8 из 10 (315 отзывов), Яндекс Карты 5,0 (192), 2GIS 4,8 (83), Ostrovok 8,7 (11). Чистота, тишина, коворкинг, персонал.",
      "/otzyvy",
    ),
    scripts: jsonLd(breadcrumbSchema("Отзывы", "/otzyvy"), reviewsSchema()),
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <ContentPage
      eyebrow="Отзывы"
      title="Отзывы гостей Luxx Aparts"
      intro={`На ${SITE.factsUpdated} у Luxx Aparts ${RATINGS.slice(0, 3)
        .map((r) => `${r.score} из ${r.scale} на ${r.source} (${pluralReviews(r.count)})`)
        .join(
          ", ",
        )}. Гости чаще всего хвалят чистоту, тишину, удобные кровати и персонал. Ниже цитаты с площадок с датой, именем автора и ссылкой на источник.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.lounge}
    >
      <AnswerSection title="Какие оценки у хостела на площадках?">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {RATINGS.map((r) => (
            <a
              key={r.source}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border p-5 transition-colors hover:bg-secondary"
            >
              <p className="flex items-center gap-1 font-display text-2xl font-bold text-foreground">
                <Star className="size-5 fill-primary text-primary" aria-hidden="true" />
                {r.score}
                <span className="text-base font-medium text-muted-foreground">/ {r.scale}</span>
              </p>
              <p className="mt-1 text-sm">
                {r.source}, {pluralReviews(r.count)}
              </p>
            </a>
          ))}
        </div>
      </AnswerSection>

      <AnswerSection title="Что пишут гости?">
        <div className="space-y-4">
          {REVIEWS.map((r) => (
            <blockquote key={r.author + r.date} className="rounded-2xl border border-border p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
                {r.score} / {r.scale}
                <span className="font-normal text-muted-foreground">· {r.room}</span>
              </p>
              <p className="mt-3 text-foreground">«{r.text}»</p>
              <footer className="mt-3 text-sm">
                {r.author}, {r.date} ·{" "}
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.source}
                </a>
              </footer>
            </blockquote>
          ))}
        </div>
        <p>
          Цитаты сокращены, орфография авторов сохранена. Полные тексты — по ссылкам на площадки.
        </p>
      </AnswerSection>

      <AnswerSection title="Где оставить отзыв?">
        <p>
          Останавливались у нас? Отзыв на 2GIS или Яндекс Картах помогает другим гостям выбрать
          жильё, а хостелу — становиться лучше.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <a href={SITE.links.twoGis} target="_blank" rel="noreferrer">
              Отзыв на 2GIS
              <ExternalLink />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={SITE.links.yandexMaps} target="_blank" rel="noreferrer">
              Отзыв на Яндекс Картах
              <ExternalLink />
            </a>
          </Button>
        </div>
      </AnswerSection>
    </ContentPage>
  );
}
