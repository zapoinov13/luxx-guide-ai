import { Clock3, ContactRound, Users, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

export function StayRules({ en = false }: { en?: boolean }) {
  const rules = [
    {
      icon: ContactRound,
      title: en ? "Bring your ID" : "Возьмите документы",
      text: en
        ? "A photo ID; foreign guests need a passport."
        : "Удостоверение личности с фото. Иностранным гостям — паспорт.",
      tag: en ? "AT CHECK-IN" : "ПРИ ЗАСЕЛЕНИИ",
    },
    {
      icon: Users,
      title: en ? "Travelling with children" : "Если вы с детьми",
      text: en
        ? "Guests under 18 only with a parent or guardian."
        : "Гости до 18 лет — только с родителем или опекуном.",
      tag: en ? "UNDER 18" : "ДО 18 ЛЕТ",
    },
    {
      icon: ShieldCheck,
      title: en ? "Respect the shared space" : "Уважайте общий комфорт",
      text: en
        ? "Parties, smoking indoors and pets are not allowed."
        : "Вечеринки, курение в помещениях и проживание с животными не допускаются.",
      tag: en ? "HOUSE RULES" : "ОБЩИЕ ПРАВИЛА",
    },
  ];
  return (
    <ul className="stay-rules">
      <li className="rule-time">
        <div className="rule-icon">
          <Clock3 size={22} aria-hidden="true" />
        </div>
        <h3>{en ? "Your arrival & departure" : "Ваш заезд и выезд"}</h3>
        <dl className="rule-times">
          <div>
            <dt>{en ? "Check-in" : "Заезд"}</dt>
            <dd>
              {SITE.checkIn.from}
              <span> — {SITE.checkIn.to}</span>
            </dd>
          </div>
          <div>
            <dt>{en ? "Check-out by" : "Выезд до"}</dt>
            <dd>{SITE.checkOut}</dd>
          </div>
        </dl>
        <p className="rule-time-note">
          {en ? "24-hour reception" : "Стойка регистрации работает 24/7"}
        </p>
      </li>
      {rules.map(({ icon: Icon, title, text, tag }) => (
        <li key={title} className="rule-info">
          <div className="rule-icon">
            <Icon size={22} aria-hidden="true" />
          </div>
          <span className="rule-tag">{tag}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ul>
  );
}
