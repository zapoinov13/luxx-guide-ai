# Luxx Aparts — сайт хостела в Алматы

Сайт хостела Luxx Aparts (ул. Толе би 286/8, 2 этаж, Алматы). Задача сайта — быть первоисточником фактов о хостеле для Google, Яндекса и ИИ-ответов (ChatGPT, Perplexity, Алиса), поэтому весь текст отдаётся готовым HTML, у каждой страницы своя мета и JSON-LD.

Полное техническое задание от MarkVision лежит в [`docs/tz-sait-luxx-aparts.md`](docs/tz-sait-luxx-aparts.md).

## Стек

- TanStack Start + TanStack Router (файловый роутинг в `src/routes/`)
- React 19, TypeScript, Vite 8
- Tailwind CSS 4, shadcn/ui (компоненты в `src/components/ui/`)
- Пререндер всех страниц в статический HTML (`vite.config.ts`, блок `prerender`)
- Пакетный менеджер — Bun (`bun.lock`)

## Команды

```sh
bun install          # зависимости
bun run dev          # локальный сервер
bun run build        # продакшен-сборка с пререндером в .output/
bun run preview      # посмотреть сборку
bun run typecheck    # tsc --noEmit
bun run lint         # eslint (включая правила prettier)
bun run format       # prettier --write .
```

## Структура

```
src/
  routes/            страницы: /, /nomera, /kak-dobratsya, /pravila, /faq, /kontakty
  routes/__root.tsx  общий каркас, базовая мета, страницы 404 и ошибки
  components/        site-shell (шапка, футер, мобильная панель), content-page (шаблон внутренней страницы)
  lib/site.ts        единые реквизиты: название, телефон, WhatsApp, адрес, индекс; хелперы для мета и BreadcrumbList
  styles.css         дизайн-токены Tailwind 4
public/
  robots.txt         ИИ-боты разрешены
  llms.txt           краткое описание сайта для ИИ-краулеров
docs/
  tz-sait-luxx-aparts.md   ТЗ заказчика
```

## Правила для контента

Коротко из ТЗ (раздел 8):

- Заголовки разделов формулируются как вопрос гостя, первый абзац под ними — прямой ответ.
- Название всегда «Luxx Aparts», адрес всегда «ул. Толе би 286/8, 2 этаж, Алматы».
- Никаких неподтверждённых цифр: цены, маршруты и расстояния появляются на сайте только после подтверждения заказчиком.
- Реквизиты меняются в одном месте — `src/lib/site.ts`.

## Что ещё не сделано по ТЗ

Сайт закрывает базовую часть ТЗ: шесть страниц на русском, мета, JSON-LD (Hostel, WebSite, FAQPage, BreadcrumbList), robots.txt и llms.txt, кнопки WhatsApp и телефона на каждом экране. Ждут данных от заказчика или отдельной итерации:

- Домен: canonical, og:url и ссылки в JSON-LD пока относительные. После выбора домена вынести его в `SITE.url` и сделать абсолютными.
- `sitemap.xml` (нужен домен), `og:image` 1200×630.
- Цены, типы номеров и страницы `/nomera/<тип>`, время заезда и выезда в разметке (`checkinTime`, `checkoutTime`, `priceRange`, `geo`).
- Страницы `/udobstva`, `/ryadom`, `/otzyvy`, `/bronirovanie`, блог, английская версия с `hreflang`.
- Форма заявки и аналитика (GA4 или Метрика) с целями на клик WhatsApp и звонок.

## Lovable

Проект подключён к [Lovable](https://lovable.dev). Правки, запушенные в `main`, синхронизируются в редактор Lovable, поэтому историю коммитов не переписываем (без force push, rebase и amend уже отправленных коммитов).

- Редактор: https://lovable.dev/projects/f77f67be-cebe-470e-9330-526f7680b7bf
- Опубликованная версия: https://luxx-guide-ai.lovable.app
