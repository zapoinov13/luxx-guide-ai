import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Backpack,
  BedDouble,
  Briefcase,
  Check,
  Clock3,
  ExternalLink,
  GraduationCap,
  MapPin,
  MessageCircle,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/gallery";
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
  mapLinkUrl,
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
      `Хостел Luxx Aparts в Алматы: ${SITE.rooms} номера от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸ за ночь, кухня, стирка, стойка 24/7, Wi-Fi, ${SITE.distanceToStation}. Бронирование по WhatsApp без комиссии.`,
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

const trust = ["Без предоплаты", "Без комиссии агрегаторов", "Ответ круглосуточно"] as const;

const audiences = [
  {
    icon: GraduationCap,
    title: "Студентам и на месяц",
    text: "Кухня, стирка, коворкинг и условия на длительный срок по договорённости.",
  },
  {
    icon: Briefcase,
    title: "Командировочным",
    text: "Отдельная комната на одну-три ночи, быстрый Wi-Fi, стол для работы.",
  },
  {
    icon: Users,
    title: "Семьям и группам",
    text: "Отдельные комнаты, общая кухня, детская площадка и настольные игры.",
  },
  {
    icon: Backpack,
    title: "Транзитным гостям",
    text: "Автовокзал рядом, камера хранения, заселение и выезд в любое время суток.",
  },
] as const;

const steps = [
  ["Напишите или позвоните", "Даты, число гостей, формат: койко-место или отдельная комната."],
  ["Получите подтверждение", "Администратор проверит места и назовёт цену на ваши даты."],
  ["Оплатите при заселении", "Наличными в тенге или картой. Предоплата через сайт не нужна."],
] as const;

const roomPhotos = [PHOTOS.dorm, PHOTOS.single, PHOTOS.privateRoom] as const;

const shortSource: Record<string, string> = { "Яндекс Карты": "Яндекс" };

