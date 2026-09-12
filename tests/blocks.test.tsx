import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AmenitySpaces } from "../src/components/amenity-spaces";
import { ArrivalChecklist } from "../src/components/arrival-checklist";
import { LocationActions } from "../src/components/location-actions";
import { QuickFaq } from "../src/components/quick-faq";
import { matchesFaq } from "../src/lib/faq-search";
import { SectionNavigation } from "../src/components/section-navigation";
import { ReviewBrowser } from "../src/components/review-browser";
import { SITE, REVIEWS } from "../src/lib/site";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterContextProvider,
} from "@tanstack/react-router";

const renderAmenities = (en = false) => {
  const router = createRouter({
    routeTree: createRootRoute(),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return renderToStaticMarkup(
    <RouterContextProvider router={router}>
      <AmenitySpaces en={en} />
    </RouterContextProvider>,
  );
};

describe("block details v3", () => {
  test("amenities have three accessible tabs and three real photographs", () => {
    const html = renderAmenities();
    expect((html.match(/role="tab"/g) ?? []).length).toBe(3);
    expect((html.match(/role="tabpanel"/g) ?? []).length).toBe(3);
    for (const id of ["28", "17", "01"]) expect(html).toContain(`/photos/${id}-1600.webp`);
  });
  test("amenity controls are localized", () => {
    const html = renderAmenities(true);
    expect(html).toContain("Coworking");
    expect(html).toContain("Kitchen");
    expect(html).toContain("Lounge");
  });
  test("arrival checklist starts unchecked and does not imply a confirmed booking", () => {
    const html = renderToStaticMarkup(<ArrivalChecklist />);
    expect((html.match(/type="checkbox"/g) ?? []).length).toBe(3);
    expect(html).not.toContain('checked=""');
    expect(html).toContain("Не является подтверждением бронирования");
    expect(html).toContain("Готово 0 из 3");
  });
  test("clipboard success is never displayed before a user action", () => {
    const html = renderToStaticMarkup(<LocationActions />);
    expect(html).toContain("Скопировать адрес");
    expect(html).not.toContain("Адрес скопирован");
    expect(html).toContain(SITE.links.twoGis);
    expect(html).toContain("Google Maps");
  });
  test("FAQ search matches answer text, casing, multiple terms and ё", () => {
    expect(matchesFaq("Заезд", "Приём гостей", "ПРИЕМ")).toBe(true);
    expect(matchesFaq("Как оплатить?", "Картой при заселении", "картой заселении")).toBe(true);
    expect(matchesFaq("Кухня", "Посуда", "парковка")).toBe(false);
    expect(matchesFaq("Кухня", "Посуда", "  ")).toBe(true);
  });
  test("FAQ content remains present in SSR before filtering", () => {
    const html = renderToStaticMarkup(
      <QuickFaq
        items={[
          ["Первый вопрос", "Первый ответ"],
          ["Второй вопрос", "Второй ответ"],
        ]}
      />,
    );
    expect(html).toContain("Первый ответ");
    expect(html).toContain("Второй ответ");
    expect(html).toContain('type="search"');
  });
  test("home navigation uses existing anchors and excludes missing English review block", () => {
    const ru = renderToStaticMarkup(<SectionNavigation />);
    const en = renderToStaticMarkup(<SectionNavigation en />);
    expect(ru).toContain('href="#guest-stories"');
    expect(en).not.toContain('href="#guest-stories"');
    for (const id of ["room-explorer", "location", "home-rules", "home-faq"])
      expect(en).toContain(`href="#${id}"`);
  });
  test("review browser uses the existing review data", () => {
    const html = renderToStaticMarkup(<ReviewBrowser />);
    expect((html.match(/<blockquote/g) ?? []).length).toBe(Math.min(REVIEWS.length, 3));
    expect(html).toContain("Все площадки");
    expect(html).toContain("Отзывы по площадкам");
  });
});
