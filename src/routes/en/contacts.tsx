import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { MapEmbed } from "@/components/map-embed";
import { SITE, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";
import { EN, hostelSchemaEn } from "@/lib/site-en";

export const Route = createFileRoute("/en/contacts")({
  head: () => ({
    ...pageHead(
      "Luxx Aparts hostel in Almaty: phone, address, WhatsApp",
      `Phone and WhatsApp ${SITE.phoneDisplay}, e-mail ${SITE.email}, address ${EN.address}. Front desk 24/7, staff speak English.`,
      "/en/contacts",
    ),
    scripts: jsonLd(
      webPageSchema("/en/contacts"),
      breadcrumbSchema("Contacts", "/en/contacts"),
      hostelSchemaEn(),
    ),
  }),
  component: ContactsPageEn,
});

const cards = [
  { icon: Phone, label: "Phone", value: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Message the desk", href: SITE.whatsapp },
  { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
] as const;

function ContactsPageEn() {
  return (
    <ContentPage
      eyebrow="Contacts"
      title="Luxx Aparts hostel contacts in Almaty"
      intro={`The fastest way to check availability and the price for your dates is WhatsApp or a call to ${SITE.phoneDisplay}. Address: ${EN.address}, ${EN.complex}. We are available 24/7.`}
      photo={PHOTOS.reception}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-2xl border border-border p-5 transition-colors hover:bg-secondary"
          >
            <Icon className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-5 text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 break-words font-display text-lg font-bold text-foreground">
              {value}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-10">
        <AnswerSection title="What is the address?">
          <div className="flex gap-4">
            <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <strong>{EN.address}</strong>
              <br />
              {EN.complex}, second floor, postcode {SITE.postalCode}. Routes from the stations and
              the airport are on the <Link to="/en/how-to-get-there">Getting here</Link> page.
            </p>
          </div>
          <MapEmbed className="h-[300px] lg:h-[360px]" />
        </AnswerSection>

        <AnswerSection title="When is the desk open?">
          <div className="flex gap-4">
            <Clock3 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              Around the clock, every day. Check-in from {SITE.checkIn.from} to {SITE.checkIn.to},
              check-out by {SITE.checkOut}; please agree a late check-in in advance. Staff speak
              Russian and English.
            </p>
          </div>
        </AnswerSection>

        <AnswerSection title="Where else can I find Luxx Aparts?">
          <p>
            The hostel is listed on maps, with photos and news on Instagram. Booking direct is
            better: the same price, no aggregator commission.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              ["2GIS", SITE.links.twoGis],
              ["Instagram", SITE.links.instagram],
              ["Yandex Maps", SITE.links.yandexMaps],
            ].map(([label, href]) => (
              <Button key={label} asChild variant="outline" size="sm">
                <a href={href} target="_blank" rel="noreferrer">
                  {label}
                  <ExternalLink />
                </a>
              </Button>
            ))}
          </div>
        </AnswerSection>
      </div>
    </ContentPage>
  );
}
