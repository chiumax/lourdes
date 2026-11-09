# Design review — 9 November 2026

The first versions looked assembled from familiar scrapbook tropes. They had distinct colour schemes but shared too much of the same generic emotional copy and decoration. The artist's real identity was less prominent than invented visual props. This review covers the content, hierarchy, images, interactions, accessibility, language, implementation and deployment of all three versions.

This is a review of the code, supplied assets and source content. Browser navigation failed in the available UI tool, so no claim of completed visual QA is made. Responsive styling and layout changes still need visual confirmation on devices.

## Decisions by part

| Part | What was wrong | What changed and why |
| --- | --- | --- |
| Artist identity | The real signature competed with taglines such as “Loud heart. Soft songs.” | The supplied signature is now the main heading in all three designs. Artist name, acoustic pop and Mallorca introduce a real person instead of a lifestyle slogan. |
| Main copy | “Little things,” “sunshine,” “big feelings,” “stay a while,” and “quiet things” appeared repeatedly without adding information. | Removed the slogan-heavy hero text, ticker, promotional stickers and repetitive emotional sign-offs. Copy now identifies songs, photos and an archive. |
| Music | A generic player placeholder required a click before visitors could see a single song. | Five verified songs appear immediately with durations and direct Spotify links. The optional embed is a secondary explicit control rather than the only route to the music. |
| Featured image | The same smiling portrait was reused as generic decoration. | Spotify confirms it is the cover image for “antes moría por verte.” It now appears with the actual title, release date and track link. No “latest single” claim is made. |
| Photography | Multiple versions reused a portrait at several points, and one applied a blue filter that obscured its natural colour. | The artwork appears once in each page's main composition. Small guitar photos provide a different subject. Removed grayscale/blue filters. The screenshot crops remain labelled provisional in the asset inventory. |
| Authentic scrapbook content | The supplied posters were used only to extract a logo, while the site manufactured its own tickets and labels. | Added the actual concert posters as an archive, preserving their original design. Clearly marked as historical, with no unsupported upcoming-show claims or unverified year on the Palma poster. |
| Decorative objects | Cassette reels, a barcode, invented postage messages, constellations, binder rings, stars and arrows crowded the content. | Removed the fake cassette, barcode, ticker, constellation, binder rings, postal recipient, empty ruled address and generic doodles. Kept a modest paper treatment, a border in Postmarked, and the star photo silhouette in Bedroom Floor because the latter comes from a supplied poster. |
| Logo motion | Broad SVG reveal masks exposed adjacent strokes and did not follow actual handwriting. | Returned to the faithful static vector. A precise drawn signature remains a future option after genuine centreline tracing and browser review. |
| Navigation | Clever labels and repeated “chapter” descriptions made simple destinations harder to scan. | Explicit Music / Photos / Archive labels, translated completely. Every link targets a rendered section or verified external destination. |
| Review controls | A large “Three little worlds” design chooser made the artist page feel like a template demo. | Put design comparison links inside a small optional footer disclosure. They retain the selected language. |
| Language | English copy assumed the artist's public voice; no switch was implemented. | Spanish is the default. English and Spanish are statically rendered at separate URLs. Navigation, captions, accessibility labels, player controls, metadata, error copy and comparison labels are translated. |
| Layout | Desktop hero collages relied on many absolute coordinates. Translated text would amplify collisions. | Replaced most positioning with flexible document flow and local overlaps. Each variant retains its composition, but Spanish length no longer depends on fitting a fixed English text box. |
| Implementation | Large single-line JSX and obsolete decorative CSS made review harder. | Separate server-rendered designs, scoped styles, typed language dictionary, small client islands, shared real track list and archive. Removed obsolete layout and animation code. |

## What remains distinct

### Postmarked, Yours

A restrained peach-and-cream postcard with blue ink. The signature and featured song sit beside the real cover, with a single airmail edge. A guitar photograph accompanies a readable song list. The archive is a pair of real posters on warm paper. The page keeps the correspondence composition but drops pretend addresses, postmarks and multiple stationery slogans.

### Bedroom Floor

A lavender cut-paper composition with a large burgundy signature. The star-shaped cover crop echoes the supplied La Movida poster; the small guitar photograph provides a second real element. A horizontal strip identifies the actual featured track. The music section uses dark ink and a loose light track sheet, followed by the historical poster wall. No artificial cassette, barcode or inspirational cut-out typography remains.

### The Blue Book

A dark slate canvas surrounds a quiet two-page composition. Natural-colour artwork and an actual featured track replace invented journaling messages. The music section is a readable song index. Two photographs remain in an expandable contact sheet; this is a genuine keyboard-operable disclosure, not a simulated page-turn interface. An archive section gives the collected-paper idea real material.

## Language behaviour

- `/` opens `/es` on a first visit. A saved `lm-language=en` preference opens `/en` instead.
- The header uses text links labelled ES / EN, with full accessible names Español / English. Flags are not used to represent languages.
- The current language is indicated visually and with `aria-current`.
- Switching preserves the selected design path, query string and section hash. A preference cookie records an explicit switch for future visits to unprefixed entry points.
- Refreshing and sharing an explicit locale URL retain the language without JavaScript.
- Footer comparison links preserve the locale.
- Legacy `/postmarked`, `/bedroom-floor` and `/blue-book` links redirect to their localized equivalents.
- The document's `lang`, page description, title, Open Graph locale and language-alternate links match the selected language.
- The five Spanish song titles, proper names, Instagram handle and original poster lettering remain unchanged in English. These are artwork and catalogue names, not untranslated interface strings.
- Unsupported languages and unknown designs return 404. Localized not-found recovery content provides a localized route home. In this Next.js build, that recovery content is delivered in the React payload and requires JavaScript; the initial error document does not contain the translated body. Normal artist pages are fully server-rendered.
- Spotify's own embedded UI and playback availability remain under Spotify's control. The host-site controls and iframe title are translated; the locale is also passed to the embed.

## Source evidence

Catalogue titles, IDs and durations: [Spotify artist embed](https://open.spotify.com/embed/artist/246Ag05j7yjMUiIAMJ70A7), fetched 2026-11-09. Featured artwork and release date: [Spotify track embed](https://open.spotify.com/embed/track/2mvtMnxyRxaSTgcYTV8JIe), fetched the same day. Poster details are taken from the user's supplied images. Mallorca is present in the supplied Instagram profile screenshot; no further biography is invented.

## Validation and limits

The production integration check (`npm run check:site`, with a running production server) verifies both language homepages, all six localized design pages, branch-specific homepage selection, correct document language, translated metadata/body, track destinations, all anchor targets, loaded local resources, deferred Spotify loading, legacy redirects, saved preferences and invalid-route 404s. TypeScript checks dictionary parity. Build and lint are separate checks.

Visual inspection of rendered layouts, actual language-switch clicks, saved-cookie behaviour in a real browser, player activation, and mobile overflow remain browser checks. They must not be inferred from HTTP checks. The browser tool's navigation failure prevented that review in this session. The original images and the downloaded artwork were inspected directly.

Remaining content limitation: two guitar photographs are screenshot crops rather than original source files. Original photographs and artist-written notes would make the final site more personal still; fabricated first-person copy is not a substitute.
