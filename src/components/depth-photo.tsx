import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type PointerEvent } from "react";
import { Photo, type PhotoRef } from "./photo";
import { useMotionPreference } from "./use-motion-preference";
import "./interior-design.css";

/** A physical photo surface, not a reconstruction of the photographed room. */
export function DepthPhoto({
  photo,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  photo: PhotoRef;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const reduced = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 28 });
  const sy = useSpring(y, { stiffness: 150, damping: 28 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  return (
    <div
      className={`depth-photo ${className}`}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="depth-photo-back" aria-hidden="true" />
      <motion.div className="depth-photo-surface" style={reduced ? {} : { rotateX, rotateY }}>
        <Photo photo={photo} sizes={sizes} priority={priority} />
        <span className="depth-photo-edge" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
