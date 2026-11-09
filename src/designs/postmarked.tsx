import Image from "next/image";
import { Signature } from "@/components/signature";
import { SongList } from "@/components/song-list";
import { PosterArchive } from "@/components/poster-archive";
import { ConceptNav } from "@/components/concept-nav";
import { LanguageSwitch } from "@/components/language-switch";
import { artist } from "@/lib/artist";
import { featured, trackUrl } from "@/lib/music";
import { getCopy, type Locale } from "@/lib/i18n";
import s from "./postmarked.module.css";

export function Postmarked({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <div className={s.world} data-design="postmarked">
    <header className={s.header}>
      <a href="#home" className={s.home}>lourdes martín</a>
      <div className={s.navigation}>
        <nav aria-label={t.navigation}><a href="#music">{t.music}</a><a href="#postcards">{t.archive}</a></nav>
        <LanguageSwitch locale={locale} />
      </div>
    </header>
    <main id="main">
      <section id="home" className={s.arrival} aria-labelledby="artist-name">
        <div className={s.postcard}>
          <div className={s.message}>
            <p className={s.micro}>{t.genre} / {t.location}</p>
            <h1 id="artist-name" className={s.signature}><span className="sr-only">Lourdes Martín</span><Signature /></h1>
            <div className={s.release}>
              <span className={s.micro}>{t.featured} · {featured.date}</span>
              <h2 className={s.title} lang="es">antes moría<br /><em>por verte</em></h2>
              <a className={s.listen} href={trackUrl(featured.id)} target="_blank" rel="noreferrer">{t.listen} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure className={s.cover}>
            <Image src={featured.artwork} alt={t.artwork} width={640} height={640} sizes="(max-width: 700px) 78vw, 440px" preload />
            <figcaption><span lang="es">antes moría por verte</span><span>2026</span></figcaption>
          </figure>
        </div>
        <p className={s.marginNote}>{t.postIntro}</p>
      </section>
      <section className={s.music} id="music" aria-labelledby="music-title">
        <div className={s.musicCopy}>
          <span className={s.micro}>01 / {t.music}</span><h2 id="music-title">{t.selected}.</h2>
          <figure className={s.acoustic}><Image src="/images/lourdes-acoustic.webp" alt={t.acousticAlt} width={640} height={800} sizes="230px" /><figcaption>{t.acousticCaption}</figcaption></figure>
        </div>
        <div className={s.letter}><SongList locale={locale} /></div>
      </section>
      <section className={s.memories} id="postcards" aria-labelledby="postcards-title">
        <div className={s.archiveIntro}><span className={s.micro}>02 / {t.archive}</span><h2 id="postcards-title">{t.archiveTitle}</h2><p>{t.archiveNote}</p></div>
        <PosterArchive locale={locale} />
      </section>
    </main>
    <footer className={s.footer}><p>{t.thanks}</p><a href={artist.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href="#home">{t.back} ↑</a></footer>
    <ConceptNav current="postmarked" locale={locale} />
  </div>;
}
