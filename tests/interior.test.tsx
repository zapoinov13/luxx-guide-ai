import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Gallery } from "../src/components/gallery";
import { DepthPhoto } from "../src/components/depth-photo";
import { PHOTOS, PHOTO_SECTIONS } from "../src/lib/photos";
import { readFileSync } from "node:fs";

/** SSR/markup regression coverage; visual and pointer-device QA is still required. */
describe("interior design v2", () => {
  test("all property photos remain visible in server-rendered editorial galleries", () => {
    let count = 0;
    for (const section of PHOTO_SECTIONS) {
      const html = renderToStaticMarkup(<Gallery photos={section.photos} editorial />);
      expect((html.match(/aria-haspopup="dialog"/g) ?? []).length).toBe(section.photos.length);
      for (const photo of section.photos) expect(html).toContain(`/photos/${photo.id}-1600.webp`);
      expect(html).not.toContain('class="lgv-dialog"');
      count += section.photos.length;
    }
    expect(count).toBe(30);
  });
  test("an empty photo collection is a readable state", () => {
    expect(renderToStaticMarkup(<Gallery photos={[]} />)).toContain(
      "Фотографии появятся здесь позже",
    );
  });
  test("English gallery has English accessible action labels", () => {
    const html = renderToStaticMarkup(<Gallery photos={[PHOTOS.single]} en />);
    expect(html).toContain("Open photograph 1");
  });
  test("depth photo preserves the real asset, responsive sources and alt text", () => {
    const html = renderToStaticMarkup(<DepthPhoto photo={PHOTOS.single} priority />);
    expect(html).toContain("/photos/07-1600.webp");
    expect(html).toContain("/photos/07-800.webp 800w");
    expect(html).toContain("Одноместный номер Luxx Aparts");
    expect(html).toContain('fetchPriority="high"');
  });
  test("all dynamic room pages include the tour without changing their route", () => {
    const code = readFileSync("src/routes/nomera.$type.tsx", "utf8");
    expect(code).toContain('createFileRoute("/nomera/$type")');
    expect(code).toContain("<RoomTour slug={room.slug}");
  });
  test("gallery defines explicit focus return, keyboard navigation and zoom controls", () => {
    const code = readFileSync("src/components/gallery.tsx", "utf8");
    expect(code).toContain("onCloseAutoFocus");
    expect(code).toContain("preventScroll: true");
    expect(code).toContain("ArrowRight");
    expect(code).toContain("onPointerCancel");
    expect(code).toContain("aria-pressed={zoom}");
  });
});
