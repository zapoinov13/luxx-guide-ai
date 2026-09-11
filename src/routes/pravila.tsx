import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, AnswerSection } from "@/components/content-page";
import { breadcrumbSchema, pageHead } from "@/lib/site";
const rulesFaq: [string, string][] = [
  [
    "Когда можно заселиться?",
    "Заселение в Luxx Aparts доступно 24/7. Для ночного приезда заранее сообщите администратору время прибытия.",
  ],
  [
    "Какие документы нужны?",
    "Перечень документов для заселения необходимо подтвердить у администратора до приезда.",
  ],
  [
    "Когда нужно освободить комнату?",
    "Точное время выезда администратор сообщает при подтверждении бронирования.",
  ],
];
export const Route = createFileRoute("/pravila")({
  head: () => ({
    ...pageHead(
      "Правила проживания в Luxx Aparts",
      "Заселение Luxx Aparts работает 24/7. Уточните время выезда, документы, оплату и отмену до подтверждения бронирования.",
      "/pravila",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          breadcrumbSchema("Правила", "/pravila"),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: rulesFaq.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          },
        ]),
      },
    ],
  }),
  component: RulesPage,
});
function RulesPage() {
  return (
    <ContentPage
      eyebrow="Правила"
      title="Какие правила действуют в Luxx Aparts?"
      intro="Заселение в Luxx Aparts доступно 24 часа в сутки. Если вы приезжаете поздно вечером или ночью, предупредите администратора заранее. Время выезда, список документов, способы оплаты, условия проживания с детьми и отмены бронирования подтвердите до оплаты — эти сведения пока уточняются."
    >
      <AnswerSection title="Как проходит заселение?">
        <ol className="mt-5 space-y-4 text-foreground">
          <li>
            <strong>1. Свяжитесь с администратором.</strong> Назовите даты и предпочтительный формат
            комнаты.
          </li>
          <li>
            <strong>2. Подтвердите условия.</strong> Уточните стоимость, время выезда, документы и
            оплату.
          </li>
          <li>
            <strong>3. Сообщите время прибытия.</strong> Это особенно важно при ночном заселении.
          </li>
        </ol>
      </AnswerSection>
      <AnswerSection title="Что нужно уточнить заранее?">
        <p>
          До оплаты запросите у администратора точные условия отмены, необходимость предоплаты,
          принимаемые способы оплаты, правила для детей, ограничения по курению и возможность
          размещения с животными. Luxx Aparts сообщает эти условия для конкретного бронирования,
          чтобы они соответствовали выбранным датам и комнате.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
