import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, List } from "lucide-react";

export type SectionLink = { id: string; label: string };
const sections = [
  ["room-explorer", "Номера", "Rooms"],
  ["hostel-amenities", "Комфорт", "Amenities"],
  ["location", "Расположение", "Location"],
  ["home-audiences", "Для кого", "Your stay"],
  ["home-rules", "Заселение", "Check-in"],
  ["guest-stories", "Отзывы", "Reviews"],
  ["home-faq", "Вопросы", "FAQ"],
] as const;

function useActiveSection(items: SectionLink[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-90px 0px -60% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [items]);
  return active;
}

export function SectionNavigation({ en = false }: { en?: boolean }) {
  const items = useMemo(
    () =>
      sections
        .filter(([id]) => !en || id !== "guest-stories")
        .map(([id, ru, english]) => ({ id, label: en ? english : ru })),
    [en],
  );
  const active = useActiveSection(items);
  return (
    <nav
      className="block-navigation"
      aria-label={en ? "Home page sections" : "Разделы главной страницы"}
    >
      {items.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>
          {label}
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}

/** Existing sections stay server-rendered; outline progressively enhances longer pages. */
export function PageOutline({ en = false }: { en?: boolean }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [items, setItems] = useState<SectionLink[]>([]);
  const active = useActiveSection(items);
  useEffect(() => {
    const assigned: HTMLElement[] = [];
    const next = Array.from(document.querySelectorAll<HTMLElement>(".content-page .answer-section"))
      .map((section, i) => {
        if (!section.id) {
          section.id = `page-section-${i + 1}`;
          assigned.push(section);
        }
        return { id: section.id, label: section.querySelector("h2")?.textContent?.trim() ?? "" };
      })
      .filter(({ label }) => label);
    setItems(next);
    return () => assigned.forEach((section) => section.removeAttribute("id"));
  }, [pathname]);
  if (items.length < 3) return null;
  return (
    <nav className="page-outline" aria-label={en ? "On this page" : "На этой странице"}>
      <span>
        <List size={16} aria-hidden="true" />
        {en ? "On this page" : "На этой странице"}
      </span>
      <div>
        {items.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
