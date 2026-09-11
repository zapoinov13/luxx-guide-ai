import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";
import { ROOM_TYPES, SITE, breadcrumbSchema, hostelSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/nomera")({
  head: () => ({
    ...pageHead(
      `Номера и цены в хостеле Luxx Aparts, Алматы — от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸`,
      `Койко-места в мужских и женских комнатах от ${SITE.priceFrom.toLocaleString("ru-RU")} ₸, одноместные и двухместные номера Economy. Что входит в цену и как оплатить. Актуально на ${SITE.factsUpdated}.`,
      "/nomera",
    ),
    scripts: jsonLd(breadcrumbSchema("Номера и цены", "/nomera"), hostelSchema()),
  }),
  component: RoomsPage,
});

const roomPhotos = [PHOTOS.dorm, PHOTOS.single, PHOTOS.privateRoom] as const;

function RoomsPage() {
  const price = SITE.priceFrom.toLocaleString("ru-RU");
  return (
    <ContentPage
      eyebrow="Номера и цены"
      title="Номера и цены Luxx Aparts"
      intro={`В Luxx Aparts ${SITE.rooms} номера трёх форматов: койко-места в мужских и женских комнатах от ${price} ₸ за ночь, одноместные и двухместные номера Economy с окном. Санузел общий на этаже. В цену входят бельё, Wi-Fi, кухня и стирка; точную стоимость на ваши даты назовёт администратор.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.dorm}
    >
      <AnswerSection title="Какие номера есть и сколько стоят?">
        <div className="space-y-5">
          {ROOM_TYPES.map((r, i) => (
            <article
              key={r.slug}
              className="grid gap-0 overflow-hidden rounded-2xl border border-border sm:grid-cols-[0.8fr_1.2fr]"
            >
              <Photo
                photo={roomPhotos[i] ?? PHOTOS.detail}
                sizes="(min-width: 640px) 30vw, 100vw"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground">{r.name}</h3>
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
              </div>
            </article>
          ))}
        </div>
        <p>
          Цены зависят от дат и срока проживания. Напишите даты и формат — в ответ придёт точная
          стоимость.
        </p>
        <Button asChild className="mt-2">
          <Link to="/bronirovanie">
            Узнать цену на свои даты
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
          Да, для срока от недели и от месяца, а также для студентов и групп. Назовите срок и число
          гостей, и администратор посчитает индивидуально.
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
