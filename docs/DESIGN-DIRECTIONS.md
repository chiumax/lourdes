# Three design directions

The three branches now share a Spanish-first, fully bilingual content system. Each retains a distinct composition. The 9 November 2026 revision removes generic slogans and invented props and uses verified songs and the supplied concert posters instead. Read [the detailed review](DESIGN-REVIEW.md) for the assessment of every part and remaining QA limits.

| Design | Branch | Explicit Spanish route | Explicit English route |
| --- | --- | --- | --- |
| Postmarked, Yours | `design/postmarked-yours` | `/es/postmarked` | `/en/postmarked` |
| Bedroom Floor | `design/bedroom-floor` | `/es/bedroom-floor` | `/en/bedroom-floor` |
| The Blue Book | `design/the-blue-book` | `/es/blue-book` | `/en/blue-book` |

`/es` and `/en` show the selected branch's design. `/` defaults to Spanish or the visitor's saved preference. Legacy design paths redirect to their localized equivalents. The footer's optional design comparison links keep the chosen language.

- **Postmarked:** peach paper, blue ink, an understated airmail edge and a two-part postcard composition.
- **Bedroom Floor:** lavender, burgundy signature, a star-cut photo echoing the supplied poster, a release strip and a poster wall.
- **Blue Book:** dark slate, a flat two-page artist notebook, natural-colour photographs, a song index and an expandable photo sheet.

All three use the actual signature, verified song titles and Spotify links, the featured track's real artwork, and the two historical concert posters. They do not advertise unconfirmed future shows or invent an artist biography. Song titles and original Spanish artwork are preserved in both languages.

The shared implementation lives in `src/designs/`, localized routes in `src/app/[lang]/`, and copy in `src/lib/i18n.ts`. `src/lib/default-concept.ts` is the only branch-specific setting. There are no client-only translation flashes: the HTML arrives in the chosen language.
