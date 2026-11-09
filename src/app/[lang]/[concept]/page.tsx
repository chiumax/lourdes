import { notFound } from "next/navigation";
import { concepts, isLocale, isConcept } from "@/lib/i18n";
import { Design } from "@/designs/design";

export function generateStaticParams() { return concepts.map(concept => ({ concept })); }

export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  if (!isConcept(concept)) return {};
  return { alternates: { languages: { es: `/es/${concept}`, en: `/en/${concept}`, "x-default": `/es/${concept}` } } };
}

export default async function ConceptPage({ params }: { params: Promise<{ lang: string; concept: string }> }) {
  const { lang, concept } = await params;
  if (!isLocale(lang) || !isConcept(concept)) notFound();
  return <Design concept={concept} locale={lang} />;
}
