import type { Concept, Locale } from "@/lib/i18n";
import { Postmarked } from "./postmarked";
import { Bedroom } from "./bedroom";
import { BlueBook } from "./blue-book";

export function Design({ concept, locale }: { concept: Concept; locale: Locale }) {
  if (concept === "bedroom-floor") return <Bedroom locale={locale} />;
  if (concept === "blue-book") return <BlueBook locale={locale} />;
  return <Postmarked locale={locale} />;
}
