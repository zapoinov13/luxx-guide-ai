import { ArrowUpRight, CookingPot, Laptop } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";

export function AmenitySpaces({ en = false }: { en?: boolean }) {
  return (
    <div className="amenity-spaces">
      <figure className="amenity-space">
        <Photo photo={PHOTOS.kitchen} sizes="(min-width: 1024px) 620px, 100vw" />
        <figcaption>
          <span className="space-icon">
            <CookingPot aria-hidden="true" />
          </span>
          <div>
            <span>{en ? "YOUR EVERYDAY COMFORT" : "ПРИВЫЧНЫЙ КОМФОРТ"}</span>
            <h3>{en ? "Breakfast. Just your way." : "Завтрак. По вашим правилам."}</h3>
            <p>
              {en
                ? "Shared kitchen, dishes, free tea and coffee."
                : "Общая кухня, посуда, бесплатный чай и кофе."}
            </p>
          </div>
        </figcaption>
      </figure>
      <figure className="amenity-space">
        <Photo photo={PHOTOS.loungeSofa} sizes="(min-width: 1024px) 420px, 100vw" />
        <figcaption>
          <span className="space-icon">
            <Laptop aria-hidden="true" />
          </span>
          <div>
            <span>{en ? "WORK & UNWIND" : "РАБОТА И ОТДЫХ"}</span>
            <h3>{en ? "A little room for ideas." : "Место для ваших планов."}</h3>
            <p>
              {en
                ? "Wi-Fi, coworking and a lounge to unwind."
                : "Wi-Fi, коворкинг и лаундж для передышки."}
            </p>
          </div>
        </figcaption>
      </figure>
      <Link to={en ? "/en/amenities" : "/udobstva"} className="amenities-more">
        {en ? "Explore all amenities" : "Подробнее об удобствах"}
        <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
    </div>
  );
}
