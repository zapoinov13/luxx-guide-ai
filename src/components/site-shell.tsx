import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/luxx-aparts-logo.png.asset.json";
import { NAV, SITE } from "@/lib/site";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            to="/"
            aria-label="Luxx Aparts — главная"
            className="flex shrink-0 items-center gap-3"
          >
            <img
              src={logoAsset.url}
              alt="Логотип Luxx Aparts"
              width="42"
              height="42"
              className="h-10 w-10 rounded-sm object-cover"
            />
            <span className="font-display text-lg font-semibold uppercase tracking-widest">
              Luxx Aparts
            </span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-6 xl:flex">
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

          <div className="hidden items-center gap-2 xl:flex">
            <Button asChild variant="outline">
              <a href={`tel:${SITE.phoneHref}`}>
                <Phone />
                Позвонить
              </a>
            </Button>
            <Button asChild variant="hero">
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
            className="border-t border-border bg-background px-5 py-4 xl:hidden"
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
              className="block py-3 text-base font-semibold"
            >
              Забронировать напрямую
            </Link>
          </nav>
        )}
      </header>

      {children}

      <footer className="border-t border-border bg-secondary pb-20 lg:pb-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4 lg:px-8">
          <div>
            <p className="font-display text-xl font-semibold">Luxx Aparts</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              {SITE.tagline}. {SITE.rooms} номера, общая кухня, круглосуточная стойка, Wi-Fi.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Адрес</p>
            <address className="mt-3 text-sm not-italic leading-6 text-muted-foreground">
              {SITE.address}
              <br />
              {SITE.complex}, индекс {SITE.postalCode}
            </address>
          </div>
          <div>
            <p className="text-sm font-semibold">Связаться</p>
            <a
              className="mt-3 block text-sm text-muted-foreground hover:text-foreground"
              href={`tel:${SITE.phoneHref}`}
            >
              {SITE.phoneDisplay}
            </a>
            <a
              className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Написать в WhatsApp
            </a>
            <p className="mt-2 text-sm text-muted-foreground">Стойка работает круглосуточно</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Заезд и выезд</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Заезд с {SITE.checkIn.from} до {SITE.checkIn.to}
              <br />
              Выезд до {SITE.checkOut}
            </p>
            <nav aria-label="Ссылки в подвале" className="mt-4 flex flex-col gap-1">
              <Link to="/pravila" className="text-sm text-muted-foreground hover:text-foreground">
                Правила проживания
              </Link>
              <Link
                to="/bronirovanie"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Забронировать напрямую
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background p-2 shadow-elevated lg:hidden">
        <Button asChild variant="outline" className="rounded-r-none">
          <a href={`tel:${SITE.phoneHref}`}>
            <Phone />
            Позвонить
          </a>
        </Button>
        <Button asChild className="rounded-l-none">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
