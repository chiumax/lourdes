import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getCopy, isLocale, locales } from "@/lib/i18n";
import { pageMetadata, siteUrl } from "@/lib/seo";
import "../globals.css";

const sans = localFont({ src: "../../../public/fonts/dm-sans-latin-400-normal.woff2", variable: "--font-sans", display: "swap" });
const handwriting = localFont({ src: "../../../public/fonts/caveat-latin-400-normal.woff2", variable: "--font-handwriting", display: "swap" });
const display = localFont({ src: "../../../public/fonts/anton-latin-400-normal.woff2", variable: "--font-display", display: "swap", preload: false });
const editorial = localFont({ src: "../../../public/fonts/bodoni-moda-latin-900-normal.woff2", variable: "--font-editorial", display: "swap", preload: false });
const mono = localFont({ src: "../../../public/fonts/ibm-plex-mono-latin-400-normal.woff2", variable: "--font-mono", display: "swap", preload: false });
type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() { return locales.map(lang => ({ lang })); }

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return {
    metadataBase: new URL(siteUrl),
    ...pageMetadata(lang),
    icons: { icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }, { url: "/icon.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} className={`${sans.variable} ${handwriting.variable} ${display.variable} ${editorial.variable} ${mono.variable}`}><body><a className="skip-link" href="#main">{getCopy(lang).skip}</a>{children}</body></html>;
}
