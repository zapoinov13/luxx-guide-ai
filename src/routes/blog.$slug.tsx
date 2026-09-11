import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Clock3, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { SITE, absolute, jsonLd, pageHead } from "@/lib/site";
import { AUTHOR } from "./blog.avtor";

const articleSchema = (post: NonNullable<ReturnType<typeof getPost>>) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": absolute(`/blog/${post.slug}#article`),
  headline: post.title,
  description: post.description,
  inLanguage: "ru",
  datePublished: post.date,
  dateModified: post.updated,
  wordCount: post.text.split(" ").length,
  keywords: post.tags.join(", "),
  image: post.cover ? [absolute(`/photos/${post.cover}-1600.webp`)] : [absolute("/og-image.jpg")],
  author: {
    "@type": "Organization",
    "@id": absolute(`${AUTHOR.path}#author`),
    name: post.author,
    url: absolute(AUTHOR.path),
  },
  publisher: { "@id": absolute("/#hostel") },
  mainEntityOfPage: absolute(`/blog/${post.slug}`),
  isPartOf: { "@id": absolute("/blog#blog") },
});

const crumbs = (post: NonNullable<ReturnType<typeof getPost>>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: absolute("/") },
    { "@type": "ListItem", position: 2, name: "Блог", item: absolute("/blog") },
    { "@type": "ListItem", position: 3, name: post.title, item: absolute(`/blog/${post.slug}`) },
  ],
});

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    const others = getPosts()
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
    return { post, others };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const base = pageHead(post.title, post.description, `/blog/${post.slug}`);
    return {
      meta: [
        ...base.meta.map((m) =>
          "property" in m && m.property === "og:type"
            ? { property: "og:type", content: "article" }
            : m,
        ),
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: post.updated },
        ...(post.cover
          ? [{ property: "og:image", content: absolute(`/photos/${post.cover}-1600.webp`) }]
          : []),
      ],
      links: base.links,
      scripts: jsonLd(crumbs(post), articleSchema(post)),
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, others } = Route.useLoaderData();
  return (
    <main className="pb-24 lg:pb-0">
      <div className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-3xl px-5 py-8 lg:px-8 lg:py-16">
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">
              Главная
            </Link>
            <ChevronRight className="size-4" aria-hidden="true" />
            <Link to="/blog" className="hover:text-foreground">
              Блог
            </Link>
            <ChevronRight className="size-4" aria-hidden="true" />
            <span aria-current="page" className="line-clamp-1">
              {post.title}
            </span>
          </nav>
          <h1 className="font-display text-[2rem] font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground lg:mt-5 lg:text-lg lg:leading-8">
            {post.description}
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <Link to="/blog/avtor" className="hover:text-foreground">
              {post.author}
            </Link>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="size-4" aria-hidden="true" />
              {post.readingMinutes} мин чтения
            </span>
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-5 py-10 lg:px-8 lg:py-14">
        {post.cover && (
          <Photo
            photo={{
              id: post.cover,
              alt: `${post.title}: фото хостела Luxx Aparts, Алматы`,
              width: 1600,
              height: 1067,
            }}
            sizes="(min-width: 768px) 768px, 100vw"
            className="mb-8 aspect-[16/10] w-full rounded-2xl object-cover shadow-card lg:mb-10 lg:aspect-[16/9] lg:rounded-3xl"
            priority
          />
        )}
        <div
          className="prose-copy article-body text-base leading-7 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Теги">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </article>

      <section className="mx-auto max-w-3xl px-5 pb-12 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink px-7 py-9 text-ink-foreground sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Едете в Алматы?</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Койко-место от {SITE.priceFrom.toLocaleString("ru-RU")} ₸, отдельные комнаты, стойка
              круглосуточно.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/bronirovanie">
              <MessageCircle />
              Забронировать
            </Link>
          </Button>
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pb-16 lg:px-8">
          <h2 className="font-display text-2xl font-bold">Ещё статьи</h2>
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary"
                >
                  <span className="font-semibold">{p.title}</span>
                  <ChevronRight
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Все статьи
          </Link>
        </section>
      )}
    </main>
  );
}
