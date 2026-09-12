import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { LABELS, OPTIONS, PRESET, VARIANT_PRESET } from "@/lib/booking-ru";
import { BOOKING_LABELS_EN, BOOKING_OPTIONS_EN, BOOKING_PRESET_EN } from "@/lib/site-en";

export function BookingModal({
  selection,
  onClose,
  returnFocus,
}: {
  selection: { en: boolean; room?: string | undefined; variant?: string | undefined } | null;
  onClose: () => void;
  returnFocus: () => void;
}) {
  const en = selection?.en ?? false;
  const preset = en
    ? BOOKING_PRESET_EN[selection?.room ?? ""]
    : (VARIANT_PRESET[selection?.variant ?? ""] ?? PRESET[selection?.room ?? ""]);
  return (
    <Dialog.Root
      open={selection !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className="booking-modal fixed inset-x-0 bottom-0 z-[61] flex max-h-[94dvh] flex-col rounded-t-3xl bg-background shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[min(680px,calc(100vw-40px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            document.getElementById("booking-modal-title")?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus();
          }}
        >
          <div className="relative shrink-0 border-b border-border px-5 py-5 pr-16 sm:px-7">
            <Dialog.Title
              id="booking-modal-title"
              tabIndex={-1}
              className="text-2xl font-bold tracking-tight outline-none"
            >
              {en ? "Your stay at Luxx Aparts" : "Ваше проживание в Luxx Aparts"}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              {en
                ? "Choose dates and a room. No prepayment — the desk confirms availability."
                : "Выберите даты и номер. Без предоплаты — наличие подтвердит администратор."}
            </Dialog.Description>
            <Dialog.Close
              aria-label={en ? "Close booking" : "Закрыть бронирование"}
              className="absolute right-3 top-3 grid size-11 place-items-center rounded-full hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <X size={20} aria-hidden="true" />
            </Dialog.Close>
          </div>
          <div
            className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7"
            style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}
          >
            {selection && (
              <BookingForm
                locale={en ? "en" : "ru"}
                options={en ? BOOKING_OPTIONS_EN : OPTIONS}
                labels={en ? BOOKING_LABELS_EN : LABELS}
                preset={preset}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
