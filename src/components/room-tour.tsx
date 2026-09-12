import { Component, lazy, Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Image,
  Layers3,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { Photo } from "./photo";
import { ROOM_PHOTOS } from "@/lib/photos";
import { useMotionPreference } from "./use-motion-preference";
import "./room-tour.css";

const Scene = lazy(() => import("./room-tour-scene"));
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
const sharedIds = new Set(["02", "12", "13", "28"]);

/** Real pictures inside a virtual 3D exhibition. Never presented as 360 photography. */
export function RoomTour({ slug, en = false }: { slug: string; en?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mode, setMode] = useState<"3d" | "flat">("flat");
  const [zone, setZone] = useState<"room" | "shared">("room");
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useMotionPreference();
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
  const fail = () => {
    setFailed(true);
    setMode("flat");
  };
  const changeZone = (value: "room" | "shared") => {
    setZone(value);
    setStep(0);
    setZoom(false);
    setReady(false);
  };
  const setView = (value: "3d" | "flat") => {
    setMode(value);
    setZoom(false);
    setFailed(false);
    setReady(false);
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
          setFailed(false);
          setReady(false);
          setMode(!reduced && window.matchMedia("(min-width: 768px)").matches ? "3d" : "flat");
        }
      }}
    >
      <Dialog.Trigger className="rx-tour-trigger">
        <span className="rt-trigger-icon" aria-hidden="true">
          <Layers3 size={24} />
        </span>
        <span>
          <strong>{en ? "Enter the room tour" : "Открыть рум-тур"}</strong>
          <small>{en ? "Real photos in a 3D gallery" : "Реальные фото в 3D-пространстве"}</small>
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
              <Dialog.Title>{en ? "Take a closer look" : "Почувствуйте пространство"}</Dialog.Title>
            </div>
            <Dialog.Close className="rt-close" aria-label={en ? "Close tour" : "Закрыть фототур"}>
              <X aria-hidden="true" />
            </Dialog.Close>
          </header>
          <Dialog.Description className="rt-disclosure">
            {en
              ? "A virtual gallery of real photographs. Not a 360° scan or a reconstructed floor plan."
              : "Виртуальная галерея реальных фотографий. Не 360°-съёмка и не реконструкция планировки."}
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
            <div
              className="rt-segment"
              role="group"
              aria-label={en ? "Viewing mode" : "Режим просмотра"}
            >
              <button type="button" aria-pressed={mode === "3d"} onClick={() => setView("3d")}>
                <Layers3 size={16} aria-hidden="true" /> 3D
              </button>
              <button type="button" aria-pressed={mode === "flat"} onClick={() => setView("flat")}>
                <Image size={16} aria-hidden="true" />
                {en ? "Photos" : "Фото"}
              </button>
            </div>
          </div>
          <div
            className="rt-stage"
            data-zoom={zoom}
            data-mode={mode}
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
            {open && mode === "3d" ? (
              <>
                <SceneBoundary onError={fail}>
                  <Suspense
                    fallback={
                      <div className="rt-loading">
                        {poster}
                        <span role="status">
                          {en ? "Opening the gallery…" : "Открываем галерею…"}
                        </span>
                      </div>
                    }
                  >
                    <Scene
                      photos={photos}
                      index={index}
                      zoom={zoom}
                      reduced={reduced}
                      onFail={fail}
                      onReady={() => setReady(true)}
                    />
                  </Suspense>
                </SceneBoundary>
                {!ready && (
                  <div className="rt-loading rt-loading-overlay">
                    {poster}
                    <span role="status">
                      {en ? "Loading photographs…" : "Загружаем фотографии…"}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div key={photos[index]!.id} className="rt-flat">
                {poster}
              </div>
            )}
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
              <button
                type="button"
                onClick={() => go(0)}
                aria-label={en ? "Reset tour" : "В начало тура"}
              >
                <RotateCcw size={17} />
              </button>
            </div>
          </div>
          {failed && (
            <p className="rt-error" role="status">
              {en
                ? "3D is unavailable on this device. All photos are still available."
                : "3D недоступно на этом устройстве. Все фотографии доступны в обычном режиме."}
            </p>
          )}
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
              ? "Swipe or use arrow keys. In 3D, move your mouse to explore the depth."
              : "Листайте пальцем или стрелками. В 3D двигайте мышью, чтобы почувствовать глубину."}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
