"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getCopy, type Locale } from "@/lib/i18n";
import { artist } from "@/lib/artist";
import s from "./cutout-footer.module.css";

export function CutoutFooter({ locale, collage = false }: { locale: Locale; collage?: boolean }) {
  const t = getCopy(locale);
  const [visible, setVisible] = useState(false);
  const footer = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = footer.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <footer ref={footer} className={`${s.footer}${collage ? ` ${s.collage}` : ""}`} data-visible={visible}>
    <div className={s.stage}>
      <div className={s.footerCopy}>
        <p className={s.signoff}>{t.footerLine}</p>
        {collage ? <p className={s.clippedName} aria-hidden="true">
          {["Lourdes", "Martín"].map(word => <span className={s.nameLine} key={word}>
            {Array.from(word).map((letter, index) => <span className={s.letter} key={index}>{letter}</span>)}
          </span>)}
        </p> : <p className={s.bigName} aria-hidden="true"><span>Lourdes</span><span>Martín</span></p>}
        <div className={s.socials}><a href={artist.spotify} target="_blank" rel="noreferrer">Spotify ↗</a><a href={artist.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div>
      </div>
      <div className={s.cutoutStage}>
        {collage && <>
          <div className={s.newsprint} aria-hidden="true" />
          <div className={s.botanical} aria-hidden="true"><Image src="/images/collage/redoute-rose.webp" alt="" width={1000} height={1307} sizes="(max-width: 700px) 48vw, 290px" /></div>
        </>}
        <div className={s.cutout}><Image src="/images/lourdes-cutout.webp" alt={t.footerPhotoAlt} width={1000} height={969} sizes="(max-width: 700px) 85vw, 480px" /></div>
        {collage && <div className={s.bloom} aria-hidden="true"><Image src="/images/collage/redoute-rose-bloom.webp" alt="" width={900} height={635} sizes="(max-width: 700px) 28vw, 165px" /></div>}
      </div>
    </div>
    <div className={s.baseline}><span>© 2026 Lourdes Martín</span><span>{t.location}</span><a href="#home">{t.back} ↑</a></div>
  </footer>;
}
