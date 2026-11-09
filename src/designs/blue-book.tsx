import Image from "next/image";
import { Signature } from "@/components/signature";
import { SongList } from "@/components/song-list";
import { PosterArchive } from "@/components/poster-archive";
import { ConceptNav } from "@/components/concept-nav";
import { LanguageSwitch } from "@/components/language-switch";
import { artist } from "@/lib/artist";
import { featured, trackUrl } from "@/lib/music";
import { getCopy, type Locale } from "@/lib/i18n";
import s from "./blue-book.module.css";

export function BlueBook({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <div className={s.world} data-design="blue-book">
    <header className={s.header}><a className={s.wordmark} href="#home">lourdes martín</a><div className={s.navigation}><nav aria-label={t.navigation}><a href="#music">{t.music}</a><a href="#pages">{t.photos}</a><a href="#archive">{t.archive}</a></nav><LanguageSwitch locale={locale} /></div></header>
    <main id="main">
      <section id="home" className={s.hero} aria-labelledby="artist-name">
        <div className={s.bookLabel}><span>{t.notebook}</span><span>{t.genre} / {t.location}</span></div>
        <div className={s.book}>
          <div className={s.leftPage}>
            <figure className={s.cover}><Image src={featured.artwork} alt={t.artwork} width={640} height={640} sizes="(max-width: 700px) 76vw, 400px" preload /><figcaption><span lang="es">{featured.title}</span><span>2026</span></figcaption></figure>
            <span className={s.pageNumber}>01</span>
          </div>
          <div className={s.rightPage}>
            <h1 id="artist-name" className={s.signature}><span className="sr-only">Lourdes Martín</span><Signature /></h1>
            <p className={s.title}>{t.blueIntro}</p>
            <div className={s.release}><span className={s.smallLabel}>{t.featured} / {featured.date}</span><h2 lang="es">antes moría<br /><em>por verte</em></h2><a className={s.listen} href={trackUrl(featured.id)} target="_blank" rel="noreferrer">{t.listen} <span aria-hidden="true">↗</span></a></div>
            <span className={s.pageNumber}>02</span>
          </div>
        </div>
        <nav className={s.bookBottom} aria-label={t.contents}><a href="#music">01 / {t.music}</a><a href="#pages">02 / {t.photos}</a><a href="#archive">03 / {t.archive}</a></nav>
      </section>
      <section className={s.music} id="music" aria-labelledby="music-title">
        <div className={s.musicCopy}><span className={s.smallLabel}>01 / {t.music}</span><h2 id="music-title">{t.selected}.</h2><a href={artist.spotify} target="_blank" rel="noreferrer">{t.allMusic} ↗</a></div>
        <div className={s.listeningPage}><SongList locale={locale} /></div>
      </section>
      <section className={s.margins} id="pages" aria-labelledby="pages-title">
        <div className={s.marginsHeading}><span className={s.smallLabel}>02 / {t.photos}</span><h2 id="pages-title">{t.cameraRoll}.</h2></div>
        <details className={s.contactSheet} open><summary aria-label={t.toggleSheet}><span>{t.sheet}</span><span aria-hidden="true">+</span></summary><div className={s.frames}>
          <figure><Image src="/images/lourdes-acoustic.webp" alt={t.acousticAlt} width={640} height={800} sizes="(max-width: 700px) 72vw, 270px" /><figcaption>01 / {t.acousticCaption}</figcaption></figure>
          <figure><Image src="/images/guitar-by-the-pool.webp" alt={t.guitarAlt} width={640} height={800} sizes="(max-width: 700px) 72vw, 270px" /><figcaption>02 / {t.guitarCaption}</figcaption></figure>
        </div></details>
        <a className={s.instagram} href={artist.instagram} target="_blank" rel="noreferrer">{t.instagram} ↗</a>
      </section>
      <section className={s.archive} id="archive" aria-labelledby="archive-title"><div><span className={s.smallLabel}>03 / {t.archive}</span><h2 id="archive-title">{t.archiveTitle}</h2><p>{t.archiveNote}</p></div><PosterArchive locale={locale} /></section>
    </main>
    <footer className={s.footer}><p>{t.thanks}</p><a href="#home">{t.back} ↑</a></footer><ConceptNav current="blue-book" locale={locale} />
  </div>;
}
