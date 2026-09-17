import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { BookingForm } from "@/components/booking-form";
import { PHOTOS } from "@/lib/photos";
import { ROOM_TYPES, SITE, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";
import {
  BOOKING_LABELS_EN,
  BOOKING_OPTIONS_EN,
  BOOKING_PRESET_EN,
  fmtEn,
  hostelSchemaEn,
} from "@/lib/site-en";

type BookingSearch = { room?: string };

export const Route = createFileRoute("/en/booking")({
  validateSearch: (search: Record<string, unknown>): BookingSearch =>
    typeof search["room"] === "string" && ROOM_TYPES.some((r) => r.slug === search["room"])
      ? { room: search["room"] }
      : {},
  head: () => ({
    ...pageHead(
      "Book Luxx Aparts hostel in Almaty directly",
      `Book Luxx Aparts hostel in Almaty with no commission: send a WhatsApp request or call ${SITE.phoneDisplay}. Dorm bed ${fmtEn(SITE.priceFrom)} ₸, rooms from ${fmtEn(10000)} ₸, reply 24/7.`,
      "/en/booking",
    ),
    scripts: jsonLd(
      webPageSchema("/en/booking"),
      breadcrumbSchema("Booking", "/en/booking"),
      hostelSchemaEn(),
    ),
  }),
  component: BookingPageEn,
});

function BookingPageEn() {
  const { room } = Route.useSearch();
  return (
    <ContentPage
      eyebrow="Booking"
      title="Book Luxx Aparts hostel in Almaty directly"
      intro="Choose your dates and room type, and we will prepare a ready WhatsApp request. The desk confirms availability and the final price. No prepayment; we reply around the clock."
      photo={PHOTOS.privateRoom}
      compact
    >
      <AnswerSection title="How do I send a request?">
        <BookingForm
          locale="en"
          options={BOOKING_OPTIONS_EN}
          preset={room ? BOOKING_PRESET_EN[room] : undefined}
          labels={BOOKING_LABELS_EN}
        />
      </AnswerSection>

      <AnswerSection title="Why book directly?">
        <ul>
          <li>No platform commission.</li>
          <li>Everything in one chat: room type, arrival time, payment.</li>
          <li>A night arrival can be agreed right away.</li>
        </ul>
        <p>
          The desk quotes your dates in WhatsApp: the price is never higher than on the platforms,
          and you pay no aggregator commission.
        </p>
      </AnswerSection>

      <AnswerSection title="What is the cancellation policy?">
        <p>
          For bookings through platforms, free cancellation applies until one day before arrival;
          later cancellations and no-shows are charged the first night. For direct bookings the desk
          confirms the terms before you pay. Payment at check-in, in cash or by card.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
