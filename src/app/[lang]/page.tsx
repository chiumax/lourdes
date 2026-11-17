import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Estrella } from "@/designs/estrella";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return pageMetadata(lang);
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  // The site is Spanish only.
  if (lang !== "es") redirect("/es");
  return <Estrella />;
}
