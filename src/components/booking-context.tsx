import { createContext, useContext, forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type BookingSelection = {
  en: boolean;
  room?: string | undefined;
  variant?: string | undefined;
};
export const BookingContext = createContext<
  ((selection: BookingSelection, trigger: HTMLElement) => void) | null
>(null);

/** A real button: booking never navigates, even before the page is interactive. */
export const BookingButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to: string;
    search?: { room?: string; variant?: string };
  }
>(({ to, search, onClick, className, ...props }, ref) => {
  const openBooking = useContext(BookingContext);
  return (
    <button
      {...props}
      className={cn(!className?.includes("luxx-button") && buttonVariants(), className)}
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented)
          openBooking?.(
            { en: to.startsWith("/en/"), room: search?.room, variant: search?.variant },
            event.currentTarget,
          );
      }}
    />
  );
});
BookingButton.displayName = "BookingButton";
