#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publish.py - адаптер публикации статьи (Этапы 9 и 12 методологии).

В коробке реализован адаптер `manual`: кладёт черновик в папку `published/`
с проставленным статусом во frontmatter и печатает путь. Этого хватает, чтобы
пройти весь процесс и опубликовать руками.

Адаптеры `wordpress` / `ghost` / `notion` / `custom` - точки расширения под ваш
CMS: метод понятен (взять структурированные данные статьи и отдать в API вашей
платформы), но сама интеграция зависит от вашего стека, поэтому реализуется вами.
Никогда не отдавайте тело «сырой» строкой с самодельным экранированием - только
структурированными полями (этим вы избегаете класса багов с литеральными `\\n`).

Использование:
  python3 tools/publish.py --adapter manual --slug my-post --status draft work/my-post/draft.md
  python3 tools/publish.py --adapter manual --slug my-post --status published work/my-post/draft.md
Коды выхода: 0 - опубликовано; 1 - адаптер требует вашей реализации; 2 - ошибка ввода.
"""
import argparse
import os
import re
import sys

ADAPTERS = ("manual", "wordpress", "ghost", "notion", "custom")


def set_frontmatter_status(text, status):
    """Проставить status в YAML-frontmatter (создать, если его нет)."""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            head = text[3:end]
            body = text[end + 4:]
            if re.search(r"^status:", head, re.M):
                head = re.sub(r"^status:.*$", f"status: {status}", head, flags=re.M)
            else:
                head = head.rstrip() + f"\nstatus: {status}\n"
            return f"---{head}\n---{body}"
    return f"---\nstatus: {status}\n---\n\n{text}"


def publish_manual(slug, status, draft_path):
    text = open(draft_path, encoding="utf-8").read()
    out_dir = "published"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{slug}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(set_frontmatter_status(text, status))
    print(f"manual-адаптер: статья сохранена -> {out_path} (status={status})")
    print("Следующий шаг: опубликуйте этот файл в своём разделе статей руками.")
    return 0


# ---------------------------------------------------------------------------
#  Адаптер проекта luxx-aparts.kz
#  Сайт собран на Vite + TanStack: статья - это файл content/blog/<slug>.md,
#  сборка сама делает страницу, разметку Article + FAQPage, sitemap, RSS и
#  llms.txt. Поэтому «опубликовать» здесь = положить файл и запушить.
#  Черновик кладём в content/blog-drafts/: сборка читает только content/blog/*.md,
#  так что черновик на сайт не попадёт.
# ---------------------------------------------------------------------------
SITE_CONTENT_DIR = os.path.join("content", "blog")
SITE_DRAFT_DIR = os.path.join("content", "blog-drafts")
REQUIRED_FRONTMATTER = ("title", "description", "date", "author")


def _frontmatter_keys(text):
    """Ключи YAML-frontmatter черновика (без парсера, по схеме файла)."""
    m = re.match(r"^---\r?\n([\s\S]*?)\r?\n---", text)
    if not m:
        return set()
    return {
        line.split(":", 1)[0].strip()
        for line in m.group(1).splitlines()
        if ":" in line and not line.startswith(" ")
    }


def publish_custom(slug, status, draft_path):
    text = open(draft_path, encoding="utf-8").read()

    missing = [k for k in REQUIRED_FRONTMATTER if k not in _frontmatter_keys(text)]
    if missing:
        sys.stderr.write(
            "во frontmatter нет обязательных полей: " + ", ".join(missing) + "\n"
            "сайт читает title, description, date, author (+ updated, cover, tags).\n"
        )
        return 2

    out_dir = SITE_CONTENT_DIR if status == "published" else SITE_DRAFT_DIR
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, slug + ".md")
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(text)

    print("custom-адаптер (luxx-aparts.kz): " + out_path + " (status=" + status + ")")
    if status == "published":
        print("Дальше:")
        print('  git add "' + out_path + '" && git commit -m "post: ' + slug + '" && git push')
        print("  после деплоя: node scripts/indexnow.mjs")
    else:
        print("Это черновик: на сайт он не попадёт, сборка читает только content/blog/*.md.")
        print("Когда статья готова - тот же вызов со --status published.")
    return 0


def main():
    p = argparse.ArgumentParser(
        description="Адаптер публикации статьи. В коробке - manual; остальные под ваш CMS.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("--adapter", required=True, choices=ADAPTERS, help="способ публикации (cms.adapter)")
    p.add_argument("--slug", required=True, help="slug статьи")
    p.add_argument("--status", default="draft", choices=("draft", "published"), help="статус")
    p.add_argument("draft", help="путь к черновику (.md)")
    args = p.parse_args()

    if not os.path.isfile(args.draft):
        sys.stderr.write(f"нет файла: {args.draft}\n")
        sys.exit(2)

    if args.adapter == "manual":
        sys.exit(publish_manual(args.slug, args.status, args.draft))

    if args.adapter == "custom":
        sys.exit(publish_custom(args.slug, args.status, args.draft))

    sys.stderr.write(
        f"адаптер «{args.adapter}» не реализован в коробке - подключите API вашего CMS "
        f"в этой функции (см. tools/README.md, раздел «Публикация»). "
        f"Передавайте тело структурированными полями, не сырой строкой.\n"
    )
    sys.exit(1)


if __name__ == "__main__":
    main()
