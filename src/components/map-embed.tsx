import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE, mapEmbedUrl, mapLinkUrl } from "@/lib/site";

/**
 * Карта по клику: вместо тяжёлого iframe Google Maps на первой загрузке показываем
 * карточку с адресом и ссылками на 2GIS, Яндекс и Google, а сам iframe подгружаем
 * только после нажатия «Показать карту». Экономит несколько сотен килобайт и
 * убирает сторонние скрипты из первой отрисовки (PageSpeed, LCP).
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [shown, setShown] = useState(false);
  const links = [
    ["2GIS", "2GIS", SITE.links.twoGis],
    ["Яндекс", "Яндекс Карты", SITE.links.yandexMaps],
    ["Google", "Google Карты", mapLinkUrl],
  ] as const;

  if (shown) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border">
        <iframe
          title={`Luxx Aparts на карте: ${SITE.address}`}
          src={mapEmbedUrl}
          className={`h-[320px] w-full ${className}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-secondary p-4 sm:p-5 lg:justify-between lg:rounded-3xl lg:p-6 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-card lg:size-11">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-base font-bold leading-snug text-foreground sm:text-lg lg:text-xl">
            {SITE.address}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {SITE.complex}, второй этаж
            <span className="hidden lg:inline">
              {" "}
              · {SITE.geo.lat}, {SITE.geo.lng}
            </span>
          </p>
        </div>
      </div>
      <div className="relative grid gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Button type="button" onClick={() => setShown(true)} className="w-full sm:w-auto">
          Показать карту
        </Button>
        <div className="grid grid-cols-3 gap-2 sm:flex">
          {links.map(([short, label, href]) => (
            <Button
              key={label}
              asChild
              size="sm"
              variant="outline"
              className="bg-background px-2 sm:px-3"
            >
              <a href={href} target="_blank" rel="noreferrer" title={label}>
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
                <ExternalLink className="hidden sm:block" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
