/**
 * Generate the 1200 × 630 social card from the Tinta footer's existing assets.
 * Run from any directory: node scripts/generate-social-image.mjs
 * No network, browser, or generative image service is used by this script.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = file => fs.readFile(path.join(root, file));
const width = 1200;
const height = 630;
const output = path.join(root, "public/images/lourdes-social.png");
const css = await read("src/components/cutout-footer.module.css").then(data => data.toString());

// Reuse the footer's actual paper silhouettes, so the card stays recognizable.
function polygon(selector, w, ht) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replaceAll(" ", "\\s+");
  const points = css.match(new RegExp(`\\.${escaped} \\{[^}]*clip-path:polygon\\(([^)]+)\\)`))?.[1];
  if (!points) throw new Error(`Missing footer polygon: ${selector}`);
  return points.split(",").map(pair => pair.trim().split(/\s+/)
    .map((n, index) => parseFloat(n) / 100 * (index ? ht : w)).join(",")).join(" ");
}

const files = {
  rose: "public/images/collage/redoute-rose.webp",
  bloom: "public/images/collage/redoute-rose-bloom.webp",
  artist: "public/images/lourdes-cutout.webp",
  newspaper: "public/images/collage/newspaper-el-comercio-1920.jpg",
};
const images = Object.fromEntries(await Promise.all(Object.entries(files).map(async ([name, file]) => {
  const png = await sharp(await read(file)).png().toBuffer();
  return [name, `data:image/png;base64,${png.toString("base64")}`];
})));
const img = (name, x, y, w, ht) => `<image href="${images[name]}" x="${x}" y="${y}" width="${w}" height="${ht}"/>`;

// Preserve the footer's layering: archival newspaper, botanical branch, person,
// then a foreground blossom. Everything stays inside a 40px artwork safe area.
const nw = 236, nh = 310, rw = 305, rh = rw * 1.307, bw = 180, bh = bw * 635 / 900;
const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="news"><polygon points="${polygon("newsprint", nw, nh)}"/></clipPath>
    <clipPath id="rose"><polygon points="${polygon("botanical img", rw, rh)}"/></clipPath>
    <clipPath id="bloom"><polygon points="${polygon("bloom img", bw, bh)}"/></clipPath>
    <filter id="news-tone"><feFlood flood-color="#e5ddc9" result="tint"/><feBlend in="SourceGraphic" in2="tint" mode="multiply"/></filter>
    <filter id="paper-edge" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="edge"/>
      <feFlood flood-color="#c99b90" result="color"/><feComposite in="color" in2="edge" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="#892737"/>
  <g transform="translate(662 212) rotate(-14 ${nw / 2} ${nh / 2})">
    <g clip-path="url(#news)" filter="url(#news-tone)">${img("newspaper", 0, nh - nw * 2 * 880 / 600, nw * 2, nw * 2 * 880 / 600)}</g>
  </g>
  <g transform="translate(832 42) rotate(16 ${rw / 2} ${rh / 2})">
    <g clip-path="url(#rose)">${img("rose", 0, 0, rw, rh)}</g>
  </g>
  <g transform="translate(653 105) rotate(-1 225 422)" filter="url(#paper-edge)">${img("artist", 0, 0, 483, 483 * .969)}</g>
  <g transform="translate(636 435) rotate(-22 ${bw / 2} ${bh / 2})">
    <g clip-path="url(#bloom)">${img("bloom", 0, 0, bw, bh)}</g>
  </g>
</svg>`;

const fontSpecs = [
  ["Anton", "public/fonts/social/anton-latin-400-normal.woff", 400],
  ["Bodoni", "public/fonts/social/bodoni-moda-latin-900-normal.woff", 900],
  ["Mono", "public/fonts/social/ibm-plex-mono-latin-400-normal.woff", 400],
  ["DM Sans", "node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff", 400],
];
const fonts = await Promise.all(fontSpecs.map(async ([name, file, weight]) => ({
  name, data: await read(file), weight, style: "normal",
})));

function nameLine(word, { left, top, size }) {
  const colors = ["#efe4ce", "#242322", "#d5a5a0", "#efe4ce", "#242322", "#efe4ce", "#d5a5a0"];
  const angles = [-5, 4, -2, 3, -3, 5, -3];
  const faces = ["Bodoni", "Anton", "DM Sans", "Anton", "Bodoni", "Bodoni", "Anton"];
  return h("div", { style: { position: "absolute", display: "flex", alignItems: "baseline", gap: 3, left, top } },
    ...Array.from(word).map((letter, i) => h("div", {
      key: `${word}-${i}`,
      style: {
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: i === 0 ? "3px 6px 8px" : "3px 8px 8px",
        background: colors[i], color: i === 1 || i === 4 ? "#f3e9d6" : "#282322",
        fontFamily: faces[i], fontWeight: faces[i] === "Bodoni" ? 900 : 400,
        fontSize: i === 3 ? size * .9 : size, lineHeight: 1.05,
        transform: `translateY(${i === 1 ? 5 : i === 3 ? 3 : i === 5 ? 2 : 0}px) rotate(${angles[i]}deg)`,
        boxShadow: "1px 2px 0 #3c152833",
      },
    }, i === 0 || i === 3 || i === 6 ? letter.toUpperCase() : letter)));
}

// Lettering uses the same font families/colors as the footer. It is a separate
// transparent layer because sharp's SVG renderer does not embed WOFF reliably.
const type = h("div", { style: { width, height, display: "flex", position: "relative", color: "#f4efe5" } },
  h("div", { style: { position: "absolute", left: 78, top: 152, fontFamily: "Mono", fontSize: 17, letterSpacing: 1 } }, "POP ACÚSTICO · MALLORCA"),
  nameLine("Lourdes", { left: 72, top: 227, size: 90 }),
  nameLine("Martín", { left: 108, top: 348, size: 100 }),
);
const response = new ImageResponse(type, { width, height, fonts });
const typePng = Buffer.from(await response.arrayBuffer());
await sharp(Buffer.from(artwork)).composite([{ input: typePng }]).png({ compressionLevel: 9 }).toFile(output);
const metadata = await sharp(output).metadata();
const stat = await fs.stat(output);
console.log(`Generated ${path.relative(root, output)} — ${metadata.width}×${metadata.height}, ${stat.size} bytes`);
