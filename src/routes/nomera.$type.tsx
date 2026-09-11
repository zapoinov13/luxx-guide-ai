import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Check, ShowerHead, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { Gallery } from "@/components/gallery";
import { ROOM_PHOTOS } from "@/lib/photos";
import {
  ROOM_TYPES,
  SITE,
  breadcrumbsSchema,
  faqSchema,
  getRoomType,
  hotelRoomSchema,
  jsonLd,
  pageHead,
} from "@/lib/site";

export const Route = createFileRoute("/nomera/$type")({
  loader: ({ params }) => {
    const room = getRoomType(params.type);
    if (!room) throw notFound();
    return room;
  },
  head: ({ loaderData: room }) => {
    if (!room) return {};
    const photos = ROOM_PHOTOS[room.slug] ?? [];
    return {
      ...pageHead(room.title, room.description, `/nomera/${room.slug}`, {
        ...(photos[0] ? { image: `/photos/${photos[0].id}-1600.webp` } : {}),
      }),
      scripts: jsonLd(
        breadcrumbsSchema([
          ["Номера и цены", "/nomera"],
          [room.name, `/nomera/${room.slug}`],
        ]),
        hotelRoomSchema(
          room,
          photos.map((ph) => ph.id),
        ),
        faqSchema(room.details),
      ),
    };
  },
  component: RoomTypePage,
});

function RoomTypePage() {
  const room = Route.useLoaderData();
  const photos = ROOM_PHOTOS[room.slug] ?? [];
  const others = ROOM_TYPES.filter((r) => r.slug !== room.slug);
  const specs = [
    { icon: Users, label: "Вместимость", value: room.capacity },
    { icon: BedDouble, label: "Кровать", value: room.beds },
    { icon: ShowerHead, label: "Санузел", value: room.bath },
  ] as const;

  return (
    <ContentPage
      eyebrow={room.name}
      crumbs={[["Номера и цены", "/nomera"]]}
      title={room.name}
      intro={room.intro}
      updated={SITE.factsUpdated}
      photo={photos[0]}
    >
      <AnswerSection title="Сколько стоит и что входит?">
        <div className="rounded-2xl border border-border bg-secondary/60 p-5">
          <p className="font-display text-2xl font-bold text-foreground">{room.price}</p>
          {room.priceNote && <p className="mt-1 text-sm">{room.priceNote}</p>}
          {room.variants.length > 1 && (
            <ul className="mt-3 list-none grid gap-1 p-0 text-sm">
              {room.variants.map((v) => (
                <li key={v.name} className="flex justify-between gap-4">
                  <span>{v.name}</span>
                  <strong className="text-foreground">{v.price.toLocaleString("ru-RU")} ₸</strong>
                </li>
              ))}
            </ul>
          )}
          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm font-semibold text-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <ul>
          {room.includes.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
        <p>Кому подходит: {room.forWhom.toLowerCase()}.</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/bronirovanie" search={{ room: room.slug }}>
              Забронировать
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`tel:${SITE.phoneHref}`}>Позвонить {SITE.phoneDisplay}</a>
          </Button>
        </div>
      </AnswerSection>

      <AnswerSection title="Как выглядит номер?">
        <Gallery photos={photos} />
        <p>Фото с карточки хостела на Hostelworld, {SITE.factsUpdated}.</p>
      </AnswerSection>

      <QaList items={room.details} />

      <AnswerSection title="Какие ещё есть форматы?">
        <ul>
          {others.map((r) => (
            <li key={r.slug}>
              <Link to="/nomera/$type" params={{ type: r.slug }}>
                {r.name}
              </Link>
              : {r.short.toLowerCase()}, {r.price}.
            </li>
          ))}
        </ul>
        <p>
          <Link to="/nomera">Все номера и цены</Link>
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
