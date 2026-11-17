import type { Metadata } from "next";
import { artist } from "@/lib/artist";

// The public origin must never follow an immutable Vercel deployment hostname.
export const siteUrl = "https://lourdes-rosy.vercel.app";
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
export const socialImage = "/images/lourdes-social.png";
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const seoCopy = {
  title: "Lourdes Martín | Pop acústico desde Mallorca",
  description: "Web oficial de Lourdes Martín, artista de pop acústico de Mallorca. Canciones, videoclips, conciertos y fotos.",
  imageAlt: "El nombre de Lourdes Martín escrito a mano en azul sobre una playa al atardecer, rodeado de estrellas",
} as const;

export function pageMetadata(): Metadata {
  const canonical = absoluteUrl("/es");
  // Vercel previews must not compete with the public page.
  const index = !isPreviewDeployment;
  return {
    title: seoCopy.title,
    description: seoCopy.description,
    alternates: { canonical },
    robots: {
      index, follow: true,
      googleBot: { index, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website", url: canonical, siteName: artist.name, locale: "es_ES",
      title: seoCopy.title, description: seoCopy.description,
      images: [{ url: absoluteUrl(socialImage), width: 1200, height: 630, type: "image/png", alt: seoCopy.imageAlt }],
    },
    twitter: {
      card: "summary_large_image", title: seoCopy.title, description: seoCopy.description,
      images: [{ url: absoluteUrl(socialImage), alt: seoCopy.imageAlt }],
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
        sameAs: [artist.spotify, artist.instagram, artist.tiktok, artist.youtube],
      },
      {
        "@type": "WebSite", "@id": absoluteUrl("/#website"),
        name: artist.name, url: absoluteUrl("/es"), inLanguage: "es",
        publisher: { "@id": absoluteUrl("/#artist") },
      },
      {
        "@type": "WebPage", "@id": absoluteUrl("/es#webpage"),
        url: absoluteUrl("/es"), name: seoCopy.title, description: seoCopy.description,
        inLanguage: "es", isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#artist") },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(socialImage), width: 1200, height: 630 },
      },
    ],
  };
}
