// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readdirSync } from "node:fs";
import { SITE_URL } from "./src/lib/site";

const blogSlugs = readdirSync("content/blog")
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [
      { path: "/", sitemap: { priority: 1, changefreq: "weekly" } },
      { path: "/nomera", sitemap: { priority: 0.9, changefreq: "weekly" } },
      { path: "/bronirovanie", sitemap: { priority: 0.9, changefreq: "monthly" } },
      { path: "/udobstva", sitemap: { priority: 0.8, changefreq: "monthly" } },
      { path: "/kak-dobratsya", sitemap: { priority: 0.8, changefreq: "monthly" } },
      { path: "/ryadom", sitemap: { priority: 0.7, changefreq: "monthly" } },
      { path: "/otzyvy", sitemap: { priority: 0.7, changefreq: "monthly" } },
      { path: "/pravila", sitemap: { priority: 0.8, changefreq: "monthly" } },
      { path: "/faq", sitemap: { priority: 0.8, changefreq: "monthly" } },
      { path: "/kontakty", sitemap: { priority: 0.8, changefreq: "monthly" } },
      { path: "/blog", sitemap: { priority: 0.7, changefreq: "weekly" } },
      ...blogSlugs.map((slug) => ({
        path: `/blog/${slug}`,
        sitemap: { priority: 0.6, changefreq: "monthly" as const },
      })),
      { path: "/blog/rss.xml", sitemap: { exclude: true } },
    ],
    // Адрес сайта задаётся в одном месте — src/lib/site.ts (SITE_URL).
    sitemap: { enabled: true, host: SITE_URL },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: false,
      filter: (page: { path: string }) => !page.path.includes("?"),
    },
  },
});
