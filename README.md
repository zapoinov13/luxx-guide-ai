# Luxx Aparts — сайт хостела в Алматы

Сайт хостела Luxx Aparts (ул. Толе би 286/8, 2 этаж, Алматы). Задача сайта — быть первоисточником фактов о хостеле для Google, Яндекса и ИИ-ответов (ChatGPT, Perplexity, Алиса), поэтому весь текст отдаётся готовым HTML, у каждой страницы своя мета и JSON-LD.

Полное техническое задание от MarkVision лежит в [`docs/tz-sait-luxx-aparts.md`](docs/tz-sait-luxx-aparts.md).

## Стек

- TanStack Start + TanStack Router (файловый роутинг в `src/routes/`)
- React 19, TypeScript, Vite 8
- Tailwind CSS 4, shadcn/ui (компоненты в `src/components/ui/`)
- Пререндер всех страниц в статический HTML и генерация `sitemap.xml` (`vite.config.ts`)
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
  routes/            страницы (см. таблицу ниже)
  routes/__root.tsx  общий каркас, базовая мета, шрифт, страницы 404 и ошибки
  components/        site-shell (шапка, футер, мобильная панель), content-page (шаблон внутренней страницы)
  lib/site.ts        ЕДИНЫЙ ИСТОЧНИК ФАКТОВ: адрес сайта, название, телефон, адрес, заезд/выезд,
                     удобства, типы номеров (ROOM_TYPES), навигация; хелперы для мета, Hostel,
                     HotelRoom + Offer, FAQPage, BreadcrumbList
  lib/photos.ts      фото по блокам и по типам номеров (ROOM_PHOTOS), alt-тексты
  lib/analytics.ts   Метрика / GA4 и цели whatsapp, call, booking_form (см. «Аналитика»)
  styles.css         дизайн-токены Tailwind 4 (палитра, шрифт, hero-группа, prose-copy)
public/
  robots.txt         ИИ-боты разрешены, ссылка на sitemap
  llms.txt           краткое описание сайта для ИИ-краулеров
  og-image.jpg       картинка 1200×630 для соцсетей и мессенджеров
docs/
  tz-sait-luxx-aparts.md   ТЗ заказчика
```

| URL              | Страница                                                   | JSON-LD                                    |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `/`              | Главная                                                    | Hostel, WebSite, FAQPage                   |
| `/nomera`        | Номера и цены                                              | BreadcrumbList, Hostel                     |
| `/nomera/<тип>`  | Страница типа номера: фото, кровать, санузел, цена         | BreadcrumbList, HotelRoom + Offer, FAQPage |
| `/bronirovanie`  | Прямое бронирование (форма → готовое сообщение в WhatsApp) | BreadcrumbList, Hostel                     |
| `/udobstva`      | Удобства и услуги                                          | BreadcrumbList, Hostel, FAQPage            |
| `/kak-dobratsya` | Как добраться                                              | BreadcrumbList, Hostel                     |
| `/ryadom`        | Что рядом                                                  | BreadcrumbList, ItemList                   |
| `/otzyvy`        | Отзывы с 2GIS, Ostrovok и Hostelworld со ссылками          | BreadcrumbList, Hostel + Review            |
| `/pravila`       | Правила заселения и проживания                             | BreadcrumbList, FAQPage                    |
| `/faq`           | Вопросы и ответы (17 вопросов)                             | BreadcrumbList, FAQPage                    |
| `/kontakty`      | Контакты                                                   | BreadcrumbList, Hostel                     |
| `/blog`          | Блог: список статей                                        | BreadcrumbList, Blog                       |
| `/blog/<slug>`   | Статья из `content/blog/<slug>.md`                         | BreadcrumbList, Article                    |
| `/blog/avtor`    | Об авторах блога (на неё ссылается `Article.author`)       | BreadcrumbList, Organization               |
| `/blog/rss.xml`  | RSS-лента блога                                            |                                            |

## Правила для контента

Коротко из ТЗ (раздел 8):

- Заголовки разделов формулируются как вопрос гостя, первый абзац под ними — прямой ответ.
- Название всегда «Luxx Aparts», адрес всегда «ул. Толе би 286/8, 2 этаж, Алматы».
- Никаких неподтверждённых цифр: цены, номера автобусов и точные расстояния появляются на сайте только после подтверждения заказчиком. Там, где факта нет, текст честно отправляет к администратору.
- Реквизиты и факты меняются в одном месте — `src/lib/site.ts`. Адрес сайта — константа `SITE_URL` там же.

## Аналитика

Счётчики подключаются переменными окружения при сборке (пример в `.env.example`):

- `VITE_YM_ID` — номер счётчика Яндекс Метрики;
- `VITE_GA_ID` — идентификатор потока Google Analytics 4 (`G-…`).

Пока переменные пустые, на страницы не попадает ни одного скрипта аналитики. Цели отправляются в обе
системы под одинаковыми именами, их нужно завести в кабинетах: `whatsapp` (клик по любой ссылке на
wa.me), `call` (клик по `tel:`), `booking_form` (отправка формы на `/bronirovanie`). Логика — в
`src/lib/analytics.ts`, клики ловятся одним обработчиком в `site-shell.tsx`.

## Как переехать на свой домен

1. Поменять `SITE_URL` в `src/lib/site.ts`.
2. Поменять домен в `public/robots.txt` и `public/llms.txt`.
3. Собрать проект: canonical, og:url, sitemap.xml и JSON-LD подхватят новый адрес сами.

## Откуда данные

Booking закрыт от автоматического скачивания, поэтому факты и фото взяты с карточек хостела на Hostelworld (описание, удобства, расстояния, цена койко-места, фото), Ostrovok (отзывы, удобства, что рядом), 2GIS (оценка, e-mail). Там, где источники расходятся с ТЗ заказчика (время заезда, число номеров, курение), приоритет у ТЗ. Все цифры помечены датой актуальности.

## Что ещё не сделано по ТЗ

Ждут данных от заказчика (раздел 9 ТЗ) или отдельной итерации:

- Точные цены одноместных и двухместных номеров и цены прямого бронирования: на страницах
  `/nomera/<тип>` пока «цена по запросу», в `Offer` поле `price` появится после подтверждения
  (`priceValue` в `ROOM_TYPES`). Площадь номеров тоже не указана.
- Ссылка на Instagram, реквизиты, часы стойки от заказчика для `sameAs`.
- Номера автобусов и стоимость такси на странице «Как добраться».
- Английская версия с `hreflang`.
- Номера счётчиков Метрики / GA4 от заказчика (код и цели готовы, см. «Аналитика»).
- Автор блога как реальный человек с фото: сейчас автор — «Команда Luxx Aparts» (`/blog/avtor`).
- Собственные фото заказчика вместо фото с площадок, когда пришлёт.

## Lovable

Проект подключён к [Lovable](https://lovable.dev). Правки, запушенные в `main`, синхронизируются в редактор Lovable, поэтому историю коммитов не переписываем (без force push, rebase и amend уже отправленных коммитов).

- Редактор: https://lovable.dev/projects/f77f67be-cebe-470e-9330-526f7680b7bf
- Опубликованная версия: https://luxx-guide-ai.lovable.app
