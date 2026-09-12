import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, Layers3, Minus, Plus, X } from "lucide-react";
import { Photo } from "./photo";
import { ROOM_PHOTOS } from "@/lib/photos";
import "./room-tour.css";

/** A spatial photo gallery, not a reconstruction of the property's geometry. */
export function RoomTour({ slug, en = false }: { slug: string; en?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const photos = ROOM_PHOTOS[slug]!;
  const index = ((step % photos.length) + photos.length) % photos.length;
  const go = (next: number) => {
    setStep(next);
    setZoom(false);
  };
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setStep(0);
          setZoom(false);
        }
      }}
    >
      <Dialog.Trigger className="rx-tour-trigger">
        <Expand size={20} aria-hidden="true" />
        <span>
          <strong>{en ? "Step inside" : "Заглянуть внутрь"}</strong>
          <small>{en ? "Spatial photo tour" : "Объёмный фототур"}</small>
        </span>
        <span className="rx-tour-orbit" aria-hidden="true">
          <Layers3 size={22} />
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="rt-overlay" />
        <Dialog.Content
          className="rt-dialog"
          onKeyDown={(event) => {
            if ((event.target as HTMLElement).tagName === "INPUT") return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              go(step + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          <header className="rt-header">
            <div>
              <span className="rt-eyebrow">LUXX / INSIDE</span>
              <Dialog.Title>
                {en ? "Explore your stay" : "Примерьте своё пространство"}
              </Dialog.Title>
            </div>
            <Dialog.Close className="rt-close" aria-label={en ? "Close tour" : "Закрыть фототур"}>
              <X aria-hidden="true" />
            </Dialog.Close>
          </header>
          <Dialog.Description className="rt-disclosure">
            {en
              ? "Real room and shared-space photos in a 3D gallery. Not a 360° scan or a floor plan."
              : "Реальные фото номеров и общих зон в 3D-галерее. Не 360°-съёмка и не планировка."}
          </Dialog.Description>
          <div
            className="rt-stage"
            data-zoom={zoom}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              start.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerCancel={() => {
              start.current = null;
            }}
            onPointerUp={(event) => {
              if (!start.current) return;
              const dx = event.clientX - start.current.x;
              const dy = event.clientY - start.current.y;
              start.current = null;
              if (!zoom && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
                go(step + (dx < 0 ? 1 : -1));
            }}
          >
            <div className="rt-floor" aria-hidden="true" />
            <div className="rt-deck">
              {photos.map((photo, n) => {
                let offset = (n - index + photos.length) % photos.length;
                if (offset > photos.length / 2) offset -= photos.length;
                return (
                  <div
                    key={photo.id}
                    className="rt-slide"
                    data-position={
                      offset === 0
                        ? "active"
                        : offset === -1
                          ? "previous"
                          : offset === 1
                            ? "next"
                            : "hidden"
                    }
                    aria-hidden={offset !== 0}
                  >
                    <Photo
                      photo={photo}
                      sizes="(min-width: 900px) 70vw, 90vw"
                      priority={n === index}
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="rt-zoom"
              aria-pressed={zoom}
              onClick={() => setZoom(!zoom)}
            >
              {zoom ? (
                <Minus size={18} aria-hidden="true" />
              ) : (
                <Plus size={18} aria-hidden="true" />
              )}
              {zoom ? (en ? "Fit photo" : "Целиком") : en ? "Fill view" : "Приблизить"}
            </button>
          </div>
          <div className="rt-caption" aria-live="polite" aria-atomic="true">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <p>{en ? `Room and shared spaces · Photo ${index + 1}` : photos[index]!.alt}</p>
          </div>
          <div className="rt-controls">
            <button type="button" onClick={() => go(step - 1)}>
              {en ? "Previous" : "Назад"}
            </button>
            <div
              className="rt-stops"
              role="group"
              aria-label={en ? "Tour photos" : "Снимки фототура"}
            >
              {photos.map((photo, n) => (
                <button
                  type="button"
                  key={photo.id}
                  aria-label={`${en ? "View photo" : "Посмотреть снимок"} ${n + 1}`}
                  aria-pressed={index === n}
                  onClick={() => go(n)}
                >
                  <span>{String(n + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(step + 1)}>
              {en ? "Next" : "Далее"}
            </button>
          </div>
          <p className="rt-help">
            {en
              ? "Swipe or use the left / right keys. Close to choose dates."
              : "Листайте пальцем или клавишами влево / вправо. Закройте тур, чтобы выбрать даты."}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
