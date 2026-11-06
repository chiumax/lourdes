# Lourdes Martín

A Next.js foundation for a personal acoustic-pop artist website, with a custom paper-and-photo scrapbook design. Prepared from the references supplied for this project.

## Run locally

Requires Node.js 20.9 or newer (Node 24 used during setup).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm start
```

## What is implemented

- Next.js App Router, React, strict TypeScript, custom CSS, and locally hosted fonts.
- Responsive signature-led introduction, music section, and compact photo scrapbook.
- Extracted SVG wordmark in rose, ink, and original poster colours, plus a transparent PNG.
- An approximate handwriting reveal over the actual traced signature; reduced-motion users see the complete wordmark immediately.
- Spotify and Instagram links, and an explicitly loaded Spotify artist embed with a persistent fallback link. Audio never starts automatically on page load.
- Optimized local WebP photos and photo-based favicons in ICO, PNG, and Apple touch formats.
- Semantic landmarks, skip link, keyboard focus indicators, image descriptions, and metadata.

This is a designed foundation, not the complete feature brief. There are no invented songs, tour dates, press quotes, booking addresses, sign-up forms, or unfinished navigation targets. Display copy and English language are provisional creative choices for Lourdes to review.

## The next build

**[Compare the three coded design directions](docs/DESIGN-DIRECTIONS.md).** Postmarked, Yours (`/postmarked`), Bedroom Floor (`/bedroom-floor`), and The Blue Book (`/blue-book`) each have a separate branch homepage and custom scoped styles. Every preview includes footer links to all three routes.

**[Read the detailed design and implementation prompt](docs/DESIGN-PROMPT.md).** It describes each proposed feature, its purpose, its visual treatment, behaviour, content requirements, and acceptance criteria.

**[Read the asset inventory](docs/ASSETS.md)** before replacing or using the images elsewhere. Two photos are crops from the supplied Instagram screenshot, not downloaded original posts. The artist-supplied portrait is the strongest available image.

## Project map

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Selects the branch's default homepage |
| `src/app/postmarked/` | Airmail postcard direction and scoped CSS |
| `src/app/bedroom-floor/` | Music zine direction and scoped CSS |
| `src/app/blue-book/` | Open notebook direction and scoped CSS |
| `src/app/globals.css` | Shared reset, accessible controls, player and comparison navigation |
| `src/app/signature.css` | Signature reveal and motion preference handling |
| `src/components/signature.tsx` | SVG artwork and approximate pen-path mask |
| `src/components/spotify-player.tsx` | Small client island for the optional embed |
| `src/lib/artist.ts` | Supplied artist identity and destination links |
| `public/brand/` | Vector wordmarks and paper grain |
| `public/images/` | Runtime photo derivatives |
| `public/fonts/` | Self-hosted font files and licenses |
| `scripts/prepare-assets.mjs` | Reproducible local asset extraction |

The site does not require the original `.context` attachments at runtime or to build. They are gitignored. `npm run assets:prepare` is only for regenerating the committed assets in this original workspace; a fresh clone without the source attachments should use the already committed assets.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm audit
```

Build, lint, type checking, and dependency audit passed during preparation. The homepage also returned HTTP 200 in local development. The generated logo and photo derivatives were visually inspected. **Browser visual, responsive, and interactive QA remains outstanding:** browser control was stopped during preview. Before public launch, complete the manual checklist in the design prompt, especially small screens, signature timing, keyboard navigation, and real Spotify playback.

The two scoped dependency overrides keep development-only transitive dependencies on patched versions. The lockfile is committed. Neither tracing tools nor lint tooling ships in the client bundle.

## Deployment

Use any Node-compatible Next.js host, with `npm run build` and `npm start`, or import the Git repository into a Next.js-aware host. This task prepares and pushes source to GitHub; it does not provision hosting or a domain. No environment variables are needed for this starter. Add the final canonical domain and social-sharing image metadata once the destination is known.

Shadcn is intentionally not installed: this base has no dialog, form, or menu that needs it. Introduce its primitives when a real interaction calls for them, and give them the site's custom styling.
