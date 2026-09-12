import { BookingButton } from "@/components/booking-context";
import { SectionNavigation } from "@/components/section-navigation";
import { LocationActions } from "@/components/location-actions";
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
import { RoomCardsEn } from "@/components/room-cards-en";
import { PHOTOS } from "@/lib/photos";
import {
  RATINGS,
  SITE,
  faqSchema,
  jsonLd,
  pageHead,
  webSiteSchema,
  webPageSchema,
} from "@/lib/site";
import {
  AMENITIES_EN,
  DISTANCES_EN,
  EN,
  HOME_FAQ_EN,
  fmtEn,
  hostelSchemaEn,
  pluralReviewsEn,
  sourceEn,
} from "@/lib/site-en";

export const Route = createFileRoute("/en/")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts Hostel in Almaty: beds from 6,000 ₸",
      `Budget hostel in Almaty near Sairan bus station: capsule beds from ${fmtEn(SITE.priceFrom)} ₸, private rooms, kitchen, coworking, 24/7 desk. Book directly on WhatsApp.`,
      "/en",
    ),
    scripts: jsonLd(
      webPageSchema("/en"),
      hostelSchemaEn(),
      webSiteSchema("en"),
      faqSchema(HOME_FAQ_EN),
    ),
  }),
  component: HomePageEn,
});

const facts = [
  { icon: BedDouble, value: `${SITE.rooms} rooms`, label: "dorm beds and private rooms" },
  { icon: Clock3, value: "24/7", label: "front desk and security" },
  { icon: Wifi, value: "Wi-Fi and kitchen", label: "free for every guest" },
  { icon: MapPin, value: "7 km", label: "to Almaty-2 railway station" },
] as const;

const trust = ["No prepayment", "No platform commission", "Reply around the clock"] as const;

const audiences = [
  {
    icon: GraduationCap,
    title: "Students and monthly stays",
    text: "Kitchen, laundry, coworking and individual rates for longer stays.",
  },
  {
    icon: Briefcase,
    title: "Business travellers",
    text: "A private room for one to three nights, fast Wi-Fi, a desk to work at.",
  },
  {
    icon: Users,
    title: "Families and groups",
    text: "Private rooms, shared kitchen, a playground and board games.",
  },
  {
    icon: Backpack,
    title: "Transit guests",
    text: "Bus station nearby, luggage storage, check-in and check-out at any hour.",
  },
] as const;

const steps = [
  ["Message or call us", "Dates, number of guests, room type: a dorm bed or a private room."],
  ["Get a confirmation", "The desk checks availability and quotes the price for your dates."],
  ["Pay at check-in", "In cash (tenge) or by card. No prepayment through the website."],
] as const;

const distanceIcons = { bus: Bus, metro: TramFront, train: TrainFront, plane: Plane } as const;

/** Amenity icons in the order of AMENITIES_EN. */
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

