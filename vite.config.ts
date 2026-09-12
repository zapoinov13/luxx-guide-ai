// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync, readdirSync } from "node:fs";
import { LOCALE_PATHS } from "./src/lib/i18n";
import { ROOM_TYPES, SITE_URL, pageDate } from "./src/lib/site";

const blogPosts = readdirSync("content/blog")
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const raw = readFileSync(`content/blog/${f}`, "utf8");
    const field = (name: string) =>
      new RegExp(`^${name}:\\s*(\\d{4}-\\d{2}-\\d{2})`, "m").exec(raw)?.[1];
    return { slug: f.replace(/\.md$/, ""), lastmod: field("updated") ?? field("date") };
  });

const EN_TO_RU = Object.fromEntries(Object.entries(LOCALE_PATHS).map(([ru, en]) => [en, ru]));

/** Ссылки hreflang в sitemap для страниц с русской и английской версиями. */
const alternates = (path: string) => {
  const ru = EN_TO_RU[path] ?? (LOCALE_PATHS[path] ? path : undefined);
  if (!ru) return undefined;
  const en = LOCALE_PATHS[ru]!;
  return [
    { href: `${SITE_URL}${ru}`, hreflang: "ru" },
    { href: `${SITE_URL}${en}`, hreflang: "en" },
    { href: `${SITE_URL}${ru}`, hreflang: "x-default" },
  ];
};

/** Страница для пререндера и sitemap; lastmod — дата правки из PAGE_DATES. */
const page = (
  path: string,
  priority: number,
  changefreq: "weekly" | "monthly" | "yearly",
  lastmod = pageDate(path),
) => ({ path, sitemap: { priority, changefreq, lastmod, alternateRefs: alternates(path) } });

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [
      page("/", 1, "weekly"),
      page("/nomera", 0.9, "weekly"),
      ...ROOM_TYPES.map((r) => page(`/nomera/${r.slug}`, 0.8, "monthly")),
      page("/bronirovanie", 0.9, "monthly"),
      page("/udobstva", 0.8, "monthly"),
      page("/kak-dobratsya", 0.8, "monthly"),
      page("/ryadom", 0.7, "monthly"),
      page("/otzyvy", 0.7, "monthly"),
      page("/pravila", 0.8, "monthly"),
      page("/faq", 0.8, "monthly"),
      page("/kontakty", 0.8, "monthly"),
      page("/foto", 0.6, "monthly"),
      // Английская версия (ТЗ, раздел 2): те же страницы под /en/…, hreflang выше.
      page("/en", 0.8, "weekly"),
      page("/en/rooms", 0.7, "weekly"),
      page("/en/booking", 0.7, "monthly"),
      page("/en/amenities", 0.6, "monthly"),
      page("/en/how-to-get-there", 0.6, "monthly"),
      page("/en/house-rules", 0.6, "monthly"),
      page("/en/faq", 0.6, "monthly"),
      page("/en/contacts", 0.6, "monthly"),
      page(
        "/blog",
        0.7,
        "weekly",
        blogPosts
          .map((p) => p.lastmod ?? "")
          .sort()
          .at(-1),
      ),
      page("/blog/avtor", 0.4, "yearly"),
      ...blogPosts.map((p) => page(`/blog/${p.slug}`, 0.6, "monthly", p.lastmod)),
      { path: "/blog/rss.xml", sitemap: { exclude: true } },
      { path: "/llms-full.txt", sitemap: { exclude: true } },
    ],
    // Адрес сайта задаётся в одном месте — src/lib/site.ts (SITE_URL).
    sitemap: { enabled: true, host: SITE_URL },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: false,
      // Все страницы перечислены выше явно. Без этого локальная сборка находит по ссылкам
      // /bronirovanie?room=… и кладёт их в sitemap как отдельные адреса.
      crawlLinks: false,
      filter: (page: { path: string }) => !page.path.includes("?"),
    },
  },
});
