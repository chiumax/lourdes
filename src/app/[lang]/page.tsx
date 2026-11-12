import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { defaultConcept } from "@/lib/default-concept";
import { Design } from "@/designs/design";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return pageMetadata(lang);
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Design concept={defaultConcept} locale={lang} />;
}
