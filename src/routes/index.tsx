import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Clock3, MapPin, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/luxx-aparts-logo.png.asset.json";
import { SITE, pageHead } from "@/lib/site";

const faq: [string, string][] = [
  [
    "Где находится Luxx Aparts?",
    "Luxx Aparts находится по адресу: ул. Толе би 286/8, 2 этаж, Алматы, ЖК «Каусар». Почтовый индекс — 050005.",
  ],
  [
    "Можно ли заселиться ночью?",
    "Да. Заселение работает 24/7. Перед приездом ночью лучше связаться с администратором по телефону или WhatsApp.",
  ],
  [
    "Есть ли Wi‑Fi и место для работы?",
    "Да. Гостям доступны Wi‑Fi и коворкинг-зона. Это удобно для поездок, в которых нужно учиться или работать удалённо.",
  ],
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts — хостел и комнаты в Алматы",
      "Luxx Aparts на ул. Толе би 286/8 в Алматы: общие и отдельные комнаты, Wi-Fi, коворкинг-зона и заселение 24/7.",
      "/",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Hostel",
            name: SITE.name,
            url: "/",
            description:
              "Хостел и отдельные комнаты в Алматы: Wi-Fi, коворкинг-зона и заселение 24/7.",
            telephone: SITE.phoneDisplay,
            address: {
              "@type": "PostalAddress",
              streetAddress: "улица Толе би 286/8, 2 этаж",
              addressLocality: "Алматы",
              postalCode: SITE.postalCode,
              addressCountry: "KZ",
            },
            amenityFeature: [
              { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
              { "@type": "LocationFeatureSpecification", name: "Коворкинг-зона", value: true },
              {
                "@type": "LocationFeatureSpecification",
                name: "Круглосуточное заселение",
                value: true,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: "/",
            inLanguage: "ru",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          },
        ]),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="pb-20 lg:pb-0">
      <section className="relative isolate overflow-hidden bg-hero text-hero-foreground">
        <div className="absolute inset-0 brand-grid opacity-20" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">
              Хостел и отдельные комнаты · Алматы
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">
              Luxx Aparts
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-hero-muted sm:text-xl">
              Общие и отдельные комнаты на улице Толе би. Wi‑Fi, коворкинг-зона и заселение 24/7 —
              для короткой остановки или длительного проживания в Алматы.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
                  Уточнить свободные места
                  <ArrowRight />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-hero-border bg-transparent text-hero-foreground hover:bg-hero-soft hover:text-hero-foreground"
              >
                <Link to="/nomera">Посмотреть варианты</Link>
              </Button>
            </div>
            <div className="mt-12 flex items-start gap-3 border-t border-hero-border pt-6 text-sm text-hero-muted">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                {SITE.address}
                <br />
                ЖК «Каусар»
              </span>
            </div>
          </div>
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="aspect-square border border-hero-border bg-hero-soft p-10 shadow-deep">
              <img
                src={logoAsset.url}
                alt="Фирменный знак Luxx Aparts"
                width="800"
                height="800"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="absolute -bottom-5 -left-8 bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground">
              Заселение 24/7
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {[
            { icon: BedDouble, label: "Форматы", value: "Общие и отдельные комнаты" },
            { icon: Wifi, label: "Для связи и работы", value: "Wi‑Fi и коворкинг-зона" },
            { icon: Clock3, label: "Приём гостей", value: "Заселение круглосуточно" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 py-7 sm:px-6 first:pl-0">
              <Icon className="size-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Коротко о размещении
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Что есть в Luxx Aparts?
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Luxx Aparts предлагает общие и отдельные комнаты по адресу ул. Толе би 286/8, 2 этаж.
              Для гостей доступны Wi‑Fi и коворкинг-зона, а заселение работает 24 часа в сутки.
              Наличие конкретного типа комнаты и актуальную стоимость администратор подтверждает
              перед бронированием.
            </p>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
              {["Общие комнаты", "Отдельные комнаты", "Коворкинг-зона", "Заселение 24/7"].map(
                (x, i) => (
                  <div key={x} className="bg-background p-6">
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                    <p className="mt-4 font-display text-xl font-semibold">{x}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Перед поездкой
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Что важно знать гостю?
              </h2>
            </div>
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold">
              Все вопросы <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {faq.map(([q, a], i) => (
              <article key={q} className="border border-border bg-background p-7">
                <p className="text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-5 font-display text-xl font-semibold">{q}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
