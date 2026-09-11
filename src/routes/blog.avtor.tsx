import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { getPosts } from "@/lib/blog";
import { PHOTOS } from "@/lib/photos";
import { SITE, absolute, breadcrumbsSchema, jsonLd, pageHead } from "@/lib/site";

/** Автор статей блога: редакция хостела. Узел используется в Article.author. */
export const AUTHOR = {
  name: "Команда Luxx Aparts",
  path: "/blog/avtor",
  description:
    "Статьи в блоге пишут администраторы хостела Luxx Aparts вместе с агентством MarkVision. Мы отвечаем на вопросы, которые гости задают на стойке: как доехать ночью, где жить бюджетно, что успеть за два дня.",
} as const;

export const authorSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absolute(`${AUTHOR.path}#author`),
  name: AUTHOR.name,
  url: absolute(AUTHOR.path),
  description: AUTHOR.description,
  image: absolute(`/photos/${PHOTOS.reception.id}-1600.webp`),
  parentOrganization: { "@id": absolute("/#hostel") },
});

export const Route = createFileRoute("/blog/avtor")({
  loader: () => getPosts(),
  head: () => ({
    ...pageHead(
      "Кто пишет блог хостела Luxx Aparts",
      "Об авторах блога Luxx Aparts: администраторы хостела в Алматы и агентство MarkVision. Откуда берём факты, как проверяем цены и маршруты, как связаться.",
      AUTHOR.path,
    ),
    scripts: jsonLd(
      breadcrumbsSchema([
        ["Блог", "/blog"],
        ["Об авторах", AUTHOR.path],
      ]),
      authorSchema(),
    ),
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const posts = Route.useLoaderData();
  return (
    <ContentPage
      eyebrow="Об авторах"
      crumbs={[["Блог", "/blog"]]}
      title="Кто пишет блог Luxx Aparts"
      intro={AUTHOR.description}
      photo={PHOTOS.reception}
    >
      <AnswerSection title="Откуда берутся факты в статьях?">
        <p>
          Из практики стойки регистрации Luxx Aparts: администраторы каждый день встречают гостей с
          вокзалов и из аэропорта и знают, какие вопросы возникают в дороге. Цены, расстояния и
          время в пути указываются с датой или ссылкой на источник: 2GIS, Яндекс Карты, карточки на
          площадках бронирования.
        </p>
        <p>
          Если факт не подтверждён, в тексте так и написано: «уточните у администратора». Нашли
          ошибку или устаревшую цифру — напишите на{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, статью поправим.
        </p>
      </AnswerSection>
      <AnswerSection title="Как связаться с хостелом?">
        <p>
          Телефон и WhatsApp <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>, адрес{" "}
          {SITE.address}. Стойка работает круглосуточно. Все контакты —{" "}
          <Link to="/kontakty">на странице «Контакты»</Link>.
        </p>
      </AnswerSection>
      <AnswerSection title="Какие статьи уже вышли?">
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to="/blog/$slug" params={{ slug: p.slug }}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/blog" className="inline-flex items-center gap-1.5 font-semibold">
            Все статьи <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
