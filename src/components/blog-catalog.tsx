import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import { Photo } from "./photo";
import { formatDate, type PostMeta } from "@/lib/blog";

export function BlogCatalog({ posts }: { posts: readonly PostMeta[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const value = query.trim().toLocaleLowerCase();
  const filtered = posts.filter((post) =>
    `${post.title} ${post.description} ${post.tags.join(" ")}`.toLocaleLowerCase().includes(value),
  );
  return (
    <div className="blog-catalog">
      <div className="blog-search">
        <label htmlFor={id}>Что вас интересует?</label>
        <div>
          <Search size={18} aria-hidden="true" />
          <input
            id={id}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Аэропорт, бюджет, маршрут…"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск">
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      {query && (
        <p className="blog-search-count" role="status">
          Найдено статей: {filtered.length}
        </p>
      )}
      {!filtered.length && (
        <p className="blog-empty">Пока нет подходящей статьи. Попробуйте другое слово.</p>
      )}
      <ul className="blog-cards">
        {filtered.map((post) => (
          <li key={post.slug}>
            <article>
              {post.cover && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <Photo
                    photo={{ id: post.cover, alt: "", width: 1600, height: 1067 }}
                    sizes="(min-width: 768px) 33vw,100vw"
                  />
                </Link>
              )}
              <div className="blog-card-copy">
                <p className="blog-card-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>
                    <Clock3 size={14} aria-hidden="true" />
                    {post.readingMinutes} мин
                  </span>
                </p>
                <h2>
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>
                <p>{post.description}</p>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="blog-card-read">
                  Читать статью
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
