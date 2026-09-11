import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnswerSection, ContentPage } from "@/components/content-page";
import {
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  whatsappWithText,
} from "@/lib/site";

export const Route = createFileRoute("/bronirovanie")({
  head: () => ({
    ...pageHead(
      "Забронировать номер в Luxx Aparts напрямую, Алматы",
      `Прямое бронирование в хостеле Luxx Aparts: заявка в WhatsApp или звонок ${SITE.phoneDisplay}. Без комиссии агрегатора, ответ администратора круглосуточно.`,
      "/bronirovanie",
    ),
    scripts: jsonLd(breadcrumbSchema("Бронирование", "/bronirovanie"), hostelSchema()),
  }),
  component: BookingPage,
});

const roomOptions = [
  "Койко-место в общей комнате",
  "Отдельная комната",
  "Пока не решил(а)",
] as const;

const fieldClass =
  "h-11 w-full border border-input bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function BookingPage() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    room: roomOptions[0] as string,
    name: "",
    phone: "",
    comment: "",
  });

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const message = [
    "Здравствуйте! Хочу забронировать в Luxx Aparts.",
    form.checkIn && form.checkOut ? `Даты: с ${form.checkIn} по ${form.checkOut}.` : "",
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
    window.open(whatsappWithText(message), "_blank", "noopener,noreferrer");
  };

  return (
    <ContentPage
      eyebrow="Бронирование"
      title="Забронировать номер напрямую"
      intro={`Заполните форму, и заявка откроется готовым сообщением в WhatsApp администратору Luxx Aparts. Или позвоните по номеру ${SITE.phoneDisplay}: стойка отвечает круглосуточно. Администратор подтвердит свободные места, назовёт цену на ваши даты и способ оплаты. Никакой предоплаты через сайт.`}
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
          <p className="text-sm sm:col-span-2">
            Форма не отправляет данные на сервер: текст заявки открывается в вашем WhatsApp, и вы
            сами его отправляете.
          </p>
        </form>
      </AnswerSection>

      <AnswerSection title="Почему бронировать напрямую выгоднее?">
        <ul>
          <li>Без комиссии агрегатора: цену называет администратор хостела.</li>
          <li>Сразу уточняете детали: формат комнаты, время приезда, способ оплаты.</li>
          <li>Ответ круглосуточно, включая ночной заезд по договорённости.</li>
        </ul>
        <p>
          Карточка Luxx Aparts есть и на{" "}
          <a href={SITE.booking} target="_blank" rel="noreferrer">
            Booking
          </a>
          , но условия там могут отличаться от прямого бронирования.
        </p>
      </AnswerSection>

      <AnswerSection title="Какие условия отмены?">
        <p>
          Условия отмены и нужна ли предоплата зависят от дат и формата комнаты. Администратор
          подтвердит их при бронировании, до того как вы что-то оплатите.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
