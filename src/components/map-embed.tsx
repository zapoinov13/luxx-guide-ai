import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, mapEmbedUrl, mapLinkUrl } from "@/lib/site";

/**
 * Карта Google с точкой хостела и ссылками на 2GIS, Яндекс и Google.
 * iframe грузится лениво (loading="lazy"): браузер запрашивает его только
 * когда блок приближается к экрану, поэтому первая отрисовка не страдает.
 */
export function MapEmbed({ className = "h-[320px]" }: { className?: string }) {
  const links = [
    ["2GIS", SITE.links.twoGis],
    ["Яндекс Карты", SITE.links.yandexMaps],
    ["Google Карты", mapLinkUrl],
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-border bg-secondary lg:rounded-3xl">
        <iframe
          title={`Luxx Aparts на карте: ${SITE.address}`}
          src={mapEmbedUrl}
          className={`block w-full ${className}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap gap-2">
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
