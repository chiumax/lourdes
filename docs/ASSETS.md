# Asset inventory and provenance

Everything here was supplied by the artist or comes from her own public channels. Do not retouch or generate her likeness, and do not invent lyrics, captions or biography.

## Source

`INSPO WEB.pdf`, the portfolio Lourdes sent on 2026-11-16: her lettering, live and portrait photos, a Pantone board and reference sites. The PDF is not in the repository.

## Logo

`public/brand/lourdes-martin-lettering.svg` is a vector trace (potrace) of the lettering's transparency mask on the first slide, cropped to the wordmark. It is used as a CSS mask so each section can colour it. It is a trace of a raster, not her original vector; replace it if she has one.

## Palette

From her Pantone board, as CSS variables at the top of `src/designs/estrella.module.css`: Endless Sky, Plein Air, Dazzling Blue, Delicate Blue, Dark Denim, Silence, Pastel Yellow, Strawberry Cream, Flushing Pink and Pink Cosmos. Hex values are screen approximations of those swatches.

## Photography

| Files | Source | Note |
| --- | --- | --- |
| `public/images/hero-playa.webp` | PDF, first slide | Still shown before the hero video loads and when motion is reduced |
| `public/images/directo/*.webp` | PDF, concert slides | Extracted at the resolution embedded in the PDF (up to 2048 px), so already compressed. Replace with originals when available. |
| `public/images/antes-moria-por-verte.webp` | Single artwork | Cover of the featured single |
| `public/images/lourdes-acoustic.webp` | Earlier Instagram screenshot crop | 640 × 800; keep it small |
| `public/images/lourdes-sunshine.webp` | Earlier supplied portrait | Artist image in structured data and the favicon source |
| `public/images/lourdes-social.png` | Screenshot of the hero at 1200 × 630 | Share preview |

Alt text describes what is visible, not mood or inferred location.

## Video

`public/video/hero-playa.mp4` is a provisional 17-second silent cut from her "ya no lloro" video on YouTube, cropped to remove the burned-in lyric captions. Replace it with the original footage when she sends it.

Video posters in the Vídeos section are loaded from `i.ytimg.com` at request time and are not stored here.

## Fonts

Self-hosted WOFF2 with licences alongside in `public/fonts/`: Bodoni Moda 900 (titles), Caveat (handwritten notes), DM Sans (interface text) and IBM Plex Mono (small labels).

## Decoration

Stars, hearts, the vinyl, frames and tape are code (inline SVG and CSS). `public/brand/paper-grain.svg` is a noise tile laid over the page.
