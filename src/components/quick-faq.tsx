import { MessageCircle, ArrowUpRight, Plus } from "lucide-react";
import { SITE, type QA } from "@/lib/site";

export function QuickFaq({ items, en = false }: { items: readonly QA[]; en?: boolean }) {
  return (
    <div className="quick-faq">
      <aside className="faq-help">
        <span className="faq-help-icon">
          <MessageCircle size={25} aria-hidden="true" />
        </span>
        <p>{en ? "LET’S TALK" : "НА СВЯЗИ 24/7"}</p>
        <h3>{en ? "Your question. A real answer." : "Ваш вопрос. Живой ответ."}</h3>
        <span>
          {en
            ? "Need a little more detail? Ask our administrator about your stay."
            : "Не нашли нужного? Администратор подскажет по датам, номерам и условиям проживания."}
        </span>
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
          {en ? "Ask on WhatsApp" : "Спросить в WhatsApp"}
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      </aside>
      <div className="faq-questions">
        {items.map(([question, answer], i) => (
          <details key={question} open={i === 0} className="faq-question">
            <summary>
              <span className="faq-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{question}</h3>
              <span className="faq-toggle">
                <Plus size={20} aria-hidden="true" />
              </span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
