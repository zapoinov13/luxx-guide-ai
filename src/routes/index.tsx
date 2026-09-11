import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Clock3, MapPin, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/luxx-aparts-logo.png.asset.json";
import {
  AMENITIES,
  SITE,
  faqSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webSiteSchema,
  type QA,
} from "@/lib/site";

const faq: QA[] = [
  [
    "Есть ли кухня?",
    "Да. В Luxx Aparts есть общая кухня с посудой и чайником, которой могут пользоваться все гости. Рядом стоит стиральная машина и гладильные принадлежности, так что готовить и стирать можно прямо в хостеле.",
  ],
  [
    "Можно ли заселиться ночью?",
    `Стойка регистрации Luxx Aparts работает круглосуточно. Стандартный заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}. Если приезжаете позже, заранее предупредите администратора по телефону или в WhatsApp: он подтвердит порядок ночного заезда.`,
  ],
  [
    "Принимаете ли иностранцев?",
    "Да. Для заселения нужен документ, удостоверяющий личность: гражданам Казахстана удостоверение, иностранным гостям паспорт. Вопросы по регистрации иностранцев уточните у администратора до приезда.",
  ],
  [
    "Можно ли с детьми?",
    "Да. Дети размещаются вместе с родителями, гости до 18 лет заселяются только с родителем или опекуном. В хостеле есть детская площадка и настольные игры.",
  ],
  [
    "Как далеко до центра?",
    `Luxx Aparts находится на улице Толе би, ${SITE.distanceToStation}. Время в пути до центра зависит от транспорта и времени суток. Администратор подскажет удобный маршрут от вашей точки прибытия.`,
  ],
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts — хостел и апартаменты в Алматы, Толе би 286",
      `Хостел Luxx Aparts в Алматы: ${SITE.rooms} номера, общая кухня, стирка, круглосуточная стойка, Wi-Fi, ${SITE.distanceToStation}. Прямое бронирование по WhatsApp.`,
      "/",
    ),
    scripts: jsonLd(hostelSchema(), webSiteSchema(), faqSchema(faq)),
  }),
  component: HomePage,
});

const highlights = [
  {
    icon: BedDouble,
    label: "Номерной фонд",
    value: `${SITE.rooms} номера: койко-места и отдельные комнаты`,
  },
  { icon: Utensils, label: "Для гостей", value: "Общая кухня, стирка, Wi-Fi" },
  { icon: Clock3, label: "Стойка", value: "Круглосуточно, заезд с 13:00" },
] as const;

const bookingSteps = [
  [
    "Напишите или позвоните",
    "Назовите даты, число гостей и формат: койко-место или отдельная комната.",
  ],
  [
    "Получите подтверждение",
    "Администратор проверит свободные места и назовёт стоимость на ваши даты.",
  ],
  [
    "Приезжайте и оплатите на месте",
    "Способы оплаты подтвердите у администратора при бронировании.",
  ],
] as const;

function HomePage() {
  return (
    <main className="pb-20 lg:pb-0">
      <section className="relative isolate overflow-hidden bg-hero text-hero-foreground">
        <div className="absolute inset-0 brand-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl lg:min-h-[calc(100svh-4.5rem)] items-center gap-10 px-5 py-14 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">
              Хостел и апартаменты · Алматы
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">
              Хостел и апартаменты Luxx Aparts в Алматы
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-hero-muted sm:text-xl">
              Luxx Aparts — хостел и апартаменты на улице Толе би 286/8 в Алматы. {SITE.rooms}{" "}
              номера: койко-места и отдельные комнаты, общая кухня, стиральная машина, Wi-Fi,
              круглосуточная стойка регистрации. {SITE.distanceToStation}. Бронируйте напрямую по
              WhatsApp: администратор подтвердит места и цену на ваши даты.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/bronirovanie">
                  Забронировать напрямую
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-hero-border bg-transparent text-hero-foreground hover:bg-hero-soft hover:text-hero-foreground"
              >
                <Link to="/nomera">Номера и цены</Link>
              </Button>
            </div>
            <div className="mt-12 flex items-start gap-3 border-t border-hero-border pt-6 text-sm text-hero-muted">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {SITE.address}
                <br />
                {SITE.complex}
              </span>
            </div>
          </div>
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="aspect-square border border-hero-border bg-hero-soft p-10 shadow-deep">
              <img
                src={logoAsset.url}
                alt="Фирменный знак хостела Luxx Aparts, Алматы"
                width="800"
                height="800"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="absolute -bottom-5 -left-8 bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground">
              Стойка работает 24/7
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {highlights.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 py-7 first:pl-0 sm:px-6">
              <Icon className="size-5 shrink-0 text-accent-foreground" aria-hidden="true" />
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
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Удобства
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Что есть в хостеле?
            </h2>
            <Link
              to="/udobstva"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              Подробнее об удобствах <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              В Luxx Aparts гостям доступны общая кухня, стиральная машина, камера хранения и Wi-Fi.
              Стойка регистрации и охрана работают круглосуточно, комнаты звукоизолированы, есть
              кондиционер и отопление.
            </p>
            <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2">
              {AMENITIES.map((item, i) => (
                <li key={item} className="bg-background p-5">
                  <span className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                Расположение
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Где находится и как добраться?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Адрес: {SITE.address}, {SITE.complex}. До вокзала Алматы-2 — 7 км. Маршруты от
                автовокзала Сайран и аэропорта администратор подскажет при бронировании.
              </p>
              <Link
                to="/kak-dobratsya"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              >
                Все маршруты <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                Кому подходит
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Кому подходит Luxx Aparts?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Студентам и тем, кто приехал на месяц; командировочным на одну-три ночи; семьям и
                группам, которым нужны кухня и стирка; транзитным гостям, которым важна
                круглосуточная стойка и камера хранения.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Бронирование
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Как забронировать напрямую?
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Без посредников: вы общаетесь с администратором хостела, а не с агрегатором.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {bookingSteps.map(([title, text], i) => (
              <li key={title} className="border border-border bg-background p-6">
                <span className="font-display text-3xl font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                Правила
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Правила заселения коротко
              </h2>
            </div>
            <Link to="/pravila" className="inline-flex items-center gap-2 text-sm font-semibold">
              Все правила <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Заезд и выезд",
                `Заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}, выезд до ${SITE.checkOut}.`,
              ],
              ["Документы", "Удостоверение личности с фото, иностранцам паспорт."],
              ["Дети", "Гости до 18 лет только с родителем или опекуном."],
              ["Запрещено", "Вечеринки, курение и проживание с животными."],
            ].map(([title, text]) => (
              <li key={title} className="border border-border bg-background p-6">
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Перед поездкой
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Что гости спрашивают чаще всего?
            </h2>
          </div>
          <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold">
            Все вопросы <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faq.map(([q, a], i) => (
            <article key={q} className="border border-border bg-background p-7">
              <p className="text-xs text-accent-foreground">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-display text-xl font-semibold">{q}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
