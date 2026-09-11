import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Clock3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Star,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { GALLERY, PHOTOS } from "@/lib/photos";
import {
  AMENITIES,
  DISTANCES,
  RATINGS,
  REVIEWS,
  ROOM_TYPES,
  SITE,
  faqSchema,
  hostelSchema,
  jsonLd,
  mapEmbedUrl,
  pageHead,
  pluralReviews,
  webSiteSchema,
  type QA,
} from "@/lib/site";

const faq: QA[] = [
  [
    "Есть ли кухня?",
    "Да. В Luxx Aparts есть общая кухня с плитой, микроволновкой, холодильником, посудой и чайником. Чай и кофе бесплатно. Рядом стиральная машина и утюг.",
  ],
  [
    "Можно ли заселиться ночью?",
    `Стойка регистрации работает круглосуточно. Стандартный заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}. Если приезжаете позже, заранее напишите администратору в WhatsApp: он подтвердит порядок ночного заезда.`,
  ],
  [
    "Принимаете ли иностранцев?",
    "Да. Персонал говорит по-русски и по-английски. Для заселения нужен паспорт. Вопросы по регистрации иностранных гостей уточните у администратора до приезда.",
  ],
  [
    "Можно ли с детьми?",
    "Да, семьи с детьми размещаются в отдельных комнатах. Гости до 18 лет заселяются только с родителем или опекуном. Есть детская площадка и настольные игры.",
  ],
  [
    "Как далеко до центра?",
    "Около 6 км. До метро «Сайран» 1,9 км, до вокзала Алматы-2 7 км, до аэропорта около 20 км. Автовокзал Сайран находится на той же улице Толе би.",
  ],
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts — хостел и апартаменты в Алматы, Толе би 286",
      `Хостел Luxx Aparts в Алматы: ${SITE.rooms} номера от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸ за ночь, общая кухня, стирка, круглосуточная стойка, Wi-Fi, ${SITE.distanceToStation}. Прямое бронирование по WhatsApp.`,
      "/",
    ),
    scripts: jsonLd(hostelSchema(), webSiteSchema(), faqSchema(faq)),
  }),
  component: HomePage,
});

const facts = [
  { icon: BedDouble, value: `${SITE.rooms} номера`, label: "койко-места и отдельные комнаты" },
  { icon: Clock3, value: "24/7", label: "стойка регистрации и охрана" },
  { icon: Wifi, value: "Wi-Fi и кухня", label: "бесплатно для всех гостей" },
  { icon: MapPin, value: "7 км", label: "до вокзала Алматы-2" },
] as const;

const steps = [
  ["Напишите или позвоните", "Даты, число гостей, формат: койко-место или отдельная комната."],
  ["Получите подтверждение", "Администратор проверит места и назовёт цену на ваши даты."],
  ["Оплатите при заселении", "Наличными в тенге или картой. Предоплата через сайт не нужна."],
] as const;

const roomPhotos = [PHOTOS.dorm, PHOTOS.single, PHOTOS.privateRoom] as const;

