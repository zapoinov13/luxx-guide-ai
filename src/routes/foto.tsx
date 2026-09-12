import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { Photo } from "@/components/photo";
import { PHOTO_SECTIONS, PHOTOS } from "@/lib/photos";
import { absolute, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";

const gallerySchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Фото хостела Luxx Aparts в Алматы",
  url: absolute("/foto"),
  about: { "@id": absolute("/#hostel") },
  image: PHOTO_SECTIONS.flatMap((s) =>
    s.photos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: absolute(`/photos/${p.id}-1600.webp`),
      caption: p.alt,
      width: p.width,
      height: p.height,
    })),
  ),
});

export const Route = createFileRoute("/foto")({
  head: () => ({
    ...pageHead(
      "Фото хостела Luxx Aparts в Алматы: номера, кухня, санузлы",
      "30 фотографий хостела Luxx Aparts на Толе би 286/8: капсульные койко-места, одноместные и двухместные номера, кухня, коворкинг, душевые, шкафчики и стойка.",
      "/foto",
      { image: "/photos/04-1600.webp" },
    ),
    scripts: jsonLd(webPageSchema("/foto"), breadcrumbSchema("Фото", "/foto"), gallerySchema()),
  }),
  component: PhotoPage,
});

function PhotoPage() {
  const total = PHOTO_SECTIONS.reduce((n, s) => n + s.photos.length, 0);
  return (
    <main className="photo-page">
      <section className="photo-page-hero">
        <div className="photo-page-intro">
          <nav aria-label="Хлебные крошки">
            <Link to="/">Главная</Link>
            <span>/</span>
            <span aria-current="page">Фото</span>
          </nav>
          <p className="photo-kicker">LUXX APARTS · ALMATY · INSIDE</p>
          <h1>
            Как выглядит
            <br />
            хостел <span>Luxx Aparts</span>
          </h1>
          <p className="speakable">
            От своей капсулы до общего стола. {total} фотографий номеров, кухни и пространств, в
            которых проходит жизнь хостела.
          </p>
          <a className="photo-explore" href="#photo-zone-0">
            Смотреть фотографии <ArrowDown size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="photo-page-cover">
          <Photo photo={PHOTOS.loungeSofa} priority sizes="(min-width: 1024px) 55vw, 100vw" />
          <span className="photo-count">
            <strong>{total}</strong>КАДРОВ ИЗНУТРИ
          </span>
          <span className="photo-cover-label">01 / ОБЩЕЕ ПРОСТРАНСТВО</span>
        </div>
      </section>
      <nav className="photo-zone-nav" aria-label="Разделы фотогалереи">
        {["Номера и капсулы", "Кухня и отдых", "Санузлы", "Ресепшен"].map((label, i) => (
          <a href={`#photo-zone-${i}`} key={label}>
            <span>0{i + 1}</span>
            {label}
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        ))}
      </nav>
      <div className="photo-collections">
        {PHOTO_SECTIONS.map((s, i) => (
          <section className="photo-collection" id={`photo-zone-${i}`} key={s.title}>
            <div className="photo-collection-heading">
              <span className="collection-number">0{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
              <span className="collection-count">{s.photos.length} фото</span>
            </div>
            <Gallery photos={s.photos} editorial />
          </section>
        ))}
      </div>
      <section className="photo-booking">
        <div>
          <p>УЖЕ ПРЕДСТАВИЛИ СЕБЯ ЗДЕСЬ?</p>
          <h2>
            Теперь выберите
            <br />
            своё место.
          </h2>
        </div>
        <Link to="/nomera">
          Номера и цены <ArrowUpRight size={24} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
