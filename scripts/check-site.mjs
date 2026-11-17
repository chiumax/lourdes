// Production HTTP checks for the single Spanish page. These verify rendered content and routing,
// not browser layout, animation, playback or dragging.
import assert from "node:assert/strict";

const base = process.env.SITE_URL || "http://localhost:3000";
const route = "/es";
const sections = ["inicio", "single", "musica", "conciertos", "videos", "fotos", "redes"];
const trackIds = ["2mvtMnxyRxaSTgcYTV8JIe", "4SK5CTgzKEBu7pcsSjbqGs", "6c7xGiUPfB8iDrfQ9NJcxz", "7Io1Ws8fngOaPx6HTSKgkW", "2PFr2WppXicoSHknhx9yDS"];
const videoIds = ["bHIWU0SM74Y", "3O8ehu78l5U", "JZLp097PO_M", "1txHu0BC8Ws"];
const profiles = [
  "https://www.instagram.com/lourdesmartin15/",
  "https://www.tiktok.com/@lourdes.martin",
  "https://www.youtube.com/@lourdes.martin",
  "https://open.spotify.com/artist/246Ag05j7yjMUiIAMJ70A7",
];
const retired = ["tinta", "amplificador", "recortes", "postmarked", "bedroom-floor", "blue-book", "tinta-editorial", "tinta-estudio"];
const text = html => html.replace(/<script\b[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const response = await fetch(base + route);
assert.equal(response.status, 200, route);
const html = await response.text();

// Document
assert.ok(html.includes('<html lang="es"'), "document language is Spanish");
assert.ok(html.includes("<title>Lourdes Martín | Pop acústico desde Mallorca</title>"), "page title");
assert.ok(html.includes('name="viewport"'), "responsive viewport");
assert.ok(html.includes('data-design="estrella"'), "Estrella design is served");
assert.ok(html.includes("Saltar al contenido"), "skip link");
assert.equal((html.match(/<main\b/g) || []).length, 1, "one main landmark");
const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
assert.equal(headings.length, 1, "one H1");
assert.equal(text(headings[0][1]).trim(), "Lourdes Martín", "the H1 reads as the artist's name without the lettering image");
for (const design of retired) assert.ok(!html.includes(`/${design}"`), `no link to the removed design ${design}`);

// Sections and navigation
for (const id of sections) assert.ok(new RegExp(`<section\\b[^>]*\\bid="${id}"`).test(html), `section #${id}`);
const nav = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
assert.ok(nav, "site navigation present");
for (const id of ["musica", "conciertos", "videos", "fotos", "redes"]) assert.ok(nav.includes(`href="#${id}"`), `navigation links to #${id}`);
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), `anchor #${match[1]} has a target`);

// Hero
const hero = html.match(/<section\b[^>]*\bid="inicio"[\s\S]*?<\/section>/)?.[0] || "";
const video = hero.match(/<video\b[^>]*>/)?.[0];
assert.ok(video, "hero background video");
for (const attribute of ["autoPlay", "muted", "loop", "playsInline"]) assert.ok(new RegExp(`\\b${attribute}\\b`, "i").test(video), `hero video is ${attribute}`);
assert.ok(/\bposter="\/images\/hero-playa\.webp"/.test(video), "hero video has a still poster");

// Music: every song links to Spotify, and only the artist player loads up front.
for (const id of trackIds) assert.ok(html.includes(`https://open.spotify.com/track/${id}`), `track ${id}`);
const iframes = [...html.matchAll(/<iframe\b[^>]*>/g)].map(match => match[0]);
assert.equal(iframes.length, 1, "one player rendered up front; the vinyl and YouTube players wait for a press");
const playerUrl = new URL(iframes[0].match(/\bsrc="([^"]+)"/)[1].replaceAll("&amp;", "&"));
assert.equal(playerUrl.origin, "https://open.spotify.com", "Spotify player origin");
assert.equal(playerUrl.pathname, "/embed/artist/246Ag05j7yjMUiIAMJ70A7", "artist player");
assert.equal(playerUrl.searchParams.get("locale"), "es", "player in Spanish");
assert.ok(!playerUrl.searchParams.has("autoplay"), "no autoplay request");
assert.ok(/\bloading="lazy"/.test(iframes[0]) && /\btitle="[^"]+"/.test(iframes[0]), "player is lazy and titled");
assert.ok(!html.includes("youtube-nocookie.com/embed") && !html.includes("embed/iframe-api"), "nothing from YouTube or the Spotify API loads before a press");