function HomePage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <main className="pb-20 lg:pb-0">
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {RATINGS.slice(0, 2).map((r) => (
                <a
                  key={r.source}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-card"
                >
                  <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
                  <strong>{r.score}</strong>
                  <span className="text-muted-foreground">
                    / {r.scale} · {r.source}, {pluralReviews(r.count)}
                  </span>
                </a>
              ))}
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3rem]">
              Хостел и апартаменты Luxx Aparts в Алматы
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Luxx Aparts — хостел и апартаменты на улице Толе би 286/8 в Алматы. {SITE.rooms}{" "}
              номера: койко-места от {price} ₸ и отдельные комнаты, общая кухня, стиральная машина,
              Wi-Fi, круглосуточная стойка. {SITE.distanceToStation}, автовокзал Сайран на той же
              улице. Бронируйте напрямую по WhatsApp без комиссии агрегаторов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/bronirovanie">
                  Забронировать напрямую
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/nomera">Номера и цены</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                {SITE.address}, {SITE.complex}
              </span>
            </p>
          </div>
          <div className="relative">
            <Photo
              photo={PHOTOS.hero}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-photo"
              priority
            />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-background/95 px-4 py-3 shadow-card backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Койко-место</p>
              <p className="font-display text-xl font-bold">
                от {price} ₸{" "}
                <span className="text-sm font-medium text-muted-foreground">/ ночь</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {facts.map(({ icon: Icon, value, label }) => (
            <li key={label} className="bg-background px-5 py-6 lg:px-8">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 font-display text-xl font-bold">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16 lg:px-8 lg:pt-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Фото</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Как выглядит хостел?
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Капсульные койко-места со шторками, отдельные комнаты с окном, кухня, коворкинг и
            санузлы. Фото с карточки хостела, {SITE.factsUpdated}.
          </p>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.map((photo, i) => (
            <li key={photo.id} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <Photo
                photo={photo}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="h-full w-full rounded-2xl object-cover"
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Номера и цены</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Сколько стоит ночь в Luxx Aparts?
            </h2>
          </div>
          <Link
            to="/nomera"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Все номера <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Койко-место в общей комнате от {price} ₸ за ночь по данным площадок на {SITE.factsUpdated}
          . Отдельные комнаты — цену на ваши даты называет администратор. Прямое бронирование без
          комиссии.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ROOM_TYPES.map((r, i) => (
            <article
              key={r.slug}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
            >
              <Photo
                photo={roomPhotos[i] ?? PHOTOS.detail}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{r.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
                <p className="mt-4 font-semibold">{r.price}</p>
                {r.priceNote && <p className="text-xs text-muted-foreground">{r.priceNote}</p>}
                <p className="mt-3 text-sm text-muted-foreground">
                  {r.capacity} · {r.bath}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">Удобства</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Что есть в хостеле?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Общая кухня с посудой и чайником, стиральная машина, Wi-Fi, коворкинг, камера
              хранения, кондиционер и отопление. Стойка и охрана работают круглосуточно, комнаты
              звукоизолированы, у каждой кровати розетка и лампа.
            </p>
            <Photo
              photo={PHOTOS.kitchen}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {AMENITIES.map((a) => (
              <li key={a.name} className="rounded-2xl bg-background p-5 shadow-card">
                <p className="font-semibold">{a.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-primary">Расположение</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Где находится и как добраться?
            </h2>
            <p className="mt-4 text-muted-foreground">
              {SITE.address}, {SITE.complex}. Автовокзал Сайран на той же улице, метро «Сайран» в
              1,9 км. Расстояния указаны хостелом в карточке на Hostelworld.
            </p>
            <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
              {DISTANCES.map((d) => (
                <div
                  key={d.name}
                  className="flex items-baseline justify-between gap-4 px-5 py-3 text-sm"
                >
                  <dt className="text-muted-foreground">{d.name}</dt>
                  <dd className="text-right font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/kak-dobratsya"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Маршруты от вокзала и аэропорта <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe
              title="Luxx Aparts на карте: ул. Толе би 286/8, Алматы"
              src={mapEmbedUrl}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">Кому подходит</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Кому подходит Luxx Aparts?
            </h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Студентам и тем, кто приехал надолго.</strong>{" "}
                Кухня, стирка, коворкинг и условия на месяц по договорённости.
              </li>
              <li>
                <strong className="text-foreground">Командировочным на одну-три ночи.</strong>{" "}
                Отдельная комната, быстрый Wi-Fi, стол для работы.
              </li>
              <li>
                <strong className="text-foreground">Семьям и группам.</strong> Отдельные комнаты,
                общая кухня, детская площадка.
              </li>
              <li>
                <strong className="text-foreground">Транзитным гостям.</strong> Автовокзал рядом,
                камера хранения, стойка работает круглосуточно.
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Бронирование</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Как забронировать напрямую?
            </h2>
            <ol className="mt-6 space-y-4">
              {steps.map(([title, text], i) => (
                <li key={title} className="flex gap-4 rounded-2xl bg-background p-5 shadow-card">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/bronirovanie">
                  <MessageCircle />
                  Оставить заявку
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={SITE.links.booking} target="_blank" rel="noreferrer">
                  Booking
                  <ExternalLink />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Правила</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Правила заселения коротко
            </h2>
          </div>
          <Link
            to="/pravila"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Все правила <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Заезд и выезд",
              `Заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}, выезд до ${SITE.checkOut}.`,
            ],
            ["Документы", "Удостоверение личности с фото, иностранцам паспорт."],
            ["Дети", "Гости до 18 лет только с родителем или опекуном."],
            ["Не допускаются", "Вечеринки, курение в помещениях, животные."],
          ].map(([title, text]) => (
            <li key={title} className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-ink-muted">Отзывы</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                Что говорят гости?
              </h2>
            </div>
            <Link to="/otzyvy" className="inline-flex items-center gap-2 text-sm font-semibold">
              Все отзывы <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => (
              <blockquote
                key={r.author + r.date}
                className="flex flex-col rounded-3xl bg-white/5 p-6"
              >
                <p className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="size-4 fill-current" aria-hidden="true" />
                  {r.score} / {r.scale}
                </p>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">«{r.text}»</p>
                <footer className="mt-4 text-xs text-ink-muted">
                  {r.author}, {r.date} ·{" "}
                  <a href={r.url} target="_blank" rel="noreferrer" className="underline">
                    {r.source}
                  </a>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Перед поездкой</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Частые вопросы</h2>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Все вопросы <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 divide-y divide-border rounded-3xl border border-border">
          {faq.map(([q, a]) => (
            <article key={q} className="grid gap-2 p-6 md:grid-cols-[1fr_2fr] md:gap-8">
              <h3 className="font-display text-lg font-bold">{q}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
