import Link from "next/link";
import { getCopy, type Locale, type Concept } from "@/lib/i18n";

export function ConceptNav({ current, locale }: { current: Concept; locale: Locale }) {
  const t = getCopy(locale);
  const versions = [["tinta", t.tint], ["amplificador", t.amp], ["recortes", t.cuttings]] as const;
  return <div className="variation-bar">
    <span>{t.variations}</span>
    <nav aria-label={t.compareLabel}>
      {versions.map(([path, name], index) => <Link href={`/${locale}/${path}`} key={path} aria-current={current === path ? "page" : undefined}><span>0{index + 1}</span> {name}</Link>)}
    </nav>
  </div>;
}
