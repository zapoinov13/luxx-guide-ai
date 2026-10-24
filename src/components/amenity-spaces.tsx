import { useId, useState } from "react";
import { ArrowUpRight, CookingPot, Laptop, Sofa } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/button";
import "./amenity-spaces.css";

export function AmenitySpaces({ en = false }: { en?: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const rooms = [
    {
      photo: PHOTOS.kitchen,
      icon: CookingPot,
      tab: en ? "Kitchen" : "Кухня",
      title: en ? "Breakfast. Just your way." : "Завтрак. По вашим правилам.",
      text: en
        ? "Shared kitchen, dishes, free tea and coffee."
        : "Общая кухня, посуда, бесплатный чай и кофе.",
    },
    {
      photo: PHOTOS.loungeSofa,
      icon: Sofa,
      tab: en ? "Lounge" : "Лаундж",
      title: en ? "A little space to unwind." : "Передышка после города.",
      text: en
        ? "A shared lounge to rest between your plans."
        : "Общий лаундж для отдыха между вашими планами.",
    },
    {
      photo: PHOTOS.coworking,
      icon: Laptop,
      tab: en ? "Coworking" : "Работа",
      title: en ? "A little room for ideas." : "Место для ваших планов.",
      text: en
        ? "Wi-Fi, coworking and shared tables."
        : "Wi-Fi, коворкинг и общие столы для работы.",
    },
  ];
  return (
    <div className="amenity-spaces amenity-switcher spaces-refresh">
      <div
        className="amenity-tabs"
        role="tablist"
        aria-label={en ? "Shared spaces" : "Общие пространства"}
      >
        {rooms.map(({ tab, icon: Icon }, index) => (
          <Button variant="ghost"
            key={tab}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? rooms.length - 1
                    : event.key === "ArrowRight"
                      ? (selected + 1) % rooms.length
                      : event.key === "ArrowLeft"
                        ? (selected + rooms.length - 1) % rooms.length
                        : null;
              if (next !== null) {
                event.preventDefault();
                setSelected(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }
            }}
          >
            <Icon size={18} aria-hidden="true" />
            {tab}
          </Button>
        ))}
      </div>
      {rooms.map(({ photo, title, text, tab, icon: Icon }, index) => (
        <div
          key={photo.id}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={selected !== index}
          tabIndex={0}
          className="amenity-tab-panel"
        >
          <figure>
            <Photo photo={photo} sizes="(min-width:701px) 60vw,100vw" />
            <figcaption>
              <span className="space-category"><Icon size={20} aria-hidden="true" />{tab}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <Button asChild variant="link" className="space-details-link">
                <Link to={en ? "/en/amenities" : "/udobstva"}>
                  {en ? "Explore all amenities" : "Подробнее об удобствах"}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </Button>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
