import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { roomCover } from "@/lib/photos";
import { ROOM_TYPES_EN } from "@/lib/site-en";

/** English room cards: one per room type, photo + price, link to the booking form. */
export function RoomCardsEn({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 ${className}`}>
      {ROOM_TYPES_EN.map((r) => (
        <li
          key={r.slug}
          className="grid grid-cols-[7.25rem_1fr] overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:grid-cols-1 sm:rounded-3xl"
        >
          <Photo
            photo={roomCover(r.slug)}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 116px"
            className="h-full w-full object-cover sm:aspect-[4/3] sm:h-auto"
          />
          <div className="flex flex-col p-3.5 sm:p-5">
            <h3 className="text-sm font-semibold leading-snug sm:font-display sm:text-lg">
              {r.name}
            </h3>
            <p className="mt-1.5 font-display text-xl font-bold sm:mt-3 sm:text-2xl">{r.price}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground sm:line-clamp-none sm:text-sm sm:leading-6">
              {r.short}. {r.priceNote}.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-3 w-full sm:mt-5 sm:w-auto sm:self-start"
            >
              <Link to="/en/booking" search={{ room: r.slug }}>
                Book
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
