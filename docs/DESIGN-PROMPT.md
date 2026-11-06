# Lourdes Martín — detailed design and implementation prompt

Use this as the brief for the next design/build pass. The existing repository is the foundation; continue it instead of replacing it with a generic template. The instructions below distinguish the starter already built from conditional features that need artist content.

## 1. Your role and the standard of work

Act as a senior independent web design studio building the personal website of acoustic-pop artist **Lourdes Martín**. Make the site feel like opening her scrapbook: a guitar nearby, a camera roll full of little moments, a note tucked inside a book, sunlight on a bedroom desk. The user describes the desired sensibility as “scrapbook / collage” and “college girl.” Translate that into youthful, personal, tactile art direction without infantilizing the artist or turning the site into a costume.

Every feature must pass four questions before you build it:

1. What does a listener get from this?
2. Why is this specifically right for Lourdes?
3. What real content makes it meaningful?
4. Does its value justify its visual weight, maintenance, and load cost?

If the answers are weak, omit it. A small site that makes someone press play and remember the artist is better than a sprawling site with empty sections. Treat listening as the primary action, connection as the secondary action, and live attendance as an action that appears only when dates are confirmed.

## 2. Source of truth

- Artist name: Lourdes Martín. Preserve the accented í in visible text and metadata.
- Genre: acoustic pop, as supplied by the user.
- Spotify: https://open.spotify.com/artist/246Ag05j7yjMUiIAMJ70A7
- Instagram: https://www.instagram.com/lourdesmartin15/
- Existing artwork, photographs, derivations, and their limitations: `docs/ASSETS.md`.
- The cream poster is the best source of signature geometry. The turquoise poster reinforces the playful colour and cut-paper direction.
- The Instagram screenshot provides visual evidence of guitars, casual performance, sunshine, everyday life, and water. It does not supply a verified biography, music catalogue, hometown story, or consent to invent quotations.

Do not invent song titles, release dates, streaming numbers, sold-out claims, press praise, awards, ticket links, booking emails, or first-person life stories. Do not mistake the May 2023 poster for an upcoming show. Treat draft copy in the starter as creative copy for review, not an approved artist statement. All source photographs should remain recognizable and unaltered beyond cropping and normal web optimization.

## 3. Overall concept: “songs & little things”

The page should feel assembled over time by one person with taste. Give different objects distinct roles: the signature introduces the artist; a photo introduces the person; a notebook holds the music; a ticket holds a confirmed show; a postcard offers a way to stay in touch. Material treatments should make the information easier to understand.

Use an editorial reading order even when the visible composition is irregular. The visitor should understand whose site this is and find a listening action immediately. Layer the hero generously, then give the music room to breathe. Allow the scrapbook section to be more casual. Finish quietly, as if reaching the last page of a notebook.

Suggested finished page order: identity → music → optional artist note → selected moments → optional live dates → optional letters/contact → quiet footer. The current foundation implements identity, music, moments, and footer. Do not add a visible empty placeholder for every future section.

## 4. Visual system

### Colour

Start with the implemented tokens and adjust only after viewing them alongside the real photos:

| Role | Starting colour | Application |
| --- | --- | --- |
| Warm paper | `#f6f1e7` | Page canvas, with very subtle grain |
| Light paper | `#fffcf6` | Photo borders and notes |
| Dark ink | `#493d33` | Primary text and fine line drawings |
| Muted ink | `#756455` | Captions and secondary text |
| Faded rose | `#c56b77` | Main signature and selective emphasis |
| Blush paper | `#edc4c8` | Backing scraps and a single invitation note |
| Olive | `#626449` | Main listening action and quiet accents |
| Warm ochre | approximately `#e6d48e` | One small sticker; use sparingly |

The palette should support the photographs rather than wash every photograph pink. Let the blue water be a naturally occurring accent. Small pink text on cream may lack contrast; use dark ink for essential small labels and reserve rose for sufficiently large headings or decoration. Verify actual contrast after any token change.

### Type

Use three voices with clear jobs: the extracted signature as identity, Georgia or a similarly warm editorial serif for larger section titles, DM Sans for navigation and useful information. Caveat supplies short annotations. Do not use handwriting for long paragraphs, dates, form labels, errors, or ticket details.

Give serif titles natural line breaks. Avoid all-caps sentences; use letter-spaced small capitals only for restrained section indexes. Do not replace the logo with a font that merely resembles it. Self-host fonts and keep the number of files small. If Spanish copy is approved, confirm accented characters in the selected subsets.

### Material and layout

Paper shadows should be shallow and warm: one broad ambient shadow and, where helpful, a small contact shadow. Tape should be slightly translucent with imperfect edges, not a luminous glass effect. One or two paper scraps can have notebook lines; the entire site should not become a ruled exercise book.

