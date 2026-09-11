import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentPage, AnswerSection } from "@/components/content-page";
import { SITE, breadcrumbSchema, pageHead } from "@/lib/site";
export const Route = createFileRoute("/kontakty")({
  head: () => ({
    ...pageHead(
      "Контакты Luxx Aparts в Алматы",
      `Позвоните или напишите Luxx Aparts. Адрес: ${SITE.address}. Заселение 24/7.`,
      "/kontakty",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Контакты", "/kontakty")),
      },
    ],
  }),
  component: ContactsPage,
});
function ContactsPage() {
  return (
    <ContentPage
      eyebrow="Контакты"
      title="Как связаться с Luxx Aparts?"
      intro={`Позвоните по номеру ${SITE.phoneDisplay} или напишите в WhatsApp, чтобы узнать свободные комнаты и актуальную стоимость. Luxx Aparts находится по адресу: ${SITE.address}, ЖК «Каусар». Заселение доступно круглосуточно.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`tel:${SITE.phoneHref}`}
          className="border border-border p-7 transition-colors hover:bg-secondary"
        >
          <Phone className="size-5 text-primary" />
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
          <MessageCircle className="size-5 text-primary" />
          <p className="mt-6 text-sm text-muted-foreground">WhatsApp</p>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">
            Написать администратору
          </p>
        </a>
      </div>
      <AnswerSection title="По какому адресу приезжать?">
        <div className="flex gap-4">
          <MapPin className="mt-1 size-5 shrink-0 text-primary" />
          <p>
            <strong className="text-foreground">{SITE.address}</strong>
            <br />
            ЖК «Каусар», почтовый индекс {SITE.postalCode}. Перед приездом попросите администратора
            подтвердить ориентир для входа.
          </p>
        </div>
      </AnswerSection>
      <AnswerSection title="Где проверить наличие комнат?">
        <p>
          Свободные места можно уточнить напрямую по телефону или WhatsApp. Также доступна карточка
          Luxx Aparts на Booking; тарифы и условия агрегатора могут отличаться от прямого
          бронирования.
        </p>
        <Button asChild variant="outline" className="mt-5">
          <a href={SITE.booking} target="_blank" rel="noreferrer">
            Открыть Booking
            <ExternalLink />
          </a>
        </Button>
      </AnswerSection>
    </ContentPage>
  );
}
