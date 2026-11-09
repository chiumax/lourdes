# Lourdes Martín

Three custom Next.js artist-site directions, with Spanish and English content, verified Spotify songs and a concert-poster archive.

## Development

Node.js 20.9 or newer. Node 24 was used during preparation.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The first visit redirects to Spanish (`/es`). Use ES / EN in the header to switch language. The choice remains in the URL and is remembered for future visits to unprefixed entry points.

## Designs and branches

| Direction | Branch | Local route |
| --- | --- | --- |
| Postmarked, Yours | `design/postmarked-yours` | `/es/postmarked` or `/en/postmarked` |
| Bedroom Floor | `design/bedroom-floor` | `/es/bedroom-floor` or `/en/bedroom-floor` |
| The Blue Book | `design/the-blue-book` | `/es/blue-book` or `/en/blue-book` |

Each branch's `/es` and `/en` routes select its own design using `src/lib/default-concept.ts`. Every preview also contains the other two routes for comparison. The existing Vercel Git integration deploys branch previews; production uses `main`.

Read [the design review](docs/DESIGN-REVIEW.md) for what was removed, changed and retained after the initial review. [The direction overview](docs/DESIGN-DIRECTIONS.md) summarizes their current identities. The [original long-form prompt](docs/DESIGN-PROMPT.md) is retained as a historical brief.

## Content

- `src/lib/i18n.ts`: typed Spanish/English dictionary for copy, navigation, alt text, metadata and controls.
- `src/lib/music.ts`: five verified Spotify tracks and featured artwork/date; catalogue titles are not translated.
- `src/lib/artist.ts`: artist identity and social destinations.
- `src/designs/`: three server-rendered compositions with scoped CSS.
- `src/app/[lang]/`: localized root layout and pages, including document language and metadata.
- `src/proxy.ts`: redirects only unprefixed legacy entry points, using the explicit saved language preference.
- `src/components/language-switch.tsx`: real language links with cookie, hash and query preservation.
- `src/components/spotify-player.tsx`: an optional, translated player; no Spotify iframe loads before activation.
- `public/`: committed artwork, optimized photos, original poster derivatives, favicons and licensed local fonts.

See [the asset inventory](docs/ASSETS.md) for provenance and limitations. Two guitar photographs remain provisional screenshot crops. Posters are historical archive items, not upcoming events. The traced signature is now static: the previous broad-mask animation was removed because it did not follow actual handwriting.

## Validation

```sh
npm run lint
npm run build
npm run typecheck
npm start
```

With the production server running, in another terminal:

```sh
EXPECTED_CONCEPT=postmarked npm run check:site
```

Use `bedroom-floor` or `blue-book` for the other branches. Optionally set `SITE_URL` to a different accessible server address. The integration checks cover all eight localized pages, metadata, language-switch destinations, real track links, local assets, anchor targets, redirects, preference cookies and 404s. They do not substitute for browser visual or interaction QA. Browser navigation was unavailable during the latest review; see the review document for outstanding checks.

All runtime assets are committed. The gitignored `.context` source attachments are not required for a fresh build. `npm run assets:prepare` regenerates the initial extracted logo, photos and icons only when the original attachments are present; later Spotify artwork and archive derivatives are documented separately in the asset inventory.

No secrets or environment variables are required. On Vercel, metadata uses the deployment hostname provided by `VERCEL_URL`; local development falls back to localhost. Spanish and English alternate URLs are emitted for each design. Font licenses are included. Shadcn is not installed because the current controls are adequately served by native links, buttons and disclosure elements.
