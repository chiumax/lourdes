import Image from "next/image";
import { Signature } from "@/components/signature";
import { SongList } from "@/components/song-list";
import { PosterArchive } from "@/components/poster-archive";
import { ConceptNav } from "@/components/concept-nav";
import { LanguageSwitch } from "@/components/language-switch";
import { artist } from "@/lib/artist";
import { featured, trackUrl } from "@/lib/music";
import { getCopy, type Locale } from "@/lib/i18n";
import s from "./bedroom.module.css";

export function Bedroom({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <div className={s.world} data-design="bedroom-floor">
    <header className={s.header}>
      <a href="#home" className={s.home}>LM<span>{t.location}</span></a>
      <div className={s.navigation}><nav aria-label={t.navigation}><a href="#mixtape">{t.music}</a><a href="#offrecord">{t.archive}</a></nav><LanguageSwitch locale={locale} /></div>
    </header>
    <main id="main">
      <section className={s.wall} id="home" aria-labelledby="artist-name">
        <div className={s.introduction}>
          <span className={s.label}>{t.genre}</span>
          <h1 id="artist-name" className={s.name}><span className="sr-only">Lourdes Martín</span><Signature /></h1>
          <p className={s.handNote}>{t.bedroomIntro}</p>
          <a className={s.mainAction} href="#mixtape">{t.selected} <span aria-hidden="true">↓</span></a>
        </div>
        <div className={s.portraitStack}>
          <figure className={s.starPhoto}><Image src={featured.artwork} alt={t.artwork} width={640} height={640} sizes="(max-width: 700px) 90vw, 520px" preload /></figure>
          <figure className={s.contactPhoto}><Image src="/images/lourdes-acoustic.webp" alt={t.acousticAlt} width={640} height={800} sizes="150px" /><figcaption>{t.acousticCaption}</figcaption></figure>
        </div>
        <a className={s.releaseStrip} href={trackUrl(featured.id)} target="_blank" rel="noreferrer"><span>{featured.date}</span><strong lang="es">{featured.title}</strong><span>{t.listen} ↗</span></a>
      </section>
      <section id="mixtape" className={s.music} aria-labelledby="mixtape-title">
        <div className={s.musicHeading}><span className={s.label}>01 / {t.music}</span><h2 id="mixtape-title">{t.selected}<span aria-hidden="true">↘</span></h2><a href={artist.spotify} target="_blank" rel="noreferrer">{t.allMusic} ↗</a></div>
        <div className={s.trackPaper}><SongList locale={locale} /></div>
      </section>
      <section id="offrecord" className={s.archive} aria-labelledby="offrecord-title">
        <div className={s.archiveHeading}><span className={s.label}>02 / {t.archive}</span><h2 id="offrecord-title">{t.archiveTitle}</h2><p>{t.archiveNote}</p></div>
        <PosterArchive locale={locale} />
      </section>
    </main>
    <footer className={s.footer}><p>{t.thanks}</p><div><a href={artist.spotify} target="_blank" rel="noreferrer">Spotify ↗</a><a href={artist.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href="#home">{t.back} ↑</a></div></footer>
    <ConceptNav current="bedroom-floor" locale={locale} />
  </div>;
}
