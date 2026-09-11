import { marked } from "marked";

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

export type Post = PostMeta & { html: string; text: string };

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

const plainText = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~-]+/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

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
    html: marked.parse(body, { async: false, gfm: true }) as string,
    text,
  };
};

const POSTS: Post[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPosts = (): PostMeta[] =>
  POSTS.map(({ html: _html, text: _text, ...meta }) => meta);

export const getPost = (slug: string): Post | undefined => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
