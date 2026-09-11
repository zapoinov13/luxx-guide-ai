import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/luxx-aparts-logo.png.asset.json";
import { SITE } from "@/lib/site";

const links = [
  ["/nomera", "Номера"],
  ["/kak-dobratsya", "Как добраться"],
  ["/pravila", "Правила"],
  ["/faq", "Вопросы"],
  ["/kontakty", "Контакты"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" aria-label="Luxx Aparts — главная" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Логотип Luxx Aparts" width="42" height="42" className="h-10 w-10 rounded-sm object-cover" />
            <span className="font-display text-lg font-semibold uppercase tracking-widest">Luxx Aparts</span>
          </Link>
          <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
            {links.map(([to, label]) => <Link key={to} to={to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-sm font-semibold text-foreground" }}>{label}</Link>)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="outline"><a href={`tel:${SITE.phoneHref}`}><Phone />Позвонить</a></Button>
            <Button asChild><a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>{open ? <X /> : <Menu />}</Button>
        </div>
        {open && <nav aria-label="Мобильная навигация" className="border-t border-border bg-background px-5 py-4 lg:hidden">{links.map(([to, label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-base last:border-0">{label}</Link>)}</nav>}
      </header>
      {children}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 lg:px-8">
          <div><p className="font-display text-xl font-semibold">Luxx Aparts</p><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Общие и отдельные комнаты в Алматы. Wi‑Fi, коворкинг-зона и заселение 24/7.</p></div>
          <div><p className="text-sm font-semibold">Адрес</p><address className="mt-3 text-sm not-italic leading-6 text-muted-foreground">{SITE.address}<br />ЖК «Каусар», индекс {SITE.postalCode}</address></div>
          <div><p className="text-sm font-semibold">Связаться</p><a className="mt-3 block text-sm text-muted-foreground hover:text-foreground" href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a><a className="mt-2 block text-sm text-muted-foreground hover:text-foreground" href={SITE.whatsapp}>Написать в WhatsApp</a></div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background p-2 shadow-elevated lg:hidden">
        <Button asChild variant="outline" className="rounded-r-none"><a href={`tel:${SITE.phoneHref}`}><Phone />Позвонить</a></Button>
        <Button asChild className="rounded-l-none"><a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></Button>
      </div>
    </div>
  );
}