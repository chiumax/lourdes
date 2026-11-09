import Link from "next/link";
import { getCopy, type Locale, type Concept } from "@/lib/i18n";

export function ConceptNav({ current, locale }: { current: Concept; locale: Locale }) {
  const t = getCopy(locale);
  const versions = [["postmarked", t.postcard], ["bedroom-floor", t.bedroom], ["blue-book", t.notebook]] as const;
  return <details className="concept-disclosure"><summary>{t.compare}</summary><nav className="concept-nav" aria-label={t.compareLabel}>{versions.map(([path, name], index) => <Link href={`/${locale}/${path}`} key={path} aria-current={current === path ? "page" : undefined}>{index + 1}. {name}</Link>)}</nav></details>;
}