Use small rotations, usually 2–6 degrees. Larger rotations belong to a tiny keepsake, not a whole content section. Every photo must have an intentional crop. Do not put tape across eyes or important text. Preserve calm space around the name and listening action.

The desktop canvas can be approximately 1160–1300 pixels wide. At large widths, use deliberate asymmetry instead of stretching every element. The hero can be two unequal visual areas, but should not look like a standard SaaS feature grid. Use regular document flow for section structure and local positioning for decorative overlaps. Visual irregularity is welcome; unreadable text and accidental overflow are not.

## 5. Feature 01 — signature-led arrival

**Purpose:** establish a memorable personal identity and offer an immediate path to the music.

**Representation:** the extracted two-line signature in faded rose, large enough to recognize the original loops. Pair it with one primary candid portrait in an off-white instant-photo frame, a blush paper fragment behind it, a smaller guitar photograph, and at most two brief annotations. A short phrase such as “songs & little things” frames the page without pretending to be a lyric.

**Interaction:** a single visible “Listen on Spotify” link takes the user directly to the verified artist. Keep the action near the signature; it must not depend on scrolling through decorative material. A subtle down-page link can help people discover the music section.

**Animation:** preserve the extracted foreground outline. Use separate centreline paths as animated masks to reveal the outline in a plausible writing sequence: first name, surname, crossbar, accent. Animate stroke-dashoffset rather than drawing the boundaries of the filled outline. Tune stroke widths locally so one mask does not expose an adjacent letter too early. The current implementation has approximate broad masks; refine them by eye before calling the motion final. Aim for roughly 2–3 seconds total with a natural easing, once per page entry. Never create a loading screen, disable scrolling, or wait for animation to enable links. Under reduced motion, display the whole name immediately.

**Acceptance:** the completed mark matches the supplied geometry; no counters are filled accidentally; the full logo is visible with motion disabled; the artist's name remains available as text to screen readers; the primary listening action is obvious on a phone; no artwork clips into essential text at intermediate widths.

## 6. Feature 02 — the music, held in a notebook

**Purpose:** make the website useful to someone who has never heard Lourdes.

**Representation now:** a warm serif “For your headphones” heading beside a lightly ruled notebook sheet. A handwritten “on repeat” label provides personality, but the music itself remains the content. Keep a clear Spotify link even if embeds cannot load.

**Interaction now:** explicitly load the official Spotify artist embed after a button press. Do not request Spotify resources on the initial page render, autoplay on arrival, or construct a fake audio player whose progress bar does nothing. The button label must distinguish loading the player from guaranteed playback. Spotify may restrict full playback by browser, region, or account; keep the external destination visible.

**Next, when release data is supplied:** introduce one featured release with its actual artwork, exact title, type, release date, and verified link. Show a small secondary list only if there is a useful catalogue. If there are only one or two releases, do not create an elaborate carousel or search interface. Keep actual album artwork square and intact; apply scrapbook treatment to its surrounding paper, not to the cover itself.

**Acceptance:** the verified artist ID is used consistently; no third-party embed appears before opt-in; the player has an accessible title; error or blocked-player states still provide a useful link; the player fits a narrow phone; the most important listening action takes one clear step.

## 7. Feature 03 — an artist note, only when she supplies one

**Purpose:** give a visitor a personal connection that the photographs alone cannot provide.

**Representation:** one short note on cream paper, written in readable type with a handwritten salutation or sign-off. Around 60–120 words is enough: why she writes, what inspires the songs, or what she wants a listener to feel. It may sit beside a relaxed rehearsal photograph rather than occupy an entire generic “About” page.

**Content gate:** obtain an approved note in Lourdes's own voice. Do not expand “acoustic pop” into a dramatic fictional biography. Do not assign age, education, birthplace, language, or influences without confirmation. Her supplied profile indicates Mallorca, but any fuller geographic or personal story needs her wording.

**Acceptance:** the note reveals something specific, is approved, and is easy to read. If no authentic note is available, omit the section; the page is complete without it.

## 8. Feature 04 — a curated scrapbook

**Purpose:** offer a small glimpse of the person and process behind the songs, and a reason to follow her elsewhere.

**Representation:** three to six carefully chosen moments at most. Vary the proportions and materials subtly: one larger photo, a narrower print, perhaps a contact-sheet pair. Use real rehearsal, writing, performance, and everyday photographs. Each item should add something; avoid six nearly identical portraits. Captions should be brief and either approved by Lourdes or clearly neutral descriptions.

**Starter:** two music-related crops from the supplied Instagram screenshot are already present. Keep those small until original files replace them. The photo beside the sea is a separately supplied original-size asset. Do not imply a screenshot crop is a high-resolution press image.

**Interaction:** leave ordinary prints static unless enlargement provides useful detail. If a lightbox is justified by good originals, use an accessible dialog primitive with Escape-to-close, visible close button, focus trapping, return focus, meaningful captions, and keyboard previous/next controls. Swipe may supplement those controls. Keep a visible Instagram destination rather than making every photo an ambiguous outbound link.

