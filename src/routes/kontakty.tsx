import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { MapEmbed } from "@/components/map-embed";
import { SITE, breadcrumbSchema, hostelSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    ...pageHead(
      "Контакты хостела Luxx Aparts в Алматы: телефон, адрес",
      `Телефон и WhatsApp ${SITE.phoneDisplay}, e-mail ${SITE.email}, адрес ${SITE.address}. Стойка регистрации работает круглосуточно.`,
      "/kontakty",
    ),
    scripts: jsonLd(
      webPageSchema("/kontakty"),
      breadcrumbSchema("Контакты", "/kontakty"),
      hostelSchema(),
    ),
  }),
  component: ContactsPage,
});

const cards = [
  { icon: Phone, label: "Телефон", value: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Написать администратору", href: SITE.whatsapp },
  { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
] as const;

function ContactsPage() {
  return (
    <ContentPage
      eyebrow="Контакты"
      title="Контакты хостела Luxx Aparts в Алматы"
      intro={`Свободные места и цену на ваши даты быстрее всего узнать в WhatsApp или по телефону ${SITE.phoneDisplay}. Адрес: ${SITE.address}, ${SITE.complex}. На связи круглосуточно.`}
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
        <AnswerSection title="По какому адресу приезжать?">
          <div className="flex gap-4">
            <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <strong>{SITE.address}</strong>
              <br />
              {SITE.complex}, второй этаж, индекс {SITE.postalCode}. Маршруты от вокзалов и
              аэропорта — на странице <Link to="/kak-dobratsya">«Как добраться»</Link>.
            </p>
          </div>
          <MapEmbed className="h-[300px] lg:h-[360px]" />
        </AnswerSection>

        <AnswerSection title="Когда работает стойка?">
          <div className="flex gap-4">
            <Clock3 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              Круглосуточно, без выходных. Заезд с {SITE.checkIn.from} до {SITE.checkIn.to}, выезд
              до {SITE.checkOut}; поздний заезд согласуйте заранее. Персонал говорит по-русски и
              по-английски.
            </p>
          </div>
        </AnswerSection>

        <AnswerSection title="Где ещё есть Luxx Aparts?">
          <p>
            Карточки хостела на картах и площадках бронирования, фото и новости — в Instagram. Цены
            и условия на площадках могут отличаться от прямых.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              ["2GIS", SITE.links.twoGis],
              ["Instagram", SITE.links.instagram],
              ["Яндекс Карты", SITE.links.yandexMaps],
              ["Booking", SITE.links.booking],
              ["Hostelworld", SITE.links.hostelworld],
              ["Ostrovok", SITE.links.ostrovok],
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
