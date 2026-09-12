// Отправляет адреса из sitemap.xml в IndexNow (Яндекс, Bing и другие участники).
// Запуск после публикации новых или изменённых страниц: node scripts/indexnow.mjs
// Ключ — имя файла <ключ>.txt в public/ (IndexNow проверяет его по адресу https://хост/<ключ>.txt).
import { readdirSync } from "node:fs";

const SITE_URL = "https://luxx-aparts.kz";
const key = readdirSync("public")
  .map((f) => /^([a-f0-9]{32})\.txt$/.exec(f)?.[1])
  .find(Boolean);
if (!key) throw new Error("В public/ нет файла ключа IndexNow (<32 hex>.txt)");

const xml = await fetch(`${SITE_URL}/sitemap.xml`).then((r) => r.text());
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: ${urlList.length} адресов, ответ ${res.status} ${res.statusText}`);
