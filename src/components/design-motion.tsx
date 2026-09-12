import { useEffect, useState } from "react";
import { animate, inView, motion, useScroll, useSpring } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useMotionPreference } from "./use-motion-preference";
import "./immersive-design.css";
import "./block-details.css";

/** One motion owner per element. No scroll hijacking, DOM content always remains visible. */
export function DesignMotion({ pathname, en }: { pathname: string; en: boolean }) {
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32 });

  useEffect(() => {
    if (reduced) return;
    const controls: { stop: () => void }[] = [];
    const cleanups: (() => void)[] = [];
    const heroes = document.querySelectorAll<HTMLElement>(
      ".home-hero h1, .home-hero .speakable, .home-hero .hero-explore-link, .content-hero h1, .content-hero .speakable, .photo-page-intro h1",
    );
    heroes.forEach((element, i) => {
      controls.push(
        animate(
          element,
          { opacity: [0.25, 1], y: [26, 0] },
          { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
        ),
      );
    });
    const elements = document.querySelectorAll<HTMLElement>(
      "main > section:not(.home-hero):not(.room-explorer), .rx-heading, .rx-choices, .rx-gallery, .rx-info, .answer-section, .photo-collection",
    );
    elements.forEach((element, i) => {
      cleanups.push(
        inView(
          element,
          () => {
            controls.push(
              animate(
                element,
                { opacity: [0.35, 1], y: [32, 0] },
                { duration: 0.75, delay: (i % 3) * 0.04, ease: [0.16, 1, 0.3, 1] },
              ),
            );
          },
          { margin: "0px 0px -35px 0px" },
        ),
      );
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      controls.forEach((control) => control.stop());
      [...heroes, ...elements].forEach((element) => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    };
  }, [pathname, reduced]);

  return (
    <>
      {!reduced && (
        <motion.div
          className="luxx-reading-progress"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}
      <button
        type="button"
        className="luxx-motion-control"
        aria-pressed={paused}
        aria-label={
          en
            ? paused
              ? "Enable decorative motion"
              : "Disable decorative motion"
            : paused
              ? "Включить декоративные анимации"
              : "Отключить декоративные анимации"
        }
        title={
          en ? "Turn decorative motion on or off" : "Включить или отключить декоративные анимации"
        }
        onClick={() => {
          const next = !paused;
          setPaused(next);
          document.documentElement.dataset["luxxMotion"] = next ? "off" : "on";
          window.dispatchEvent(new Event("luxx-motion-change"));
        }}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        <span>
          {en ? (paused ? "Motion off" : "Motion on") : paused ? "Анимации выкл." : "Анимации вкл."}
        </span>
      </button>
    </>
  );
}
