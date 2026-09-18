import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { RoomTour } from "../src/components/room-tour";
import { SpatialHero } from "../src/components/spatial-hero";
import { ROOM_PHOTOS } from "../src/lib/photos";

/** SSR and asset regression checks. Not a substitute for real-browser visual QA. */
describe("immersive design", () => {
  test("room tour renders a real accessible trigger without a server-side WebGL canvas", () => {
    for (const slug of Object.keys(ROOM_PHOTOS)) {
      const html = renderToStaticMarkup(<RoomTour slug={slug} />);
      expect(html).toContain("Открыть рум-тур");
      expect(html).toContain('aria-haspopup="dialog"');
      expect(html).not.toContain("<canvas");
    }
  });
  test("English tour retains localization", () => {
    expect(renderToStaticMarkup(<RoomTour slug="dvukhmestny" en />)).toContain(
      "Enter the room tour",
    );
  });
  test("spatial hero has genuine property photos and a working section link", () => {
    const html = renderToStaticMarkup(<SpatialHero />);
    expect(html).toContain('href="#room-explorer"');
    expect(html).toContain("/photos/03-1600.webp");
    expect(html).toContain("/photos/18-1600.webp");
    expect(html).toContain("/photos/01-1600.webp");
    expect(html).not.toContain("<canvas");
  });
  test("every tour texture exists in both sizes", () => {
    for (const photos of Object.values(ROOM_PHOTOS))
      for (const photo of photos) {
        expect(existsSync(`public/photos/${photo.id}-800.webp`)).toBe(true);
        expect(existsSync(`public/photos/${photo.id}-1600.webp`)).toBe(true);
      }
  });
  test("decorative asset exists and the room tour avoids distorted WebGL presentation", () => {
    expect(existsSync("public/design/luxx-key.webp")).toBe(true);
    const code = readFileSync("src/components/room-tour.tsx", "utf8");
    expect(code).not.toContain('import("./room-tour-scene")');
    expect(code).toContain("без искажений и дорисовки");
  });
  test("manual and system reduced-motion fallbacks are present", () => {
    const css = readFileSync("src/components/immersive-design.css", "utf8");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("data-luxx-motion");
  });
});
