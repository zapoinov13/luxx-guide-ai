import { useId, useState } from "react";
import { CheckCheck, ClipboardList } from "lucide-react";

export function ArrivalChecklist({ en = false }: { en?: boolean }) {
  const id = useId();
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const labels = en
    ? ["Dates confirmed with reception", "Check-in times checked", "ID and address ready"]
    : [
        "Даты согласованы с администратором",
        "Время заселения проверено",
        "Документы и адрес под рукой",
      ];
  const count = checked.filter(Boolean).length;
  return (
    <div className="arrival-checklist">
      <div className="arrival-checklist-title">
        <ClipboardList size={24} aria-hidden="true" />
        <div>
          <h3>{en ? "Ready for your arrival?" : "Всё готово к приезду?"}</h3>
          <p>
            {en
              ? "Your personal checklist. It does not confirm a booking."
              : "Ваш личный список. Не является подтверждением бронирования."}
          </p>
        </div>
      </div>
      <div className="arrival-checklist-items">
        {labels.map((label, index) => (
          <label key={label} htmlFor={`${id}-${index}`}>
            <input
              id={`${id}-${index}`}
              type="checkbox"
              checked={checked[index]}
              onChange={(event) =>
                setChecked((previous) =>
                  previous.map((value, i) => (i === index ? event.target.checked : value)),
                )
              }
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <p className="arrival-checklist-status" role="status">
        <CheckCheck size={17} aria-hidden="true" />
        {en ? `${count} of 3 ready` : `Готово ${count} из 3`}
      </p>
    </div>
  );
}
