import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "@/lib/blog";
import { SITE, absolute } from "@/lib/site";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rss = () => {
  const items = getPosts()
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${absolute(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absolute(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00+05:00`).toUTCString()}</pubDate>
      <description>${escape(p.description)}</description>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`Блог ${SITE.name}`)}</title>
    <link>${absolute("/blog")}</link>
    <atom:link href="${absolute("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>${escape("Советы гостям Алматы от хостела Luxx Aparts")}</description>
    <language>ru</language>
${items}
  </channel>
</rss>
`;
};

export const Route = createFileRoute("/blog/rss.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(rss(), {
          headers: { "content-type": "application/rss+xml; charset=utf-8" },
        }),
    },
  },
});
