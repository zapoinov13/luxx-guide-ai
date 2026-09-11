import { Link } from "@tanstack/react-router";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import type { ReactNode } from "react";

export function ContentPage({ title, eyebrow, intro, children }: { title: string; eyebrow: string; intro: string; children: ReactNode }) {
  return <main className="pb-24 lg:pb-0">
    <div className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Хлебные крошки" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"><Link to="/">Главная</Link><ChevronRight className="size-4" /><span>{eyebrow}</span></nav>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
      </div>
    </div>
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">{children}</div>
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
        <div><h2 className="font-display text-2xl font-semibold">Остались вопросы?</h2><p className="mt-2 text-sm opacity-80">Напишите администратору Luxx Aparts — стойка работает 24/7.</p></div>
        <Button asChild variant="secondary" size="lg"><a href={SITE.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Написать в WhatsApp</a></Button>
      </div>
    </section>
  </main>;
}

export function AnswerSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="border-b border-border py-10 first:pt-0 last:border-0"><h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2><div className="prose-copy mt-4 text-base leading-7 text-muted-foreground">{children}</div></section>;
}