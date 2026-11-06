import type { Metadata } from "next";
import localFont from "next/font/local";
import { artist } from "@/lib/artist";
import "./globals.css";

const sans = localFont({
  src: "../../public/fonts/dm-sans-latin-400-normal.woff2",
  variable: "--font-sans",
  display: "swap",
});
const handwriting = localFont({
  src: "../../public/fonts/caveat-latin-400-normal.woff2",
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lourdes Martín — songs & little things",
  description: "A little corner of Lourdes Martín’s world. Acoustic pop, music, and moments in between.",
  applicationName: artist.name,
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }, { url: "/icon.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Lourdes Martín — songs & little things",
    description: "Acoustic pop, music, and moments in between.",
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${handwriting.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
