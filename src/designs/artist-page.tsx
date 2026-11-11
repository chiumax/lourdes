import Image from "next/image";
import { Signature } from "@/components/signature";
import { SongList } from "@/components/song-list";
import { SpotifyEmbed } from "@/components/spotify-embed";
import { ConceptNav } from "@/components/concept-nav";
import { CutoutFooter } from "@/components/cutout-footer";
import { artist } from "@/lib/artist";
import { featured, trackUrl } from "@/lib/music";
import { getCopy, type Concept, type Locale } from "@/lib/i18n";
import s from "./artist-page.module.css";

export function ArtistPage({ concept, locale }: { concept: Concept; locale: Locale }) {
  const t = getCopy(locale);
  const isTinta = concept === "tinta";
  const isCuttings = concept === "recortes";
  const isAmp = concept === "amplificador";

  return <div className={`${s.page} ${s[concept]}`} data-design={concept}>
    {!isTinta && <><ConceptNav current={concept} locale={locale} />
    <header className={s.header}>
      <a className={s.wordmark} href="#home">lourdes martín</a>
      <nav aria-label={t.navigation}>
        <a href="#music">{t.music}</a>
        <a href="#photos">{t.photos}</a>
        <a href={artist.instagram} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
      </nav>
    </header></>}
    <main id="main">
      <section className={s.hero} id="home" aria-labelledby="artist-name">
        <div className={s.heroIntro}>
          {!isTinta && <p className={s.eyebrow}><span>{t.genre}</span><span>{t.location}</span></p>}
          {isAmp ? <h1 id="artist-name" className={s.blockName}>Lourdes<br />Martín<span>.</span></h1> :
            <h1 id="artist-name" className={s.signatureName}><span className="sr-only">Lourdes Martín</span><Signature animated={isTinta} /></h1>}
          <div className={s.heroRelease}>
            <p className={s.releaseMeta}>{t.releaseLabel} <span>{featured.date}</span></p>
            <h2 lang="es" className={s.releaseTitle}>{isCuttings ? <><span>antes moría</span><span>por verte</span></> : <>antes moría<br /><em>por verte</em></>}</h2>
            <a className={s.listenButton} href={trackUrl(featured.id)} target="_blank" rel="noreferrer">{t.listen}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className={s.heroCollage}>
          <div className={s.paperBacking} aria-hidden="true" />
          <figure className={s.heroPhoto}>
            {isCuttings ? <div className={s.rippedPortrait} role="img" aria-label={t.artwork}>
              {[0, 1, 2].map(part => <div className={s.portraitSlice} key={part} aria-hidden="true"><Image src={featured.artwork} alt="" width={640} height={640} sizes="(max-width: 700px) 90vw, 550px" preload /></div>)}
            </div> : <Image src={featured.artwork} alt={t.artwork} width={640} height={640} sizes="(max-width: 700px) 85vw, 460px" preload />}
            <figcaption><span lang="es">{featured.title}</span><span>2026</span></figcaption>
          </figure>
          {isAmp && <div className={s.signatureStamp} aria-hidden="true"><Signature /></div>}
          <figure className={s.smallPhoto}>
            <Image src="/images/guitar-by-the-pool.webp" alt={t.guitarAlt} width={640} height={800} sizes="(max-width: 700px) 110px, 145px" />
            <figcaption>{t.guitarCaption}</figcaption>
          </figure>
          {!isTinta && <span className={s.marginType} aria-hidden="true">LOURDES MARTÍN — 01</span>}
          {isCuttings && <span className={s.cutoutLabel} aria-hidden="true">LM</span>}
        </div>
        <a className={s.scrollLink} href="#music"><span>{t.music}</span><span aria-hidden="true">↓</span></a>
      </section>

      <section className={s.musicSection} id="music" aria-labelledby="music-title">
        <div className={s.sectionIntro}>
          <span className={s.sectionNumber}>01 / {t.music}</span>
          <h2 id="music-title">{t.selected}<span aria-hidden="true">.</span></h2>
          <p>{t.musicIntro}</p>
          <a className={s.textLink} href={artist.spotify} target="_blank" rel="noreferrer">Spotify <span aria-hidden="true">↗</span></a>
        </div>
        <div className={s.songPaper}>
          <div className={s.paperHeading}><span>{isTinta ? "LM / Spotify" : "LM / 01—05"}</span><span>{t.music}</span></div>
          {isTinta ? <SpotifyEmbed locale={locale} /> : <SongList locale={locale} />}
        </div>
      </section>

      <section className={s.photosSection} id="photos" aria-labelledby="photos-title">
        <div className={s.photosHeading}>
          <div><span className={s.sectionNumber}>02 / {t.photos}</span><h2 id="photos-title">{t.cameraRoll}<span aria-hidden="true">.</span></h2></div>
          <p>{t.photosIntro}</p>
        </div>
        <div className={s.photoStrip}>
          <figure className={s.momentOne}>
            <Image src="/images/lourdes-acoustic.webp" alt={t.acousticAlt} width={640} height={800} sizes="(max-width: 700px) 68vw, 290px" />
            <figcaption><span>01</span>{t.acousticCaption}</figcaption>
          </figure>
          <figure className={s.momentTwo}>
            <Image src="/images/guitar-by-the-pool.webp" alt={t.guitarAlt} width={640} height={800} sizes="(max-width: 700px) 68vw, 290px" />
            <figcaption><span>02</span>{t.guitarCaption}</figcaption>
          </figure>
          <a className={s.instagramNote} href={artist.instagram} target="_blank" rel="noreferrer">
            <span className={s.noteArrow} aria-hidden="true">↗</span>
            <span>{t.instagram}</span>
            <small>{artist.instagramHandle}</small>
          </a>
        </div>
      </section>
    </main>
    <CutoutFooter locale={locale} />
  </div>;
}
