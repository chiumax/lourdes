import { ArtistPage } from "./artist-page";
import { TintaStudy } from "./tinta-study";
import type { Concept, Locale } from "@/lib/i18n";

export function Design({ concept, locale }: { concept: Concept; locale: Locale }) {
  if (concept === "tinta-editorial" || concept === "tinta-estudio") {
    return <TintaStudy treatment={concept === "tinta-editorial" ? "editorial" : "estudio"} locale={locale} />;
  }
  return <ArtistPage concept={concept} locale={locale} />;
}
