import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { tariffPhoto } from "@/lib/photos";
import { PRICE_LIST, SITE } from "@/lib/site";

const MOBILE_NAMES: Record<string, string> = {
  "Спальное место в общем номере для мужчин": "Мужская капсула",
  "Спальное место в общем номере для женщин": "Женская капсула",
  "Одноместный номер без окна": "Одноместный без окна",
  "Одноместный номер с окном": "Одноместный с окном",
  "Двухместный номер": "Двухместный номер",
};

/** Карточки тарифов: компактный выбор на телефоне и подробное сравнение на больших экранах. */
export function TariffCards({ className = "" }: { className?: string }) {
  return (
    <ul
      id="tariffs"
      aria-label="Выберите формат проживания"
      className={`stay-rates grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 ${className}`}
    >
      {PRICE_LIST.map((row, index) => {
        const photo = tariffPhoto(row.name, row.slug);
        const isMobileWide = index === PRICE_LIST.length - 1;
        return (
          <li
            key={row.name}
            className={`stay-rate flex flex-col overflow-hidden rounded-3xl border border-border bg-card ${isMobileWide ? "rate-mobile-wide col-span-2 sm:col-span-1" : ""}`}
          >
            <Link
              to="/nomera/$type"
              params={{ type: row.slug }}
              className="rate-cover relative block overflow-hidden"
              aria-label={row.name}
            >
              <Photo
                photo={photo}
                sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 100vw"
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
              />
              <span className="rate-type">
                {row.slug === "koyko-mesto" ? "Капсула" : "Отдельный номер"}
              </span>
              <span className="rate-number">0{index + 1}</span>
            </Link>
            <div className="rate-body flex flex-1 flex-col p-3.5 sm:p-6">
              <h3 className="text-sm font-semibold leading-snug sm:text-lg">
                <Link to="/nomera/$type" params={{ type: row.slug }} className="hover:text-primary">
                  <span className="sm:hidden">{MOBILE_NAMES[row.name] ?? row.name}</span>
                  <span className="hidden sm:inline">{row.name}</span>
                </Link>
              </h3>
              <div className="rate-price">
                <strong>
                  {row.price.toLocaleString("ru-RU")} <span>₸</span>
                </strong>
                <span>{row.slug === "koyko-mesto" ? "за место / ночь" : "за номер / ночь"}</span>
              </div>
              <p className="mt-4 hidden flex-1 text-xs leading-6 text-muted-foreground sm:block">
                {row.includes}
              </p>
              <p className="mt-5 hidden items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex">
                <Check size={14} />
                Оплата при заселении
              </p>
              <Button asChild size="lg" className="mt-3 min-h-11 w-full justify-between sm:mt-4">
                <Link
                  to="/bronirovanie"
                  search={{ room: row.slug, variant: row.name }}
                  aria-label={`Выбрать: ${row.name}, ${row.price.toLocaleString("ru-RU")} ₸`}
                >
                  <span className="sm:hidden">Выбрать</span>
                  <span className="hidden sm:inline">Забронировать</span>
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </li>
        );
      })}
      <li className="rate-longstay col-span-2 sm:col-span-1">
        <CalendarDays size={32} strokeWidth={1.3} aria-hidden="true" />
        <p className="design-eyebrow">ОСТАНЬТЕСЬ ПОДОЛЬШЕ</p>
        <h3>
          Неделя в городе.
          <br />
          <em>Или целый месяц.</em>
        </h3>
        <p>
          Работайте, учитесь, знакомьтесь с Алматы. Условия длительного проживания администратор
          рассчитает под ваши даты.
        </p>
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
          Узнать условия <ArrowRight size={18} aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}
