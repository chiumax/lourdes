// Verify crawler-visible metadata and discovery routes on a running production build.
// This does not prove indexing or a social network's cached preview has refreshed.
import assert from "node:assert/strict";
import sharp from "sharp";

const base = process.env.SITE_URL || "http://localhost:3000";
const production = "https://lourdes-rosy.vercel.app";
const imageUrl = `${production}/images/lourdes-social.png`;
const forceNoindex = ["1", "true"].includes(process.env.EXPECT_NOINDEX || "");
const titles = {
  es: "Lourdes Martín | Pop acústico desde Mallorca",
  en: "Lourdes Martín | Acoustic pop from Mallorca",
};
const concepts = ["", "tinta", "amplificador", "recortes"];
const imageAlts = new Map();

function decode(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)])),
  );
}

function oneMeta(meta, key, route) {
  const matches = meta.filter(tag => tag.name === key || tag.property === key);
  assert.equal(matches.length, 1, `${route}: exactly one ${key} tag`);
  return matches[0].content;
}

async function checkPage(locale, concept, userAgent) {
  const route = `/${locale}${concept ? `/${concept}` : ""}`;
  const response = await fetch(base + route, { headers: { "user-agent": userAgent } });
  assert.equal(response.status, 200, `${route}: crawler response`);
  const html = await response.text();
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${route}: head available without JavaScript`);
  assert.ok(head.includes(`<title>${titles[locale]}</title>`), `${route}: crawler title`);
  const meta = tags(head, "meta");
  const links = tags(head, "link");
  const isTinta = !concept || concept === "tinta";
  const canonical = `${production}/${locale}${isTinta ? "" : `/${concept}`}`;
  const canonicals = links.filter(link => link.rel === "canonical");
  assert.equal(canonicals.length, 1, `${route}: one canonical`);
  assert.equal(canonicals[0].href, canonical, `${route}: production canonical`);
  assert.ok(!links.some(link => link.hreflang?.toLowerCase().startsWith("en")), `${route}: no reference-English hreflang`);

  const shouldNoindex = forceNoindex || locale !== "es" || !isTinta;
  const robots = oneMeta(meta, "robots", route).split(",").map(value => value.trim());
  assert.ok(robots.includes(shouldNoindex ? "noindex" : "index"), `${route}: indexing policy`);
  assert.ok(!robots.includes(shouldNoindex ? "index" : "noindex"), `${route}: no conflicting indexing policy`);
  assert.ok(robots.includes("follow"), `${route}: links remain followable`);

  const description = oneMeta(meta, "description", route);
  assert.ok(description && description.length >= 40, `${route}: useful page description`);
  assert.equal(oneMeta(meta, "og:url", route), canonical, `${route}: production Open Graph URL`);
  assert.equal(oneMeta(meta, "og:type", route), "website", `${route}: Open Graph type`);
  assert.ok(oneMeta(meta, "og:title", route).includes("Lourdes Martín"), `${route}: Open Graph artist title`);
  assert.equal(oneMeta(meta, "og:description", route), description, `${route}: Open Graph description`);
  assert.equal(oneMeta(meta, "og:locale", route), locale === "es" ? "es_ES" : "en_GB", `${route}: Open Graph locale`);
  assert.equal(oneMeta(meta, "og:image", route), imageUrl, `${route}: absolute social image`);
  assert.equal(oneMeta(meta, "og:image:width", route), "1200", `${route}: declared social width`);
  assert.equal(oneMeta(meta, "og:image:height", route), "630", `${route}: declared social height`);
  assert.equal(oneMeta(meta, "og:image:type", route), "image/png", `${route}: declared social image type`);
  const alt = oneMeta(meta, "og:image:alt", route);
  assert.ok(alt && alt.length >= 20, `${route}: meaningful social image description`);
  if (imageAlts.has(locale)) assert.equal(alt, imageAlts.get(locale), `${route}: consistent localized image description`);
  imageAlts.set(locale, alt);

  assert.equal(oneMeta(meta, "twitter:card", route), "summary_large_image", `${route}: large social card`);
  assert.ok(oneMeta(meta, "twitter:title", route).includes("Lourdes Martín"), `${route}: Twitter artist title`);
  assert.equal(oneMeta(meta, "twitter:description", route), description, `${route}: Twitter description`);
  assert.equal(oneMeta(meta, "twitter:image", route), imageUrl, `${route}: absolute Twitter image`);
  assert.equal(oneMeta(meta, "twitter:image:alt", route), alt, `${route}: Twitter image description`);
  assert.ok(!meta.some(tag => ["twitter:creator", "twitter:site"].includes(tag.name)), `${route}: no unsupported Twitter handle`);

  const structured = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
  if (locale === "es" && isTinta) {
    assert.equal(structured.length, 1, `${route}: one structured-data graph`);
    assert.equal(structured[0]["@context"], "https://schema.org", `${route}: schema context`);
    const graph = structured[0]["@graph"];
    assert.ok(Array.isArray(graph), `${route}: linked structured data`);
    const artist = graph.find(entity => entity["@type"] === "MusicGroup");
    const website = graph.find(entity => entity["@type"] === "WebSite");
    const webpage = graph.find(entity => entity["@type"] === "WebPage");
    assert.ok(artist && website && webpage, `${route}: artist, website and webpage entities`);
    assert.equal(artist.name, "Lourdes Martín", `${route}: artist identity`);
    assert.equal(artist["@id"], `${production}/#artist`, `${route}: stable artist identity URL`);
    assert.ok(artist.genre, `${route}: music genre`);
    const artistImage = typeof artist.image === "string" ? artist.image : artist.image?.url;
    assert.ok(artistImage?.startsWith(`${production}/images/`), `${route}: artist image URL`);
    assert.deepEqual(new Set(artist.sameAs), new Set([
      "https://open.spotify.com/artist/246Ag05j7yjMUiIAMJ70A7",
      "https://www.instagram.com/lourdesmartin15/",
    ]), `${route}: verified artist profiles`);
    assert.equal(website["@id"], `${production}/#website`, `${route}: website identity URL`);
    assert.equal(webpage["@id"], `${production}/es#webpage`, `${route}: canonical webpage identity`);
    assert.equal(webpage.url, `${production}/es`, `${route}: structured canonical URL`);
  } else {
    assert.equal(structured.length, 0, `${route}: reference page has no competing artist graph`);
  }
  console.log(`PASS SEO ${route}: crawler head, canonical, robots, social tags, structured data`);
}

