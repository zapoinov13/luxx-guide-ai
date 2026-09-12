import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Photo } from "./photo";
import { PHOTOS } from "@/lib/photos";
import { useMotionPreference } from "./use-motion-preference";

/** Real photographs float at different depths; no invented room geometry. */
export function SpatialHero({ en = false }: { en?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 24 });
  const sy = useSpring(y, { stiffness: 140, damping: 24 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width - 0.5);
    y.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };
  return (
    <a
      href="#room-explorer"
      ref={ref}
      className="spatial-hero"
      aria-label={en ? "Explore room photos" : "Рассмотреть фотографии номеров"}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div className="spatial-hero-world" style={reduced ? {} : { rotateX, rotateY }}>
        <div className="spatial-hero-shadow" />
        <div className="spatial-hero-main">
          <Photo photo={PHOTOS.reception} priority sizes="(min-width: 1024px) 48vw, 100vw" />
          <div className="spatial-hero-caption">
            <span>LUXX APARTS</span>
            <ArrowUpRight size={24} aria-hidden="true" />
          </div>
        </div>
        <div className="spatial-hero-secondary">
          <Photo photo={PHOTOS.privateRoom} sizes="(min-width: 1024px) 22vw, 45vw" />
          <span>{en ? "Your own space" : "Ваше пространство"}</span>
        </div>
        <div className="spatial-hero-tertiary">
          <Photo photo={PHOTOS.coworking} sizes="(min-width: 1024px) 15vw, 30vw" />
        </div>
        <div className="spatial-hero-invitation">
          <MoveUpRight size={24} aria-hidden="true" />
          <span>{en ? "Come a little closer" : "Загляните внутрь"}</span>
        </div>
      </motion.div>
      <span className="spatial-hero-footnote">
        {en ? "Real spaces. Before you arrive." : "Реальные пространства. Ещё до приезда."}
      </span>
    </a>
  );
}
