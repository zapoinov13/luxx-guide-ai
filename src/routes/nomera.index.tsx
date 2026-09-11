import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { Photo } from "@/components/photo";
import { PHOTOS, roomCover } from "@/lib/photos";
import {
  PRICE_LIST,
  ROOM_TYPES,
  SITE,
  breadcrumbSchema,
  hostelSchema,
  jsonLd,
  pageHead,
} from "@/lib/site";

export const Route = createFileRoute("/nomera/")({
  head: () => ({
    ...pageHead(
      `Цены хостела Luxx Aparts в Алматы: койко-место от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸`,
      `Сколько стоит хостел в Алматы: койко-место ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, одноместный номер от 10 000 ₸, двухместный 15 000 ₸ за ночь. Что входит в цену, скидки на месяц.`,
      "/nomera",
    ),
    scripts: jsonLd(breadcrumbSchema("Номера и цены", "/nomera"), hostelSchema()),
  }),
  component: RoomsPage,
});

function RoomsPage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <ContentPage
      eyebrow="Номера и цены"
      title="Номера и цены хостела Luxx Aparts в Алматы"
      intro={`Ночь в хостеле Luxx Aparts стоит от ${price} до ${SITE.priceTo.toLocaleString("ru-RU")} ₸: койко-место в мужской или женской комнате ${price} ₸, одноместный номер 10 000 ₸ без окна и 11 000 ₸ с окном, двухместный номер 15 000 ₸ за номер. Всего ${SITE.rooms} номера, санузел общий на этаже. В цену входят бельё, Wi-Fi, кухня и стирка.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.dorm}
    >
      <AnswerSection title="Какие номера есть и сколько стоят?">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Размещение</th>
                <th>Вместимость</th>
                <th>Санузел</th>
                <th>Цена за ночь</th>
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
                  <td>{row.capacity}</td>
                  <td>{row.bath}</td>
                  <td>
                    <strong>{row.price.toLocaleString("ru-RU")} ₸</strong>
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
                  Подробнее и фото <ArrowRight className="size-4" aria-hidden="true" />
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
          <Link to="/bronirovanie">
            Забронировать
            <ArrowRight />
          </Link>
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

      <AnswerSection title="Есть ли скидки при длительном проживании?">
        <p>
          Да, для срока от недели и от месяца, а также для студентов и групп. Базовые цены выше
          указаны за одну ночь; назовите срок и число гостей, и администратор посчитает
          индивидуально.
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
