// Integration checks against the running production server. No browser required.
import assert from "node:assert/strict";
const base = process.env.SITE_URL || "http://localhost:3000";
const expected = process.env.EXPECTED_CONCEPT || "postmarked";
const concepts = ["postmarked", "bedroom-floor", "blue-book"];
const checkedAssets = new Set();
const copy = {
  es: { title: "Música", skip: "Saltar al contenido", music: "Canciones", poster: "Carteles guardados.", other: "en" },
  en: { title: "Music", skip: "Skip to content", music: "Songs", poster: "Posters worth keeping.", other: "es" },
};

for (const [locale, text] of Object.entries(copy)) {
  for (const concept of ["", ...concepts]) {
    const route = `/${locale}${concept ? `/${concept}` : ""}`;
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.ok(html.includes(`<html lang="${locale}"`), `${route}: document language`);
    assert.ok(html.includes(`data-design="${concept || expected}"`), `${route}: branch homepage`);
    assert.ok(html.includes(`<title>Lourdes Martín — ${text.title}</title>`), `${route}: translated title`);
    assert.ok(html.includes(text.skip) && html.includes(text.music) && html.includes(text.poster), `${route}: translated body`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one artist H1`);
    assert.ok(!html.includes("<iframe"), `${route}: Spotify stays deferred`);
    assert.ok(!/LOUD HEART|LESS PERFECT|KEEP IN|Wish you/.test(html), `${route}: retired slogans`);
    for (const id of ["2mvtMnxyRxaSTgcYTV8JIe", "4SK5CTgzKEBu7pcsSjbqGs", "6c7xGiUPfB8iDrfQ9NJcxz", "7Io1Ws8fngOaPx6HTSKgkW", "2PFr2WppXicoSHknhx9yDS"]) {
      assert.ok(html.includes(`https://open.spotify.com/track/${id}`), `${route}: real track ${id}`);
    }
    const alternate = `/${text.other}${concept ? `/${concept}` : ""}`;
    assert.ok(html.includes(`href="${alternate}" lang="${text.other}"`), `${route}: same-page language switch`);
    assert.ok(html.includes(`hrefLang="${text.other}"`) || html.includes(`hreflang="${text.other}"`), `${route}: language alternates`);
    for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), `${route}: anchor ${match[1]}`);
    for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
      const url = match[1].replaceAll("&amp;", "&");
      if (!checkedAssets.has(url)) {
        assert.equal((await fetch(base + url)).status, 200, `${route}: ${url}`);
        checkedAssets.add(url);
      }
    }
    console.log(`PASS ${route}: language, metadata, content, songs, links, images`);
  }
}

for (const path of ["/", ...concepts.map(concept => `/${concept}`)]) {
  for (const [cookie, locale] of [["", "es"], ["lm-language=en", "en"], ["lm-language=es", "es"], ["lm-language=fr", "es"]]) {
    const response = await fetch(base + path + "?source=test", { redirect: "manual", headers: { cookie } });
    assert.equal(response.status, 307, `redirect ${path}`);
    const location = new URL(response.headers.get("location"), base);
    assert.equal(location.pathname, `/${locale}${path === "/" ? "" : path}`);
    assert.equal(location.search, "?source=test");
  }
}
for (const route of ["/fr", "/fr/postmarked", "/es/missing", "/en/missing", "/es/blue-book/missing"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 404, route);
  if (route.startsWith("/es/") || route.startsWith("/en/")) {
    const html = await response.text();
    const message = route.startsWith("/es/") ? "Esta página no está aquí." : "This page isn’t here.";
    assert.ok(html.includes(message), `${route}: translated recovery content`);
  }
}
console.log(`PASS redirects: Spanish default, saved preference, legacy URLs, query strings; invalid routes 404. ${checkedAssets.size} linked resources checked.`);
