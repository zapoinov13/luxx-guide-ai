import { useId, useState } from "react";
import { MessageCircle, ArrowUpRight, Plus, Search, X } from "lucide-react";
import { SITE, type QA } from "@/lib/site";

import { matchesFaq } from "@/lib/faq-search";

export function QuickFaq({ items, en = false }: { items: readonly QA[]; en?: boolean }) {
  const [query, setQuery] = useState("");
  const id = useId();
  const matches = items.map(([question, answer]) => matchesFaq(question, answer, query));
  const count = matches.filter(Boolean).length;
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
        <div className="faq-search">
          <label htmlFor={id}>{en ? "Find an answer" : "Найти ответ"}</label>
          <div>
            <Search size={18} aria-hidden="true" />
            <input
              id={id}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={en ? "Dates, payment, kitchen…" : "Заезд, оплата, кухня…"}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={en ? "Clear search" : "Очистить поиск"}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        {query && (
          <p className="faq-results" role="status">
            {en ? `${count} answers found` : `Найдено ответов: ${count}`}
          </p>
        )}
        {count === 0 && (
          <p className="faq-empty">
            {en
              ? "Try another word or ask reception on WhatsApp."
              : "Попробуйте другое слово или задайте вопрос администратору в WhatsApp."}
          </p>
        )}
        {items.map(([question, answer], i) => (
          <details
            key={question}
            open={i === matches.indexOf(true)}
            hidden={!matches[i]}
            className="faq-question"
          >
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
