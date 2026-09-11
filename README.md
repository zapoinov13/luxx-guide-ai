# Luxx Aparts Connect

# ТЗ на сайт хостела Luxx Aparts (Алматы) — под поиск и ответы ИИ

Версия 1.0 · 11.09.2026 · заказчик: Luxx Aparts · подготовлено MarkVision (услуга GEO + SEO)

## 1. Зачем сайт и что он должен уметь

Сайт нужен, чтобы хостел находили не только на Booking и в 2GIS, но и в Google, Яндексе и в ответах ChatGPT, Gemini, Perplexity и Алисы на вопросы вроде «хостел в Алматы рядом с вокзалом недорого». Сейчас про Luxx Aparts в интернете говорят только агрегаторы, и говорят с ошибками («частный пляж», четыре варианта названия). Сайт станет первоисточником фактов: цены, правила, адрес, как добраться.

Четыре принципа, которые нельзя нарушать:

1. **Весь текст в HTML.** Страница должна читаться без JavaScript: `curl` любой страницы показывает заголовки и абзацы. Никаких конструкторов, где текст подгружается скриптом, никакого текста в картинках.
2. **Один домен, один адрес у страницы.** Все ссылки, sitemap, canonical на один домен. Никаких тестовых поддоменов с тем же контентом.
3. **Каждая страница отвечает на вопрос гостя.** Заголовки разделов сформулированы как вопросы, первый абзац под ними — прямой ответ с цифрой или фактом (40-75 слов).
4. **Одно название и один адрес везде.** «Luxx Aparts», «ул. Толе би 286/8, 2 этаж, Алматы». Так же на 2GIS, Google Maps, Booking, в Instagram.

## 2. Технические требования

| Что | Требование |
|---|---|
| Домен | Уточнить у клиента. Если своего нет — `luxx-aparts.kz` (или `luxxaparts.kz`), основной с `https://`, без `www` (или наоборот, но одно из двух; второе — 301) |
| Платформа | Любая, которая отдаёт готовый HTML: рекомендуем движок Stateinik (Next.js, серверный рендер, готовые sitemap/robots/llms.txt/разметка) на Vercel + база Supabase; допустимы WordPress, Astro, статический сайт. **Недопустимы**: SPA без пререндера, Tilda-блоки с текстом в JS, конструкторы без доступа к `` |
| HTTPS | Обязательно, редирект с http |
| Мобильная версия | Сайт проектируется с телефона: 70%+ гостей ищут жильё с мобильного |
| Скорость | PageSpeed mobile: Performance ≥ 80, LCP < 2,5 с, CLS < 0,1. Фото в WebP, не больше 200 КБ каждое, размеры заданы явно |
| Языки | Русский — основной. Английский — вторая версия тех же страниц (`/en/…`) с `hreflang`, потому что часть гостей — иностранцы. Казахский — по желанию клиента |
| Заголовки | На каждой странице ровно один `

`, разделы — настоящие `

/

`, списки — `

/

`, таблицы — `` |
| Мета | У каждой страницы свой `@context": "https://schema.org",
  "@type": "Hostel",
  "name": "Luxx Aparts",
  "url": "https://[домен]/",
  "image": ["https://[домен]/img/hostel-1.webp"],
  "description": "Luxx Aparts — хостел и апартаменты в Алматы на Толе би 286/8: 44 номера, общая кухня, круглосуточная стойка, Wi-Fi, 7 км от вокзала Алматы-2",
  "telephone": "+7 [номер]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "улица Толе би 286/8, 2 этаж",
    "addressLocality": "Алматы",
    "addressCountry": "KZ",
    "postalCode": "[индекс]"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[lng]" },
  "checkinTime": "13:00",
  "checkoutTime": "12:00",
  "priceRange": "[мин]-[макс] ₸",
  "numberOfRooms": 44,
  "petsAllowed": false,
  "smokingAllowed": false,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Общая кухня", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Стиральная машина", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Круглосуточная стойка", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Камера хранения", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Кондиционер", "value": true }
  ],
  "sameAs": ["[2GIS]", "[Google Maps]", "[Booking]", "[Instagram]"],
  "makesOffer": [
    { "@type": "Offer", "name": "Койко-место", "price": "[цена]", "priceCurrency": "KZT", "availability": "https://schema.org/InStock" }
  ]
}
```

