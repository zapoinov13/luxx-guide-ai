import { marked, Renderer } from "marked";

/**
 * Блог: статьи лежат в content/blog/<slug>.md с frontmatter.
 * Новая статья = новый файл в этой папке, сайт пересобирается сам.
 * Формат и правила для авторов и автоматики — в docs/blog-automation.md.
 */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO-дата публикации, YYYY-MM-DD. */
  date: string;
  /** ISO-дата последней правки, по умолчанию равна date. */
  updated: string;
  author: string;
  /** Номер фото из public/photos (например, "17") или пустая строка. */
  cover: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
  text: string;
  /** Пары «вопрос — ответ» для FAQPage: заголовки-вопросы статьи и текст под ними. */
  faq: [question: string, answer: string][];
};

const files = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const parseFrontmatter = (raw: string): { data: Record<string, string>; body: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] ?? "" };
};

/**
 * FAQPage для статьи: берём заголовки второго уровня, заканчивающиеся вопросом,
 * и текст под ними до следующего заголовка. Ничего не сочиняем — только то,
 * что уже написано в статье. Это та структура, которую ИИ-движки вытаскивают
 * в ответ дословно.
 */
const extractFaq = (body: string): [string, string][] => {
  const sections = body.split(/^##\s+/m).slice(1);
  const pairs: [string, string][] = [];
  for (const section of sections) {
    const breakAt = section.indexOf("\n");
    if (breakAt === -1) continue;
    const question = section.slice(0, breakAt).trim();
    if (!question.endsWith("?")) continue;
    const answer = plainText(section.slice(breakAt)).slice(0, 900).trim();
    if (answer.length < 40) continue;
    pairs.push([question, answer]);
  }
  return pairs;
};

const plainText = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Разметку снимаем построчно, чтобы не съесть дефис внутри слова:
    // «койко-место» и «SIM-карта» должны остаться собой.
    .replace(/^\s{0,3}#{1,6}\s+/gm, " ")
    .replace(/^\s{0,3}[-*+]\s+/gm, " ")
    .replace(/^\s{0,3}>\s?/gm, " ")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* Таблицы в статьях оборачиваются в прокручиваемый блок, чтобы не ломать мобильную вёрстку. */
const renderer = new Renderer();
const baseTable = renderer.table.bind(renderer);
renderer.table = (token) => `<div class="table-scroll table-wide">${baseTable(token)}</div>`;

const toPost = (path: string, raw: string): Post => {
  const slug = path.replace(/^.*\//, "").replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);
  const text = plainText(body);
  const words = text.split(" ").filter(Boolean).length;
  const date = data["date"] ?? "1970-01-01";
  return {
    slug,
    title: data["title"] ?? slug,
    description: data["description"] ?? "",
    date,
    updated: data["updated"] ?? date,
    author: data["author"] ?? "Команда Luxx Aparts",
    cover: data["cover"] ?? "",
    tags: (data["tags"] ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    readingMinutes: Math.max(1, Math.round(words / 180)),
    html: marked.parse(body, { async: false, gfm: true, renderer }) as string,
    text,
    faq: extractFaq(body),
  };
};

const POSTS: Post[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPosts = (): PostMeta[] =>
  POSTS.map(({ html: _html, text: _text, faq: _faq, ...meta }) => meta);

export const getPost = (slug: string): Post | undefined => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
