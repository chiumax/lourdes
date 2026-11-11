# Lourdes Martín

Three variations of the artist's selected scrapbook site, on one branch: `design/postmarked-yours`.

## Run

```sh
npm ci
npm run dev
```

Node 20.9+ is required. Open http://localhost:3000; the public entry is Spanish.

| Variation | Route |
| --- | --- |
| Tinta — cream and burgundy, closest to the original | `/es` or `/es/tinta` |
| Amplificador — charcoal and acid-yellow gig poster | `/es/amplificador` |
| Recortes — torn magazine collage | `/es/recortes` |

Tinta is the selected direction and opens directly on its animated signature hero, without a header or version bar. Its music section loads Spotify immediately inside the paper panel. The other two variations retain their comparison bars and deferred players. English reference routes are available at `/en`, `/en/tinta`, `/en/amplificador` and `/en/recortes`. They are retained for Rafa's copy work; the public site currently has no language switch. Old design paths redirect to the new variations.

## Editing

- `src/designs/artist-page.tsx` and its CSS module: the shared page structure and three distinct art directions.
- `src/components/cutout-footer.tsx`: stepped paper animation, visibility gating and pause/resume control.
- `src/lib/i18n.ts`: Spanish and English copy, including alt text and metadata.
- `src/lib/music.ts`: verified Spotify songs and featured artwork.
- `src/lib/default-concept.ts`: default variation.
- `src/proxy.ts`: Spanish public entry and retired-route redirects.

[Design directions](docs/DESIGN-DIRECTIONS.md) · [Translation guide](docs/TRANSLATION.md) · [Assets and exact cut-out prompt](docs/ASSETS.md)

The original approved site is https://lourdes-rosy.vercel.app/. This branch refines its short structure; the prior three unrelated explorations have been retired. The existing Vercel Git integration builds this branch's preview. `main` remains the selected original until a final variation is chosen.

## Checks

```sh
npm run lint
npm run build
npm run typecheck
npm start
```

With the production server running:

```sh
npm run check:site
```

The HTTP checks cover all eight pages, localized content, metadata, five song links, media and local resources, section anchors, footer controls, Spanish entry, retired URLs and 404s. They do not verify rendered layout, playback or animation interaction. Browser automation was unavailable during this revision; mobile/device visual review remains outstanding. In this Next.js build, translated 404 recovery requires JavaScript; normal artist pages are server-rendered.

All runtime assets and font licences are committed; no secrets or environment variables are needed. The original `.context` attachments are optional source material, not runtime dependencies. `npm run assets:prepare` prepares the original assets only and requires those attachments. The footer derivative is documented separately.
