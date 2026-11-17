// The site is Spanish only. `[lang]` stays as the root segment so the document language is set per route.
export const locales = ["es"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.some(locale => locale === value);

export const copy = {
  skip: "Saltar al contenido",
  notFound: "Esta página no está aquí.",
  returnHome: "Volver al inicio",
} as const;
