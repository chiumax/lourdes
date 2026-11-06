# Three scrapbook worlds for Lourdes Martín

These are three coded art directions, built from the same supplied signature, photographs, and verified artist destinations. Each has a complete homepage, responsive composition, custom CSS module, and Vercel branch entry point. The original detailed feature prompt remains in `DESIGN-PROMPT.md`.

| Direction | Route in every preview | Branch | Character |
| --- | --- | --- | --- |
| Postmarked, Yours | `/postmarked` | `design/postmarked-yours` | Warm, sun-washed correspondence |
| Bedroom Floor | `/bedroom-floor` | `design/bedroom-floor` | Bold, playful cut-and-paste music zine |
| The Blue Book | `/blue-book` | `design/the-blue-book` | Quiet, intimate after-hours songbook |

The root route on each branch exports that branch's selected direction. All three named routes remain available so the comparison links in the footer work without opening another deployment. Each version has its own component tree and scoped styles; the designs are not palette switches over the same template. Shared primitives are the artist data, SVG signature, opt-in Spotify player, small line drawings, and comparison navigation.

## 01 — Postmarked, Yours

**The idea:** a small envelope of music arriving from a friend. Translate the scrapbook into correspondence: airmail borders, oversized stamps, blue pen, warm stock, and tiny things kept from a day outside. The mood is open and generous.

The colours are peach `#f2b99c`, cobalt `#2249a3`, cream `#fffaf0`, and a restrained mustard stamp backing. The blue is strong enough to carry both the identity and a full section background. Georgia's editorial italic works with the actual signature; the smaller handwritten notes feel like annotations rather than a handwriting-themed interface.

The first composition is a single oversized postcard. Its divided front contains a large signature and “Wish you were listening” on one side, a postage-style portrait and recipient line on the other. Red-and-blue airmail edges hold the layout together. A circular postmark crosses the photograph's frame, and a simple paper flower connects the object to its surrounding peach canvas. The primary Spotify action sits in the postcard itself.

The music section changes the scale and colour: a solid cobalt background holds a loose cream letter, ruled very faintly, with the official player available on request. “Dear listener” and “yours, lourdes” explain the correspondence metaphor without inventing a personal biography. The third section uses two small photographic cards with a central typographic keepsake. This is a curated little bundle, not a simulated social feed.

On a phone, the postcard's text and listening link precede the portrait; the dividing line turns horizontal, and the paper scraps become a vertical arrangement. The scalloped/postal treatment belongs only to this version. Avoid bringing in the cassette, binder rings, or dark film borders from the other directions.

**Why its elements earn space:** the stamp makes the real portrait memorable; the postmark reinforces the artist identity; the letter supplies a natural setting for the music; the two photo cards show guitar and process; the Instagram link provides a real continuation. Postal markings are decorative and do not claim a real date, address, or travel history.

## 02 — Bedroom Floor

**The idea:** an affectionate, energetic music zine made from a pile of photographs, flyers, marker lettering, and things a person has kept. This is the most expressive direction. Keep it playful and personal rather than aggressive or corporate.

The palette is lavender `#c3b3df`, acid yellow `#e9f45e`, near-black `#242222`, with orange and pink accents. Large, heavy type creates the first impression; the extracted signature appears in cream on a piece of black paper. Type changes material as well as size: one phrase is black tape, one is a highlighter-yellow scrap, and annotations are written directly on the graph-paper background.

The hero is an irregular poster wall instead of a conventional text-and-image split. “Loud heart. Soft songs.” sits beside a large star-cut portrait. The guitar photo behaves like a taped contact print, while a circular listening sticker and orange “Press play” label provide clear actions. The signature remains a distinct, readable brand mark. The star treatment echoes the supplied second concert poster without reproducing its event information.

The next section is acid yellow. A cassette constructed in CSS supplies the music metaphor: hand-labelled artist name, tape window, reels, and a tactile paper backing. The playback control underneath loads the real Spotify embed. The cassette is artwork, not a pretend functioning tape deck: its reels do not imply playback progress, and there is no fabricated track list.

