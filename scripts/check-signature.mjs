// Geometry checks for the exact signature and its pen masks.
// This rasterizes SVGs; it does not verify browser animation timing or paint behavior.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = JSON.parse(await fs.readFile(path.join(root, "src/lib/signature-paths.json"), "utf8"));
const motion = JSON.parse(await fs.readFile(path.join(root, "src/lib/signature-motion.json"), "utf8"));
const contours = source.foreground.match(/M[^M]+/g);
assert.ok(contours?.length, "Source signature must contain closed contours");
const [originX, originY, width, height] = source.viewBox.split(/\s+/).map(Number);
assert.equal(originX, 0);
assert.equal(originY, 0);
const scale = 2;
const coveredContours = motion.words.flatMap(word => Array.from({ length: word.contours[1] - word.contours[0] }, (_, index) => word.contours[0] + index));
assert.deepEqual([...coveredContours].sort((a, b) => a - b), contours.map((_, index) => index), "Each source contour must belong to exactly one word");

// Sample the supported Bézier centerlines into short segments to measure arc length.
// Completed masks still use the original curves, not this numerical approximation.
function flatten(d) {
  const tokens = d.match(/[MLCQ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
  assert.equal(d.replace(/[MLCQ\s,\d.e+\-]/gi, ""), "", "Add support before using a new SVG path command");
  const points = [];
  let index = 0;
  let point = [0, 0];
  const pair = () => [Number(tokens[index++]), Number(tokens[index++])];
  while (index < tokens.length) {
    const command = tokens[index++];
    assert.match(command, /^[MLCQ]$/, "Every segment must use an explicit absolute command");
    if (command === "M" || command === "L") {
      point = pair();
      points.push(point);
      continue;
    }
    const start = point;
    const first = pair();
    const second = pair();
    const end = command === "C" ? pair() : second;
    for (let step = 1; step <= 80; step++) {
      const t = step / 80;
      const u = 1 - t;
      points.push([0, 1].map(axis => command === "C"
        ? u ** 3 * start[axis] + 3 * u ** 2 * t * first[axis] + 3 * u * t ** 2 * second[axis] + t ** 3 * end[axis]
        : u ** 2 * start[axis] + 2 * u * t * first[axis] + t ** 2 * end[axis]));
    }
    point = end;
  }
  assert.ok(points.length > 1 && points.flat().every(Number.isFinite), "Centerline points must be finite");
  const lengths = [0];
  for (let i = 1; i < points.length; i++) lengths.push(lengths[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  return { points, lengths, total: lengths.at(-1) };
}

const words = motion.words.map(word => ({ ...word, silhouette: contours.slice(...word.contours).join(" "), strokes: word.strokes.map(stroke => {
  assert.ok(stroke.width > 0 && stroke.width <= 40, "Pen masks must stay narrow enough to avoid the old broad reveal");
  assert.ok(stroke.duration > 0 && stroke.duration <= 1, "Each gesture must have a short positive duration");
  return { ...stroke, arc: flatten(stroke.d) };
}) }));
const strokes = words.flatMap(word => word.strokes);
const duration = strokes.reduce((sum, stroke) => sum + stroke.duration, 0);
assert.ok(duration < 5, `Gesture durations exceed five seconds: ${duration}`);
const total = duration + motion.initialDelay + motion.wordGap * (words.length - 1);
assert.ok(total > 0 && total < 5, `Complete signature exceeds five seconds: ${total}`);

function prefix(stroke, progress) {
  if (progress >= 1) return stroke.d;
  const { points, lengths, total } = stroke.arc;
  const target = progress * total;
  const result = [points[0]];
  for (let i = 1; i < points.length; i++) {
    if (lengths[i] <= target) result.push(points[i]);
    else {
      const fraction = (target - lengths[i - 1]) / (lengths[i] - lengths[i - 1]);
      result.push([0, 1].map(axis => points[i - 1][axis] + fraction * (points[i][axis] - points[i - 1][axis])));
      break;
    }
  }
  return result.map((point, index) => `${index ? "L" : "M"}${point.map(value => value.toFixed(4)).join(" ")}`).join(" ");
}
function document(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="${source.viewBox}">${body}</svg>`;
}
const silhouette = d => `<path fill="white" fill-rule="evenodd" d="${d}"/>`;
async function alpha(svg) {
  const { data, info } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.channels, 4);
  const result = new Uint8Array(info.width * info.height);
  for (let index = 0; index < result.length; index++) result[index] = data[index * 4 + 3];
  return result;
}
function maskedSvg(progress) {
  let index = 0;
  const body = words.map((word, wordIndex) => {
    const paths = word.strokes.map(stroke => {
      const amount = Math.max(0, Math.min(1, progress - index++));
      // A zero-length round-capped stroke can show a dot. Zero-progress masks are absent.
      return amount <= 0 ? "" : `<path d="${prefix(stroke, amount)}" stroke-width="${stroke.width}"/>`;
    }).join("");
    return `<defs><mask id="word-${wordIndex}" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round">${paths}</g></mask></defs><g mask="url(#word-${wordIndex})">${silhouette(word.silhouette)}</g>`;
  }).join("");
  return document(body);
}
const original = await alpha(document(silhouette(source.foreground)));
const split = await alpha(document(words.map(word => silhouette(word.silhouette)).join("")));
const final = await alpha(maskedSvg(strokes.length));
const totalAlpha = original.reduce((sum, value) => sum + value, 0);
function difference(expected, actual) {
  let lost = 0;
  let added = 0;
  let maxDifference = 0;
  for (let i = 0; i < expected.length; i++) {
    lost += Math.max(0, expected[i] - actual[i]);
    added += Math.max(0, actual[i] - expected[i]);
    maxDifference = Math.max(maxDifference, Math.abs(expected[i] - actual[i]));
  }
  return { lost, added, maxDifference };
}
const splitDelta = difference(original, split);
assert.ok((splitDelta.lost + splitDelta.added) / totalAlpha < 0.00002 && splitDelta.maxDifference <= 20, `Word splitting changes the original silhouette: ${JSON.stringify(splitDelta)}`);
const endDelta = difference(split, final);
assert.ok(endDelta.lost / totalAlpha < 0.00001 && endDelta.added / totalAlpha < 0.00001 && endDelta.maxDifference <= 3,
  `Final masked signature differs visibly from original: ${JSON.stringify(endDelta)}`);

let previous = await alpha(maskedSvg(0));
assert.equal(previous.reduce((sum, value) => sum + value, 0), 0, "The initial geometry must be empty");
let largestLoss = 0;
for (let frame = 1; frame <= strokes.length * 4; frame++) {
  const current = await alpha(maskedSvg(frame / 4));
  const delta = difference(previous, current);
  largestLoss = Math.max(largestLoss, delta.lost / totalAlpha);
  // Bézier flattening and mask compositing can differ at antialiased boundary pixels.
  assert.ok(delta.lost / totalAlpha < 0.00005, `Ink disappears at sample ${frame}/4: ${JSON.stringify(delta)}`);
  previous = current;
}
console.log(`PASS signature: ${contours.length} unchanged contours, ${strokes.length} narrow gestures, ${duration.toFixed(2)}s gesture time, ${total.toFixed(2)}s overall.`);
console.log(`PASS final silhouette: ${(100 * endDelta.lost / totalAlpha).toFixed(7)}% alpha loss; max pixel difference ${endDelta.maxDifference}/255.`);
console.log(`PASS ${strokes.length * 4} progressive geometry samples: largest alpha loss ${(100 * largestLoss).toFixed(7)}%. Initial geometry is empty.`);
console.log("Browser paint, CSS opacity, actual timing and perceived handwriting still require browser review.");

if (process.argv.includes("--frames")) {
  const destination = path.join(root, ".context/signature-qa");
  await fs.mkdir(destination, { recursive: true });
  const indices = [0, 1, 3, 5, 8, 10, 13, 16, 18];
  const panels = [];
  for (const [position, index] of indices.entries()) {
    const buffer = await sharp(Buffer.from(maskedSvg(index).replaceAll('fill="white"', 'fill="#9f2838"'))).resize(610, 360).png().toBuffer();
    await fs.writeFile(path.join(destination, `gesture-${String(index).padStart(2, "0")}.png`), buffer);
    const left = (position % 3) * 630 + 10;
    const top = Math.floor(position / 3) * 400 + 30;
    panels.push({ input: buffer, left, top });
    panels.push({ input: Buffer.from(`<svg width="610" height="24"><text x="0" y="15" fill="#333" font-size="14" font-family="sans-serif">${index} / ${strokes.length} completed gestures</text></svg>`), left, top: top - 24 });
  }
  await sharp({ create: { width: 1890, height: 1200, channels: 4, background: "#f4efe5" } }).composite(panels).png().toFile(path.join(destination, "contact-sheet.png"));
  console.log(`Saved geometry-only samples to ${destination}`);
}
