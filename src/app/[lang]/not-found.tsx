import Link from "next/link";
import { copy } from "@/lib/i18n";

export default function NotFound() {
  return <main id="main" className="not-found"><span>404</span><h1>{copy.notFound}</h1><Link href="/es">{copy.returnHome} ↗</Link></main>;
}
