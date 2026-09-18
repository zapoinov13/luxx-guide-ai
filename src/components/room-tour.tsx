import { useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Image,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Photo } from "./photo";
import { ROOM_PHOTOS } from "@/lib/photos";
import "./room-tour.css";

const sharedIds = new Set(["02", "12", "13", "28"]);

/** A focused, distortion-free viewer for the property's real photographs. */
export function RoomTour({ slug, en = false }: { slug: string; en?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zone, setZone] = useState<"room" | "shared">("room");
  const start = useRef<{ x: number; y: number } | null>(null);
  const photos = useMemo(() => {
    const all = ROOM_PHOTOS[slug] ?? ROOM_PHOTOS["dvukhmestny"]!;
    const filtered = all.filter((photo) =>
      zone === "shared" ? sharedIds.has(photo.id) : !sharedIds.has(photo.id),
    );
    return filtered.length ? filtered : all;
  }, [slug, zone]);
  const index = ((step % photos.length) + photos.length) % photos.length;
  const go = (next: number) => {
    setStep(next);
    setZoom(false);
  };
  const changeZone = (value: "room" | "shared") => {
    setZone(value);
    setStep(0);
    setZoom(false);
  };
  const poster = (
    <Photo
      photo={photos[index]!}
      className="rt-photo"
      sizes="(min-width: 900px) 80vw, 100vw"
      priority
    />
  );
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setStep(0);
          setZone("room");
          setZoom(false);
        }
      }}
    >
      <Dialog.Trigger className="rx-tour-trigger">
        <span className="rt-trigger-icon" aria-hidden="true">
          <Image size={24} />
        </span>
        <span>
          <strong>{en ? "Enter the room tour" : "Открыть рум-тур"}</strong>
          <small>{en ? "See every detail in real photos" : "Рассмотрите номер на реальных фото"}</small>
        </span>
        <ArrowUpRight size={25} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="rt-overlay" />
        <Dialog.Content
          className="rt-dialog"
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              go(step + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          <header className="rt-header">
            <div>
              <span className="rt-brand">LUXX APARTS</span>
              <Dialog.Title>{en ? "Take a closer look" : "Рассмотрите номер подробно"}</Dialog.Title>
            </div>
            <Dialog.Close className="rt-close" aria-label={en ? "Close tour" : "Закрыть фототур"}>
              <X aria-hidden="true" />
            </Dialog.Close>
          </header>
          <Dialog.Description className="rt-disclosure">
            {en
              ? "Full-size, unaltered photographs of the room and shared spaces."
              : "Крупные фотографии номера и общих зон без искажений и дорисовки."}
          </Dialog.Description>
          <div className="rt-toolbar">
            <div className="rt-segment" role="group" aria-label={en ? "Spaces" : "Пространства"}>
              <button
                type="button"
                aria-pressed={zone === "room"}
                onClick={() => changeZone("room")}
              >
                {en ? "Room" : "Номер"}
              </button>
              <button
                type="button"
                aria-pressed={zone === "shared"}
                onClick={() => changeZone("shared")}
              >
                {en ? "Shared spaces" : "Общие зоны"}
              </button>
            </div>
            <span className="rt-count" aria-live="polite">
              {index + 1} / {photos.length}
            </span>
          </div>
          <div
            className="rt-stage"
            data-zoom={zoom}
            onPointerDown={(event) => {
              if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
              start.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerCancel={() => {
              start.current = null;
            }}
            onPointerUp={(event) => {
              const origin = start.current;
              start.current = null;
              if (!origin) return;
              const dx = event.clientX - origin.x;
              const dy = event.clientY - origin.y;
              if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) go(step + (dx < 0 ? 1 : -1));
            }}
          >
            <div key={photos[index]!.id} className="rt-flat">
              {poster}
            </div>
            <button
              type="button"
              className="rt-stage-arrow rt-stage-prev"
              onClick={() => go(step - 1)}
              aria-label={en ? "Previous photo" : "Предыдущее фото"}
            >
              <ArrowLeft size={22} />
            </button>
            <button
              type="button"
              className="rt-stage-arrow rt-stage-next"
              onClick={() => go(step + 1)}
              aria-label={en ? "Next photo" : "Следующее фото"}
            >
              <ArrowRight size={22} />
            </button>
            <div className="rt-stage-actions">
              <button type="button" onClick={() => setZoom(!zoom)} aria-pressed={zoom}>
                {zoom ? <Minus size={17} /> : <Plus size={17} />}
                {zoom ? (en ? "Fit" : "Целиком") : en ? "Closer" : "Приблизить"}
              </button>
            </div>
          </div>
          <div className="rt-caption" aria-live="polite" aria-atomic="true">
            <p>
              {en
                ? `${zone === "room" ? "Room" : "Shared space"} photo ${index + 1} of ${photos.length}`
                : photos[index]!.alt}
            </p>
          </div>
          <div
            className="rt-filmstrip"
            role="group"
            aria-label={en ? "Choose a photograph" : "Выберите фотографию"}
          >
            {photos.map((photo, n) => (
              <button
                type="button"
                key={photo.id}
                aria-label={en ? `Photo ${n + 1}` : photo.alt}
                aria-pressed={index === n}
                onClick={() => go(n)}
              >
                <Photo photo={photo} sizes="100px" />
                <span className="rt-thumb-selected" aria-hidden="true">
                  <Expand size={16} />
                </span>
              </button>
            ))}
          </div>
          <p className="rt-help">
            {en
              ? "Swipe, use the arrow keys or choose a thumbnail."
              : "Листайте пальцем, стрелками или выберите миниатюру."}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
