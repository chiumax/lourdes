import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getCopy, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const sans = localFont({ src: "../../../public/fonts/dm-sans-latin-400-normal.woff2", variable: "--font-sans", display: "swap" });
const handwriting = localFont({ src: "../../../public/fonts/caveat-latin-400-normal.woff2", variable: "--font-handwriting", display: "swap" });
type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() { return locales.map(lang => ({ lang })); }

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getCopy(lang);
  return {
    metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
    title: `Lourdes Martín — ${t.music}`,
    description: t.description,
    icons: { icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }, { url: "/icon.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
    openGraph: { title: "Lourdes Martín", description: t.description, type: "website", locale: lang === "es" ? "es_ES" : "en_GB", alternateLocale: lang === "es" ? "en_GB" : "es_ES" },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} className={`${sans.variable} ${handwriting.variable}`}><body><a className="skip-link" href="#main">{getCopy(lang).skip}</a>{children}</body></html>;
}
