import { useState } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { REVIEWS } from "@/lib/site";

export function ReviewBrowser() {
  const [source, setSource] = useState("");
  const [expanded, setExpanded] = useState(false);
  const sources = [...new Set(REVIEWS.map((review) => review.source))];
  const filtered = REVIEWS.filter((review) => !source || review.source === source);
  const visible = expanded ? filtered : filtered.slice(0, 3);
  return (
    <div className="review-browser">
      <div className="review-source-tabs" role="group" aria-label="Отзывы по площадкам">
        <button
          type="button"
          aria-pressed={!source}
          onClick={() => {
            setSource("");
            setExpanded(false);
          }}
        >
          Все площадки
        </button>
        {sources.map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={source === name}
            onClick={() => {
              setSource(name);
              setExpanded(false);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="stories-grid" aria-live="polite">
        {visible.map((review) => (
          <blockquote key={review.author + review.date} className="guest-story">
            <div className="story-top">
              <Quote size={29} aria-hidden="true" />
              <p className="story-score">
                <Star size={16} aria-hidden="true" />
                {review.score} / {review.scale}
              </p>
            </div>
            <p className="story-text">«{review.text}»</p>
            <footer className="story-author">
              <div>
                <strong>{review.author}</strong>
                <span>{review.date}</span>
              </div>
              <a href={review.url} target="_blank" rel="noreferrer">
                {review.source}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </footer>
          </blockquote>
        ))}
      </div>
      {filtered.length > 3 && (
        <button
          type="button"
          className="review-expand"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Свернуть отзывы" : `Показать все отзывы (${filtered.length})`}
        </button>
      )}
    </div>
  );
}
