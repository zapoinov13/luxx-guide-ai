import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage, QaList } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import {
  AMENITIES,
  PRICE_LIST,
  SITE,
  breadcrumbSchema,
  faqSchema,
  hostelSchema,
  jsonLd,
  pageHead,
  webPageSchema,
  type QA,
} from "@/lib/site";

const PATH = "/hostel-na-mesyac";
const NIGHTS = 30;
const fmt = (n: number) => n.toLocaleString("ru-RU");

/** Вопросы про длительное проживание: факты те же, что на /nomera и /pravila. */
const FAQ: QA[] = [
  [
    "Сколько стоит жить в хостеле месяц?",
    `По базовому тарифу за 30 ночей: койко-место ${fmt(6000 * NIGHTS)} ₸, одноместный номер без окна ${fmt(10000 * NIGHTS)} ₸, с окном ${fmt(11000 * NIGHTS)} ₸, двухместный номер ${fmt(15000 * NIGHTS)} ₸. Это верхняя граница: для срока от недели и от месяца администратор считает индивидуально.`,
  ],
  [
    "Есть ли скидка при проживании от месяца?",
    "Да, цена на срок от недели и от месяца обсуждается отдельно, как и для студентов и групп. Напишите даты и срок в WhatsApp, в ответ придёт точная стоимость.",
  ],
  [
    "Что входит в проживание на месяц?",
    "Спальное место или номер, постельное бельё, Wi-Fi, общая кухня с посудой, стиральная машина, утюг, коворкинг и лаундж, камера хранения, стойка и охрана круглосуточно. Полотенце — за отдельную плату на стойке.",
  ],
  [
    "Как оплачивать длительное проживание?",
    "Оплата на месте наличными в тенге или картой, предоплаты через сайт нет. Порядок оплаты за длительный срок и нужен ли депозит за отдельную комнату, уточните у администратора при бронировании.",
  ],
  [
    "Можно ли жить в хостеле и работать удалённо?",
    "Да. В хостеле коворкинг и столы в лаундже, Wi-Fi во всех зонах, у каждой кровати розетка и лампа. Комнаты звукоизолированы, после 23:00 в общих зонах тишина.",
  ],
];

export const Route = createFileRoute("/hostel-na-mesyac")({
  head: () => ({
    ...pageHead(
      "Хостел в Алматы на месяц: цены и условия Luxx Aparts",
      `Жильё на месяц в хостеле Luxx Aparts в Алматы: койко-место от ${fmt(6000 * NIGHTS)} ₸ за 30 ночей, отдельные номера, кухня, стирка, коворкинг. Скидки от недели и месяца.`,
      PATH,
    ),
    scripts: jsonLd(
      webPageSchema(PATH),
      breadcrumbSchema("Проживание на месяц", PATH),
      hostelSchema(),
      faqSchema(FAQ),
    ),
  }),
  component: MonthlyPage,
});

const audiences = [
  ["Студентам", "кухня, стирка, коворкинг и соседи-ровесники; до метро «Сайран» 1,9 км."],
  [
    "Удалённой работе",
    "столы для ноутбука, Wi-Fi везде, розетка у каждой кровати, тихие часы после 23:00.",
  ],
  [
    "Командировке на несколько недель",
    "отдельный номер с дверью на ключ, стойка круглосуточно, оплата картой.",
  ],
  ["Переезду в Алматы", "жильё на первое время без залога и договора аренды, пока ищете квартиру."],
] as const;

function MonthlyPage() {
  return (
    <ContentPage
      eyebrow="Проживание на месяц"
      title="Хостел в Алматы на месяц: цены и условия"
      intro={`Luxx Aparts принимает гостей на срок от недели и от месяца. По базовому тарифу 30 ночей в койко-месте стоят ${fmt(6000 * NIGHTS)} ₸, в одноместном номере от ${fmt(10000 * NIGHTS)} ₸, но для длительного срока администратор считает индивидуально. В проживание входят кухня, стиральная машина, Wi-Fi, коворкинг и круглосуточная стойка, залога и договора аренды не нужно.`}
      updated={SITE.factsUpdated}
      photo={PHOTOS.single}
    >
      <AnswerSection title="Сколько стоит жить в хостеле месяц?">
        <p>
          Ниже расчёт по базовым ценам на {SITE.factsUpdated} за {NIGHTS} ночей. Это верхняя
          граница: на срок от недели и от месяца цена ниже и обсуждается с администратором.
        </p>
        <table>
          <thead>
            <tr>
              <th>Размещение</th>
              <th>За ночь</th>
              <th>За 30 ночей</th>
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
                <td className="whitespace-nowrap">{fmt(row.price)} ₸</td>
                <td className="whitespace-nowrap">
                  <strong>{fmt(row.price * NIGHTS)} ₸</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Койко-место считается за человека, номера — за номер целиком. Напишите даты и срок, и в
          ответ придёт точная стоимость.
        </p>
        <Button asChild className="mt-2">
          <Link to="/bronirovanie">
            Узнать цену на месяц
            <ArrowRight />
          </Link>
        </Button>
      </AnswerSection>

      <AnswerSection title="Что входит в проживание на месяц?">
        <ul className="grid gap-1 sm:grid-cols-2">
          {AMENITIES.map((a) => (
            <li key={a.name} className="flex items-start gap-2">
              <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <strong className="text-foreground">{a.name}</strong>: {a.detail.toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
        <p>
          Полотенце в стоимость не входит и выдаётся за отдельную плату. Подробнее об удобствах — на
          странице <Link to="/udobstva">«Удобства»</Link>.
        </p>
      </AnswerSection>

      <AnswerSection title="Кому подходит хостел на месяц?">
        <ul>
          {audiences.map(([who, why]) => (
            <li key={who}>
              <strong className="text-foreground">{who}</strong>: {why}
            </li>
          ))}
        </ul>
        <p>
          Что выгоднее на длительный срок, хостел или квартира посуточно, разобрали в статье{" "}
          <Link to="/blog/$slug" params={{ slug: "hostel-ili-kvartira-posutochno-v-almaty" }}>
            «Хостел или квартира посуточно в Алматы»
          </Link>
          .
        </p>
      </AnswerSection>

      <AnswerSection title="Как забронировать на месяц?">
        <ol>
          <li>
            Напишите в WhatsApp или позвоните {SITE.phoneDisplay}: даты, срок, формат размещения.
          </li>
          <li>Администратор проверит места и назовёт цену на ваш срок.</li>
          <li>
            Заселяйтесь с {SITE.checkIn.from} до {SITE.checkIn.to} с удостоверением личности или
            паспортом, оплата на месте.
          </li>
        </ol>
      </AnswerSection>

      <QaList items={FAQ} />
    </ContentPage>
  );
}
