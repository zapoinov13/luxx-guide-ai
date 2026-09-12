import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Photo, type PhotoRef } from "@/components/photo";
import { SITE, type Crumb, type QA } from "@/lib/site";
import { UI, localeOf } from "@/lib/i18n";

type ContentPageProps = {
  title: string;
  eyebrow: string;
  /** Первый абзац под H1: прямой ответ на вопрос страницы. */
  intro: string;
  /** Пометка «Актуально на …» под первым абзацем (ТЗ, раздел 2, «Даты»). */
  updated?: string;
  /** Фото справа от заголовка. */
  photo?: PhotoRef | undefined;
  /** Промежуточные хлебные крошки между «Главная» и текущей страницей. */
  crumbs?: readonly Crumb[];
  children: ReactNode;
};

export function ContentPage({
  title,
  eyebrow,
  intro,
  updated,
  photo,
  crumbs = [],
  children,
}: ContentPageProps) {
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const locale = localeOf(pathname);
  const t = UI[locale];
  return (
    <main>
      <div className="border-b border-border bg-secondary/60">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-16">
          <div>
            <nav
              aria-label={t.breadcrumbs}
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <Link to={locale === "en" ? "/en" : "/"} className="hover:text-foreground">
                {t.home}
              </Link>
              {crumbs.map(([name, path]) => (
                <span key={path} className="contents">
                  <ChevronRight className="size-4" aria-hidden="true" />
                  <Link to={path} className="hover:text-foreground">
                    {name}
                  </Link>
                </span>
              ))}
              <ChevronRight className="size-4" aria-hidden="true" />
              <span aria-current="page">{eyebrow}</span>
            </nav>
            <h1 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground lg:mt-6 lg:text-lg lg:leading-8">
              {intro}
            </p>
            {updated && (
              <p className="mt-4 text-sm text-muted-foreground">
                {t.updated} <time dateTime={SITE.factsUpdatedIso}>{updated}</time>
              </p>
            )}
          </div>
          {photo && (
            <Photo
              photo={photo}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-photo lg:aspect-[4/3] lg:rounded-3xl"
              priority
            />
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="max-w-3xl">{children}</div>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink px-7 py-9 text-ink-foreground sm:flex-row sm:items-center lg:px-10">
          <div>
            <h2 className="font-display text-2xl font-bold">{t.questions}</h2>
            <p className="mt-2 text-sm text-ink-muted">{t.questionsText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-ink-muted/40 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
            >
              <a href={`tel:${SITE.phoneHref}`}>
                <Phone />
                {SITE.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AnswerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-border py-8 first:pt-0 last:border-0 lg:py-9">
      <h2 className="font-display text-xl font-bold sm:text-2xl lg:text-[1.75rem]">{title}</h2>
      <div className="prose-copy mt-4 text-base leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

/**
 * Список «вопрос → ответ» как раскрывающиеся строки: вопросы видны списком,
 * ответ разворачивается по нажатию. Текст ответов остаётся в HTML (<details>),
 * поэтому его читают поисковики, ИИ-краулеры и разметка FAQPage той же страницы.
 * Первый вопрос открыт, чтобы блок не выглядел пустым.
 */
export function QaList({ items }: { items: readonly QA[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border lg:rounded-3xl">
      {items.map(([question, answer], i) => (
        <details key={question} open={i === 0} className="group px-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden sm:py-5">
            <h2 className="font-display text-base font-bold sm:text-lg">{question}</h2>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-transform group-open:rotate-180">
              <ChevronDown className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="pb-5 text-base leading-7 text-muted-foreground sm:pr-16">{answer}</p>
        </details>
      ))}
    </div>
  );
}
