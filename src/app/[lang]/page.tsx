import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Estrella } from "@/designs/estrella";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Estrella />;
}
