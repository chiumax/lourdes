# Three variations of the selected site

All three now live on `design/postmarked-yours`. The reference is the original page at https://lourdes-rosy.vercel.app/ (the `origin/main` design), not the subsequent Postmarked layout. The original signature/photo introduction, music section and short photo scrapbook are retained. The old postcard, bedroom and blue notebook directions are retired.

| Variation | Spanish route | Direction |
| --- | --- | --- |
| Tinta | `/es` or `/es/tinta` | Closest to the selected page: cream stock, burgundy signature, darker print, fewer props. |
| Amplificador | `/es/amplificador` | Charcoal and acid yellow, enormous Anton artist name, hard crops and a gig-poster composition. |
| Recortes | `/es/recortes` | Sage paper, scarlet cut-out title fragments, ripped portrait strips, high-contrast Bodoni typography and a fuller collage. |

Tinta is the selected direction as of 12 November. Its header and version bar are removed, the hero signature draws through closely traced strokes, and Canciones loads the Spotify artist player immediately inside the paper panel instead of the custom track list. Reduced-motion users see the full signature immediately. The small version bar remains on the other two variations, which are unchanged by this refinement. Each version uses the same verified catalogue and straightforward Spanish copy. `/en` and `/en/{variation}` remain English reference pages for translation work; no public language switch is shown for now.

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
- Animation runs only while the footer is visible, keeps its original stepped loop, and stays static for reduced-motion preferences.

## Mobile approach and verification

The reading order stays introduction → photograph → music → photos → footer. At 700px the main sections become single columns. Local overlap is confined to photo compositions; the page is not globally clipped to hide overflow. Navigation wraps at narrow widths, primary controls have 44px or larger targets, media has intrinsic dimensions, and display type scales down.

Build, TypeScript, lint and production HTTP integration checks are the automated acceptance gates. The latter cover all eight localized pages, assets, content, redirects, anchors and footer visibility markup. Actual rendered mobile layout and browser interactions could not be visually verified: the browser connector failed and the native Computer Use session was unavailable. That limitation is not counted as a pass.

## Retired branches

The two previous remote/local design branches were removed on 11 November after their exact heads were preserved in pushed tags:

- `archive/bedroom-floor-2026-11-11` → `54b0399b9e6c503646825b161684cda0c09bb38e`
- `archive/the-blue-book-2026-11-11` → `ccb106f87eafc1ee89d974989738f6442e9ca96a`

There were no open pull requests to close. Historical Vercel deployment URLs may still exist; deleting a Git branch does not delete its old deployments. All new work uses the existing `design/postmarked-yours` branch.

## Tinta refinement — 12 November

Editorial and Estudio were rejected and removed. They were routes on this branch, not separate Git branches. Their components, styles, optional footer treatments and unused regular-weight Bodoni font are deleted. Old study URLs permanently redirect to Tinta, preserving the language and query string.

Tinta's hero now starts with the actual signature. The genre/location eyebrow and vertical “LOURDES MARTÍN — 01” label are removed. The artist's name remains as screen-reader-only text inside the H1, so the SVG has an accessible heading without a duplicate visible title.

### Signature motion

Three approaches were considered: a whole-mark ink fade, a word-by-word horizontal reveal, and closely traced pen masks. A fade loses the drawing effect; a horizontal reveal is predictable but looks like a wipe. The chosen treatment uses 18 manually traced gestures, 22–30 SVG units wide, instead of the previous 80-unit masks. Lourdes and Martín have separate masks, divided by the original vector contours because their vertical bounds overlap.

The same exact filled logo stays in place throughout. Only its visibility mask draws; no final rectangle, opacity crossfade of the whole mark, shape morph or replay loop is used. The two words and final crossbar/accent complete in 3.97 seconds. Linear stroke timing avoids easing to a stop at every letter. Future strokes stay invisible during their delays, preventing stray dots from round line caps. Reduced-motion users see the complete signature immediately, and the animation needs no client JavaScript.

This is a designed reveal of the extracted logo, not a recording of Lourdes writing. Geometry checks compare the finished masks with the original silhouette and inspect sampled progression. The browser connector remained unavailable; actual browser timing and rendered mobile appearance have not been verified.

## Paper card and layered footer — 12 November

Tinta drops the numbered Música/Fotos eyebrows and the “LM / Spotify” card heading. The Spotify controls tilt with their cream paper mount with a subtle irregular lower edge and one offset dusty-rose backing sheet. The complete card rotates by 1.25 degrees, including the iframe; the second sheet has its own small offset. The heading and accessible iframe title still identify the section/player.

The footer retains the same real Lourdes cut-out, 2.7-second stepped keyframes, offscreen pausing and reduced-motion behavior. The pause button is removed at the user's request. Stationary layers around the moving figure add depth: an old newspaper scrap behind her left side, a botanical rose print behind her right shoulder and a smaller bloom in front of the lower corner. Her name uses individually mounted magazine-style letters rather than an extra slogan. The composition uses the supplied reference's layering, not its cycling imagery or text.

The rose is a CC0 engraving from the Cleveland Museum of Art; the Spanish-language newspaper is a public-domain 1920 *El Comercio* page from Peru. Only body-column texture is shown, with no claim of artist coverage. Files are served locally, decorative imagery is hidden from assistive technology, and exact source links are recorded in `public/images/collage/SOURCES.md`. No new image generation is used.

On mobile the footer stacks, letter sizes scale down, and the artwork is contained within its own collage stage. The main links remain outside that clipping. Browser automation remains unavailable; build, source layout review and HTTP tests are not a substitute for live mobile review.

## Bolder studies after the production release — 12 November

Approved Tinta, the tilted player, footer-derived 1200 × 630 share card and search metadata were published to `main` as `39882b5` before these studies were built. The following routes are preview-only on `design/postmarked-yours`, all excluded from indexing. The public site and default Tinta remain the approved composition.

| Study | Route | Composition and material |
| --- | --- | --- |
| Carbón | `/es/carbon` | Black photocopied poster, monochrome cover on the left, condensed release title on the right, cream music insert and reversed collage footer. |
| Rojo | `/es/rojo` | Red gig-poster field, cream signature crossing the portrait edge, black condensed song title, full-width Canciones headline, paired photo spread and horizontal Instagram link. |
| Azul eléctrico | `/es/azul-electrico` | Cobalt screenprint, tall monochrome portrait, enlarged cream signature, acid-paper listening action, paired contact prints and dark navy footer. |

These change composition, print treatment and typography rather than the artist's genre or copy. No invented lyrics, quotes, events, badges or slogans are added. The signed logo, direct Spotify artist player with visibly tilted paper layers, photograph content, archival footer assets and original stepped cutout animation remain. The 320px layouts stack or recompose the same material.

The shared page/footer accept optional class maps, so each study can reposition individual elements without cloning content or changing the approved baseline CSS. Study rules are scoped to their own root class. Photographs cropped from the Instagram screenshot stay at or below 280 CSS pixels; the original release cover and supplied cutout support the larger compositions. Build, lint, types and route/SEO checks cover the previews, including preview-wide noindex. Browser rendering remains unverified because the browser connector is unavailable.
