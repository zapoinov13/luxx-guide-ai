import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BookingButton } from "../booking-context";
import { Photo } from "../photo";
import { SITE } from "@/lib/site";
import {
  STOPS,
  advanceProgress,
  clampProgress,
  priceForStop,
  sceneProgress,
  stopIndex,
  stopProgress,
} from "./walkthrough-data";
import "./walkthrough.css";

const Scene = lazy(() => import("./walkthrough-scene"));
class RenderBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onFail();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
const interactive = (target: EventTarget | null) =>
  target instanceof Element &&
  !!target.closest('button,a,input,select,textarea,[role="dialog"],.wt-card');

/** Main-page progressive enhancement. The full indexable standard site stays available. */
export function Walkthrough({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sceneOnly, setSceneOnly] = useState(false);
  const [notice, setNotice] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const resume = useRef<HTMLButtonElement>(null);
  const wasActive = useRef(false);
  const current = useRef(0),
    target = useRef(0);
  const frame = useRef(0);
  const clock = useRef(0);
  const index = stopIndex(progress),
    stop = STOPS[index]!;
  const price = priceForStop(stop);

  useEffect(() => {
    const nav = navigation.current;
    const selected = nav?.querySelector<HTMLElement>('[aria-current="step"]');
    if (nav && selected)
      nav.scrollLeft =
        selected.offsetLeft - nav.offsetLeft - nav.clientWidth / 2 + selected.clientWidth / 2;
  }, [index, active]);

  const standard = useCallback(() => {
    setActive(false);
    setReady(false);
    const url = new URL(location.href);
    url.searchParams.delete("scene");
    history.replaceState(history.state, "", url);
    try {
      sessionStorage.setItem("luxx-spatial-view-v2", "standard");
    } catch {
      /* Storage optional. */
    }
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);
  const fallback = useCallback(() => {
    setNotice("Фото не загрузилось. Все разделы сайта и бронирование остаются доступны.");
    standard();
  }, [standard]);
  const onReady = useCallback(() => setReady(true), []);
  const move = useCallback((next: number) => {
    target.current = clampProgress(next);
    if (frame.current) return;
    clock.current = performance.now();
    const tick = (now: number) => {
      if (
        document.hidden ||
        document.querySelector(".booking-modal,.wt-content-dialog,.wt-photo-dialog")
      ) {
        target.current = current.current;
        frame.current = 0;
        return;
      }
      current.current = advanceProgress(
        current.current,
        target.current,
        (now - clock.current) / 1000,
      );
      clock.current = now;
      setProgress(current.current);
      if (Math.abs(current.current - target.current) > 0.00005)
        frame.current = requestAnimationFrame(tick);
      else {
        current.current = target.current;
        setProgress(target.current);
        const url = new URL(location.href);
        url.searchParams.set("scene", STOPS[stopIndex(target.current)]!.id);
        history.replaceState(history.state, "", url);
        frame.current = 0;
      }
    };
    frame.current = requestAnimationFrame(tick);
  }, []);
  const go = (i: number) => {
    const next = Math.max(0, Math.min(STOPS.length - 1, i));
    const url = new URL(location.href);
    url.searchParams.set("scene", STOPS[next]!.id);
    // Preserve TanStack's history state; scroll updates do not add history entries.
    history.pushState(history.state, "", url);
    move(stopProgress(next));
  };

  useEffect(() => {
    setMounted(true);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const url = new URL(location.href);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    let standardPreferred = false;
    try {
      standardPreferred = sessionStorage.getItem("luxx-spatial-view-v2") === "standard";
    } catch {
      /* optional */
    }
    if (
      !media.matches &&
      !connection?.saveData &&
      (url.searchParams.has("scene") || (!standardPreferred && !url.hash))
    )
      setActive(true);
    const p = sceneProgress(url.searchParams.get("scene"));
    current.current = p;
    target.current = p;
    setProgress(p);
    const change = () => {
      if (media.matches) standard();
    };
    const pop = () => {
      const next = new URL(location.href);
      if (!next.searchParams.has("scene")) standard();
      else {
        setActive(true);
        move(sceneProgress(next.searchParams.get("scene")));
      }
    };
    media.addEventListener("change", change);
    window.addEventListener("popstate", pop);
    return () => {
      media.removeEventListener("change", change);
      window.removeEventListener("popstate", pop);
      cancelAnimationFrame(frame.current);
    };
  }, [move, standard]);

  useEffect(() => {
    if (!active) {
      if (wasActive.current) resume.current?.focus({ preventScroll: true });
      wasActive.current = false;
      return;
    }
    wasActive.current = true;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = before;
    };
  }, [active]);

  useEffect(() => {
    const element = root.current;
    if (!active || !ready || !element) return;
    const blocked = () =>
      photoOpen || detailsOpen || !!document.querySelector(".booking-modal") || document.hidden;
    const wheel = (e: WheelEvent) => {
      if (e.ctrlKey || interactive(e.target) || blocked()) return;
      e.preventDefault();
      const pixels = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1);
      move(target.current + Math.max(-160, Math.min(160, pixels)) / 8000);
    };
    let touchY: number | null = null;
    const start = (e: TouchEvent) => {
      touchY =
        e.touches.length === 1 && !interactive(e.target) && !blocked()
          ? e.touches[0]!.clientY
          : null;
    };
    const touch = (e: TouchEvent) => {
      if (touchY === null || e.touches.length !== 1 || blocked()) return;
      e.preventDefault();
      const y = e.touches[0]!.clientY;
      move(target.current + Math.max(-100, Math.min(100, touchY - y)) / 2200);
      touchY = y;
    };
    const end = () => {
      touchY = null;
    };
    const key = (e: KeyboardEvent) => {
      if (interactive(e.target) || blocked() || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "Escape") {
        standard();
        return;
      }
      const delta = ["ArrowDown", "PageDown", " "].includes(e.key)
        ? 0.06
        : ["ArrowUp", "PageUp"].includes(e.key)
          ? -0.06
          : 0;
      if (delta) {
        e.preventDefault();
        move(target.current + delta);
      }
    };
    element.addEventListener("wheel", wheel, { passive: false });
    element.addEventListener("touchstart", start, { passive: true });
    element.addEventListener("touchmove", touch, { passive: false });
    element.addEventListener("touchend", end);
    element.addEventListener("touchcancel", end);
    element.addEventListener("keydown", key);
    return () => {
      element.removeEventListener("wheel", wheel);
      element.removeEventListener("touchstart", start);
      element.removeEventListener("touchmove", touch);
      element.removeEventListener("touchend", end);
      element.removeEventListener("touchcancel", end);
      element.removeEventListener("keydown", key);
    };
  }, [active, ready, move, photoOpen, detailsOpen, standard]);

  useEffect(() => {
    if (!active || !mounted || ready) return;
    const timeout = setTimeout(fallback, 12000);
    return () => clearTimeout(timeout);
  }, [active, mounted, ready, fallback]);

  const enter = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNotice("В системе включено уменьшение движения. Для вашего комфорта открыт обычный сайт.");
      return;
    }
    try {
      sessionStorage.removeItem("luxx-spatial-view-v2");
    } catch {
      /* optional */
    }
    const url = new URL(location.href);
    url.searchParams.set("scene", STOPS[0]!.id);
    history.pushState(history.state, "", url);
    current.current = 0;
    target.current = 0;
    setProgress(0);
    setActive(true);
    setReady(false);
  };

  return (
    <>
      {active && (
        <div
          ref={root}
          className="walkthrough-active wt-experience wt-spatial"
          tabIndex={-1}
          role="region"
          aria-label="Прогулка по Luxx Aparts"
          data-scene={stop.id}
          data-progress={progress.toFixed(4)}
          data-scene-only={sceneOnly}
        >
          <div className="wt-canvas">
            {!ready && <img className="wt-poster" src="/photos/03-1600.webp" alt="" />}
            {mounted && (
              <RenderBoundary onFail={fallback}>
                <Suspense fallback={null}>
                  <Scene progress={progress} onReady={onReady} onFail={fallback} />
                </Suspense>
              </RenderBoundary>
            )}
          </div>
          <div className="wt-shade" aria-hidden="true" />
          <header className="wt-top">
            <a href="/" className="wt-brand">
              LUXX<span>APARTS · ALMATY</span>
            </a>
            <div className="wt-top-actions">
              <Dialog.Root open={detailsOpen} onOpenChange={setDetailsOpen}>
                <Dialog.Trigger className="wt-link">Все разделы</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="wt-content-overlay" />
                  <Dialog.Content className="wt-content-dialog">
                    <div className="wt-content-toolbar">
                      <Dialog.Title>Luxx Aparts — номера, удобства и информация</Dialog.Title>
                      <button
                        className="wt-link"
                        onClick={() => {
                          setDetailsOpen(false);
                          standard();
                        }}
                      >
                        Обычный сайт
                      </button>
                      <Dialog.Close className="wt-book">Продолжить прогулку</Dialog.Close>
                    </div>
                    <Dialog.Description className="sr-only">
                      Весь исходный контент сайта. Закройте панель, чтобы продолжить с прежнего
                      места.
                    </Dialog.Description>
                    {children}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <button onClick={standard} className="wt-link wt-standard-action">
                Обычный сайт
              </button>
              <BookingButton className="wt-book" to="/bronirovanie">
                Забронировать
              </BookingButton>
            </div>
          </header>
          <button
            className="wt-view-toggle"
            aria-pressed={sceneOnly}
            aria-controls="walkthrough-description"
            onClick={() => setSceneOnly((value) => !value)}
          >
            {sceneOnly ? "Показать описание" : "Скрыть текст · смотреть пространство"}
          </button>
          <div id="walkthrough-description" className="wt-copy" key={stop.id} hidden={sceneOnly}>
            <p className="wt-eyebrow">
              {String(index + 1).padStart(2, "0")} / {stop.label}{" "}
              <span>· Пространственный маршрут</span>
            </p>
            <h1>{stop.title}</h1>
            <p className="wt-description">{stop.text}</p>
            {price && <p className="wt-price">{price}</p>}
            <div className="wt-actions">
              {index === 0 ? (
                <button disabled={!ready} className="wt-book" onClick={() => go(1)}>
                  {ready ? "Начать прогулку" : "Готовим первый участок…"}
                </button>
              ) : (
                <BookingButton
                  className="wt-book"
                  to="/bronirovanie"
                  search={stop.room ? { room: stop.room } : {}}
                >
                  Выбрать даты
                </BookingButton>
              )}
              {stop.id === "location" ? (
                <a
                  className="wt-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${SITE.geo.lat},${SITE.geo.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть карту
                </a>
              ) : (
                <Dialog.Root open={photoOpen} onOpenChange={setPhotoOpen}>
                  <Dialog.Trigger className="wt-link">Увеличить фото</Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="wt-photo-overlay" />
                    <Dialog.Content className="wt-photo-dialog">
                      <Dialog.Title>{stop.label} · Luxx Aparts</Dialog.Title>
                      <Dialog.Description>{stop.photo.alt}</Dialog.Description>
                      <Photo photo={stop.photo} sizes="90vw" />
                      <Dialog.Close className="wt-book">Закрыть фото</Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              )}
            </div>
          </div>
          <footer className="wt-bottom">
            <div className="wt-route-controls">
              <button
                disabled={!ready || index === 0}
                onClick={() => go(index - 1)}
                aria-label="Предыдущая зона"
              >
                Назад
              </button>
              <p>
                {ready ? "Скролл / свайп — вперёд и назад" : "Загружаем пространство"}
                <small>Глубина по реальным фото · не обмерный 3D-тур</small>
              </p>
              <button
                disabled={!ready || index === STOPS.length - 1}
                onClick={() => go(index + 1)}
                aria-label="Следующая зона"
              >
                Дальше
              </button>
            </div>
            <nav ref={navigation} aria-label="Зоны хостела">
              {STOPS.map((item, i) => (
                <button
                  key={item.id}
                  disabled={!ready}
                  onClick={() => go(i)}
                  aria-current={i === index ? "step" : undefined}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div
              className="wt-progress"
              role="progressbar"
              aria-label="Пройдено маршрута"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
          </footer>
        </div>
      )}
      <div className="wt-standard" hidden={active}>
        {notice && (
          <p className="wt-notice" role="status">
            {notice}
          </p>
        )}
        <div className="wt-resume">
          <span>Luxx Aparts — фото, номера и бронирование</span>
          <button ref={resume} onClick={enter}>
            Войти в пространственный маршрут
          </button>
        </div>
        {!active && children}
      </div>
      <noscript>
        <style>
          {
            ".wt-experience{display:none!important}.wt-standard[hidden]{display:block!important}.wt-resume{display:none!important}.site-header,.site-footer{display:block!important}"
          }
        </style>
      </noscript>
    </>
  );
}
