import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Baby,
  Backpack,
  BedDouble,
  Briefcase,
  Bus,
  Car,
  Check,
  ChevronDown,
  Clock3,
  CookingPot,
  ExternalLink,
  GraduationCap,
  Laptop,
  Lock,
  Luggage,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
  ShowerHead,
  Star,
  ThermometerSun,
  TrainFront,
  TramFront,
  Users,
  VolumeX,
  WashingMachine,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/gallery";
import { Photo } from "@/components/photo";
import { MapEmbed } from "@/components/map-embed";
import { TariffCards } from "@/components/tariff-cards";
import { GALLERY, PHOTOS } from "@/lib/photos";
import {
  AMENITIES,
  DISTANCES,
  RATINGS,
  REVIEWS,
  SITE,
  faqSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  pluralReviews,
  webSiteSchema,
  webPageSchema,
} from "@/lib/site";
import { HOME_FAQ } from "@/lib/qa";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Хостел в Алматы Luxx Aparts: койко-места от 6 000 ₸",
      `Недорогой хостел в Алматы рядом с автовокзалом Сайран: капсулы от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, отдельные номера, кухня, коворкинг, стойка 24/7. Бронируйте напрямую в WhatsApp.`,
      "/",
    ),
    scripts: jsonLd(webPageSchema("/"), hostelSchema(), webSiteSchema(), faqSchema(HOME_FAQ)),
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

const shortSource: Record<string, string> = { "Яндекс Карты": "Яндекс" };

/** Иконки транспорта для расстояний (DISTANCES.kind). */
const distanceIcons = { bus: Bus, metro: TramFront, train: TrainFront, plane: Plane } as const;

/** Иконки удобств в порядке AMENITIES из site.ts. */
const amenityIcons = [
  CookingPot,
  Wifi,
  Laptop,
  WashingMachine,
  ThermometerSun,
  VolumeX,
  Lock,
  Luggage,
  ShieldCheck,
  ShowerHead,
  Baby,
  Car,
] as const;

function HomePage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <main>
      {/* Первый экран */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-4 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-14">
          <div className="relative order-first lg:order-none">
            <Photo
              photo={PHOTOS.hero}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-photo lg:aspect-[4/3] lg:rounded-[1.75rem]"
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
                  от {price} ₸
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
                    title={`${r.source}: ${r.score} из ${r.scale}, ${pluralReviews(r.count)}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs shadow-card transition-colors hover:border-primary/40 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    <Star
                      className="size-3.5 fill-primary text-primary sm:size-4"
                      aria-hidden="true"
                    />
                    <strong>{r.score}</strong>
                    <span className="text-muted-foreground">
                      {shortSource[r.source] ?? r.source}
                      <span className="hidden 2xl:inline">, {pluralReviews(r.count)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <h1 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.1] sm:text-5xl lg:mt-5 lg:text-[2.75rem] lg:leading-[1.08] xl:text-[3rem]">
              Хостел и апартаменты <span className="whitespace-nowrap">Luxx Aparts</span> в Алматы
            </h1>
            <p className="speakable mt-3 max-w-xl text-base leading-7 text-muted-foreground lg:mt-5 lg:text-lg lg:leading-8">
              Недорогой хостел на улице Толе би 286/8
              <br />
              44 номера, капсульные койко-места 
              <br />
              от 6 000 ₸ и отдельные комнаты с окном. Бронируйте напрямую без предоплаты.
            </p>
            <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap lg:mt-7">
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
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground lg:mt-5">
              {trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground lg:mt-5">
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
            открыть крупнее.{" "}
            <Link to="/foto" className="font-semibold text-primary">
              Все 30 фото
            </Link>
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
              Сколько стоит проживание в Luxx Aparts?
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
          Койко-место в капсуле {price} ₸, одноместный номер от 10 000 ₸, двухместный 15 000 ₸ за
          номер. Для срока от недели и от месяца администратор считает индивидуально.
        </p>
        <TariffCards className="mt-6 lg:mt-8" />
        <p className="mt-4 text-sm text-muted-foreground">
          Цены актуальны на {SITE.factsUpdated}: койко-место — за место, номера — за номер целиком.
          Оплата при заселении, предоплаты нет.
        </p>
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
              Хостел с кухней, стиральной машиной и коворкингом: всё, что нужно и на одну ночь, и на
              месяц. Комнаты звукоизолированы, у каждой кровати розетка и лампа для чтения.
            </p>
            <Photo
              photo={PHOTOS.kitchen}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-6 aspect-[4/3] w-full rounded-3xl object-cover shadow-card lg:mt-8"
            />
          </div>
          <ul id="amenities" className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {AMENITIES.map((a, i) => {
              const Icon = amenityIcons[i] ?? Check;
              return (
                <li
                  key={a.name}
                  className="flex flex-col rounded-2xl bg-background p-3.5 shadow-card sm:p-4 lg:p-5"
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-primary lg:size-10">
                    <Icon className="size-[18px] lg:size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-snug sm:text-base">{a.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                    {a.detail}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Расположение */}
      <section id="location" className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm font-semibold text-primary">Расположение</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Где находится и как добраться?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Западная часть Алматы, у автовокзала Сайран: до центра около 6 км, 15–25 минут на
              такси или на метро от «Сайрана».
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-ink p-4 text-ink-foreground lg:p-5">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-bold leading-snug lg:text-xl">
                  {SITE.address}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {SITE.complex}, второй этаж. Таксисту достаточно сказать «Толе би 286/8».
                </p>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
              {DISTANCES.map((d) => {
                const Icon = distanceIcons[d.kind];
                return (
                  <li
                    key={d.name}
                    className="rounded-2xl border border-border bg-background p-3.5 lg:p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <p className="text-xs font-medium leading-tight text-muted-foreground sm:text-sm">
                        {d.name}
                      </p>
                    </div>
                    <p className="mt-2 font-display text-lg font-bold leading-none lg:text-xl">
                      {d.short}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{d.how}</p>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/kak-dobratsya"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Маршруты от вокзала и аэропорта <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <MapEmbed className="h-[300px] lg:h-[460px]" />
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
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border lg:mt-8 lg:rounded-3xl">
          {HOME_FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group px-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden sm:py-5">
                <h3 className="font-display text-base font-bold sm:text-lg">{q}</h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-transform group-open:rotate-180">
                  <ChevronDown className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-5 text-sm leading-6 text-muted-foreground sm:pr-16 sm:text-base sm:leading-7">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
