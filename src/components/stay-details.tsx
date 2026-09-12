import { ArrowUpRight, Sparkles } from "lucide-react";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";

export function StayDetails({ en = false }: { en?: boolean }) {
  return (
    <>
      <figure className="stay-postcard">
        <Photo photo={PHOTOS.single} sizes="220px" />
        <figcaption>
          {en ? "Your quiet corner" : "Ваш тихий уголок"}
          <Sparkles size={15} aria-hidden="true" />
        </figcaption>
      </figure>
      <a
        href="#room-explorer"
        className="explore-seal"
        aria-label={en ? "Explore the rooms" : "Рассмотреть номера"}
      >
        <ArrowUpRight aria-hidden="true" />
        <span>
          {en ? "TAKE A LOOK" : "ЗАГЛЯНУТЬ"}
          <br />
          {en ? "INSIDE" : "ВНУТРЬ"}
        </span>
      </a>
      <span className="stay-coordinate">43.2477° N / 76.8681° E</span>
    </>
  );
}
