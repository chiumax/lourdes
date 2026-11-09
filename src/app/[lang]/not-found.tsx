import { lang } from "next/root-params";
import { getCopy, isLocale } from "@/lib/i18n";

export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : "es";
  const t = getCopy(locale);
  return <main id="main" className="not-found"><span>404</span><h1>{t.notFound}</h1><a href={`/${locale}`}>{t.returnHome} ↗</a></main>;
}
