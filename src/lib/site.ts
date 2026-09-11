export const SITE = {
  name: "Luxx Aparts",
  phoneDisplay: "+7 771 877 7765",
  phoneHref: "+7771877765",
  whatsapp: "https://wa.me/7771877765",
  address: "ул. Толе би 286/8, 2 этаж, Алматы",
  postalCode: "050005",
  booking: "https://www.booking.com/hotel/kz/luxx-aparts.ru.html",
} as const;

export const breadcrumbSchema = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
    { "@type": "ListItem", position: 2, name, item: path },
  ],
});

export const pageHead = (title: string, description: string, path: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: path }],
});