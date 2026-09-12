import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "../components/site-shell";
import { SITE } from "../lib/site";
import { analyticsScripts } from "../lib/analytics";

function NotFoundComponent() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center px-5 py-16 lg:px-8">
      <div className="max-w-xl">
        <p className="text-sm font-semibold text-primary">Ошибка 404</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Страница не найдена</h1>
        <p className="mt-4 text-muted-foreground">
          Такой страницы нет или её перенесли. Самое нужное — по ссылкам ниже, а свободные места и
          цену на ваши даты быстрее всего узнать в WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            На главную
          </Link>
          <Link
            to="/nomera"
            className="inline-flex h-11 items-center justify-center rounded-full border border-input px-5 text-sm font-semibold hover:bg-secondary"
          >
            Номера и цены
          </Link>
          <Link
            to="/bronirovanie"
            className="inline-flex h-11 items-center justify-center rounded-full border border-input px-5 text-sm font-semibold hover:bg-secondary"
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Страница не загрузилась
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Что-то пошло не так с нашей стороны. Обновите страницу или вернитесь на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `Хостел в Алматы ${SITE.name}` },
      { name: "description", content: SITE.whoWeAre },
      { name: "author", content: SITE.name },
      { name: "theme-color", content: "#1c1f2b" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Блог Luxx Aparts",
        href: "/blog/rss.xml",
      },
      {
        rel: "preload",
        href: "/fonts/manrope-cyrillic.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/manrope-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: analyticsScripts(),
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    // Required: nested routes render here. Removing <Outlet /> breaks all child routes.
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}
