import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, AnswerSection } from "@/components/content-page";
import { SITE, breadcrumbSchema, pageHead } from "@/lib/site";
const items: [string, string][] = [
  [
    "Где находится Luxx Aparts?",
    `Адрес: ${SITE.address}, ЖК «Каусар». Помещение находится на втором этаже. Индекс — ${SITE.postalCode}.`,
  ],
  [
    "Какие варианты размещения есть?",
    "В Luxx Aparts есть общие и отдельные комнаты. Конкретную вместимость, кровати и доступность на выбранные даты подтверждает администратор.",
  ],
  [
    "Можно ли заселиться ночью?",
    "Да, заселение доступно 24/7. При позднем приезде заранее сообщите администратору ожидаемое время.",
  ],
  [
    "Есть ли Wi‑Fi?",
    "Да, в Luxx Aparts доступен Wi‑Fi. Также есть коворкинг-зона для учёбы и удалённой работы.",
  ],
  [
    "Как узнать цену?",
    "Напишите в WhatsApp или позвоните. Администратор сообщит актуальную стоимость для ваших дат и выбранного формата комнаты.",
  ],
];
export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead(
      "Вопросы о Luxx Aparts в Алматы",
      "Ответы об адресе, заселении 24/7, комнатах, Wi-Fi, коворкинге и ценах Luxx Aparts.",
      "/faq",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          breadcrumbSchema("Вопросы и ответы", "/faq"),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          },
        ]),
      },
    ],
  }),
  component: FaqPage,
});
function FaqPage() {
  return (
    <ContentPage
      eyebrow="Вопросы и ответы"
      title="Что гости спрашивают о Luxx Aparts?"
      intro="Здесь собраны подтверждённые сведения о Luxx Aparts: адрес на улице Толе би 286/8, общие и отдельные комнаты, Wi‑Fi, коворкинг-зона и круглосуточное заселение. Детали конкретного бронирования — цену, свободные места и правила оплаты — подтвердит администратор."
    >
      {items.map(([q, a]) => (
        <AnswerSection key={q} title={q}>
          <p>{a}</p>
        </AnswerSection>
      ))}
    </ContentPage>
  );
}
