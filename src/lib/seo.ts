import type { Metadata } from "next";
import { artist } from "@/lib/artist";
import type { Concept, Locale } from "@/lib/i18n";

// The public origin must never follow an immutable Vercel deployment hostname.
export const siteUrl = "https://lourdes-rosy.vercel.app";
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
export const socialImage = "/images/lourdes-social.png";
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const seoCopy = {
  es: {
    title: "Lourdes Martín | Pop acústico desde Mallorca",
    description: "Web oficial de Lourdes Martín, artista de pop acústico de Mallorca. Escucha sus canciones en Spotify y descubre sus fotos en Instagram.",
    imageAlt: "Lourdes Martín en un collage de letras recortadas, rosas y papel de periódico sobre fondo burdeos",
  },
  en: {
    title: "Lourdes Martín | Acoustic pop from Mallorca",
    description: "The official website of Lourdes Martín, an acoustic pop artist from Mallorca. Listen to her songs on Spotify and find her photographs on Instagram.",
    imageAlt: "Lourdes Martín in a collage of cut-out lettering, roses and newspaper on a burgundy background",
  },
} as const;

export function pageMetadata(locale: Locale, concept: Concept = "tinta"): Metadata {
  const copy = seoCopy[locale];
  const canonical = absoluteUrl(concept === "tinta" ? `/${locale}` : `/${locale}/${concept}`);
  // English is a copy-review page for now. Design studies are also unlisted.
  const index = !isPreviewDeployment && locale === "es" && concept === "tinta";
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical },
    robots: {
      index, follow: true,
      googleBot: { index, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website", url: canonical, siteName: artist.name,
      locale: locale === "es" ? "es_ES" : "en_GB",
      title: copy.title, description: copy.description,
      images: [{ url: absoluteUrl(socialImage), width: 1200, height: 630, type: "image/png", alt: copy.imageAlt }],
    },
    twitter: {
      card: "summary_large_image", title: copy.title, description: copy.description,
      images: [{ url: absoluteUrl(socialImage), alt: copy.imageAlt }],
    },
  };
}

export function artistStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup", "@id": absoluteUrl("/#artist"),
        name: artist.name, genre: artist.genre, url: absoluteUrl("/es"),
        image: absoluteUrl("/images/lourdes-sunshine.webp"),
        sameAs: [artist.spotify, artist.instagram],
      },
      {
        "@type": "WebSite", "@id": absoluteUrl("/#website"),
        name: artist.name, url: absoluteUrl("/es"), inLanguage: "es",
        publisher: { "@id": absoluteUrl("/#artist") },
      },
      {
        "@type": "WebPage", "@id": absoluteUrl("/es#webpage"),
        url: absoluteUrl("/es"), name: seoCopy.es.title, description: seoCopy.es.description,
        inLanguage: "es", isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#artist") },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(socialImage), width: 1200, height: 630 },
      },
    ],
  };
}
