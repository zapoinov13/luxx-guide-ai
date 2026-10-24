import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Image,
  X,
} from "lucide-react";
import { Photo } from "./photo";
import { Button } from "./ui/button";
import { ROOM_PHOTOS } from "@/lib/photos";
import "./room-tour.css";

const sharedIds = new Set(["02", "12", "13", "28"]);

/** A focused, distortion-free viewer for the property's real photographs. */
export function RoomTour({ slug, en = false }: { slug: string; en?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [zone, setZone] = useState<"room" | "shared">("room");
  const start = useRef<{ x: number; y: number } | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const photos = useMemo(() => {
    const all = ROOM_PHOTOS[slug] ?? ROOM_PHOTOS["dvukhmestny"] ?? [];
    const filtered = all.filter((photo) =>
      zone === "shared" ? sharedIds.has(photo.id) : !sharedIds.has(photo.id),
    );
    return filtered.length ? filtered : all;
  }, [slug, zone]);
  const index = ((step % photos.length) + photos.length) % photos.length;
  const current = photos[index];
  const roomPhotos = (ROOM_PHOTOS[slug] ?? ROOM_PHOTOS["dvukhmestny"] ?? []).filter(
    (photo) => !sharedIds.has(photo.id),
  );
  const roomName = en
    ? ({ "koyko-mesto": "Capsule bed", odnomestny: "Single room", dvukhmestny: "Double room" }[slug] ?? "Room")
    : ({ "koyko-mesto": "Капсульное место", odnomestny: "Одноместный номер", dvukhmestny: "Двухместный номер" }[slug] ?? "Номер");
  useEffect(() => {
    if (!open) return;
    strip.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [index, zone, open]);
  if (!current) return null;
  const go = (next: number) => {
    setStep(next);
  };
  const changeZone = (value: "room" | "shared") => {
    setZone(value);
    setStep(0);
  };
  const poster = (
    <Photo
      photo={current}
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
        }
      }}
    >
      <Dialog.Trigger asChild>
      <Button variant="ghost" className="rx-tour-trigger">
        <span className="rt-trigger-preview" aria-hidden="true">
          {roomPhotos.slice(0, 2).map((photo) => <Photo key={photo.id} photo={photo} sizes="80px" />)}
          <span><Image size={18} /></span>
        </span>
        <span>
          <strong>{en ? "Enter the room tour" : "Открыть рум-тур"}</strong>
          <small>{en ? roomName : `${roomPhotos.length} фото номера`}</small>
        </span>
        <ArrowUpRight size={25} aria-hidden="true" />
      </Button>
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
              <Dialog.Title>{roomName}</Dialog.Title>
            </div>
            <Dialog.Close asChild>
            <Button variant="ghost" size="icon" className="rt-close" aria-label={en ? "Close tour" : "Закрыть фототур"} title={en ? "Close tour" : "Закрыть фототур"}>
              <X aria-hidden="true" />
            </Button>
            </Dialog.Close>
          </header>
          <Dialog.Description className="sr-only">
            {en
              ? "Full-size, unaltered photographs of the room and shared spaces."
              : "Крупные фотографии номера и общих зон без искажений и дорисовки."}
          </Dialog.Description>
          <div className="rt-toolbar">
            <div className="rt-segment" role="group" aria-label={en ? "Spaces" : "Пространства"}>
              <Button variant="ghost"
                type="button"
                aria-pressed={zone === "room"}
                onClick={() => changeZone("room")}
              >
                {en ? "Room" : "Номер"}
              </Button>
              <Button variant="ghost"
                type="button"
                aria-pressed={zone === "shared"}
                onClick={() => changeZone("shared")}
              >
                {en ? "Shared spaces" : "Общие зоны"}
              </Button>
            </div>
            <span className="rt-count" aria-live="polite">
              {index + 1} / {photos.length}
            </span>
          </div>
          <div className="rt-viewer">
            <div
              className="rt-stage"
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
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy))
                  go(step + (dx < 0 ? 1 : -1));
              }}
            >
              <div key={current.id} className="rt-flat">
                {poster}
              </div>
              <Button variant="ghost" size="icon"
                type="button"
                className="rt-stage-arrow rt-stage-prev"
                onClick={() => go(step - 1)}
                aria-label={en ? "Previous photo" : "Предыдущее фото"}
                title={en ? "Previous photo" : "Предыдущее фото"}
              >
                <ArrowLeft size={22} />
              </Button>
              <Button variant="ghost" size="icon"
                type="button"
                className="rt-stage-arrow rt-stage-next"
                onClick={() => go(step + 1)}
                aria-label={en ? "Next photo" : "Следующее фото"}
                title={en ? "Next photo" : "Следующее фото"}
              >
                <ArrowRight size={22} />
              </Button>
            </div>
            <div className="rt-details">
              <div className="rt-caption" aria-live="polite" aria-atomic="true">
                <p>
                  {en
                    ? `${zone === "room" ? "Room" : "Shared space"} photograph`
                    : current.alt}
                </p>
              </div>
              <div
                className="rt-filmstrip"
                ref={strip}
                role="group"
                aria-label={en ? "Choose a photograph" : "Выберите фотографию"}
              >
                {photos.map((photo, n) => (
                  <Button variant="ghost"
                    type="button"
                    key={photo.id}
                    aria-label={en ? `Photo ${n + 1}` : photo.alt}
                    aria-pressed={index === n}
                    onClick={() => go(n)}
                  >
                    <Photo photo={photo} sizes="140px" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
