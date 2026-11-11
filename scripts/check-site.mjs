// Production HTTP checks. These verify rendered content and routing, not browser layout or interaction.
import assert from "node:assert/strict";

const base = process.env.SITE_URL || "http://localhost:3000";
const concepts = ["tinta", "amplificador", "recortes"];
const legacyConcepts = { postmarked: "tinta", "bedroom-floor": "amplificador", "blue-book": "recortes" };
const trackIds = ["2mvtMnxyRxaSTgcYTV8JIe", "4SK5CTgzKEBu7pcsSjbqGs", "6c7xGiUPfB8iDrfQ9NJcxz", "7Io1Ws8fngOaPx6HTSKgkW", "2PFr2WppXicoSHknhx9yDS"];
const checkedAssets = new Set();
const copy = {
  es: { title: "Música", skip: "Saltar al contenido", songs: "Canciones", photos: "Entre canciones", pause: "Pausar animación" },
  en: { title: "Music", skip: "Skip to content", songs: "Songs", photos: "Between songs", pause: "Pause animation" },
};

for (const [locale, text] of Object.entries(copy)) {
  for (const concept of ["", ...concepts]) {
    const route = `/${locale}${concept ? `/${concept}` : ""}`;
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.ok(html.includes(`<html lang="${locale}"`), `${route}: document language`);
    assert.ok(html.includes(`data-design="${concept || "tinta"}"`), `${route}: expected variation`);
    assert.ok(html.includes(`<title>Lourdes Martín — ${text.title}</title>`), `${route}: translated title`);
    assert.ok(html.includes(text.skip) && html.includes(text.songs) && html.includes(text.photos), `${route}: translated body`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one artist H1`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${route}: one main landmark`);
    assert.ok(html.includes('name="viewport"'), `${route}: responsive viewport`);
    assert.ok(!html.includes("<iframe"), `${route}: Spotify stays deferred`);
    assert.ok(!html.includes('class="language-switch"'), `${route}: Spanish public presentation has no language switch`);
    assert.ok(!html.includes("/images/poster-"), `${route}: no concert archive in the selected simple structure`);
    assert.ok(!/songs &amp; little things|made of<br\/>|keep the little things|Loud heart|Soft songs/i.test(html), `${route}: retired slogans`);

    for (const id of trackIds) {
      assert.ok(html.includes(`https://open.spotify.com/track/${id}`), `${route}: real track ${id}`);
    }
    for (const variation of concepts) {
      assert.ok(html.includes(`href="/${locale}/${variation}"`), `${route}: same-language variation ${variation}`);
    }
    assert.ok(html.includes('aria-current="page"'), `${route}: current variation identified`);
    for (const old of Object.keys(legacyConcepts)) {
      assert.ok(!html.includes(`href="/${locale}/${old}"`), `${route}: no retired design link ${old}`);
    }

    assert.ok(html.includes('data-motion="running"'), `${route}: animated footer state`);
    const buttons = [...html.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/g)].map(match => match[0]);
    assert.ok(buttons.some(button => button.includes(text.pause) && !button.includes("aria-pressed=")), `${route}: labeled motion control`);

    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${match[1]}"`), `${route}: anchor ${match[1]}`);
    }
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      assert.ok(/\balt="[^"]*"/.test(match[0]), `${route}: image has an alt attribute`);
      assert.ok(/\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]), `${route}: image reserves its dimensions`);
    }
    for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
      const url = match[1].replaceAll("&amp;", "&");
      if (!checkedAssets.has(url)) {
        const asset = await fetch(base + url);
        assert.equal(asset.status, 200, `${route}: ${url}`);
        assert.ok((await asset.arrayBuffer()).byteLength > 0, `${route}: nonempty ${url}`);
        checkedAssets.add(url);
      }
    }
    console.log(`PASS ${route}: language, variation, content, music, footer controls, links, resources`);
  }
}

async function checkRedirect(path, target, status, cookie = "") {
  const response = await fetch(base + path + "?source=review", { redirect: "manual", headers: { cookie } });
  assert.equal(response.status, status, `${path}: redirect status`);
  const location = new URL(response.headers.get("location"), base);
  assert.equal(location.pathname, target, `${path}: redirect destination`);
  assert.equal(location.search, "?source=review", `${path}: query retained`);
}

// Spanish is the public entry language, including visitors with an older English preference.
for (const cookie of ["", "lm-language=en", "lm-language=es", "lm-language=fr"]) {
  await checkRedirect("/", "/es", 307, cookie);
  for (const concept of concepts) await checkRedirect(`/${concept}`, `/es/${concept}`, 307, cookie);
}
for (const [old, replacement] of Object.entries(legacyConcepts)) {
  await checkRedirect(`/${old}`, `/es/${replacement}`, 308);
  for (const locale of Object.keys(copy)) await checkRedirect(`/${locale}/${old}`, `/${locale}/${replacement}`, 308);
}
for (const route of ["/fr", "/fr/tinta", "/es/missing", "/en/missing", "/es/tinta/missing"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 404, route);
  if (route.startsWith("/es/") || route.startsWith("/en/")) {
    const html = await response.text();
    const message = route.startsWith("/es/") ? "Esta página no está aquí." : "This page isn’t here.";
    assert.ok(html.includes(message), `${route}: translated recovery content`);
  }
}
console.log(`PASS redirects: Spanish entry, stale preferences, retired designs, query strings and invalid-route 404s. ${checkedAssets.size} linked resources checked.`);
console.log("Browser layout, mobile overflow, playback and pause/replay behavior require separate browser verification.");
