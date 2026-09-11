import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { tariffPhoto } from "@/lib/photos";
import { PRICE_LIST } from "@/lib/site";

/**
 * Карточки тарифов с фото: по одной на каждый вариант размещения.
 * На телефоне — фото слева, текст справа; от sm — вертикальные карточки сеткой.
 */
export function TariffCards({ className = "" }: { className?: string }) {
  return (
    <ul
      id="tariffs"
      className={`tariff-cards grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${className}`}
    >
      {PRICE_LIST.map((row) => {
        const photo = tariffPhoto(row.name, row.slug);
        return (
          <li
            key={row.name}
            className="grid grid-cols-[7.25rem_1fr] overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:grid-cols-1 sm:rounded-3xl"
          >
            <Link
              to="/nomera/$type"
              params={{ type: row.slug }}
              className="block h-full sm:h-auto"
              aria-label={row.name}
            >
              <Photo
                photo={photo}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 116px"
                className="h-full w-full object-cover sm:aspect-[4/3] sm:h-auto"
              />
            </Link>
            <div className="flex flex-col p-3.5 sm:p-5">
              <h3 className="text-sm font-semibold leading-snug sm:font-display sm:text-lg">
                <Link to="/nomera/$type" params={{ type: row.slug }} className="hover:text-primary">
                  {row.name}
                </Link>
              </h3>
              <p className="mt-1.5 font-display text-xl font-bold sm:mt-3 sm:text-2xl">
                {row.price.toLocaleString("ru-RU")} ₸
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground sm:line-clamp-none sm:text-sm sm:leading-6">
                {row.includes}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-3 w-full sm:mt-5 sm:w-auto sm:self-start"
              >
                <Link to="/bronirovanie" search={{ room: row.slug }}>
                  Забронировать
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
