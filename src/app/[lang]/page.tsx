import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { defaultConcept } from "@/lib/default-concept";
import { Design } from "@/designs/design";

export function generateMetadata() {
  return { alternates: { languages: { es: "/es", en: "/en", "x-default": "/es" } } };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Design concept={defaultConcept} locale={lang} />;
}
