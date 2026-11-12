// Production HTTP checks. These verify rendered content and routing, not browser layout or interaction.
import assert from "node:assert/strict";

const base = process.env.SITE_URL || "http://localhost:3000";
const originalNavigation = ["tinta", "amplificador", "recortes"];
const experiments = ["carbon", "rojo", "azul-electrico"];
const concepts = [...originalNavigation, ...experiments];
const legacyConcepts = { postmarked: "tinta", "bedroom-floor": "amplificador", "blue-book": "recortes", "tinta-editorial": "tinta", "tinta-estudio": "tinta" };
const trackIds = ["2mvtMnxyRxaSTgcYTV8JIe", "4SK5CTgzKEBu7pcsSjbqGs", "6c7xGiUPfB8iDrfQ9NJcxz", "7Io1Ws8fngOaPx6HTSKgkW", "2PFr2WppXicoSHknhx9yDS"];
const checkedAssets = new Set();
const copy = {
  es: { title: "Lourdes Martín | Pop acústico desde Mallorca", skip: "Saltar al contenido", songs: "Canciones", photos: "Entre canciones", player: "Escucha a Lourdes Martín en Spotify" },
  en: { title: "Lourdes Martín | Acoustic pop from Mallorca", skip: "Skip to content", songs: "Songs", photos: "Between songs", player: "Listen to Lourdes Martín on Spotify" },
};

for (const [locale, text] of Object.entries(copy)) {
  for (const concept of ["", ...concepts]) {
    const isTinta = !concept || concept === "tinta" || experiments.includes(concept);
    const route = `/${locale}${concept ? `/${concept}` : ""}`;
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.ok(html.includes(`<html lang="${locale}"`), `${route}: document language`);
    assert.ok(html.includes(`data-design="${concept || "tinta"}"`), `${route}: expected variation`);
    assert.ok(html.includes(`<title>${text.title}</title>`), `${route}: translated title`);
    assert.ok(html.includes(text.skip) && html.includes(text.songs) && html.includes(text.photos), `${route}: translated body`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one artist H1`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${route}: one main landmark`);
    assert.ok(html.includes('name="viewport"'), `${route}: responsive viewport`);
    assert.ok(!html.includes('class="language-switch"'), `${route}: Spanish public presentation has no language switch`);
    assert.ok(!html.includes("/images/poster-"), `${route}: no concert archive in the selected simple structure`);
    assert.ok(!/songs &amp; little things|made of<br\/>|keep the little things|Loud heart|Soft songs/i.test(html), `${route}: retired slogans`);

    const iframes = [...html.matchAll(/<iframe\b[^>]*>/g)].map(match => match[0]);
    const animatedSignatures = [...html.matchAll(/<svg\b[^>]*class="[^"]*\bsignature-animated\b[^"]*"[\s\S]*?<\/svg>/g)].map(match => match[0]);
    if (isTinta) {
      assert.ok(!/<header\b/.test(html), `${route}: no header`);
      assert.ok(!html.includes('class="variation-bar"'), `${route}: no variation bar`);
      assert.ok(!html.includes('class="song-list"'), `${route}: custom song list replaced`);
      assert.ok(!html.includes('class="player-toggle"'), `${route}: no player activation step`);
      assert.ok(!html.includes("LM / Spotify"), `${route}: Spotify card label removed`);
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
      const mainText = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      assert.ok(!/01\s*\/\s*(Música|Music)|02\s*\/\s*(Fotos|Photos)/.test(mainText), `${route}: numbered section eyebrows removed`);
      const hero = html.match(/<section\b[^>]*\bid="home"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(hero, `${route}: artist hero present`);
      assert.ok(!/Pop acústico|Acoustic pop|Mallorca/.test(hero), `${route}: hero eyebrow removed`);
      assert.ok(!hero.includes("LOURDES MARTÍN — 01"), `${route}: hero margin label removed`);
      const heading = hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || "";
      const headingText = heading.replace(/<svg\b[\s\S]*?<\/svg>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      assert.equal(headingText, "Lourdes Martín", `${route}: readable artist heading independent of animation`);
      assert.equal(iframes.length, 1, `${route}: one immediately rendered player`);
      const player = iframes[0];
      assert.ok(player.includes(`title="${text.player}"`), `${route}: translated player title`);
      assert.ok(player.includes('width="100%"') && player.includes('height="352"'), `${route}: responsive player dimensions`);
      const playerSource = player.match(/\bsrc="([^"]+)"/)?.[1];
      assert.ok(playerSource, `${route}: player has a source`);
      const playerUrl = new URL(playerSource.replaceAll("&amp;", "&"));
      assert.equal(playerUrl.origin, "https://open.spotify.com", `${route}: Spotify player origin`);
      assert.equal(playerUrl.pathname, "/embed/artist/246Ag05j7yjMUiIAMJ70A7", `${route}: artist player`);
      assert.equal(playerUrl.searchParams.get("locale"), locale, `${route}: player locale`);
      assert.ok(!playerUrl.searchParams.has("autoplay"), `${route}: no autoplay request`);
      assert.equal(animatedSignatures.length, 1, `${route}: one animated hero signature`);
      assert.ok(animatedSignatures[0].includes('aria-hidden="true"') && animatedSignatures[0].includes('focusable="false"'), `${route}: decorative signature does not replace the accessible heading`);
    } else {
      assert.ok(/<header\b/.test(html), `${route}: variant header retained`);
      assert.ok(html.includes('class="variation-bar"'), `${route}: variant navigation retained`);
      assert.equal(iframes.length, 0, `${route}: Spotify stays deferred`);
      assert.equal(animatedSignatures.length, 0, `${route}: signature remains static`);
      for (const id of trackIds) {
        assert.ok(html.includes(`https://open.spotify.com/track/${id}`), `${route}: real track ${id}`);
      }
      for (const variation of originalNavigation) {
        assert.ok(html.includes(`href="/${locale}/${variation}"`), `${route}: same-language variation ${variation}`);
      }
      assert.ok(html.includes('aria-current="page"'), `${route}: current variation identified`);
    }
    for (const old of Object.keys(legacyConcepts)) {
      assert.ok(!html.includes(`href="/${locale}/${old}"`), `${route}: no retired design link ${old}`);
    }

    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(footer, `${route}: artist footer present`);
    assert.ok(/<footer\b[^>]*\bdata-visible="false"/.test(html), `${route}: footer motion waits for visibility`);
    assert.ok(!/<button\b/.test(footer), `${route}: footer controls removed`);

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
    console.log(`PASS ${route}: language, variation, content, music, footer, links, resources`);
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
  await checkRedirect("/", "/es", 308, cookie);
  for (const concept of concepts) await checkRedirect(`/${concept}`, `/es/${concept}`, concept === "tinta" ? 308 : 307, cookie);
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
console.log("Browser layout, mobile overflow, playback, signature animation, footer motion and reduced-motion behavior require separate browser verification.");