Дополнительно: `WebSite` на главной; `FAQPage` на `/faq`, `/pravila` и в FAQ-блоке главной; `HotelRoom` + `Offer` на страницах номеров; `BreadcrumbList` на всех внутренних; `Article` + `Person` (автор) в блоге. Проверка — валидатор schema.org и Rich Results Test без ошибок.

## 7. Служебные файлы

`robots.txt` (ИИ-ботов не закрываем):

```
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://[домен]/sitemap.xml
```

`sitemap.xml` — все публичные страницы обеих языковых версий, `lastmod` меняется при правке. `llms.txt`:

```
# Luxx Aparts
> Хостел и апартаменты в Алматы на Толе би 286/8: 44 номера, общая кухня, круглосуточная стойка, Wi-Fi, 7 км от вокзала Алматы-2.
## Страницы
- [Номера и цены](https://[домен]/nomera): типы номеров, цены за ночь, что включено
- [Как добраться](https://[домен]/kak-dobratsya): от вокзала Алматы-2, автовокзала Сайран, аэропорта
- [Правила](https://[домен]/pravila): заезд 13:00-23:30, выезд до 12:00, документы, дети
- [Вопросы и ответы](https://[домен]/faq)
- [Контакты](https://[домен]/kontakty)
```

## 8. Правила текстов

- Заголовки разделов — вопросы словами гостя («Сколько стоит ночь?», а не «Цены»).
- Первый абзац раздела — прямой ответ с цифрой, сроком или фактом, 40-75 слов, без подводок.
- Сравнения — таблицей, процессы — нумерованным списком, характеристики — маркерами.
- Название «Luxx Aparts» повторять вместо «мы», «наш хостел», «он» дальше двух предложений.
- Не использовать: «частный пляж», «пляжный отель», «на берегу моря», «лучший хостел Алматы», «гарантируем», «5 звёзд», «незабываемый отдых», «уютная атмосфера», «в самом сердце города».
- Каждая цена и расстояние — с датой актуальности или ссылкой на источник (2GIS, карты).
- Alt-текст у каждого фото: что на фото и где («двухместный номер Luxx Aparts с окном, Алматы»).

## 9. Что нужно от клиента до старта

1. Домен (есть / купить) и доступ к DNS.
2. Каноничное название и подтверждение адреса, индекс, координаты.
3. Телефон, WhatsApp, e-mail; часы стойки.
4. Типы номеров: названия, вместимость, кровати, санузел, площадь, цены будни/выходные, что включено; скидки на неделю/месяц; условия прямого бронирования и отмены; способы оплаты.
5. Фото: по 5-8 на тип номера, кухня, стойка, вход с улицы, фасад с табличкой (минимум 1600 px по длинной стороне).
6. Маршруты: как реально едут гости от вокзала, автовокзала, аэропорта (автобусы, цена такси).
7. Ссылки на 2GIS, Google Maps, Booking, Instagram; доступ к Google Business Profile.
8. 5-10 реальных отзывов со ссылками.
9. Ответы на вопросы с пометкой «уточнить» в разделах 5.4-5.7.

## 10. Приёмка

Сайт принимается, когда выполнено всё:

- `curl -s https://[домен]/nomera | grep -c "<h2"` показывает заголовки; текст виден без JavaScript на всех страницах.
- Один домен: остальные варианты (www/без www, http) отдают 301.
- У каждой страницы свои title/description/H1/canonical/OG; `lang` задан.
- JSON-LD проходит валидатор без ошибок; на главной есть Hostel с адресом, телефоном, geo, checkin/checkout, priceRange.
- `robots.txt` по шаблону, `sitemap.xml` с lastmod, `llms.txt` на месте.
- PageSpeed mobile ≥ 80, LCP < 2,5 с.
- FAQ и правила размечены FAQPage; цены с датой актуальности.
- Кнопка WhatsApp и телефон видны на каждом экране мобильной версии; форма бронирования отправляется, цели в аналитике срабатывают.
- Название и адрес на сайте, в 2GIS, Google Maps и Booking совпадают дословно.
- Прогон `geo-audit` (скрипт MarkVision): блокеров 0.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://luxx-guide-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f77f67be-cebe-470e-9330-526f7680b7bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
