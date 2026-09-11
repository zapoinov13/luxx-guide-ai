import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { SITE, breadcrumbSchema, hostelSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    ...pageHead(
      "Контакты хостела Luxx Aparts в Алматы",
      `Телефон и WhatsApp ${SITE.phoneDisplay}, адрес ${SITE.address}. Стойка регистрации работает круглосуточно.`,
      "/kontakty",
    ),
    scripts: jsonLd(breadcrumbSchema("Контакты", "/kontakty"), hostelSchema()),
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <ContentPage
      eyebrow="Контакты"
      title="Контакты Luxx Aparts"
      intro={`Позвоните по номеру ${SITE.phoneDisplay} или напишите в WhatsApp, чтобы узнать свободные комнаты и цену на ваши даты. Адрес хостела: ${SITE.address}, ${SITE.complex}. Стойка регистрации работает круглосуточно, заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`tel:${SITE.phoneHref}`}
          className="border border-border p-7 transition-colors hover:bg-secondary"
        >
          <Phone className="size-5 text-accent-foreground" aria-hidden="true" />
          <p className="mt-6 text-sm text-muted-foreground">Телефон</p>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">
            {SITE.phoneDisplay}
          </p>
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="border border-border p-7 transition-colors hover:bg-secondary"
        >
          <MessageCircle className="size-5 text-accent-foreground" aria-hidden="true" />
          <p className="mt-6 text-sm text-muted-foreground">WhatsApp</p>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">
            Написать администратору
          </p>
        </a>
      </div>

      <div className="mt-12">
        <AnswerSection title="По какому адресу приезжать?">
          <div className="flex gap-4">
            <MapPin className="mt-1 size-5 shrink-0 text-accent-foreground" aria-hidden="true" />
            <p>
              <strong>{SITE.address}</strong>
              <br />
              {SITE.complex}, почтовый индекс {SITE.postalCode}. Хостел на втором этаже. Перед
              приездом попросите администратора подтвердить ориентир для входа или откройте{" "}
              <Link to="/kak-dobratsya">страницу «Как добраться»</Link>.
            </p>
          </div>
        </AnswerSection>

        <AnswerSection title="Когда работает стойка?">
          <div className="flex gap-4">
            <Clock3 className="mt-1 size-5 shrink-0 text-accent-foreground" aria-hidden="true" />
            <p>
              Круглосуточно, без выходных. Заезд с {SITE.checkIn.from} до {SITE.checkIn.to}, выезд
              до {SITE.checkOut}. Ночной заезд согласуйте с администратором заранее.
            </p>
          </div>
        </AnswerSection>

        <AnswerSection title="Где ещё есть Luxx Aparts?">
          <p>
            Карточка хостела есть на Booking. Тарифы и условия агрегатора могут отличаться от
            прямого бронирования.
          </p>
          <Button asChild variant="outline" className="mt-2">
            <a href={SITE.booking} target="_blank" rel="noreferrer">
              Открыть Booking
              <ExternalLink />
            </a>
          </Button>
        </AnswerSection>
      </div>
    </ContentPage>
  );
}