function HomePage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <main className="pb-20 lg:pb-0">
      {/* Первый экран */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-5 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8 lg:py-20">
          <div className="relative order-first lg:order-none">
            <Photo
              photo={PHOTOS.hero}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-photo lg:rounded-[1.75rem]"
              priority
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl bg-gradient-to-t from-black/45 to-transparent lg:rounded-b-[1.75rem]"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                  Койко-место
                </p>
                <p className="font-display text-2xl font-bold leading-none lg:text-3xl">
                  от {price} ₸ <span className="text-sm font-medium text-white/75">за ночь</span>
                </p>
              </div>
              <span className="hidden rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:inline-flex">
                Стойка 24/7
              </span>
            </div>
          </div>

          <div className="lg:order-first">
            <ul className="flex flex-wrap items-center gap-2" aria-label="Оценки на площадках">
              {RATINGS.slice(0, 3).map((r) => (
                <li key={r.source}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs shadow-card transition-colors hover:border-primary/40 sm:text-sm"
                  >
                    <Star
                      className="size-3.5 fill-primary text-primary sm:size-4"
                      aria-hidden="true"
                    />
                    <strong>{r.score}</strong>
                    <span className="text-muted-foreground">
                      <span className="sm:hidden">{shortSource[r.source] ?? r.source}</span>
                      <span className="hidden sm:inline">
                        {r.source}, {pluralReviews(r.count)}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.1] sm:text-5xl lg:mt-6 lg:text-[3rem] lg:leading-[1.08]">
              Хостел и апартаменты Luxx Aparts в Алматы
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground lg:mt-6 lg:text-lg lg:leading-8">
              Luxx Aparts — хостел и апартаменты на улице Толе би 286/8 в Алматы: {SITE.rooms}{" "}
              номера, койко-места от {price} ₸ и отдельные комнаты. Общая кухня, стирка, Wi-Fi,
              стойка работает круглосуточно. {SITE.distanceToStation}, автовокзал Сайран на той же
              улице. Бронируйте напрямую в WhatsApp.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap lg:mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/bronirovanie">
                  Забронировать напрямую
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link to="/nomera">Номера и цены</Link>
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                {SITE.address}, {SITE.complex}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Факты */}
      <section className="border-b border-border">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {facts.map(({ icon: Icon, value, label }) => (
            <li key={label} className="bg-background px-4 py-5 lg:px-8 lg:py-6">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-2 font-display text-lg font-bold lg:mt-3 lg:text-xl">{value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground lg:mt-1 lg:text-sm">{label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Галерея */}
      <section className="mx-auto max-w-6xl px-5 pt-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Фото</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Как выглядит хостел?
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Капсулы со шторками, комнаты с окном, кухня, коворкинг и санузлы. Нажмите на фото, чтобы
            открыть крупнее.
          </p>
        </div>
        <div className="mt-6 lg:mt-8">
          <Gallery photos={GALLERY} />
        </div>
      </section>

      {/* Номера */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Номера и цены</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
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
          Койко-место от {price} ₸ за ночь. Стоимость отдельных комнат зависит от дат: напишите
          даты, и администратор назовёт точную цену.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ROOM_TYPES.map((r, i) => (
            <article
              key={r.slug}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-photo"
            >
              <Photo
                photo={roomPhotos[i] ?? PHOTOS.detail}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold">{r.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
                <p className="mt-4 font-semibold">{r.price}</p>
                {r.priceNote && <p className="text-xs text-muted-foreground">{r.priceNote}</p>}
                <p className="mt-3 text-sm text-muted-foreground">
                  {r.capacity} · {r.bath}
                </p>
                <Button asChild variant="outline" className="mt-5 w-full sm:w-auto">
                  <Link to="/bronirovanie" search={{ room: r.slug }}>
                    Узнать цену на даты
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Удобства */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">Удобства</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Что есть в хостеле?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Всё для ночёвки и для работы: от кухни до коворкинга. Комнаты звукоизолированы, у
              каждой кровати розетка и лампа для чтения.
            </p>
            <Photo
              photo={PHOTOS.kitchen}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-6 aspect-[4/3] w-full rounded-3xl object-cover shadow-card lg:mt-8"
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {AMENITIES.map((a) => (
              <li key={a.name} className="rounded-2xl bg-background p-4 shadow-card lg:p-5">
                <p className="font-semibold">{a.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Расположение */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm font-semibold text-primary">Расположение</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Где находится и как добраться?
            </h2>
            <p className="mt-4 text-muted-foreground">
              {SITE.address}, {SITE.complex}, второй этаж. Автовокзал Сайран на той же улице, метро
              «Сайран» в 1,9 км.
            </p>
            <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
              {DISTANCES.map((d) => (
                <div
                  key={d.name}
                  className="flex items-baseline justify-between gap-4 px-4 py-3 text-sm lg:px-5"
                >
                  <dt className="text-muted-foreground">{d.name}</dt>
                  <dd className="text-right font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                ["2GIS", SITE.links.twoGis],
                ["Яндекс Карты", SITE.links.yandexMaps],
                ["Google Карты", mapLinkUrl],
              ].map(([label, href]) => (
                <Button key={label} asChild size="sm" variant="outline">
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                    <ExternalLink />
                  </a>
                </Button>
              ))}
            </div>
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
              className="h-[300px] w-full lg:h-full lg:min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Кому подходит + бронирование */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">Кому подходит</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Кому подходит Luxx Aparts?
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {audiences.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl bg-background p-5 shadow-card">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Бронирование</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Как забронировать напрямую?
            </h2>
            <ol className="mt-6 space-y-3">
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
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/bronirovanie">
                  <MessageCircle />
                  Оставить заявку
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={SITE.links.booking} target="_blank" rel="noreferrer">
                  Booking
                  <ExternalLink />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Правила кратко */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Правила</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
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

      {/* Отзывы */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-ink-muted">Отзывы</p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
                Что говорят гости?
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
                {RATINGS.slice(0, 4).map((r) => (
                  <li key={r.source}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="hover:text-white">
                      <strong className="text-white">{r.score}</strong> {r.source}
                    </a>
                  </li>
                ))}
              </ul>
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

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Перед поездкой</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Частые вопросы
            </h2>
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
            <article key={q} className="grid gap-2 p-5 md:grid-cols-[1fr_2fr] md:gap-8 md:p-6">
              <h3 className="font-display text-lg font-bold">{q}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
