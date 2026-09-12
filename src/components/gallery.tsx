import { useRef, useState, type CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Photo, photoSrc, type PhotoRef } from "@/components/photo";
import { useMotionPreference } from "./use-motion-preference";
import "./gallery-design.css";

/** An accessible real-photo lightbox. All layout/gestures remain optional enhancements. */
export function Gallery({
  photos,
  editorial = false,
  en = false,
}: {
  photos: readonly PhotoRef[];
  editorial?: boolean;
  en?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [direction, setDirection] = useState(1);
  const [loadedId, setLoadedId] = useState("");
  const [errorId, setErrorId] = useState("");
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const reduced = useMotionPreference();
  const current = index === null ? null : (photos[index] ?? null);
  const reset = () => {
    setZoom(false);
    panX.set(0);
    panY.set(0);
  };
  const go = (next: number) => {
    setDirection(next >= (index ?? 0) ? 1 : -1);
    setIndex(((next % photos.length) + photos.length) % photos.length);
    reset();
  };
  if (photos.length === 0)
    return (
      <p className="lgv-empty">
        {en ? "Photos will be added soon." : "Фотографии появятся здесь позже."}
      </p>
    );

  return (
    <Dialog.Root
      open={current !== null}
      onOpenChange={(open) => {
        if (!open) {
          setIndex(null);
          reset();
        }
      }}
    >
      <ul className={`lgv-grid ${editorial ? "lgv-editorial" : "lgv-compact"}`}>
        {photos.map((photo, i) => (
          <li
            key={photo.id}
            style={
              {
                "--photo-ratio": Math.max(0.78, Math.min(1.6, photo.width / photo.height)),
              } as CSSProperties
            }
          >
            <button
              type="button"
              className="lgv-tile"
              aria-haspopup="dialog"
              aria-label={en ? `Open photograph ${i + 1}` : `Открыть фото: ${photo.alt}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                reset();
                setIndex(i);
              }}
            >
              <Photo
                photo={photo}
                sizes={
                  editorial
                    ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    : "(min-width: 768px) 40vw, 50vw"
                }
              />
              <span className="lgv-tile-open" aria-hidden="true">
                <Expand size={19} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog.Portal>
        <Dialog.Overlay className="lgv-overlay" />
        <Dialog.Content
          className="lgv-dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            closeButton.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              go((index ?? 0) + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          <header className="lgv-header">
            <div>
              <Dialog.Title>{en ? "Inside Luxx Aparts" : "Внутри Luxx Aparts"}</Dialog.Title>
              <Dialog.Description>
                {en ? "Real photographs of the property" : "Реальные фотографии хостела"}
              </Dialog.Description>
            </div>
            <Dialog.Close
              ref={closeButton}
              className="lgv-close"
              aria-label={en ? "Close gallery" : "Закрыть галерею"}
            >
              <X size={23} aria-hidden="true" />
            </Dialog.Close>
          </header>
          <div
            className="lgv-stage"
            ref={stage}
            data-zoom={zoom}
            onPointerDown={(event) => {
              if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
              drag.current = { x: event.clientX, y: event.clientY, px: panX.get(), py: panY.get() };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!zoom || !drag.current || !stage.current) return;
              const { width, height } = stage.current.getBoundingClientRect();
              panX.set(
                Math.max(
                  -width * 0.4,
                  Math.min(width * 0.4, drag.current.px + event.clientX - drag.current.x),
                ),
              );
              panY.set(
                Math.max(
                  -height * 0.4,
                  Math.min(height * 0.4, drag.current.py + event.clientY - drag.current.y),
                ),
              );
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onPointerUp={(event) => {
              const origin = drag.current;
              drag.current = null;
              if (!origin || zoom) return;
              const dx = event.clientX - origin.x,
                dy = event.clientY - origin.y;
              if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy))
                go((index ?? 0) + (dx < 0 ? 1 : -1));
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  className="lgv-image-wrap"
                  initial={reduced ? false : { opacity: 0, x: direction * 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? {} : { opacity: 0, x: -direction * 24 }}
                  transition={{ duration: reduced ? 0 : 0.22 }}
                >
                  <motion.img
                    src={photoSrc(current.id)}
                    alt={current.alt}
                    draggable={false}
                    className="lgv-image"
                    style={{ x: panX, y: panY, scale: zoom ? 1.8 : 1 }}
                    onLoad={() => setLoadedId(current.id)}
                    onError={() => setErrorId(current.id)}
                  />
                  {loadedId !== current.id && errorId !== current.id && (
                    <span role="status" className="lgv-load">
                      {en ? "Loading photo…" : "Загружаем фото…"}
                    </span>
                  )}
                  {errorId === current.id && (
                    <span role="alert" className="lgv-load">
                      {en
                        ? "Photo could not load. Choose another photo."
                        : "Фото не загрузилось. Выберите другой снимок."}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="lgv-arrow lgv-prev"
                  onClick={() => go((index ?? 0) - 1)}
                  aria-label={en ? "Previous photo" : "Предыдущее фото"}
                >
                  <ArrowLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="lgv-arrow lgv-next"
                  onClick={() => go((index ?? 0) + 1)}
                  aria-label={en ? "Next photo" : "Следующее фото"}
                >
                  <ArrowRight size={22} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <div className="lgv-bottom">
            <div className="lgv-caption" aria-live="polite">
              <span>
                {(index ?? 0) + 1} / {photos.length}
              </span>
              <p>{en ? `Property photograph ${(index ?? 0) + 1}` : current?.alt}</p>
            </div>
            <div className="lgv-actions">
              <button
                type="button"
                aria-pressed={zoom}
                onClick={() => {
                  panX.set(0);
                  panY.set(0);
                  setZoom(!zoom);
                }}
              >
                {zoom ? (
                  <Minus size={17} aria-hidden="true" />
                ) : (
                  <Plus size={17} aria-hidden="true" />
                )}
                {zoom ? (en ? "Fit" : "Целиком") : en ? "Zoom" : "Приблизить"}
              </button>
              <button
                type="button"
                onClick={reset}
                aria-label={en ? "Reset photo position" : "Сбросить положение фото"}
              >
                <RotateCcw size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="lgv-thumbs"
            role="group"
            aria-label={en ? "Gallery photos" : "Фотографии галереи"}
          >
            {photos.map((photo, i) => (
              <button
                type="button"
                key={photo.id}
                aria-pressed={index === i}
                aria-label={en ? `Show photo ${i + 1}` : `Показать фото ${i + 1}`}
                onClick={() => go(i)}
              >
                <Photo photo={photo} sizes="80px" />
              </button>
            ))}
          </div>
          <p className="lgv-help">
            {zoom
              ? en
                ? "Drag to explore the enlarged photo."
                : "Перетаскивайте увеличенное фото, чтобы рассмотреть детали."
              : en
                ? "Swipe or use arrow keys. Escape closes the gallery."
                : "Листайте пальцем или стрелками. Escape закрывает галерею."}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
