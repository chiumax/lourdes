# Spanish copy and English reference

The public entry point opens Spanish. The visible site has no language switch, following Lourdes's request to launch in Spanish. English remains available at `/en`, `/en/tinta`, `/en/amplificador` and `/en/recortes` as a reference for Rafa while reviewing the copy. Spanish routes use `/es` instead of `/en`. The newer style studies also have `/en/carbon`, `/en/rojo` and `/en/azul-electrico` reference routes; these share the same dictionary and remain noindex.

Edit the Spanish and English entries in [`src/lib/i18n.ts`](../src/lib/i18n.ts). The dictionary has matching typed keys, so a missing translation is caught by TypeScript. Keep the same key in each language; change its text rather than the component markup. The earlier explorations retain the same artist catalogue. Choosing Tinta, Amplificador or Recortes changes the art direction, not the artist's identity or catalogue.

## Voice

Use short, direct language. Let the photograph, typography and paper composition bring the attitude. The music is still acoustic pop; the more assertive styling does not imply that Lourdes has changed genre. Avoid invented artist quotations, lyrics, biographical claims, upcoming concerts, or first-person manifestos.

Suggested baseline vocabulary:

| Key or use | Spanish | English reference |
| --- | --- | --- |
| Music introduction | Pop acústico, desde Mallorca. | Acoustic pop, from Mallorca. |
| Music navigation | Música | Music |
| Song list | Canciones | Songs |
| Photograph section | Entre canciones | Between songs |
| Main listening link | Escuchar en Spotify | Listen on Spotify |
| Full catalogue | Todas las canciones en Spotify | All songs on Spotify |
| Photography link | Más fotos en Instagram | More photos on Instagram |
| Footer sign-off | Hasta la próxima. | See you around. |
| Return link | Volver arriba | Back to top |

This table is a writing reference; the dictionary is the source of truth for the current UI. Rafa can revise the Spanish wording independently of the English reference as long as it serves the same action or content.

## Keep these unchanged

- The name **Lourdes Martín**, signature artwork, Instagram handle and service names.
- Song titles, including their catalogue spelling and capitalization: “antes moría por verte”, “el problema”, “Que raro fue”, “ya no lloro” and “lo que siento por ti”. They stay in Spanish on the English reference pages too.
- Verified track destinations and durations in [`src/lib/music.ts`](../src/lib/music.ts).
- URL slugs, anchor IDs, dictionary keys, asset filenames and CSS class names. These are code, not visible copy.

## Review the whole experience

Translate image descriptions, navigation labels, the skip link, player controls, error recovery text and page descriptions as well as the large headings. Do not add a new English language selector until Lourdes wants an English public version.

After editing, run `npm run lint`, `npm run build` and `npm run typecheck`. With a production server running, `npm run check:site` checks Spanish and English pages and the existing route redirects. If an intentional copy change affects an asserted heading, update the expected wording in that check as well.

Finally, review Spanish on a narrow phone viewport and with larger system text. The HTTP checks cannot verify line breaks, clipping, touch targets, keyboard focus, screen-reader announcements, animation behavior or actual playback. Browser visual and interaction verification was unavailable during preparation of these variations.
