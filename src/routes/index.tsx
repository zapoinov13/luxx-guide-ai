import { BookingButton } from "@/components/booking-context";
import { SectionNavigation } from "@/components/section-navigation";
import { LocationActions } from "@/components/location-actions";
import { ReviewBrowser } from "@/components/review-browser";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Baby,
  Backpack,
  BedDouble,
  Briefcase,
  Bus,
  Car,
  Check,
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
import { RoomExplorer } from "@/components/room-explorer";
import { SpatialHero } from "@/components/spatial-hero";
import { AmenitySpaces } from "@/components/amenity-spaces";
import { StayRules } from "@/components/stay-rules";
import { QuickFaq } from "@/components/quick-faq";
import { Photo } from "@/components/photo";
import { MapEmbed } from "@/components/map-embed";
import "@/components/home-sections.css";
import { PHOTOS } from "@/lib/photos";
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
    title: "В командировке",
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
  return (
    <main className="home-page">
      {/* Первый экран */}
      <section className="home-hero bg-background">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-4 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-14">
          <SpatialHero />

          <div className="lg:order-first">
            <p className="design-eyebrow">ХОСТЕЛ И АПАРТАМЕНТЫ / АЛМАТЫ</p>
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
              Большой город.
              <br />
              <span className="hero-serif">Ваш уютный</span>
              <br />
              маленький мир.
            </h1>
            <p className="speakable mt-3 max-w-xl text-base leading-7 text-muted-foreground lg:mt-5 lg:text-lg lg:leading-8">
              Хостел и апартаменты Luxx Aparts в Алматы.
              <br />
              44 номера, капсульные койко-места 
              <br />
              от 6 000 ₸ и отдельные комнаты с окном. Бронируйте напрямую без предоплаты.
            </p>
            <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap lg:mt-7">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <BookingButton to="/bronirovanie">Забронировать напрямую</BookingButton>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link to="/nomera">Номера и цены</Link>
              </Button>
            </div>
            <a className="hero-explore-link" href="#room-explorer">
              Заглянуть внутрь · интерактивный просмотр
            </a>
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

      <RoomExplorer />
      {/* Факты */}
      <section className="home-facts border-b border-border">
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

      <SectionNavigation />

      {/* Удобства */}
      <section className="amenities-section home-section" id="hostel-amenities">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
          <div>
            <p className="home-kicker">01 / ПОВСЕДНЕВНЫЙ КОМФОРТ</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Что есть в хостеле?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Приготовить завтрак, поработать в тишине, освежить вещи после дороги. Всё для
              привычного ритма — даже в новом городе.
            </p>
            <AmenitySpaces />
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
      <section
        id="location"
        className="home-section home-location mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="home-kicker">02 / ВСТРЕЧАЕМСЯ В АЛМАТЫ</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Где находится и как добраться?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Западная часть Алматы, у автовокзала Сайран: до центра около 6 км, 15–25 минут на
              такси или на метро от «Сайрана».
            </p>
            <div className="home-address mt-5 flex items-start gap-3 rounded-2xl bg-ink p-4 text-ink-foreground lg:p-5">
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
            <ul className="home-distances mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
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
              Маршруты от вокзала и аэропорта
            </Link>
          </div>
          <div className="home-map">
            <p>
              <MapPin size={16} aria-hidden="true" /> LUXX APARTS / АЛМАТЫ
            </p>
            <MapEmbed className="h-[300px] lg:h-[540px]" />
            <LocationActions />
          </div>
        </div>
      </section>

      {/* Кому подходит + бронирование */}
      <section className="home-section home-audiences" id="home-audiences">
        <div className="home-audiences-inner mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:px-8 lg:py-20">
          <div>
            <p className="home-kicker">03 / КАЖДОМУ — СВОЙ РИТМ</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Кому подходит Luxx Aparts?
            </h2>
            <p className="audience-intro">
              Разные планы на поездку. Одно место, где удобно быть собой.
            </p>
            <ul className="audience-cards">
              {audiences.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="audience-card">
                  <div className="audience-card-top">
                    <span className="audience-icon">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="audience-number" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link
                    to={i === 0 ? "/hostel-na-mesyac" : i === 3 ? "/kak-dobratsya" : "/nomera"}
                    className="audience-link"
                  >
                    {i === 0
                      ? "Проживание на месяц"
                      : i === 3
                        ? "Как добраться"
                        : "Подобрать номер"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="direct-booking">
            <p className="booking-eyebrow">
              <ShieldCheck size={15} aria-hidden="true" />
              НАПРЯМУЮ С ХОСТЕЛОМ
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Как забронировать напрямую?
            </h2>
            <p className="booking-intro">Выберите даты. Остальное обсудим лично.</p>
            <ol className="booking-steps">
              {steps.map(([title, text], i) => (
                <li key={title}>
                  <span className="booking-step-number">0{i + 1}</span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="booking-guarantee">
              <Check size={18} aria-hidden="true" />
              <div>
                <strong>Без предоплаты</strong>
                <span>Оплата при заселении, после подтверждения бронирования.</span>
              </div>
            </div>
            <div className="booking-actions mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <BookingButton to="/bronirovanie">
                  <MessageCircle />
                  Выбрать даты
                </BookingButton>
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
      <section
        id="home-rules"
        className="home-section home-rules mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="home-kicker">04 / ПЕРЕД ПРИЕЗДОМ</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Правила заселения коротко
            </h2>
          </div>
          <Link
            to="/pravila"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Все правила
          </Link>
        </div>
        <StayRules />
      </section>

      {/* Отзывы */}
      <section className="home-section guest-stories bg-ink text-ink-foreground" id="guest-stories">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="home-kicker">05 / ОПЫТ НАШИХ ГОСТЕЙ</p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
                Что говорят гости?
              </h2>
              <p className="stories-intro">Впечатления тех, кто уже останавливался у нас.</p>
              <ul className="platform-scores">
                {RATINGS.slice(0, 4).map((r) => (
                  <li key={r.source}>
                    <a href={r.url} target="_blank" rel="noreferrer">
                      <span className="platform-name">
                        {r.source}
                        <ExternalLink size={12} aria-hidden="true" />
                      </span>
                      <span className="platform-value">
                        <strong>{r.score}</strong>
                        <span> / {r.scale}</span>
                      </span>
                      <span className="platform-count">{pluralReviews(r.count)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/otzyvy"
              className="stories-all inline-flex items-center gap-2 text-sm font-semibold"
            >
              Все отзывы
            </Link>
          </div>
          <ReviewBrowser />
        </div>
      </section>

      {/* FAQ */}
      <section
        id="home-faq"
        className="home-section home-faq mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="home-kicker">06 / ВСЁ, ЧТО ВАЖНО ЗНАТЬ</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Частые вопросы
            </h2>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Все вопросы
          </Link>
        </div>
        <QuickFaq items={HOME_FAQ} />
      </section>
    </main>
  );
}
