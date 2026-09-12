/**
 * Языковые версии (ТЗ, раздел 2: русский основной, английский — вторая версия
 * тех же страниц под /en/… с hreflang).
 *
 * Этот файл не импортирует site.ts, чтобы не создавать цикл: site.ts сам берёт
 * отсюда карту адресов и строит ссылки hreflang в pageHead.
 */

export type Locale = "ru" | "en";

/** Русский адрес → английский. Страницы без пары (блог, отзывы, фото) — только на русском. */
export const LOCALE_PATHS: Record<string, string> = {
  "/": "/en",
  "/nomera": "/en/rooms",
  "/udobstva": "/en/amenities",
  "/kak-dobratsya": "/en/how-to-get-there",
  "/pravila": "/en/house-rules",
  "/faq": "/en/faq",
  "/kontakty": "/en/contacts",
  "/bronirovanie": "/en/booking",
};

const EN_TO_RU: Record<string, string> = Object.fromEntries(
  Object.entries(LOCALE_PATHS).map(([ru, en]) => [en, ru]),
);

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export const localeOf = (path: string): Locale => {
  const p = normalize(path);
  return p === "/en" || p.startsWith("/en/") ? "en" : "ru";
};

/** Тот же раздел на другом языке или null, если перевода нет. */
export const counterpart = (path: string): string | null => {
  const p = normalize(path);
  return localeOf(p) === "ru" ? (LOCALE_PATHS[p] ?? null) : (EN_TO_RU[p] ?? null);
};

/** Пара адресов { ru, en } для страницы, если у неё есть обе версии. */
export const localePair = (path: string): { ru: string; en: string } | null => {
  const p = normalize(path);
  const other = counterpart(p);
  if (!other) return null;
  return localeOf(p) === "ru" ? { ru: p, en: other } : { ru: other, en: p };
};

/** Куда ведёт переключатель языка с текущей страницы. */
export const switchTarget = (path: string, to: Locale): string => {
  const pair = localePair(path);
  if (pair) return pair[to];
  return to === "en" ? "/en" : "/";
};

/** Подписи общих элементов интерфейса. */
export const UI = {
  ru: {
    home: "Главная",
    breadcrumbs: "Хлебные крошки",
    updated: "Актуально на",
    questions: "Остались вопросы?",
    questionsText: "Напишите или позвоните, отвечаем круглосуточно.",
    book: "Забронировать",
    bookDirect: "Забронировать напрямую",
    call: "Позвонить",
    mainNav: "Основная навигация",
    mobileNav: "Мобильная навигация",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    switchLabel: "English version",
    switchShort: "EN",
    platforms: "Мы на площадках",
    checkIn: "Заезд",
    checkOut: "выезд до",
    desk247: "стойка круглосуточно",
    pricesNote: "Цены и условия актуальны на",
    factsUpdated: "сентябрь 2026",
  },
  en: {
    home: "Home",
    breadcrumbs: "Breadcrumbs",
    updated: "Updated",
    questions: "Any questions?",
    questionsText: "Message or call us, we answer around the clock.",
    book: "Book now",
    bookDirect: "Book directly",
    call: "Call",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLabel: "Русская версия",
    switchShort: "RU",
    platforms: "Find us on",
    checkIn: "Check-in",
    checkOut: "check-out by",
    desk247: "24/7 front desk",
    pricesNote: "Prices and terms valid as of",
    factsUpdated: "September 2026",
  },
} as const;

export type UiLabels = (typeof UI)[Locale];
