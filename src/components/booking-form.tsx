import { Check, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackGoal } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { SITE, whatsappWithText } from "@/lib/site";

export type BookingOption = {
  label: string;
  /** Цена за единицу (за место или за номер) или null, если по запросу. */
  price: number | null;
  /** true — цена за каждого гостя (койко-место), false — за номер целиком. */
  perBed: boolean;
};

export type BookingLabels = {
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  name: string;
  phone: string;
  comment: string;
  commentPlaceholder: string;
  estimateTitle: string;
  estimateNote: (perBed: boolean) => string;
  estimateEmpty: string;
  submit: string;
  call: string;
  sentText: string;
  sentLink: string;
  privacy: string;
  /** Текст сообщения в WhatsApp. */
  message: (f: {
    dates: string;
    guests: string;
    room: string;
    estimate: string;
    name: string;
    phone: string;
    comment: string;
  }) => string;
  nights: (n: number) => string;
};

type Props = {
  locale: Locale;
  options: readonly BookingOption[];
  /** Вариант, выбранный по умолчанию (например, из ?room=). */
  preset?: string | undefined;
  labels: BookingLabels;
};

const nightsBetween = (from: string, to: string) => {
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / 86_400_000);
};

const fieldClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function BookingForm({ locale, options, preset, labels }: Props) {
  const intl = locale === "en" ? "en-US" : "ru-RU";
  const fmt = (n: number) => n.toLocaleString(intl);
  const humanDate = (iso: string) => {
    const d = new Date(`${iso}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(d.getTime())) return iso;
    return d
      .toLocaleDateString(locale === "en" ? "en-GB" : "ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
      .replace(/\s*г\.$/, "");
  };

  const first = options[0]?.label ?? "";
  const [sent, setSent] = useState<string | null>(null);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    room: preset ?? first,
    name: "",
    phone: "",
    comment: "",
  });
  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Страница пререндерена без query, поэтому предвыбор подставляем после гидрации.
  useEffect(() => {
    if (preset) setForm((prev) => ({ ...prev, room: preset }));
  }, [preset]);

  const option = options.find((o) => o.label === form.room);
  const nights = nightsBetween(form.checkIn, form.checkOut);
  const perBed = option?.perBed ?? false;
  const units = perBed ? Math.max(1, Number(form.guests) || 1) : 1;
  const total = nights && option?.price ? nights * option.price * units : 0;
  const estimate = total
    ? `${labels.nights(nights)} × ${fmt(option?.price ?? 0)} ₸${units > 1 ? ` × ${units}` : ""} = ${fmt(total)} ₸`
    : "";

  const message = labels.message({
    dates:
      form.checkIn && form.checkOut
        ? `${humanDate(form.checkIn)} – ${humanDate(form.checkOut)}`
        : "",
    guests: form.guests,
    room: form.room,
    estimate,
    name: form.name,
    phone: form.phone,
    comment: form.comment,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = whatsappWithText(message);
    trackGoal("booking_form", { room: form.room, nights: String(nights), locale });
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="checkIn">{labels.checkIn}</Label>
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
        <Label htmlFor="checkOut">{labels.checkOut}</Label>
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
        <Label htmlFor="guests">{labels.guests}</Label>
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
        <Label htmlFor="room">{labels.room}</Label>
        <select
          id="room"
          value={form.room}
          onChange={(e) => update("room")(e.target.value)}
          className={fieldClass}
        >
          {options.map((o) => (
            <option key={o.label} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">{labels.name}</Label>
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
        <Label htmlFor="phone">{labels.phone}</Label>
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
        <Label htmlFor="comment">{labels.comment}</Label>
        <Textarea
          id="comment"
          rows={3}
          placeholder={labels.commentPlaceholder}
          value={form.comment}
          onChange={(e) => update("comment")(e.target.value)}
          className="text-base"
        />
      </div>
      <div
        className="rounded-2xl border border-border bg-secondary/60 p-4 text-sm sm:col-span-2"
        aria-live="polite"
      >
        {estimate ? (
          <>
            <p className="text-muted-foreground">{labels.estimateTitle}</p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">{estimate}</p>
            <p className="mt-1 text-muted-foreground">{labels.estimateNote(perBed)}</p>
          </>
        ) : (
          <p className="text-muted-foreground">{labels.estimateEmpty}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <Button type="submit" size="lg">
          <MessageCircle />
          {labels.submit}
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={`tel:${SITE.phoneHref}`}>
            <Phone />
            {labels.call} {SITE.phoneDisplay}
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
            {labels.sentText}{" "}
            <a href={sent} target="_blank" rel="noreferrer" className="font-semibold underline">
              {labels.sentLink}
            </a>
            .
          </span>
        </p>
      )}
      <p className="text-sm sm:col-span-2">{labels.privacy}</p>
    </form>
  );
}
