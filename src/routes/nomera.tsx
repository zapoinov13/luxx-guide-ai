import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { SITE, breadcrumbSchema, hostelSchema, jsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/nomera")({
  head: () => ({
    ...pageHead(
      "Номера и цены в хостеле Luxx Aparts, Алматы",
      `${SITE.rooms} номера Luxx Aparts: койко-места и отдельные комнаты. Что входит в проживание, как узнать цену на свои даты и как оплатить. Актуально на ${SITE.factsUpdated}.`,
      "/nomera",
    ),
    scripts: jsonLd(breadcrumbSchema("Номера и цены", "/nomera"), hostelSchema()),
  }),
  component: RoomsPage,
});

const roomTypes = [
  {
    name: "Койко-место в общей комнате",
    fit: "Один гость",
    bath: "Общий санузел на этаже",
    forWhom: "Студенты, транзитные гости, поездки на одну-две ночи",
  },
  {
    name: "Отдельная комната",
    fit: "Один гость, пара или семья",
    bath: "Уточняется для конкретного номера",
    forWhom: "Командировочные, семьи, длительное проживание",
  },
] as const;

function RoomsPage() {
  return (
    <ContentPage
      eyebrow="Номера и цены"
      title="Номера и цены Luxx Aparts"
      intro={`В Luxx Aparts ${SITE.rooms} номера двух форматов: койко-места в общих комнатах и отдельные комнаты. Всем гостям доступны общая кухня, стиральная машина, Wi-Fi и круглосуточная стойка. Стоимость зависит от дат и формата, поэтому цену на ваши даты администратор называет при бронировании по телефону или в WhatsApp.`}
      updated={SITE.factsUpdated}
    >
      <AnswerSection title="Какие номера есть?">
        <p>
          Два формата размещения. Койко-место подходит тем, кому важна цена и кто едет один.
          Отдельная комната закрывается на ключ и подходит парам, семьям и тем, кто остаётся
          надолго.
        </p>
        <table>
          <thead>
            <tr>
              <th>Тип</th>
              <th>Вместимость</th>
              <th>Санузел</th>
              <th>Кому подходит</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((r) => (
              <tr key={r.name}>
                <td>
                  <strong>{r.name}</strong>
                </td>
                <td>{r.fit}</td>
                <td>{r.bath}</td>
                <td>{r.forWhom}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Количество кроватей, площадь и наличие санузла в конкретной комнате администратор
          подтверждает при бронировании.
        </p>
      </AnswerSection>

      <AnswerSection title="Сколько стоит ночь?">
        <p>
          Цена зависит от формата комнаты, дат и длительности проживания. Luxx Aparts не публикует
          цифры, которые могут устареть: администратор называет актуальную стоимость на ваши даты в
          течение разговора. Прямое бронирование идёт без комиссии агрегатора.
        </p>
        <Button asChild className="mt-2">
          <Link to="/bronirovanie">
            Узнать цену на свои даты
            <ArrowRight />
          </Link>
        </Button>
      </AnswerSection>

      <AnswerSection title="Что входит в проживание?">
        <ul>
          <li>Спальное место в выбранном формате: койко-место или отдельная комната.</li>
          <li>Общая кухня с посудой и чайником.</li>
          <li>Wi-Fi.</li>
          <li>Стиральная машина и гладильные принадлежности.</li>
          <li>Камера хранения для багажа до заезда и после выезда.</li>
          <li>Круглосуточная стойка регистрации и охрана.</li>
        </ul>
        <p>
          Постельное бельё и полотенца: порядок выдачи подтвердите у администратора при
          бронировании.
        </p>
      </AnswerSection>

      <AnswerSection title="Есть ли скидки при длительном проживании?">
        <p>
          Условия для проживания от недели и от месяца, а также для студентов и групп администратор
          обсуждает индивидуально. Назовите срок и число гостей при бронировании, чтобы получить
          точное предложение.
        </p>
      </AnswerSection>

      <AnswerSection title="Как оплатить?">
        <p>
          Оплата проходит при заселении. Принимаемые способы оплаты (наличные, карта, перевод)
          подтвердите у администратора до приезда, чтобы не искать банкомат ночью.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
