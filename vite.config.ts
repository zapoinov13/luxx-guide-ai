// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import type { Plugin } from "vite";
import { LOCALE_PATHS } from "./src/lib/i18n";
import { PHOTOS, PHOTO_SECTIONS, ROOM_PHOTOS } from "./src/lib/photos";
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

/** Картинки страницы для sitemap (image:image): поиск по картинкам и карточки в ИИ-ответах. */
const images = (photos: readonly { id: string; alt: string }[]) =>
  [...new Map(photos.map((p) => [p.id, p])).values()].map((p) => ({
    loc: `${SITE_URL}/photos/${p.id}-1600.webp`,
    title: p.alt,
  }));

const HOME_IMAGES = images([PHOTOS.hero, PHOTOS.dorm, PHOTOS.privateRoom, PHOTOS.kitchen]);
const ROOMS_IMAGES = images(Object.values(ROOM_PHOTOS).map((list) => list[0]!));
const ALL_IMAGES = images(PHOTO_SECTIONS.flatMap((s) => s.photos));

/** Страница для пререндера и sitemap; lastmod — дата правки из PAGE_DATES. */
const page = (
  path: string,
  priority: number,
  changefreq: "weekly" | "monthly" | "yearly",
  lastmod = pageDate(path),
  pageImages?: ReturnType<typeof images>,
) => ({
  path,
  sitemap: {
    priority,
    changefreq,
    lastmod,
    alternateRefs: alternates(path),
    ...(pageImages?.length ? { images: pageImages } : {}),
  },
});

/**
 * @lovable.dev/vite-tanstack-config подставляет свой hooks.compiled, и при слиянии
 * конфигов он вытесняет хук пресета Nitro. Из-за этого на Vercel не появлялись
 * .vercel/output/config.json и .vc-config.json (сайт отдавал 404), а для Cloudflare
 * не писался wrangler.json. Здесь хуки пресета вызываются вручную из слоёв c12.
 */
let presetCompiledRunning = false;
const presetCompiled = async (nitro: {
  options: { _c12?: { layers?: { config?: { hooks?: { compiled?: unknown } } }[] } };
}) => {
  // Первый слой c12 — этот же конфиг с обёрткой Lovable, которая снова вызовет нас: не зацикливаемся.
  if (presetCompiledRunning) return;
  presetCompiledRunning = true;
  try {
    for (const layer of nitro.options._c12?.layers ?? []) {
      const hook = layer.config?.hooks?.compiled;
      if (typeof hook === "function") await hook(nitro);
    }
  } finally {
    presetCompiledRunning = false;
  }
};

/**
 * Правила для Vercel (config.json, раздел routes), идут раньше раздачи файлов:
 * один канонический адрес (ТЗ, раздел 10). Адреса *.vercel.app, хвостовой слеш
 * и index.html отдают 308 на https://luxx-aparts.kz без дублей в индексе.
 */
const HOST = new URL(SITE_URL).host;
const vercelRoutes = [
  {
    src: "/(?<path>.*)",
    has: [{ type: "host", value: "(.*)\\.vercel\\.app" }],
    status: 308,
    headers: { Location: `${SITE_URL}/$path` },
  },
  { src: "/(?<path>.+)/index\\.html", status: 308, headers: { Location: "/$path" } },
  { src: "/index\\.html", status: 308, headers: { Location: "/" } },
  { src: "/(?<path>.+)/", status: 308, headers: { Location: "/$path" } },
];

/** Тип опции nitro у Lovable не описывает hooks и vercel, хотя в рантайме они уходят в Nitro как есть. */
const nitroOptions = {
  hooks: { compiled: presetCompiled },
  vercel: { config: { routes: vercelRoutes } },
} as unknown as { preset?: string };
void HOST;

/**
 * Две правки в готовом sitemap.xml:
 * 1) TanStack пишет пространство имён как https://www.sitemaps.org/... — в стандарте
 *    оно всегда http://www.sitemaps.org/schemas/sitemap/0.9, иначе Google и Яндекс
 *    отклоняют файл («неподдерживаемый формат»);
 * 2) картинки пишутся без объявления xmlns:image (unbound prefix) и с пустым xmlns="".
 * Хук идёт после buildApp TanStack.
 */
const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

const fixSitemapFile = (file: string) => {
  if (!existsSync(file)) return false;
  const xml = readFileSync(file, "utf8");
  let out = xml
    .replace(/https:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9/g, SITEMAP_NS)
    .replace(/<image:image xmlns="">/g, "<image:image>");
  if (out.includes("<image:image") && !out.includes("xmlns:image=")) {
    out = out.replace(
      `<urlset xmlns="${SITEMAP_NS}"`,
      `<urlset xmlns="${SITEMAP_NS}" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`,
    );
  }
  if (out === xml) return false;
  writeFileSync(file, out);
  console.log(`[sitemap] Fixed namespaces in ${file}`);
  return true;
};

const SITEMAP_FILES = [".vercel/output/static", ".output/public", "dist/client"].map(
  (dir) => `${dir}/sitemap.xml`,
);

const fixSitemapNamespaces = (): Plugin => ({
  name: "luxx-fix-sitemap-namespaces",
  apply: "build",
  configResolved() {
    // TanStack пишет sitemap в своём buildApp; на случай, если наш buildApp отработает
    // раньше него, повторяем правку перед завершением процесса сборки.
    process.once("beforeExit", () => SITEMAP_FILES.forEach(fixSitemapFile));
  },
  buildApp: {
    order: "post",
    async handler() {
      SITEMAP_FILES.forEach(fixSitemapFile);
    },
  },
});

export default defineConfig({
  nitro: nitroOptions,
  vite: { plugins: [fixSitemapNamespaces()] },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [
      page("/", 1, "weekly", undefined, HOME_IMAGES),
      page("/nomera", 0.9, "weekly", undefined, ROOMS_IMAGES),
      ...ROOM_TYPES.map((r) =>
        page(`/nomera/${r.slug}`, 0.8, "monthly", undefined, images(ROOM_PHOTOS[r.slug] ?? [])),
      ),
      page("/hostel-ryadom-s-avtovokzalom-sayran", 0.7, "monthly"),
      page("/hostel-na-mesyac", 0.7, "monthly"),
      page("/hostel-posutochno-v-almaty", 0.8, "monthly"),
      page("/bronirovanie", 0.9, "monthly"),
      page("/udobstva", 0.8, "monthly"),
      page("/kak-dobratsya", 0.8, "monthly"),
      page("/ryadom", 0.7, "monthly"),
      page("/otzyvy", 0.7, "monthly"),
      page("/pravila", 0.8, "monthly"),
      page("/faq", 0.8, "monthly"),
      page("/kontakty", 0.8, "monthly"),
      page("/foto", 0.6, "monthly", undefined, ALL_IMAGES),
      page("/politika-konfidencialnosti", 0.3, "yearly"),
      // Английская версия (ТЗ, раздел 2): те же страницы под /en/…, hreflang выше.
      page("/en", 0.8, "weekly", undefined, HOME_IMAGES),
      page("/en/rooms", 0.7, "weekly", undefined, ROOMS_IMAGES),
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