for (const locale of Object.keys(titles)) {
  for (const concept of concepts) await checkPage(locale, concept, "facebookexternalhit/1.1");
}
await checkPage("es", "", "Twitterbot/1.0");
assert.notEqual(imageAlts.get("es"), imageAlts.get("en"), "Social image descriptions are localized");

const imageResponse = await fetch(base + "/images/lourdes-social.png", { headers: { "user-agent": "facebookexternalhit/1.1" } });
assert.equal(imageResponse.status, 200, "Social image accessible to crawlers");
assert.ok(imageResponse.headers.get("content-type")?.startsWith("image/png"), "Social image response is PNG");
const image = await sharp(Buffer.from(await imageResponse.arrayBuffer())).metadata();
assert.equal(image.format, "png", "Social image binary is PNG");
assert.equal(image.width, 1200, "Social image actual width");
assert.equal(image.height, 630, "Social image actual height");

const robotsResponse = await fetch(base + "/robots.txt");
assert.equal(robotsResponse.status, 200, "robots.txt available");
const robots = await robotsResponse.text();
assert.match(robots, /User-Agent:\s*\*/i, "robots covers general crawlers");
assert.match(robots, /^Allow:\s*\/\s*$/im, "robots permits crawling");
assert.ok(!/^Disallow:\s*\/\S*\s*$/im.test(robots), "robots permits reading page-level indexing policy");
assert.ok(robots.includes(`Sitemap: ${production}/sitemap.xml`), "robots declares production sitemap");

const sitemapResponse = await fetch(base + "/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "sitemap.xml available");
const sitemap = await sitemapResponse.text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => decode(url));
assert.deepEqual(locations, [`${production}/es`], "Sitemap lists only the public canonical page");
assert.ok(!/hreflang="en(?:-[^"]+)?"/i.test(sitemap), "Sitemap does not promote English reference pages");
console.log(`PASS SEO resources: 1200×630 PNG, robots.txt and one-page canonical sitemap${forceNoindex ? "; preview noindex policy" : ""}.`);
