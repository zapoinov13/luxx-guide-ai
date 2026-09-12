import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Compass } from "lucide-react";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";

const stops = [
  {
    photo: PHOTOS.reception,
    ru: "Добро пожаловать",
    en: "Welcome inside",
    detail: "Стойка регистрации",
    detailEn: "Reception",
  },
  {
    photo: PHOTOS.loungeSofa,
    ru: "Место для своих",
    en: "Make yourself at home",
    detail: "Лаундж и коворкинг",
    detailEn: "Lounge & coworking",
  },
  {
    photo: PHOTOS.dorm,
    ru: "Ваш маленький мир",
    en: "Your own little world",
    detail: "Капсульные места",
    detailEn: "Capsule beds",
  },
  {
    photo: PHOTOS.single,
    ru: "Время для себя",
    en: "A little time for yourself",
    detail: "Одноместный номер",
    detailEn: "Single room",
  },
  {
    photo: PHOTOS.privateRoom,
    ru: "Путешествовать вдвоём",
    en: "Better together",
    detail: "Двухместный номер",
    detailEn: "Double room",
  },
  {
    photo: PHOTOS.kitchen,
    ru: "Как дома",
    en: "Just like home",
    detail: "Общая кухня",
    detailEn: "Shared kitchen",
  },
] as const;

export function PhotoTour({
  en = false,
  showGalleryLink = false,
}: {
  en?: boolean;
  showGalleryLink?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const stop = stops[index] ?? stops[0];
  const step = (direction: number) =>
    setIndex((value) => (value + direction + stops.length) % stops.length);
  return (
    <section
      className="photo-tour"
      id="photo-tour"
      aria-label={en ? "Photo walk through the hostel" : "Фотопрогулка по хостелу"}
    >
      <div className="tour-heading">
        <div>
          <p className="design-eyebrow">
            <Compass size={16} aria-hidden="true" /> {en ? "EXPLORE LUXX" : "ЗАГЛЯНИТЕ ВНУТРЬ"}
          </p>
          <h2>
            {en ? "Feel the place. Before you arrive." : "Почувствуйте место. Ещё до поездки."}
          </h2>
        </div>
        <p>
          {en
            ? "A photo walk through six spaces. Real photos, your own pace."
            : "Фотопрогулка по шести зонам. Реальные фотографии, ваш собственный темп."}
        </p>
      </div>
      <div className="tour-stage">
        <Photo
          key={stop.photo.id}
          photo={stop.photo}
          className="tour-image"
          sizes="(min-width: 1200px) 1100px, 100vw"
        />
        <div className="tour-shade" aria-hidden="true" />
        <span className="tour-badge">
          <Compass size={15} aria-hidden="true" />{" "}
          {en ? "PHOTO WALK · 6 SPACES" : "ФОТОПРОГУЛКА · 6 ЗОН"}
        </span>
        <div className="tour-caption" aria-live="polite" aria-atomic="true">
          <span>
            0{index + 1} / 0{stops.length} — {en ? stop.detailEn : stop.detail}
          </span>
          <h3>{en ? stop.en : stop.ru}</h3>
        </div>
        <div className="tour-arrows">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={en ? "Previous space" : "Предыдущая зона"}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={en ? "Next space" : "Следующая зона"}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="tour-stops" role="group" aria-label={en ? "Choose a space" : "Выберите зону"}>
        {stops.map((item, i) => (
          <button
            key={item.photo.id}
            type="button"
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            <span>0{i + 1}</span>
            {en ? item.detailEn : item.detail}
          </button>
        ))}
      </div>
      {showGalleryLink && (
        <div className="mt-6 border-t border-white/20 pt-5">
          <Link
            to="/foto"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {en ? "View all 30 photos" : "Все 30 фотографий"}
          </Link>
        </div>
      )}
    </section>
  );
}