function HomePageEn() {
  const price = fmtEn(SITE.priceFrom);
  return (
    <main>
      {/* Hero */}
      <section className="home-hero bg-background">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-4 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-14">
          <SpatialHero en />

          <div className="lg:order-first">
            <ul
              className="flex flex-wrap items-center gap-2"
              aria-label="Ratings on booking platforms"
            >
              {RATINGS.slice(0, 3).map((r) => (
                <li key={r.source}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`${sourceEn(r.source)}: ${r.score.replace(",", ".")} out of ${r.scale}, ${pluralReviewsEn(r.count)}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs shadow-card transition-colors hover:border-primary/40 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    <Star
                      className="size-3.5 fill-primary text-primary sm:size-4"
                      aria-hidden="true"
                    />
                    <strong>{r.score.replace(",", ".")}</strong>
                    <span className="text-muted-foreground">
                      {r.source === "Яндекс Карты" ? "Yandex" : r.source}
                      <span className="hidden 2xl:inline">, {pluralReviewsEn(r.count)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <h1 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.1] sm:text-5xl lg:mt-5 lg:text-[2.75rem] lg:leading-[1.08] xl:text-[3rem]">
              Hostel and apartments <span className="whitespace-nowrap">Luxx Aparts</span> in Almaty
            </h1>
            <p className="speakable mt-3 max-w-xl text-base leading-7 text-muted-foreground lg:mt-5 lg:text-lg lg:leading-8">
              Budget hostel at 286/8 Tole Bi Street: {SITE.rooms} rooms, capsule dorm beds from{" "}
              {price} ₸ and private rooms with a window.
              <span className="hidden sm:inline">
                {" "}
                Shared kitchen, laundry, Wi-Fi, coworking, 24/7 front desk. {EN.distanceToStation},
                Sairan bus station on the same street.
              </span>{" "}
              Book directly on WhatsApp, no prepayment.
            </p>
            <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap lg:mt-7">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <BookingButton to="/en/booking">Book directly</BookingButton>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link to="/en/rooms">Rooms and prices</Link>
              </Button>
            </div>
            <a className="hero-explore-link" href="#room-explorer">
              Explore inside · interactive room viewer
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
                {EN.address}, {EN.complex}
              </span>
            </p>
          </div>
        </div>
      </section>

      <RoomExplorer en />
      {/* Facts */}
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

      <SectionNavigation en />
      {/* Rooms */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Rooms and prices</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              How much does a stay at Luxx Aparts cost?
            </h2>
          </div>
          <Link
            to="/en/rooms"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            All rooms
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A capsule dorm bed is {price} ₸, a single room from {fmtEn(10000)} ₸, a double room{" "}
          {fmtEn(15000)} ₸ per room. Weekly and monthly stays are priced individually by the desk.
        </p>
        <RoomCardsEn className="mt-6 lg:mt-8" />
        <p className="mt-4 text-sm text-muted-foreground">
          Prices as of {EN.factsUpdated}: a dorm bed is per person, private rooms are per room. Pay
          at check-in, no prepayment.
        </p>
      </section>

      {/* Amenities */}
      <section className="amenities-section" id="hostel-amenities">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">Amenities</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              What does the hostel offer?
            </h2>
            <p className="mt-4 text-muted-foreground">
              A hostel with a kitchen, a washing machine and coworking: everything you need for one
              night or a month. Rooms are soundproofed, every bed has a socket and a reading lamp.
            </p>
            <AmenitySpaces en />
          </div>
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {AMENITIES_EN.map((a, i) => {
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

      {/* Location */}
      <section
        id="location"
        className="home-location mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm font-semibold text-primary">Location</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Where is it and how do I get there?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Western Almaty, next to Sairan bus station: about 6 km to the centre, 15–25 minutes by
              taxi or by metro from Sairan station.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-ink p-4 text-ink-foreground lg:p-5">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-bold leading-snug lg:text-xl">
                  {EN.address}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {EN.complex}, 2nd floor. Tell the taxi driver “Tole Bi 286/8”.
                </p>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
              {DISTANCES_EN.map((d) => {
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
              to="/en/how-to-get-there"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Routes from the station and the airport{" "}
            </Link>
          </div>
          <div className="home-map">
            <MapEmbed className="h-[300px] lg:h-[460px]" />
            <LocationActions en />
          </div>
        </div>
      </section>

      {/* Who it suits + booking */}
      <section id="home-audiences" className="home-audiences bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">Who it suits</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Who is Luxx Aparts for?
            </h2>
            <p className="audience-intro">Different journeys. A place to feel at home.</p>
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
                    to={i === 0 ? "/en/booking" : i === 3 ? "/en/how-to-get-there" : "/en/rooms"}
                    className="audience-link"
                  >
                    {i === 0 ? "Plan a longer stay" : i === 3 ? "Find your way" : "Explore rooms"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="direct-booking">
            <p className="booking-eyebrow">
              <ShieldCheck size={15} aria-hidden="true" />
              DIRECT BOOKING
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              How do I book directly?
            </h2>
            <p className="booking-intro">Choose your dates. We will take care of the details.</p>
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
                <strong>No prepayment</strong>
                <span>Pay at check-in, after your booking is confirmed.</span>
              </div>
            </div>
            <div className="booking-actions mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <BookingButton to="/en/booking">
                  <MessageCircle />
                  Choose dates
                </BookingButton>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={SITE.links.booking} target="_blank" rel="noreferrer">
                  Booking.com
                  <ExternalLink />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rules in short */}
      <section id="home-rules" className="home-rules mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">House rules</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              House rules in short
            </h2>
          </div>
          <Link
            to="/en/house-rules"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            All rules
          </Link>
        </div>
        <StayRules en />
      </section>

      {/* FAQ */}
      <section id="home-faq" className="home-faq mx-auto max-w-6xl px-5 pb-12 lg:px-8 lg:pb-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Before your trip</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <Link
            to="/en/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            All questions
          </Link>
        </div>
        <QuickFaq items={HOME_FAQ_EN} en />
      </section>
    </main>
  );
}
