import { ArtistPage } from "./artist-page";
import type { Concept, Locale } from "@/lib/i18n";

export function Design({ concept, locale }: { concept: Concept; locale: Locale }) {
  return <ArtistPage concept={concept} locale={locale} />;
}
