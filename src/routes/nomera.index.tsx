import { BookingButton } from "@/components/booking-context";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { Photo } from "@/components/photo";
import { TariffCards } from "@/components/tariff-cards";
import { PHOTOS, roomCover } from "@/lib/photos";
import {
  PRICE_LIST,
  ROOM_TYPES,
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webPageSchema,
} from "@/lib/site";

export const Route = createFileRoute("/nomera/")({
  head: () => ({
    ...pageHead(
      `Цены хостела Luxx Aparts в Алматы: койко-место от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸`,
      `Сколько стоит хостел в Алматы: койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, одноместный номер от 10 000 ₸, двухместный 15 000 ₸. Что входит в цену, скидки на месяц.`,
      "/nomera",
    ),
    scripts: jsonLd(
      webPageSchema("/nomera"),
      breadcrumbSchema("Номера и цены", "/nomera"),
      hostelSchema(),
    ),
  }),
  component: RoomsPage,
});

function RoomsPage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <ContentPage
      eyebrow="Номера и цены"
      title="Номера и цены хостела Luxx Aparts в Алматы"
      intro={`Проживание в хостеле Luxx Aparts стоит от ${price} до ${SITE.priceTo.toLocaleString("ru-RU")} ₸: койко-место в мужской или женской комнате ${price} ₸, одноместный номер 10 000 ₸ без окна и 11 000 ₸ с окном, двухместный номер 15 000 ₸ за номер. Всего ${SITE.rooms} номера, санузел общий на этаже. В цену входят бельё, Wi-Fi, кухня и стирка.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.dorm}
    >
      <AnswerSection title="Какие номера есть и сколько стоят?">
        <TariffCards className="sm:hidden" />
        <div className="hidden sm:block">
          <table>
            <thead>
              <tr>
                <th>Размещение</th>
                <th>Вместимость</th>
                <th>Санузел</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_LIST.map((row) => (
                <tr key={row.name}>
                  <td>
                    <Link to="/nomera/$type" params={{ type: row.slug }}>
                      {row.name}
                    </Link>
                  </td>
                  <td data-label="Вместимость">{row.capacity}</td>
                  <td data-label="Санузел">{row.bath}</td>
                  <td data-label="Цена">
                    <strong className="whitespace-nowrap">
                      {row.price.toLocaleString("ru-RU")} ₸
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Цены от хостела на {SITE.factsUpdated}: койко-место — за место, номера — за номер целиком.
          В стоимость входят бельё, Wi-Fi, кухня и стирка.
        </p>
      </AnswerSection>

      <AnswerSection title="Чем отличаются форматы?">
        <div className="grid gap-4 sm:hidden">
          {ROOM_TYPES.map((r, i) => (
            <div key={r.slug} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-foreground">
                <Link to="/nomera/$type" params={{ type: r.slug }}>
                  {r.name}
                </Link>
              </p>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {(
                  [
                    ["Цена", r.price],
                    ["За кого", ["за место", "за номер", "за номер"][i]],
                    ["Кровать", r.beds],
                    ["Дверь на ключ", ["нет, шторка у капсулы", "да", "да"][i]],
                    ["Окно", ["в комнате", "с окном или без", "да"][i]],
                    ["Санузел", r.bath],
                    ["Шкафчик", ["с замком", "комната закрывается", "комната закрывается"][i]],
                    ["Кому", r.forWhom.toLowerCase()],
                  ] as [string, string | undefined][]
                ).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="table-scroll hidden sm:block">
          <table>
            <thead>
              <tr>
                <th>
                  <span className="sr-only">Параметр</span>
                </th>
                {ROOM_TYPES.map((r) => (
                  <th key={r.slug}>
                    <Link to="/nomera/$type" params={{ type: r.slug }}>
                      {r.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Цена", ROOM_TYPES.map((r) => r.price)],
                ["За кого", ["за место", "за номер", "за номер"]],
                ["Кровать", ROOM_TYPES.map((r) => r.beds)],
                ["Дверь на ключ", ["нет, шторка у капсулы", "да", "да"]],
                ["Окно", ["в комнате", "с окном или без", "да"]],
                ["Санузел", ROOM_TYPES.map((r) => r.bath)],
                ["Шкафчик с замком", ["да", "комната закрывается", "комната закрывается"]],
                ["Кому подходит", ROOM_TYPES.map((r) => r.forWhom.toLowerCase())],
              ].map(([label, values]) => (
                <tr key={label as string}>
                  <th scope="row">{label as string}</th>
                  {(values as string[]).map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-5">
          {ROOM_TYPES.map((r) => (
            <article
              key={r.slug}
              className="grid gap-0 overflow-hidden rounded-2xl border border-border sm:grid-cols-[0.8fr_1.2fr]"
            >
              <Link to="/nomera/$type" params={{ type: r.slug }} className="block">
                <Photo
                  photo={roomCover(r.slug)}
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </Link>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground">
                  <Link to="/nomera/$type" params={{ type: r.slug }} className="hover:text-primary">
                    {r.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm">{r.short}</p>
                <p className="mt-3 font-semibold text-foreground">{r.price}</p>
                {r.priceNote && <p className="text-xs">{r.priceNote}</p>}
                <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                  <li>Вместимость: {r.capacity}</li>
                  <li>Санузел: {r.bath}</li>
                  {r.includes.map((x) => (
                    <li key={x} className="flex items-center gap-1.5">
                      <Check className="size-4 text-primary" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm">Кому подходит: {r.forWhom.toLowerCase()}.</p>
                <Link
                  to="/nomera/$type"
                  params={{ type: r.slug }}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Подробнее и фото
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p>
          Для срока от недели и от месяца цена считается индивидуально. Напишите даты и формат — в
          ответ придёт подтверждение и точная стоимость.
        </p>
        <Button asChild className="mt-2">
          <BookingButton to="/bronirovanie">Забронировать</BookingButton>
        </Button>
      </AnswerSection>

      <AnswerSection title="Что входит в стоимость?">
        <ul>
          <li>Спальное место в выбранном формате и постельное бельё.</li>
          <li>Wi-Fi во всём хостеле, коворкинг и лаундж с телевизором.</li>
          <li>
            Общая кухня с плитой, микроволновкой, холодильником, посудой. Чай и кофе бесплатно.
          </li>
          <li>Стиральная машина, утюг и гладильная доска.</li>
          <li>Камера хранения багажа до заезда и после выезда.</li>
          <li>Круглосуточная стойка регистрации и охрана.</li>
        </ul>
        <p>
          Полотенце в стоимость не входит и выдаётся за отдельную плату на стойке. Фен по запросу.
        </p>
      </AnswerSection>

      <AnswerSection title="Сколько стоит проживание на месяц?">
        <p>
          По базовому тарифу за 30 дней: койко-место 180 000 ₸, одноместный номер без окна 300 000
           ₸, с окном 330 000 ₸, двухместный номер 450 000 ₸. Это верхняя граница: для срока от
          недели и от месяца администратор считает индивидуально, поэтому напишите даты и срок в
          WhatsApp. На месяц удобнее всего койко-место или одноместный номер: кухня, стиральная
          машина и коворкинг включены, а до метро «Сайран» и автовокзала близко.
        </p>
      </AnswerSection>

      <AnswerSection title="Есть ли скидки при длительном проживании?">
        <p>
          Да, для срока от недели и от месяца, а также для студентов и групп. Базовые цены выше
          указаны за день; назовите срок и число гостей, и администратор посчитает индивидуально.
        </p>
      </AnswerSection>

      <AnswerSection title="Как оплатить?">
        <p>
          При заселении, наличными в тенге или картой. Предоплаты нет. Нужен ли депозит за отдельную
          комнату, уточните при бронировании.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
