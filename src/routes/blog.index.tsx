import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { ContentPage } from "@/components/content-page";
import { Photo } from "@/components/photo";
import { formatDate, getPosts } from "@/lib/blog";
import { PHOTOS } from "@/lib/photos";
import { SITE, absolute, breadcrumbSchema, jsonLd, pageHead } from "@/lib/site";

const blogSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": absolute("/blog#blog"),
  name: `Блог ${SITE.name}`,
  url: absolute("/blog"),
  inLanguage: "ru",
  publisher: { "@id": absolute("/#hostel") },
  blogPost: getPosts().map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: absolute(`/blog/${p.slug}`),
    datePublished: p.date,
    dateModified: p.updated,
  })),
});

export const Route = createFileRoute("/blog/")({
  loader: () => getPosts(),
  head: () => ({
    ...pageHead(
      "Блог о поездках в Алматы от хостела Luxx Aparts",
      "Где остановиться в Алматы недорого, как доехать из аэропорта ночью, хостел или квартира посуточно, что посмотреть за два дня: статьи от хостела Luxx Aparts.",
      "/blog",
    ),
    scripts: jsonLd(breadcrumbSchema("Блог", "/blog"), blogSchema()),
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const posts = Route.useLoaderData();
  return (
    <ContentPage
      eyebrow="Блог"
      title="Блог о поездках в Алматы"
      intro="Короткие практичные статьи для тех, кто едет в Алматы: как добраться ночью из аэропорта, где остановиться недорого, чем хостел отличается от квартиры посуточно, что успеть за два дня. Пишем только то, что проверили сами или на чём настаивают гости."
      photo={PHOTOS.coworking}
    >
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <article className="grid gap-5 overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-[0.7fr_1.3fr]">
              {p.cover && (
                <Link to="/blog/$slug" params={{ slug: p.slug }} aria-hidden="true" tabIndex={-1}>
                  <Photo
                    photo={{ id: p.cover, alt: "", width: 1600, height: 1067 }}
                    sizes="(min-width: 640px) 25vw, 100vw"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </Link>
              )}
              <div className="p-6 sm:py-7 sm:pr-7 sm:pl-0">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    {p.readingMinutes} мин
                  </span>
                </p>
                <h2 className="mt-2 font-display text-lg font-bold leading-snug sm:text-2xl">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.description}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Читать <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