“Off the record” uses a less orderly arrangement of photographs, cut-out words, and a pink Instagram ticket. The barcode is explicitly decorative; the ticket goes to the artist's real profile. An emphatic black-and-yellow closing gives this direction a strong ending.

On mobile, deliberately reposition the collage: headline first, star portrait next, then the signature and smaller keepsakes. The music and photo sections return to normal vertical flow. Preserve readable captions and touch targets. Do not ask users to drag objects out of the way or infer what they can click.

**Why its elements earn space:** the poster wall conveys personality quickly; the star-cut portrait links to supplied artwork; the cassette contextualizes listening; the taped guitar photo connects the collage to music; the profile ticket gives a clear follow action. “Vol. 01” refers to the visual concept's first edition, not an invented album release.

## 03 — The Blue Book

**The idea:** a personal songbook opened after the day has quietened down. This direction should feel reflective and tactile, with a stronger editorial structure and much less visual noise.

Use midnight navy `#17283c`, faded blue `#385879`, pale page stock `#edece3`, and silver-blue annotations. Thin rules, small monospaced indexes, large warm serif text, and modest handwriting establish the hierarchy. The real signature is blue ink on the right-hand page. No neon, gradient glow, floating glass panels, or generic dark dashboard styling.

The centrepiece is an open, ring-bound notebook. The left page collects a blue-toned photographic print, a small film frame, and translucent tracing paper carrying a brief note. The right page belongs to the artist name, a quiet opening phrase, and the listening action. Binder rings explain the object; a bookmark provides an actual link to the songs section. The visual metaphor is present immediately, without an “open the book” loading gate.

Blue tonal treatment is CSS presentation of the supplied photograph; it does not change the committed source or generate a new likeness. The originals remain available for other variants. Tiny drawn points and lines are a decorative constellation, not an asserted location or actual star chart.

The second chapter places the player on a pale listening-notes page against the navy background. It uses a smaller type scale and more measured spacing than Bedroom Floor. The third chapter reveals a contact sheet of photographs on blue-grey paper. The sheet is a native disclosure, initially open, so a visitor can fold it away or reopen it with mouse, touch, or keyboard. The photographs are framed as numbered film prints, with short captions.

On a phone, the right page moves before the photographic page so the artist and listening action remain first. The ring spine disappears instead of trying to squeeze a desktop book spread onto a small screen. The pages and contact sheet stack naturally. The closing is deliberately small: a sign-off, a route back to the first page, and a profile link.

**Why its elements earn space:** the notebook gives the page an intimate setting; the divided pages distinguish identity from collected moments; the bookmark navigates; the chapter numbers provide orientation; the contact sheet offers a real open/close action. It does not invent songwriting drafts or lyrical quotations.

## Shared content and behaviour

- Each page uses the actual extracted signature with a CSS-driven, approximate pen reveal. Reduced-motion users see the entire logo immediately. The original hand-tuning limitations are documented in `ASSETS.md`.
- Spotify only loads after activation. Direct Spotify links remain available, and full playback depends on Spotify's own browser/account behaviour.
- All anchors point to existing sections. Instagram links point to the supplied artist account.
- No artificial releases, tour dates, listener statistics, booking addresses, biography, lyrics, or email forms are added.
- The two screenshot-derived music photos remain provisional and are used as small prints. Replace them with original files before enlarging them or offering press downloads.
- New paper, stamp, tape, cassette, star, and binding treatments use CSS or small inline SVGs; no new photographs or generated likenesses were introduced.
- The footer comparison navigation is for reviewing these three concepts. Remove it when one direction is chosen for the final public artist site.

## Review and deployment

Build and lint checks pass for all named routes. HTTP checks cover each page, headings, internal anchors, local assets, and the absence of a Spotify iframe before activation. Browser control was unavailable during this pass, so visual review, narrow-screen collision checks, real Spotify activation, keyboard interaction, and signature motion still need a browser pass. Do not treat a successful deployment as proof of visual QA.

Each branch is intended for a Vercel preview in the existing `lourdes` project. None is intended to replace the production branch until a direction is selected. Consult the final task handoff for the actual deployment URLs and verified deployment status.