// Concerts: either dated rows or the empty state, never a blank section.
const concerts = html.match(/<section\b[^>]*\bid="conciertos"[\s\S]*?<\/section>/)?.[0] || "";
assert.ok(/<time\b[^>]*dateTime="\d{4}-\d{2}-\d{2}"/i.test(concerts) || text(concerts).includes("ahora mismo no hay fechas"), "concert dates or the empty state");

// Videos: the featured clip and the three curated videoclips, each with a watch link fallback.
const videos = html.match(/<section\b[^>]*\bid="videos"[\s\S]*?<\/section>/)?.[0] || "";
assert.ok(videos.includes(`ytimg.com%2Fvi%2F${videoIds[0]}`), "featured video poster");
for (const id of videoIds.slice(1)) assert.ok(videos.includes(`https://www.youtube.com/watch?v=${id}`), `videoclip ${id}`);
assert.ok(/aria-label="Reproducir: [^"]+"/.test(videos), "play control is labelled");

// Socials, in the follow section and again in the footer.
const follow = html.match(/<section\b[^>]*\bid="redes"[\s\S]*?<\/section>/)?.[0] || "";
const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
assert.ok(footer, "footer present");
for (const url of profiles) {
  assert.ok(follow.includes(`href="${url}"`), `follow section links ${url}`);
  assert.ok(footer.includes(`href="${url}"`), `footer links ${url}`);
}
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.ok(/\brel="noreferrer"/.test(match[0]), "external links do not leak the referrer");

// Images and local resources
const images = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
assert.ok(images.length >= 15, "photo sections rendered");
for (const image of images) {
  assert.ok(/\balt="[^"]*"/.test(image), "image has an alt attribute");
  assert.ok(/\bwidth="\d+"/.test(image) && /\bheight="\d+"/.test(image), "image reserves its dimensions");
}
const checked = new Set();
for (const match of html.matchAll(/(?:src|href|poster)="(\/[^"#]*)"/g)) {
  const url = match[1].replaceAll("&amp;", "&");
  if (checked.has(url)) continue;
  const asset = await fetch(base + url);
  assert.equal(asset.status, 200, url);
  assert.ok((await asset.arrayBuffer()).byteLength > 0, `nonempty ${url}`);
  checked.add(url);
}
assert.equal((await fetch(base + "/brand/lourdes-martin-lettering.svg")).status, 200, "lettering used by the CSS mask");
console.log(`PASS ${route}: document, sections, hero, music, concerts, videos, socials, ${images.length} images, ${checked.size} local resources`);

// Routing: one public page. The bare domain lands on it; the removed designs and English pages are gone.
async function checkRedirect(path) {
  const redirect = await fetch(base + path + "?source=review", { redirect: "manual" });
  assert.equal(redirect.status, 308, `${path}: permanent redirect`);
  const location = new URL(redirect.headers.get("location"), base);
  assert.equal(location.pathname, "/es", `${path}: lands on the Spanish page`);
  assert.equal(location.search, "?source=review", `${path}: query retained`);
}
await checkRedirect("/");
for (const path of ["/fr", "/en", "/en/tinta", "/es/missing", "/es/missing/deeper", ...retired.flatMap(design => [`/${design}`, `/es/${design}`])]) {
  const missing = await fetch(base + path);
  assert.equal(missing.status, 404, path);
}
console.log(`PASS routing: the root redirects to /es with its query; English, the ${retired.length} removed design names and unknown routes are 404.`);
console.log("Not covered here: layout, mobile overflow, animation, video and Spotify playback, photo dragging, reduced motion. Check those in a browser.");
