# Social-image fonts

These WOFF files are companion formats of the same Fontsource families used by the site. Next.js ImageResponse supports WOFF but not the site's WOFF2 runtime files.

- `anton-latin-400-normal.woff`: `@fontsource/anton` 5.3.0, SIL Open Font License. Full license: `../anton-LICENSE.txt`.
- `bodoni-moda-latin-900-normal.woff`: `@fontsource/bodoni-moda` 5.3.0, SIL Open Font License. Full license: `../bodoni-moda-LICENSE.txt`.
- `ibm-plex-mono-latin-400-normal.woff`: `@fontsource/ibm-plex-mono` 5.3.0, SIL Open Font License. Full license: `../ibm-plex-mono-LICENSE.txt`.

Files were extracted unmodified from the official Fontsource npm packages. The generator also reads DM Sans from the existing installed `@fontsource/dm-sans` dependency; its license is `../dm-sans-LICENSE.txt`.

Used by `scripts/generate-social-image.mjs`. They do not add fonts to the website's client rendering or introduce additional package dependencies.
