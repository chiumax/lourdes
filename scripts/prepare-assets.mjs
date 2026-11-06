/**
 * Deterministic extraction from the user-supplied references. No generated likenesses.
 * Originals stay in .context; all runtime output is committed under public/ and src/.
 * See docs/ASSETS.md for provenance, bounds, and limitations.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";
import potrace from "potrace";

const trace = promisify(potrace.trace);
const root = process.cwd();
const portrait = path.join(root, ".context/attachments/uBoep3/image.png");
const poster = path.join(root, ".context/attachments/0kEH4k/IMG_5176.png");
const instagram = path.join(root, ".context/attachments/PnYXyx/image.png");
for (const file of [portrait, poster, instagram]) {
  try { await fs.access(file); }
  catch { throw new Error(`Missing supplied reference: ${file}. Runtime assets are already committed; see docs/ASSETS.md to regenerate.`); }
}
for (const dir of ["public/brand", "public/images", "public/fonts", "src/lib"]) await fs.mkdir(dir, { recursive: true });

await sharp(portrait).rotate().webp({ quality: 88 }).toFile("public/images/lourdes-sunshine.webp");
await sharp(portrait).resize(192, 192).png().toFile("public/icon.png");
await sharp(portrait).resize(180, 180).png().toFile("public/apple-touch-icon.png");

// ICO container with PNG images at common favicon sizes.
const icons = await Promise.all([16, 32, 48].map((size) => sharp(portrait).resize(size, size).png().toBuffer()));
const icoHeader = Buffer.alloc(6 + icons.length * 16);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(icons.length, 4);
let offset = icoHeader.length;
icons.forEach((buffer, i) => {
  const entry = 6 + i * 16;
  const size = [16, 32, 48][i];
  icoHeader[entry] = size;
  icoHeader[entry + 1] = size;
  icoHeader.writeUInt16LE(1, entry + 4);
  icoHeader.writeUInt16LE(32, entry + 6);
  icoHeader.writeUInt32LE(buffer.length, entry + 8);
  icoHeader.writeUInt32LE(offset, entry + 12);
  offset += buffer.length;
});
await fs.writeFile("public/favicon.ico", Buffer.concat([icoHeader, ...icons]));

// Crop inside individual posts, omitting Instagram chrome and corner icons.
const crops = [
  { name: "lourdes-acoustic", left: 308, top: 1675, width: 525, height: 656 },
  { name: "guitar-by-the-pool", left: 884, top: 3200, width: 525, height: 656 },
];
for (const { name, ...bounds } of crops) {
  await sharp(instagram).extract(bounds).resize(640, 800).webp({ quality: 85 }).toFile(`public/images/${name}.webp`);
}

// The flat cream poster has the least obstructed, straight-on wordmark.
const bounds = { left: 230, top: 230, width: 610, height: 360 };
const { data, info } = await sharp(poster).extract(bounds).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const pink = Buffer.alloc(info.width * info.height, 255);
const silhouette = Buffer.alloc(info.width * info.height, 255);
for (let pixel = 0; pixel < pink.length; pixel++) {
  const r = data[pixel * 3];
  const g = data[pixel * 3 + 1];
  const b = data[pixel * 3 + 2];
  if (r > 140 && g < 175 && b > 90 && r > g * 1.3) pink[pixel] = 0;
  if (g < 175 && r > 65 && b > 60 && r > g * 1.3) silhouette[pixel] = 0;
}
async function vectorPath(mask) {
  const png = await sharp(mask, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();
  const svg = await trace(png, { threshold: 128, turdSize: 8, optTolerance: 0.3, color: "#000000" });
  const match = svg.match(/<path d="([^"]+)"/);
  if (!match) throw new Error("Logo trace produced no path");
  return match[1];
}
const foreground = await vectorPath(pink);
const outline = await vectorPath(silhouette);
function svg(body) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 610 360" role="img" aria-label="Lourdes Martín">${body}</svg>\n`; }
await fs.writeFile("public/brand/lourdes-signature-poster.svg", svg(`<path fill-rule="evenodd" fill="#663b59" d="${outline}"/><path fill-rule="evenodd" fill="#d77987" d="${foreground}"/>`));
await fs.writeFile("public/brand/lourdes-signature-ink.svg", svg(`<path fill-rule="evenodd" fill="#493d33" d="${foreground}"/>`));
await fs.writeFile("public/brand/lourdes-signature-rose.svg", svg(`<path fill-rule="evenodd" fill="#c56b77" d="${foreground}"/>`));
await fs.writeFile("src/lib/signature-paths.json", JSON.stringify({ viewBox: "0 0 610 360", foreground }, null, 2) + "\n");
// Transparent previews are rasterized from the extracted vector, not regenerated art.
await sharp("public/brand/lourdes-signature-poster.svg").resize(1220, 720).png().toFile("public/brand/lourdes-signature-poster.png");

for (const font of ["dm-sans", "caveat"]) {
  await fs.copyFile(`node_modules/@fontsource/${font}/files/${font}-latin-400-normal.woff2`, `public/fonts/${font}-latin-400-normal.woff2`);
  await fs.copyFile(`node_modules/@fontsource/${font}/LICENSE`, `public/fonts/${font}-LICENSE.txt`);
}
console.log("Prepared: 3 photos, 3 favicon formats, 3 signature SVGs, a transparent logo PNG, vector data, and 2 local fonts.");
