import { Link } from "@tanstack/react-router";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
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
            {[...NAV, ...EXTRA_NAV].map(([to, label]) => (
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
            <div className="grid gap-2 py-4">
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link to="/bronirovanie">Забронировать напрямую</Link>
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="lg">
                  <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`tel:${SITE.phoneHref}`}>
                    <Phone />
                    Позвонить
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </header>

      {children}

      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <div>
              <p className="font-display text-lg font-bold">Luxx Aparts</p>
              <address className="mt-2 text-sm not-italic leading-6 text-muted-foreground">
                {SITE.address}, {SITE.complex}
                <br />
                Заезд {SITE.checkIn.from}–{SITE.checkIn.to}, выезд до {SITE.checkOut}, стойка
                круглосуточно
              </address>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="bg-background">
                  <a href={`tel:${SITE.phoneHref}`}>
                    <Phone />
                    {SITE.phoneDisplay}
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="bg-background">
                  <a href={`mailto:${SITE.email}`}>
                    <Mail />
                    {SITE.email}
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Мы на площадках</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[
                  ["Booking", SITE.links.booking],
                  ["Яндекс Карты", SITE.links.yandexMaps],
                  ["2GIS", SITE.links.twoGis],
                  ["Instagram", SITE.links.instagram],
                  ["Hostelworld", SITE.links.hostelworld],
                  ["Ostrovok", SITE.links.ostrovok],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Luxx Aparts, Алматы. Цены и условия актуальны на{" "}
              {SITE.factsUpdated}.
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              {EXTRA_NAV.map(([to, label]) => (
                <Link key={to} to={to} className="hover:text-foreground">
                  {label}
                </Link>
              ))}
              <Link to="/bronirovanie" className="font-semibold text-primary">
                Забронировать напрямую
              </Link>
              <a href="/blog/rss.xml" className="hover:text-foreground">
                RSS
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
