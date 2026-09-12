import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { BlogCatalog } from "@/components/blog-catalog";
import { getPosts } from "@/lib/blog";
import { PHOTOS } from "@/lib/photos";
import { SITE, absolute, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";

const blogSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": absolute("/blog#blog"),
  name: `Блог ${SITE.name}`,
  url: absolute("/blog"),
  inLanguage: "ru",
  publisher: { "@id": absolute("/#hostel") },
  blogPost: getPosts().map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: absolute(`/blog/${post.slug}`),
    datePublished: post.date,
    dateModified: post.updated,
  })),
});
export const Route = createFileRoute("/blog/")({
  loader: () => getPosts(),
  head: () => ({
    ...pageHead(
      "Блог о поездках в Алматы от хостела Luxx Aparts",
      "Где остановиться в Алматы недорого, как доехать из аэропорта ночью, хостел или квартира посуточно, что посмотреть за два дня: статьи от хостела Luxx Aparts.",
      "/blog",
    ),
    scripts: jsonLd(webPageSchema("/blog"), breadcrumbSchema("Блог", "/blog"), blogSchema()),
  }),
  component: BlogIndexPage,
});
function BlogIndexPage() {
  const posts = Route.useLoaderData();
  return (
    <ContentPage
      eyebrow="Блог"
      title="Блог о поездках в Алматы"
      intro="Короткие практичные статьи для тех, кто едет в Алматы: как добраться ночью из аэропорта, где остановиться недорого, чем хостел отличается от квартиры посуточно, что успеть за два дня. Пишем только то, что проверили сами или на чём настаивают гости."
      photo={PHOTOS.coworking}
    >
      <BlogCatalog posts={posts} />
    </ContentPage>
  );
}
