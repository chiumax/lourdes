# Asset inventory and provenance

All image sources below were supplied by the user in this workspace. Original attachments are excluded from Git; runtime derivatives are included. Preserve this inventory when handing the project to a designer or another developer.

## Source references

| Source | What it establishes | How it is used |
| --- | --- | --- |
| `.context/attachments/0kEH4k/IMG_5176.png` | Straight-on rose/plum signature on a cream concert poster; 908 × 1600 | Canonical logo geometry, extracted only from the wordmark bounds |
| `.context/attachments/8RULIT/Screenshot 2026-11-02 at 07.45.02.png` | Same identity in turquoise, a star photo cutout, cheerful pink/blue palette | Visual reference and cross-check; no photograph extracted from this poster |
| `.context/attachments/PnYXyx/image.png` | Supplied Instagram profile screenshot; 2320 × 7212 | Two provisional music-related photo crops; personal visual reference |
| `.context/attachments/uBoep3/image.png` | Standalone 1080 × 1080 smiling portrait by the water | Hero photograph and the user-authorized photo favicon |

Reference destinations: [Spotify artist](https://open.spotify.com/artist/246Ag05j7yjMUiIAMJ70A7), [Instagram profile](https://www.instagram.com/lourdesmartin15/). Spotify resolved to Lourdes Martín. Instagram's web fetch was throttled; no live Instagram images or videos were downloaded, and no release names or biography details were inferred from inaccessible pages. The supplied profile screenshot says Mallorca, but the starter does not expand that into an invented biography.

## Logo

| Asset | Intended use |
| --- | --- |
| `public/brand/lourdes-signature-poster.svg` | Rose lettering with plum shadow, closest to the cream poster |
| `public/brand/lourdes-signature-rose.svg` | One-colour rose lettering for the homepage or light paper |
| `public/brand/lourdes-signature-ink.svg` | One-colour warm dark ink for smaller marks and print-style layouts |
| `public/brand/lourdes-signature-poster.png` | Transparent 1220 × 720 raster export for tools that cannot use SVG |
| `src/lib/signature-paths.json` | Shared monochrome vector path for the inline React component |

Extraction method: crop the cream poster at `{ left: 230, top: 230, width: 610, height: 360 }`; separate rose foreground and darker silhouette by colour; trace the two masks into Bezier outlines; retain the even-odd fill rule so letter counters remain transparent. The crop avoids the other performers' logos and historical event details. The turquoise poster is more oblique and partly overlaps imagery, so it is not the geometry source.

This is a vector trace of a raster reference, not the artist's original vector master. It preserves the supplied letterforms, their stack, and the accent. Small edges inherit the quality of the poster. Replace the trace with the original master if the artist has one. Do not silently substitute a script font.

Current rendering (2026-11-12): Tinta uses 18 close pen-gesture masks over the faithful traced silhouette, stored separately in `src/lib/signature-motion.json`. Each word has its own mask because their vertical bounds overlap. Only the masks animate; the logo geometry never changes and no final full-logo fade is added. The reveal finishes in 3.97 seconds. Under reduced-motion preferences the complete mark is shown immediately. The other variations keep their static signatures. This is a designed visual treatment, not a recording or exact reconstruction of the artist's handwriting.

The wordmark has a 610 × 360 viewBox. Scale proportionally and keep surrounding space of roughly one lowercase letter height. Prefer at least 180 CSS pixels wide for the complete two-line mark. At favicon size, use the portrait, not the unreadable full signature.

## Photography

| Runtime file | Source and crop | Dimensions | Status / use |
| --- | --- | --- | --- |
| `public/images/lourdes-sunshine.webp` | Standalone supplied portrait; original square composition | 1080 × 1080 | Main hero image; high-confidence source |
| `public/images/lourdes-acoustic.webp` | Instagram screenshot, `{ left: 308, top: 1675, width: 525, height: 656 }` | 640 × 800 | Provisional small print of Lourdes playing guitar |
| `public/images/guitar-by-the-pool.webp` | Instagram screenshot, `{ left: 884, top: 3200, width: 525, height: 656 }` | 640 × 800 | Provisional small print of a guitar beside water |

The screenshot crops remove interface margins and corner badges. Their export size does not imply original photographic detail: they are slightly upscaled from the screenshot. Keep them to small scrapbook prints, about 280 CSS pixels wide or less. Obtain original files before large-screen galleries, full-bleed use, downloadable press images, or video playback. No video was produced from a still screenshot. Captions in the starter are draft editorial copy, not quotations or confirmed song lyrics.

Alt text describes what is visible, not mood, personality, or inferred location. Do not retouch or generate Lourdes's likeness. Replace a crop with the real source photograph when available, preserving its filename or updating the corresponding component and this manifest.

## Favicon

- `public/favicon.ico`: 16, 32, and 48 pixel PNG entries in one ICO container.
- `public/icon.png`: 192 × 192 PNG.
- `public/apple-touch-icon.png`: 180 × 180 PNG.

All use the provided square photo with proportional resizing and no new image content. The full image is retained as requested; at 16 pixels it works as a warm, recognizable colour impression rather than a detailed portrait.

## Fonts and decoration

- DM Sans, regular, Latin subset: self-hosted WOFF2 for navigation and utility text. License committed next to the font.
- Caveat, regular, Latin subset: self-hosted WOFF2 for brief handwritten annotations. License committed next to the font.
- Georgia: system serif for editorial section titles; no extra download.
- `public/brand/paper-grain.svg`: lightweight code-native SVG noise tile.
- Tape, paper, notebook rules, shadows, and stickers: custom CSS. Curved arrows: small inline SVGs. Decorative marks are hidden from assistive technology.

No stock photos, fabricated album art, generated people, or remote image hotlinks are part of the site.

## Verified music and archive additions — 2026-11-09

The [official artist embed](https://open.spotify.com/embed/artist/246Ag05j7yjMUiIAMJ70A7) supplied five track titles, exact Spotify track IDs and durations. They are stored in `src/lib/music.ts`. These are a dated catalogue selection, not a dynamically maintained ranking. Song titles stay in their published Spanish spelling in both languages.

The [official track embed](https://open.spotify.com/embed/track/2mvtMnxyRxaSTgcYTV8JIe) confirms the featured track title `antes moría por verte`, release date 2026-07-24, and artwork. The artwork is the same photograph as the separately supplied portrait, with the official cover crop. The page labels it as a featured track, not a claim that it is the latest release.

| File | Provenance | Use |
| --- | --- | --- |
| `public/images/antes-moria-por-verte.webp` | [640-pixel artwork from Spotify's CDN](https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2735d018f85b3d2ca8e9f3b0ecb), converted to WebP | Featured track artwork, 640 × 640 |
| `public/images/poster-volander.webp` | Supplied `IMG_5176.png`, proportional resize to width 726 | Historical concert archive, correctly dated 15 May 2023 |
| `public/images/poster-movida.webp` | Supplied second concert poster, proportional resize to width 800 | Historical concert archive, labelled venue/city only because its year is not verified |

The full posters are kept intact, including their original Spanish lettering and historical event details. Both are clearly labelled as archive material, with links to view the full image. Their artwork is not translated; their alternative text and surrounding captions are. These additions are committed assets and do not require a runtime connection to Spotify's image CDN. The original `assets:prepare` script regenerates the earlier base assets only; it does not fetch the Spotify catalogue or overwrite these additions.

## Regeneration

In the original workspace with all attachments present:

```sh
npm ci
npm run assets:prepare
```

The script checks for source files and gives a clear error if they are absent. It regenerates only the specifically named derived assets. Runtime code never reads `.context`. Do not commit full Instagram screenshots or the original posters merely to make asset regeneration work in a fresh clone.

## November 11 revision: fonts and footer

The runtime uses three additional locally served OFL fonts, obtained from their Fontsource 5.3.0 packages: Anton (400), Bodoni Moda (900), IBM Plex Mono (400). Font files and their complete licences are committed under `public/fonts/`. Existing DM Sans and Caveat are retained for readable body text and occasional captions. The display fonts are not preloaded, so the initial page does not preload every variation's typeface.

The supplied `.context/attachments/CKRRwV/image.png` is the source for `public/images/lourdes-cutout.png` (1274×1235) and its runtime derivative `public/images/lourdes-cutout.webp` (1000×969, approximately 120 KB). Built-in `image_gen.imagegen` extracted the seated figure with real transparency; no CLI/API fallback was used. The source PNG remains untouched. Generative extraction can change tiny edges/textures; the derivative is not represented as an untouched photograph.

The footer animates this single cut-out through six small stepped transforms. It does not manufacture facial poses or claim to be a video. Motion pauses offscreen, is user-pausable, and is disabled under `prefers-reduced-motion`.

Exact extraction prompt:

> Use case: background-extraction. Asset type: transparent photographic paper cut-out for an artist website footer. Input image 1 is the edit target. Remove ONLY the environment and UI: the chair, cabin, windows, scenery, arrow button and carousel dots. Isolate the seated woman in precisely her existing curled-up pose, including all visible hair, black jacket, hands, pale blue jeans and both white shoes. Preserve her actual facial features, identity, expression, gaze, body proportions, clothing folds, original lighting and photographic grain unchanged. She rests her cheek on her hand; keep this pose. Maintain the entire visible silhouette without cropping the shoes or head. No invented new pose, no beautification, no illustration, no paper outline, no text, no shadow. Genuine transparent background with clean alpha around hair and clothes; all negative spaces transparent. Leave a small even transparent margin around the full figure.

The two collage reference images are direction references only. Their subjects, example text, promotional badges and third-party imagery are not used in the site. The ripped portrait is built with CSS fragments of the existing Lourdes release artwork.
