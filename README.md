# Lourdes Martín

Tinta, the selected artist site, on `design/postmarked-yours`.

## Run

```sh
npm ci
npm run dev
```

Node 20.9+ is required. Open http://localhost:3000; the public entry is Spanish.

| Variation | Route |
| --- | --- |
| Tinta — cream and burgundy, closest to the original | `/es` or `/es/tinta` |

Tinta opens directly on the animated signature, without a header, genre/location eyebrow or decorative artist label. Canciones loads Spotify immediately on layered paper with no extra card heading or numbered section labels. The footer adds archival roses, a newspaper clipping and magazine-style lettering around the original moving cut-out; there is no pause button. The rejected Editorial and Estudio studies have been removed; their old URLs permanently redirect to Tinta. Earlier Amplificador and Recortes explorations remain at `/es/amplificador` and `/es/recortes`. English reference routes use `/en` in place of `/es` for Rafa's copy work; the public site currently has no language switch.

## Editing

- `src/designs/artist-page.tsx` and its CSS module: original Tinta and the earlier explorations.
- `src/components/signature.tsx`, `src/lib/signature-motion.json` and `src/app/signature.css`: the exact signature silhouette and its sequenced pen masks.
- `src/components/cutout-footer.tsx`: stepped paper animation, archival collage layers and visibility gating.
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
npm run check:signature
npm start
```

With the production server running:

```sh
npm run check:site
```

The HTTP checks cover all eight pages, localized content, metadata, five song links, media and local resources, section anchors, footer visibility markup, Spanish entry, retired URLs and 404s. The signature geometry check compares the completed masks against the original artwork and samples the reveal for missing or disappearing ink. These checks do not verify rendered layout, playback or browser animation interaction. Browser automation was unavailable during this revision; mobile/device visual review remains outstanding. In this Next.js build, translated 404 recovery requires JavaScript; normal artist pages are server-rendered.

All runtime assets and font licences are committed; no secrets or environment variables are needed. The original `.context` attachments are optional source material, not runtime dependencies. `npm run assets:prepare` prepares the original assets only and requires those attachments. The footer derivative is documented separately.
