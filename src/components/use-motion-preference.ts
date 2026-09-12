import { useEffect, useState } from "react";

/** SSR starts static. System preference and the visible site control share one switch. */
export function useMotionPreference() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setReduced(media.matches || document.documentElement.dataset["luxxMotion"] === "off");
    update();
    media.addEventListener("change", update);
    window.addEventListener("luxx-motion-change", update);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("luxx-motion-change", update);
    };
  }, []);
  return reduced;
}
