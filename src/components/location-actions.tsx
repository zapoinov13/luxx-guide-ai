import { useRef, useState } from "react";
import { Check, Copy, MapPin, Navigation } from "lucide-react";
import { SITE, mapLinkUrl } from "@/lib/site";

export function LocationActions({
  en = false,
  compact = false,
}: {
  en?: boolean;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const text = useRef<HTMLParagraphElement>(null);
  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(`${SITE.name}, ${SITE.address}, ${SITE.complex}`);
      setStatus("copied");
    } catch {
      setStatus("manual");
    }
  };
  return (
    <div className={`location-tools${compact ? " location-tools-compact" : ""}`}>
      <div className="location-tools-actions">
        <button type="button" onClick={copy}>
          {status === "copied" ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {en
            ? status === "copied"
              ? "Copied"
              : "Copy address"
            : status === "copied"
              ? "Адрес скопирован"
              : "Скопировать адрес"}
        </button>
        <a href={mapLinkUrl} target="_blank" rel="noreferrer">
          <Navigation size={16} aria-hidden="true" />
          Google Maps
        </a>
        {!compact && (
          <a href={SITE.links.twoGis} target="_blank" rel="noreferrer">
            <MapPin size={16} aria-hidden="true" />
            2GIS
          </a>
        )}
      </div>
      <p className="location-tools-status" role="status" ref={text}>
        {status === "manual"
          ? `${en ? "Copy this address manually:" : "Скопируйте адрес вручную:"} ${SITE.address}`
          : status === "copied"
            ? en
              ? "Address copied to your clipboard."
              : "Адрес можно вставить в сообщение или приложение такси."
            : ""}
      </p>
    </div>
  );
}
