import Link from "next/link";
const concepts = [
  { path: "/postmarked", name: "01 — Postmarked, Yours" },
  { path: "/bedroom-floor", name: "02 — Bedroom Floor" },
  { path: "/blue-book", name: "03 — The Blue Book" },
];
export function ConceptNav({ current }: { current: string }) {
  return <nav className="concept-nav" aria-label="Compare design directions"><span>THREE LITTLE WORLDS</span>{concepts.map(concept => <Link href={concept.path} key={concept.path} aria-current={current === concept.path ? "page" : undefined}>{concept.name}</Link>)}</nav>;
}
