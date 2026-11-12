import { ArtistPage } from "./artist-page";
import type { Concept, Locale } from "@/lib/i18n";
import carbon from "./variants/carbon.module.css";
import rojo from "./variants/rojo.module.css";
import azul from "./variants/azul.module.css";

const studies = { carbon, rojo, "azul-electrico": azul };

export function Design({ concept, locale }: { concept: Concept; locale: Locale }) {
  if (concept === "carbon" || concept === "rojo" || concept === "azul-electrico") {
    return <ArtistPage concept="tinta" locale={locale} designName={concept} styles={studies[concept]} />;
  }
  return <ArtistPage concept={concept} locale={locale} />;
}
