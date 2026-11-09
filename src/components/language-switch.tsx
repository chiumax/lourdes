"use client";

import { usePathname } from "next/navigation";
import { getCopy, type Locale } from "@/lib/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
  return <nav className="language-switch" aria-label={getCopy(locale).language}>
    {(["es", "en"] as const).map(language => <a
      key={language}
      href={`/${language}${suffix}`}
      lang={language}
      hrefLang={language}
      aria-label={language === "es" ? "Español" : "English"}
      aria-current={language === locale ? "page" : undefined}
      onClick={event => {
        document.cookie = `lm-language=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
        // Real links work without JS; enhancement retains the current section/query.
        event.currentTarget.href = `/${language}${suffix}${window.location.search}${window.location.hash}`;
      }}
    >{language.toUpperCase()}</a>)}
  </nav>;
}
