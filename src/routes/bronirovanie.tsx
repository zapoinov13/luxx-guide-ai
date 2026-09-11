import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { trackGoal } from "@/lib/analytics";
import { PHOTOS } from "@/lib/photos";
import {
  ROOM_TYPES,
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  whatsappWithText,
} from "@/lib/site";

type BookingSearch = { room?: string };

export const Route = createFileRoute("/bronirovanie")({
  validateSearch: (search: Record<string, unknown>): BookingSearch =>
    typeof search["room"] === "string" && ROOM_TYPES.some((r) => r.slug === search["room"])
      ? { room: search["room"] }
      : {},
  head: () => ({
    ...pageHead(
      "Забронировать хостел в Алматы напрямую — Luxx Aparts",
      `Бронирование хостела Luxx Aparts в Алматы без комиссии: заявка в WhatsApp или звонок ${SITE.phoneDisplay}. Койко-место от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, ответ круглосуточно.`,
      "/bronirovanie",
    ),
    scripts: jsonLd(breadcrumbSchema("Бронирование", "/bronirovanie"), hostelSchema()),
  }),
  component: BookingPage,
});

const roomOptions = [
  "Койко-место в общей комнате",
  "Одноместный номер",
  "Двухместный номер",
  "Пока не решил(а)",
] as const;

const humanDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

const fieldClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const roomBySlug: Record<string, string> = {
  "koyko-mesto": roomOptions[0],
  odnomestny: roomOptions[1],
  dvukhmestny: roomOptions[2],
};

function BookingPage() {
  const { room: roomSlug } = Route.useSearch();
  const [sent, setSent] = useState<string | null>(null);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    room: (roomSlug && roomBySlug[roomSlug]) || (roomOptions[0] as string),
    name: "",
    phone: "",
    comment: "",
  });

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const message = [
    "Здравствуйте! Хочу забронировать в Luxx Aparts.",
    form.checkIn && form.checkOut
      ? `Даты: с ${humanDate(form.checkIn)} по ${humanDate(form.checkOut)}.`
      : "",
    `Гостей: ${form.guests}.`,
    `Формат: ${form.room}.`,
    form.name ? `Меня зовут ${form.name}.` : "",
    form.phone ? `Телефон: ${form.phone}.` : "",
    form.comment ? `Комментарий: ${form.comment}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = whatsappWithText(message);
    trackGoal("booking_form", { room: form.room });
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ContentPage
      eyebrow="Бронирование"
      title="Забронировать хостел в Алматы напрямую"
      intro={`Заполните форму — заявка откроется готовым сообщением в WhatsApp. Администратор подтвердит места, назовёт цену на ваши даты и способ оплаты. Предоплаты нет, отвечаем круглосуточно. Быстрее позвонить: ${SITE.phoneDisplay}.`}
      photo={PHOTOS.privateRoom}
    >
      <AnswerSection title="Как отправить заявку?">
        <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="checkIn">Дата заезда</Label>
            <Input
              id="checkIn"
              type="date"
              required
              value={form.checkIn}
              onChange={(e) => update("checkIn")(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="checkOut">Дата выезда</Label>
            <Input
              id="checkOut"
              type="date"
              required
              min={form.checkIn}
              value={form.checkOut}
              onChange={(e) => update("checkOut")(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="guests">Гостей</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max="20"
              required
              value={form.guests}
              onChange={(e) => update("guests")(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="room">Формат размещения</Label>
            <select
              id="room"
              value={form.room}
              onChange={(e) => update("room")(e.target.value)}
              className={fieldClass}
            >
              {roomOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => update("name")(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+7"
              value={form.phone}
              onChange={(e) => update("phone")(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea
              id="comment"
              rows={3}
              placeholder="Например: приеду ночью, нужна комната с окном"
              value={form.comment}
              onChange={(e) => update("comment")(e.target.value)}
              className="text-base"
            />
          </div>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button type="submit" size="lg">
              <MessageCircle />
              Отправить в WhatsApp
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${SITE.phoneHref}`}>
                <Phone />
                Позвонить {SITE.phoneDisplay}
              </a>
            </Button>
          </div>
          {sent && (
            <p
              role="status"
              className="flex items-start gap-2 rounded-2xl bg-brand-soft p-4 text-sm text-foreground sm:col-span-2"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Заявка открыта в WhatsApp, осталось нажать «Отправить». Если окно не появилось,{" "}
                <a href={sent} target="_blank" rel="noreferrer" className="font-semibold underline">
                  откройте его по ссылке
                </a>
                .
              </span>
            </p>
          )}
          <p className="text-sm sm:col-span-2">
            Данные никуда не сохраняются: текст заявки открывается в вашем WhatsApp, отправляете его
            вы.
          </p>
        </form>
      </AnswerSection>

      <AnswerSection title="Почему бронировать напрямую выгоднее?">
        <ul>
          <li>Нет комиссии агрегатора.</li>
          <li>Все детали в одном чате: формат комнаты, время приезда, оплата.</li>
          <li>Ночной заезд можно согласовать сразу.</li>
        </ul>
        <p>
          Карточка хостела есть и на{" "}
          <a href={SITE.links.booking} target="_blank" rel="noreferrer">
            Booking
          </a>
          , но условия там могут отличаться.
        </p>
      </AnswerSection>

      <AnswerSection title="Какие условия отмены?">
        <p>
          При бронировании через площадки бесплатная отмена действует за сутки до заезда, при более
          поздней отмене или незаезде удерживается стоимость первой ночи. Условия прямого
          бронирования администратор подтвердит до оплаты. Оплата при заселении наличными или
          картой.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