**Video gate:** use only an actual provided or legitimately available video file/official embed. Start with a real poster frame, explicit play control, and captions when speech or lyrics matter. Use `preload="none"` for self-hosted clips. Never autoplay with sound, manufacture motion from a screenshot, scrape behind a login, or promise a video when only a still exists.

**Acceptance:** gallery images are properly sized; no Instagram interface badges remain in crop exports; decorative frames do not conceal content; touch users can understand every action without hover; the gallery offers selection and context, not an endless social feed.

## 9. Feature 05 — live dates as saved ticket stubs

**Purpose:** help a fan attend a real performance.

**Representation:** a small stack or tidy vertical list of paper ticket stubs. Give every event an unmistakable date, city, venue, and primary action. Perforations and small stamp details can reinforce the ticket metaphor without reducing legibility. Dates must not rotate or split awkwardly over lines.

**Content gate:** require confirmed future event date/time, time zone, city, venue, official ticket URL, and status. Render from typed local data first; no ticketing backend or CMS is necessary for a handful of events. Sort future events chronologically, and treat sold-out/cancelled status as actual data. Do not label a historical poster “upcoming.”

**Empty state:** omit the section when no verified dates exist. If the artist specifically wants a standing section, use an approved short note with an Instagram link. Do not fabricate “new dates coming soon” as a promise.

**Acceptance:** ticket links go to the correct event, past dates are never presented as future dates, and the status is readable without relying on colour. A calendar download is optional only after exact timezone and event details are supplied.

## 10. Feature 06 — letters or booking, only with a working destination

**Purpose:** maintain a connection independently of social feeds, or allow a booker to reach the right person.

**Mailing-list representation:** a small postcard near the end, with one sentence explaining what subscribers receive, one email field, and one clear action. A message such as “a note when there’s something new” needs artist approval and an actual sending plan. It should feel personal, not like a marketing funnel.

**Content and infrastructure gate:** only build the form once a provider, list owner, privacy information, and expected mailing content are decided. Validate server-side, handle duplicate and invalid addresses, provide honest loading/error/success states, and never show success before the provider has accepted the request. Keep provider credentials on the server. Use the provider's appropriate consent and unsubscribe flow. No popup, countdown, forced sign-up, or prechecked marketing choice.

**Booking representation:** a simple textual link or a small business-contact note using a verified address. A contact form is unnecessary unless the artist prefers one. Do not label Instagram as a confirmed booking channel. Press downloads should exist only when the artist supplies an approved bio, original photos, credits, and artwork intended for that purpose.

**Acceptance:** no dead email link, no decorative-only form, no fake success state, and no data collection without an actual service. Until there is a verified destination, keep the existing Instagram invitation.

## 11. Feature 07 — navigation and quiet closing

**Purpose:** make the collage easy to use without surrounding it with application chrome.

**Representation:** a small wordmark/handwritten home link and a few plain-text anchors. Navigation should reflect the actual page sections, never future placeholders. The starter uses “the music” and “little moments,” with an Instagram invitation on desktop. The footer offers a short sign-off, artist name, and a way back up.

**Behaviour:** use real anchors with meaningful IDs; keep focus visible. A fixed header is unnecessary unless the finished page grows long enough to need one. Avoid a hamburger menu for two links. If real content later requires a mobile menu, use a keyboard-accessible primitive with custom styling and appropriate focus handling.

**Acceptance:** every navigation item resolves to real content or a clearly identified external destination; the header remains readable at 320 pixels; the footer is useful and quiet; no invented management attribution or unnecessary agency credit competes with the artist.

## 12. Responsive choreography

Design the phone composition deliberately. Do not shrink the desktop collage into illegible miniatures. On smaller screens, introduce the artist and listening action first, then the primary portrait, then the rest of the page. Reduce decorative density, not text readability. The notebook player becomes full width. Prints can stagger vertically rather than force horizontal scrolling.

At intermediate tablet widths, check the guitar print, annotation arrow, and logo carefully; these are the likely overlap points. Keep rotated elements inside an intentional section boundary. Avoid using page-wide overflow hiding to conceal mistakes. Reserve image space with explicit dimensions and appropriate aspect ratios. Use `sizes` that match the actual photo width.

Review at 320, 390, 768, 1024, and 1440 CSS pixels, plus 200% text zoom. A finger should have approximately 44 pixels of comfortable target area for actions. Keep the DOM reading order aligned with the phone experience. Make the page navigable without drag gestures or hover-only information.

## 13. Motion and interaction limits

The signature is the central animation. Small hover changes on a paper link are enough elsewhere: a 1–3 pixel lift, a slight reduction in rotation, and a 150–200 millisecond transition. Touch screens need no simulated hover choreography.

