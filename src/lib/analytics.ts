/**
 * Аналитика (ТЗ, раздел 2): Яндекс Метрика и/или Google Analytics 4 с целями
 * на клик по WhatsApp, звонок и отправку формы бронирования.
 *
 * Счётчики подключаются только если заданы переменные окружения на этапе сборки:
 *   VITE_YM_ID — номер счётчика Метрики (например, 12345678)
 *   VITE_GA_ID — идентификатор GA4 (например, G-XXXXXXXXXX)
 * Без них на страницу не попадает ни одного скрипта аналитики.
 *
 * Имена целей одинаковые в обеих системах — их и нужно завести в кабинетах:
 *   whatsapp      — клик по любой ссылке на wa.me
 *   call          — клик по любой ссылке tel:
 *   booking_form  — отправка формы на /bronirovanie
 */

export type Goal = "whatsapp" | "call" | "booking_form";

export const YM_ID = (import.meta.env["VITE_YM_ID"] as string | undefined)?.trim() || "";
export const GA_ID = (import.meta.env["VITE_GA_ID"] as string | undefined)?.trim() || "";

type Win = Window & {
  ym?: (id: number, method: string, ...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export const trackGoal = (goal: Goal, params: Record<string, string> = {}) => {
  if (typeof window === "undefined") return;
  const w = window as Win;
  if (YM_ID && typeof w.ym === "function") w.ym(Number(YM_ID), "reachGoal", goal, params);
  if (GA_ID && typeof w.gtag === "function") w.gtag("event", goal, params);
};

/** Цель по клику: ссылка на WhatsApp или телефон. */
export const goalForLink = (href: string): Goal | null => {
  if (href.startsWith("tel:")) return "call";
  if (/wa\.me|api\.whatsapp\.com|whatsapp:\/\//.test(href)) return "whatsapp";
  return null;
};

/** Скрипты счётчиков для <head>. Пустой массив, если идентификаторы не заданы. */
export const analyticsScripts = (): { src?: string; async?: boolean; children?: string }[] => {
  const scripts: { src?: string; async?: boolean; children?: string }[] = [];
  if (YM_ID) {
    scripts.push({
      children: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(YM_ID)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`,
    });
  }
  if (GA_ID) {
    scripts.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`,
      async: true,
    });
    scripts.push({
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${JSON.stringify(GA_ID)});`,
    });
  }
  return scripts;
};

/**
 * Подтверждение прав в кабинетах вебмастеров (ТЗ, раздел 2, «Кабинеты») без правки кода:
 *   VITE_GOOGLE_SITE_VERIFICATION — код из Google Search Console (метод «HTML-тег»)
 *   VITE_YANDEX_VERIFICATION      — код из Яндекс Вебмастера (метод «Мета-тег»)
 *   VITE_BING_VERIFICATION        — код из Bing Webmaster Tools (msvalidate.01)
 * Пустые переменные не добавляют в <head> ничего.
 */
export const verificationMeta = (): { name: string; content: string }[] => {
  const env = import.meta.env as Record<string, string | undefined>;
  const pairs: [string, string | undefined][] = [
    ["google-site-verification", env["VITE_GOOGLE_SITE_VERIFICATION"]],
    ["yandex-verification", env["VITE_YANDEX_VERIFICATION"]],
    ["msvalidate.01", env["VITE_BING_VERIFICATION"]],
  ];
  return pairs.flatMap(([name, value]) => (value?.trim() ? [{ name, content: value.trim() }] : []));
};
