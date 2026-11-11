# Three variations of the selected site

All three now live on `design/postmarked-yours`. The reference is the original page at https://lourdes-rosy.vercel.app/ (the `origin/main` design), not the subsequent Postmarked layout. The original signature/photo introduction, music section and short photo scrapbook are retained. The old postcard, bedroom and blue notebook directions are retired.

| Variation | Spanish route | Direction |
| --- | --- | --- |
| Tinta | `/es` or `/es/tinta` | Closest to the selected page: cream stock, burgundy signature, darker print, fewer props. |
| Amplificador | `/es/amplificador` | Charcoal and acid yellow, enormous Anton artist name, hard crops and a gig-poster composition. |
| Recortes | `/es/recortes` | Sage paper, scarlet cut-out title fragments, ripped portrait strips, high-contrast Bodoni typography and a fuller collage. |

Tinta is the selected direction as of 12 November. Its header and version bar are removed, the original hero signature animation is restored, and Canciones loads the Spotify artist player immediately inside the paper panel instead of the custom track list. Reduced-motion users see the full signature immediately. The small version bar remains on the other two variations, which are unchanged by this refinement. Each version uses the same verified catalogue and straightforward Spanish copy. `/en` and `/en/{variation}` remain English reference pages for translation work; no public language switch is shown for now.

## What remains from the chosen page

- Signature, existing sea portrait and overlapping guitar photo.
- Three concise sections, direct music links and an optional Spotify player.
- Photographs with their own space rather than a long content feed.
- Paper layering, small handwritten captions and an informal composition.

## What changes

- No hearts, sunshine stickers, cute slogans or invented artist statements.
- Distinct typography, stronger contrast and more deliberate image crops.
- Real song titles supply the hero copy.
- No large poster archive: that belongs to the previous exploration and lengthened the chosen simple site.
- One cut-paper footer based on the supplied seated photograph. It shifts between discrete transforms, like repositioned paper. This is animation of a single cut-out, not generated footage or new facial poses.
- Animation runs only while the footer is visible, has a pause/resume button, and stays static for reduced-motion preferences.

## Mobile approach and verification

The reading order stays introduction → photograph → music → photos → footer. At 700px the main sections become single columns. Local overlap is confined to photo compositions; the page is not globally clipped to hide overflow. Navigation wraps at narrow widths, primary controls have 44px or larger targets, media has intrinsic dimensions, and display type scales down.

Build, TypeScript, lint and production HTTP integration checks are the automated acceptance gates. The latter cover all eight localized pages, assets, content, redirects, anchors and motion-control markup. Actual rendered mobile layout and browser interactions could not be visually verified: the browser connector failed and the native Computer Use session was unavailable. That limitation is not counted as a pass.

## Retired branches

The two previous remote/local design branches were removed on 11 November after their exact heads were preserved in pushed tags:

- `archive/bedroom-floor-2026-11-11` → `54b0399b9e6c503646825b161684cda0c09bb38e`
- `archive/the-blue-book-2026-11-11` → `ccb106f87eafc1ee89d974989738f6442e9ca96a`

There were no open pull requests to close. Historical Vercel deployment URLs may still exist; deleting a Git branch does not delete its old deployments. All new work uses the existing `design/postmarked-yours` branch.
