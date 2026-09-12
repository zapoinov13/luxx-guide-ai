import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { tariffPhoto } from "@/lib/photos";
import { PRICE_LIST, SITE } from "@/lib/site";

/**
 * Карточки тарифов с фото: по одной на каждый вариант размещения.
 * На телефоне — фото слева, текст справа; от sm — вертикальные карточки сеткой.
 */
export function TariffCards({ className = "" }: { className?: string }) {
  return (
    <ul id="tariffs" className={`stay-rates grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {PRICE_LIST.map((row, index) => {
        const photo = tariffPhoto(row.name, row.slug);
        return (
          <li
            key={row.name}
            className="stay-rate flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
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
                className="aspect-[16/10] w-full object-cover"
              />
              <span className="rate-type">
                {row.slug === "koyko-mesto" ? "Капсула" : "Отдельный номер"}
              </span>
              <span className="rate-number">0{index + 1}</span>
            </Link>
            <div className="rate-body flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold leading-snug">
                <Link to="/nomera/$type" params={{ type: row.slug }} className="hover:text-primary">
                  {row.name}
                </Link>
              </h3>
              <div className="rate-price">
                <strong>
                  {row.price.toLocaleString("ru-RU")} <span>₸</span>
                </strong>
                <span>{row.slug === "koyko-mesto" ? "за место / ночь" : "за номер / ночь"}</span>
              </div>
              <p className="mt-4 flex-1 text-xs leading-6 text-muted-foreground">{row.includes}</p>
              <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <Check size={14} />
                Оплата при заселении
              </p>
              <Button asChild size="lg" className="mt-4 w-full justify-between">
                <Link to="/bronirovanie" search={{ room: row.slug }}>
                  Забронировать
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </li>
        );
      })}
      <li className="rate-longstay">
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
