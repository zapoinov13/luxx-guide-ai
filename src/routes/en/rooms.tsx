import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { RoomCardsEn } from "@/components/room-cards-en";
import { Photo } from "@/components/photo";
import { PHOTOS, roomCover } from "@/lib/photos";
import { SITE, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";
import { EN, ROOM_TYPES_EN, fmtEn, hostelSchemaEn } from "@/lib/site-en";

export const Route = createFileRoute("/en/rooms")({
  head: () => ({
    ...pageHead(
      `Luxx Aparts Almaty rooms and prices: beds from ${fmtEn(SITE.priceFrom)} ₸`,
      `Hostel prices in Almaty: dorm bed ${fmtEn(SITE.priceFrom)} ₸, single room from ${fmtEn(10000)} ₸, double room ${fmtEn(15000)} ₸ per room. What is included, monthly stays, payment.`,
      "/en/rooms",
    ),
    scripts: jsonLd(
      webPageSchema("/en/rooms"),
      breadcrumbSchema("Rooms and prices", "/en/rooms"),
      hostelSchemaEn(),
    ),
  }),
  component: RoomsPageEn,
});

const PRICE_ROWS = [
  { name: "Bed in the male dorm", capacity: "1 guest", price: 6000 },
  { name: "Bed in the female dorm", capacity: "1 guest", price: 6000 },
  { name: "Single room without a window", capacity: "1 guest", price: 10000 },
  { name: "Single room with a window", capacity: "1 guest", price: 11000 },
  { name: "Double room with a window", capacity: "2 guests", price: 15000 },
] as const;

function RoomsPageEn() {
  const price = fmtEn(SITE.priceFrom);
  return (
    <ContentPage
      eyebrow="Rooms and prices"
      title="Luxx Aparts rooms and prices in Almaty"
      intro={`A stay at Luxx Aparts costs from ${price} to ${fmtEn(SITE.priceTo)} ₸ per night: a bed in the male or female dorm ${price} ₸, a single room ${fmtEn(10000)} ₸ without a window or ${fmtEn(11000)} ₸ with a window, a double room ${fmtEn(15000)} ₸ per room. ${SITE.rooms} rooms in total, the bathroom is shared on the floor. Bed linen, Wi-Fi, kitchen and laundry are included.`}
      updated={EN.factsUpdated}
      photo={PHOTOS.dorm}
    >
      <AnswerSection title="Which rooms are there and how much do they cost?">
        <RoomCardsEn className="sm:hidden" />
        <div className="hidden sm:block">
          <table>
            <thead>
              <tr>
                <th>Accommodation</th>
                <th>Capacity</th>
                <th>Bathroom</th>
                <th>Price per night</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_ROWS.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.capacity}</td>
                  <td>Shared, on the floor</td>
                  <td>
                    <strong className="whitespace-nowrap">{fmtEn(row.price)} ₸</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Rates as of {EN.factsUpdated}: a dorm bed is per person, private rooms are per room. Bed
          linen, Wi-Fi, kitchen and laundry are included.
        </p>
      </AnswerSection>

      <AnswerSection title="How do the room types differ?">
        <div className="space-y-5">
          {ROOM_TYPES_EN.map((r) => (
            <article
              key={r.slug}
              className="grid gap-0 overflow-hidden rounded-2xl border border-border sm:grid-cols-[0.8fr_1.2fr]"
            >
              <Photo
                photo={roomCover(r.slug)}
                sizes="(min-width: 640px) 30vw, 100vw"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground">{r.name}</h3>
                <p className="mt-1 text-sm">{r.short}</p>
                <p className="mt-3 font-semibold text-foreground">{r.price}</p>
                <p className="text-xs">{r.priceNote}</p>
                <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                  <li>Capacity: {r.capacity}</li>
                  <li>Bathroom: {r.bath}</li>
                  {r.includes.map((x) => (
                    <li key={x} className="flex items-center gap-1.5">
                      <Check className="size-4 text-primary" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm">Good for: {r.forWhom.toLowerCase()}.</p>
                <Link
                  to="/en/booking"
                  search={{ room: r.slug }}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Book this room
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p>
          Dorms are separate for men and women, 10–14 capsule beds each, every capsule with a
          curtain, a socket and a reading lamp. Private rooms lock with a key; single rooms come
          with or without a window, the double room has a window and a double bed.
        </p>
        <Button asChild className="mt-2">
          <Link to="/en/booking">Book now</Link>
        </Button>
      </AnswerSection>

      <AnswerSection title="What is included in the price?">
        <ul>
          <li>The bed or room you chose and bed linen.</li>
          <li>Wi-Fi throughout the hostel, coworking and a lounge with a TV.</li>
          <li>
            Shared kitchen with a stove, microwave, fridge and cookware. Tea and coffee are free.
          </li>
          <li>Washing machine, iron and ironing board.</li>
          <li>Luggage storage before check-in and after check-out.</li>
          <li>24/7 front desk and security.</li>
        </ul>
        <p>
          Towels are not included and are available at the desk for a fee. Hair dryer on request.
        </p>
      </AnswerSection>

      <AnswerSection title="How much is a month?">
        <p>
          At base rates for 30 nights: a dorm bed {fmtEn(180000)} ₸, a single room without a window{" "}
          {fmtEn(300000)} ₸, with a window {fmtEn(330000)} ₸, a double room {fmtEn(450000)} ₸. That
          is the upper limit: weekly and monthly stays are priced individually, so send your dates
          and length of stay on WhatsApp. For a month a dorm bed or a single room works best:
          kitchen, washing machine and coworking are included, and Sairan metro and bus stations are
          close.
        </p>
      </AnswerSection>

      <AnswerSection title="Are there discounts for longer stays?">
        <p>
          Yes, for stays from a week and from a month, and for students and groups. The base rates
          above are per night; tell us the length of stay and the number of guests and the desk will
          quote individually.
        </p>
      </AnswerSection>

      <AnswerSection title="How do I pay?">
        <p>
          At check-in, in cash (tenge) or by card. No prepayment. Ask when booking whether a deposit
          applies to a private room.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
