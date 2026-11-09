import Image from "next/image";
import { getCopy, type Locale } from "@/lib/i18n";

export function PosterArchive({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <div className="poster-archive">
    <figure><a href="/images/poster-volander.webp" target="_blank" rel="noreferrer" aria-label={`${t.viewPoster}: El Volander`}><Image src="/images/poster-volander.webp" alt={t.volanderAlt} width={726} height={1279} sizes="(max-width: 700px) 66vw, 300px" /></a><figcaption><strong>El Volander</strong><span>15.05.2023</span></figcaption></figure>
    <figure><a href="/images/poster-movida.webp" target="_blank" rel="noreferrer" aria-label={`${t.viewPoster}: La Movida`}><Image src="/images/poster-movida.webp" alt={t.movidaAlt} width={800} height={1008} sizes="(max-width: 700px) 66vw, 340px" /></a><figcaption><strong>La Movida</strong><span>Palma</span></figcaption></figure>
  </div>;
}
