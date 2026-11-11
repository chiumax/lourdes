"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getCopy, type Locale } from "@/lib/i18n";
import { artist } from "@/lib/artist";
import s from "./cutout-footer.module.css";

export function CutoutFooter({ locale, treatment = "original" }: { locale: Locale; treatment?: "original" | "editorial" | "estudio" }) {
  const t = getCopy(locale);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const footer = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = footer.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <footer ref={footer} className={`${s.footer}${treatment === "original" ? "" : ` ${s[treatment]}`}`} data-motion={paused ? "paused" : "running"} data-visible={visible}>
    <div className={s.stage}>
      <div className={s.footerCopy}>
        <p className={s.signoff}>{t.footerLine}</p>
        <p className={s.bigName} aria-hidden="true"><span>Lourdes</span><span>Martín</span></p>
        <div className={s.socials}><a href={artist.spotify} target="_blank" rel="noreferrer">Spotify ↗</a><a href={artist.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div>
      </div>
      <div className={s.cutoutStage}>
        <div className={s.cutout}><Image src="/images/lourdes-cutout.webp" alt={t.footerPhotoAlt} width={1000} height={969} sizes="(max-width: 700px) 85vw, 480px" /></div>
        <button className={s.motionControl} type="button" onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>{paused ? t.playMotion : t.pauseMotion}</button>
      </div>
    </div>
    <div className={s.baseline}><span>© 2026 Lourdes Martín</span><span>{t.location}</span><a href="#home">{t.back} ↑</a></div>
  </footer>;
}
