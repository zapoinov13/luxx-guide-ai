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
export function MapEmbed({ className = "h-[320px]" }: { className?: string }) {
  const [shown, setShown] = useState(false);
  const links = [
    ["2GIS", SITE.links.twoGis],
    ["Яндекс Карты", SITE.links.yandexMaps],
    ["Google Карты", mapLinkUrl],
  ] as const;

  if (shown) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border">
        <iframe
          title={`Luxx Aparts на карте: ${SITE.address}`}
          src={mapEmbedUrl}
          className={`w-full ${className}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-between gap-5 rounded-2xl border border-border bg-secondary p-5 ${className}`}
    >
      <div className="flex gap-3">
        <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-bold text-foreground">{SITE.address}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {SITE.complex}, второй этаж. Координаты {SITE.geo.lat}, {SITE.geo.lng}.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setShown(true)}>
          Показать карту
        </Button>
        {links.map(([label, href]) => (
          <Button key={label} asChild size="sm" variant="outline">
            <a href={href} target="_blank" rel="noreferrer">
              {label}
              <ExternalLink />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
