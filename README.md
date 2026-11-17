# Lourdes Martín

The official site of Lourdes Martín, published from `main` at https://lourdes-rosy.vercel.app/es. One page, in Spanish, built from the portfolio she supplied: her own lettering, her Pantone palette and her photos.

## Run

```sh
npm ci
npm run dev
```

Node 20.9+ is required. Open http://localhost:3000; every other path redirects to `/es`.

## Editing

| To change | Edit |
| --- | --- |
| Concert dates | `src/lib/concerts.ts`. Add a line to the list; past dates drop off on the next deploy. With no dates the section shows an empty state. |
| The featured single and song list | `src/lib/music.ts` |
| Videoclips and the featured video | `src/lib/videos.ts`. The "lo último del canal" row comes from the YouTube channel feed and refreshes daily. |
| Social profiles | `src/lib/artist.ts` and `src/lib/social.ts` |
| Photos, frame colours and tilt | `src/lib/photos.ts` |
| Page layout, copy and styling | `src/designs/estrella.tsx` and `estrella.module.css` |
| Title, description and share image | `src/lib/seo.ts`, `public/images/lourdes-social.png` |

Interactive pieces are small client components in `src/components/`: `sparkle-stage` (pointer parallax and tap bursts), `vinyl` (plays the single through Spotify's iFrame API on first press), `video-stage` (click-to-play YouTube) and `photo-wall` (drag and full-screen view). The rest renders on the server.

[Asset inventory](docs/ASSETS.md)

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

With the production server running:

```sh
npm run check:site
npm run check:seo
```

`check:site` covers the rendered page (sections, navigation anchors, song and video links, social links, the one up-front player, image attributes, every local resource) and routing (redirects to `/es`, 404s). `check:seo` covers crawler-facing metadata, structured data, robots, the sitemap and the share image. Set `SITE_URL` to check another origin and `EXPECT_NOINDEX=1` for a preview build.

Neither check opens a browser. Layout, mobile overflow, animation, video and Spotify playback, photo dragging and reduced-motion behaviour need a manual look.

No secrets or environment variables are needed.
