import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { goalForLink, trackGoal } from "@/lib/analytics";
import { EXTRA_NAV, NAV, SITE } from "@/lib/site";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // Цели аналитики: любой клик по ссылке tel: или wa.me на любой странице.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const goal = link && goalForLink(link.getAttribute("href") ?? "");
      if (goal) trackGoal(goal, { page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            to="/"
            aria-label="Luxx Aparts — главная"
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src="/favicon.png"
              alt=""
              width="36"
              height="36"
              className="size-9 rounded-xl object-cover"
            />
            <span className="font-display text-lg font-bold tracking-tight">Luxx Aparts</span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-4 xl:flex">
            {NAV.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: "whitespace-nowrap text-sm font-semibold text-foreground",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 xl:flex">
            <Button asChild variant="ghost" size="icon" className="2xl:hidden">
              <a href={`tel:${SITE.phoneHref}`} aria-label={`Позвонить ${SITE.phoneDisplay}`}>
                <Phone />
              </a>
            </Button>
            <Button asChild variant="ghost" className="hidden 2xl:inline-flex">
              <a href={`tel:${SITE.phoneHref}`}>
                <Phone />
                {SITE.phoneDisplay}
              </a>
            </Button>
            <Button asChild>
              <Link to="/bronirovanie">Забронировать</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Мобильная навигация"
            className="border-t border-border bg-background px-5 py-3 xl:hidden"
          >
            {NAV.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-3 text-base"
                activeProps={{
                  className: "block border-b border-border py-3 text-base font-semibold",
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/bronirovanie"
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-semibold text-primary"
            >
              Забронировать напрямую
            </Link>
          </nav>
        )}
      </header>

      {children}

      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <p className="font-display text-lg font-bold">Luxx Aparts</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              {SITE.tagline}: {SITE.rooms} номера, кухня, коворкинг, стойка круглосуточно.
            </p>
            <address className="mt-4 text-sm not-italic leading-6 text-muted-foreground">
              {SITE.address}
              <br />
              {SITE.complex}, индекс {SITE.postalCode}
            </address>
          </div>
          <div>
            <p className="text-sm font-semibold">Разделы</p>
            <nav aria-label="Разделы сайта" className="mt-3 flex flex-col gap-2">
              {[...NAV, ...EXTRA_NAV].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
              <Link to="/bronirovanie" className="text-sm font-semibold text-primary">
                Забронировать напрямую
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-semibold">Связаться</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <a className="hover:text-foreground" href={`tel:${SITE.phoneHref}`}>
                {SITE.phoneDisplay}
              </a>
              <a
                className="hover:text-foreground"
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a className="hover:text-foreground" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <p>
                Заезд {SITE.checkIn.from}–{SITE.checkIn.to}, выезд до {SITE.checkOut}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Мы на площадках</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                ["Booking", SITE.links.booking],
                ["Яндекс Карты", SITE.links.yandexMaps],
                ["2GIS", SITE.links.twoGis],
                ["Instagram", SITE.links.instagram],
                ["Hostelworld", SITE.links.hostelworld],
                ["Ostrovok", SITE.links.ostrovok],
              ].map(([label, href]) => (
                <a
                  key={label}
                  className="hover:text-foreground"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} Luxx Aparts, Алматы</p>
            <p>
              Цены и условия актуальны на {SITE.factsUpdated}.{" "}
              <a href="/blog/rss.xml" className="hover:text-foreground">
                RSS блога
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
