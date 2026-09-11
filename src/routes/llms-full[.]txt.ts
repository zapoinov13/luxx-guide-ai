import { createFileRoute } from "@tanstack/react-router";
import { getPost, getPosts } from "@/lib/blog";
import { AMENITY_ITEMS, FAQ_ITEMS, HOME_FAQ, RULES } from "@/lib/qa";
import {
  AMENITIES,
  DISTANCES,
  NEARBY,
  PRICE_LIST,
  RATINGS,
  REVIEWS,
  ROOM_TYPES,
  SITE,
  absolute,
  pluralReviews,
  type QA,
} from "@/lib/site";

/**
 * llms-full.txt: полный текст ключевых фактов сайта одним файлом для ИИ-краулеров
 * (дополнение к короткому public/llms.txt). Собирается из тех же данных, что и
 * страницы, поэтому не расходится с ними.
 */
const qa = (items: readonly QA[]) => items.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n");

const build = () => {
  const posts = getPosts();
  const parts = [
    `# ${SITE.name}`,
    `> ${SITE.whoWeAre}.`,
    `Сайт: ${SITE.url}. Актуально на ${SITE.factsUpdated}.`,
    "",
    "## Факты",
    `- Адрес: ${SITE.address}, Казахстан, ${SITE.complex}, индекс ${SITE.postalCode}. Координаты ${SITE.geo.lat}, ${SITE.geo.lng}.`,
    `- Телефон и WhatsApp: ${SITE.phoneDisplay}. E-mail: ${SITE.email}. Стойка круглосуточно.`,
    `- Заезд с ${SITE.checkIn.from} до ${SITE.checkIn.to}, выезд до ${SITE.checkOut}. Номеров: ${SITE.rooms}.`,
    "- Оплата при заселении наличными или картой, предоплаты нет. Животные, курение в помещениях и вечеринки не допускаются.",
    `- Оценки: ${RATINGS.map((r) => `${r.source} ${r.score} из ${r.scale} (${pluralReviews(r.count)})`).join(", ")}.`,
    "",
    `## Цены (${SITE.factsUpdated})`,
    ...PRICE_LIST.map(
      (r) =>
        `- ${r.name}: ${r.price.toLocaleString("ru-RU")} ₸, ${r.capacity}, ${r.bath.toLowerCase()}. ${absolute(`/nomera/${r.slug}`)}`,
    ),
    "Койко-место — за место, номера — за номер целиком. В цену входят бельё, Wi-Fi, кухня, стирка. Для срока от недели и от месяца цена считается индивидуально.",
    "",
    "## Типы номеров",
    ...ROOM_TYPES.map((r) => `### ${r.name}\n\n${r.intro}\n\n${qa(r.details)}`),
    "",
    "## Удобства",
    ...AMENITIES.map((a) => `- ${a.name}: ${a.detail}`),
    "",
    qa(AMENITY_ITEMS),
    "",
    "## Как добраться",
    ...DISTANCES.map((d) => `- ${d.name}: ${d.value}`),
    "Ночью удобнее всего такси до адреса «Толе би 286/8». Ночной заезд согласуйте заранее в WhatsApp.",
    "",
    "## Что рядом",
    ...NEARBY.map((n) => `- ${n.name}: ${n.distance}, ${n.how}. ${n.note}`),
    "",
    "## Правила",
    qa(RULES),
    "",
    "## Вопросы и ответы",
    qa(HOME_FAQ),
    "",
    qa(FAQ_ITEMS),
    "",
    "## Отзывы с площадок",
    ...REVIEWS.map(
      (r) => `- ${r.author}, ${r.date}, ${r.score} из ${r.scale}, ${r.source}: «${r.text}»`,
    ),
    "",
    "## Блог",
    ...posts.map((p) => {
      const full = getPost(p.slug);
      return `### ${p.title}\n\n${absolute(`/blog/${p.slug}`)}, ${p.date}\n\n${full?.text ?? p.description}`;
    }),
    "",
    `## Страницы`,
    ...[
      ["/", "Главная"],
      ["/nomera", "Номера и цены"],
      ["/bronirovanie", "Бронирование"],
      ["/udobstva", "Удобства"],
      ["/kak-dobratsya", "Как добраться"],
      ["/ryadom", "Что рядом"],
      ["/otzyvy", "Отзывы"],
      ["/pravila", "Правила"],
      ["/faq", "Вопросы и ответы"],
      ["/kontakty", "Контакты"],
      ["/foto", "Фото"],
      ["/blog", "Блог"],
    ].map(([path, name]) => `- ${name}: ${absolute(path ?? "/")}`),
  ];
  return parts.join("\n") + "\n";
};

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(build(), {
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