Do not add a custom cursor, cursor-following sparkles, drifting stickers, scroll-jacking, looping vinyl, an entry loader, background music, or large parallax movement. None earns its cost in this brief. Avoid animating every section just because it is technically possible. Respect reduced motion globally and ensure all information is already present without animation.

## 14. Technical implementation

Continue Next.js App Router, React, and strict TypeScript. Use server components for static content. Isolate interactive state to small client components such as the optional player or a future dialog. Keep custom styles readable and local to the design; do not import a component-library aesthetic.

Shadcn/Radix may provide behaviour for a justified dialog, form primitive, or future navigation menu. Do not add it solely for a plain anchor, paper shape, or button. No CMS, database, authentication, commerce, analytics dashboard, or custom music streaming backend is needed for the starter.

Use local optimized images with Next Image, real intrinsic dimensions, and correct `sizes`. Preload only the main hero photo. Keep decorative assets small and code-native where possible. Fonts are self-hosted. Retain the committed lockfile and asset provenance document. Never make the build depend on the gitignored `.context` references.

Use typed data files for real future releases/events. Separate content from display when the volume justifies it. Keep dates timezone-aware. Add a CMS only if the person maintaining the site needs it, and select it around their editing workflow rather than implementation novelty.

## 15. Metadata, language, and delivery

Keep the artist name, concise description, and favicon in place. Once a domain is selected, configure the canonical URL and metadata base, then add a real social-sharing image using the extracted logo and approved portrait. Do not publish localhost as the canonical production address. A sitemap is useful when there are actual additional routes; do not generate empty routes to make a sitemap look substantial.

English is the starter's working language because the brief is in English. The Spanish posters and Mallorca profile make language choice worth discussing with Lourdes before final copy. Do not add a decorative language switcher. If bilingual content is requested, provide complete, approved translations, correct document language, localized metadata, and persistent navigable language URLs.

Source pushed to GitHub is not the same as hosting deployed. Keep that distinction explicit. Configure hosting, domain, canonical metadata, and any external services when those are actually selected.

## 16. Feature decisions and scope

| Feature | Decision | Reason |
| --- | --- | --- |
| Custom signature and restrained reveal | Included; refine motion | Strongest existing brand asset |
| Real portrait and a small collage | Included | Establishes personality immediately |
| Spotify artist destination | Included | Core listener task |
| Optional official player | Included | Allows listening without burdening first load |
| Curated photo moments and Instagram link | Included | Makes the site personal and connects to an active destination |
| Specific release feature | Conditional | Requires exact release details and artwork |
| Artist letter | Conditional | Requires her authentic voice |
| Live-date stubs | Conditional | Requires confirmed future events |
| Video or lightbox | Conditional | Requires suitable source media and a useful viewing reason |
| Email list or booking details | Conditional | Requires a real destination and operating process |
| Merch store | Omitted | No products, fulfilment, or request supplied |
| Blog, accounts, comments, guestbook | Omitted | Ongoing obligations without a demonstrated listener need |
| Autoplay music, loading gate, drag-only navigation | Omitted | Gets between visitors and the artist |
| Live Instagram feed | Omitted | A curated selection has more control and fewer dependencies |
| Analytics and tracking | Deferred | Needs a specific measurement purpose and production context |

## 17. Required final review

Before describing the next pass as finished:

1. Compare the final logo to both supplied poster references. Inspect counters, accent, shadow, and terminal strokes. Review the animation at full speed and with reduced motion enabled.
2. Inspect the whole page on desktop, tablet, and narrow phone widths. Verify no accidental overlap, clipped text, missing photos, or horizontal document overflow. Save real browser screenshots for desktop and phone.
3. Use only a keyboard: reach the skip link, all anchors, player activation, and any dialogs. Check focus visibility, return focus, accessible names, heading order, and decorative artwork exclusions.
4. Confirm no Spotify iframe is requested until activation; then verify the correct artist appears. Test the external fallback and acknowledge any account/region playback restriction. Ensure no audio starts on arrival.
5. Test actual external URLs and any release/event links. Check timezones and past-date handling if events are added. Submit any real form through its actual failure and success cases before launch.
6. Verify essential text contrast, usable touch targets, image crops, alt text, 200% zoom, and no-motion visibility.
7. Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm audit`. Inspect for browser console and hydration errors. Do not substitute build success for visual QA.
8. Confirm runtime assets work in a fresh checkout with no `.context` attachments. Remove unused assets/dependencies and update provenance when replacing source images.
9. Ask of every element: if it disappeared, would a listener lose useful information, personality, orientation, or a clear action? If nothing would be lost, consider removing it.

The desired outcome is a small, unmistakably personal home for Lourdes's music: tactile, light, a little imperfect in composition, and carefully finished in the details that affect the visitor.
