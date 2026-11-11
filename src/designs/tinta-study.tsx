import Image from "next/image";
import { Signature } from "@/components/signature";
import { SpotifyEmbed } from "@/components/spotify-embed";
import { CutoutFooter } from "@/components/cutout-footer";
import { artist } from "@/lib/artist";
import { featured, trackUrl } from "@/lib/music";
import { getCopy, type Locale } from "@/lib/i18n";
import s from "./tinta-study.module.css";

export type TintaStudyStyle = "editorial" | "estudio";

/** Element studies share Tinta's content and behavior, with their own scoped styling. */
export function TintaStudy({ treatment, locale }: { treatment: TintaStudyStyle; locale: Locale }) {
  const t = getCopy(locale);
  return <div className={treatment === "estudio" ? `${s.page} ${s.estudio}` : s.page} data-design={`tinta-${treatment}`}>
    <main id="main">
      <section className={s.hero} id="home" aria-labelledby="artist-name">
        <div className={s.introduction}>
          <p className={s.location}><span>{t.genre}</span><span>{t.location}</span></p>
          <h1 id="artist-name" className={s.signature}><span className="sr-only">Lourdes Martín</span><Signature animated /></h1>
          <div className={s.release}>
            <p className={s.releaseInfo}><span>{t.releaseLabel}</span><time dateTime="2026-07-24">{featured.date}</time></p>
            <h2 lang="es">antes moría<br />por verte</h2>
            <a className={s.listen} href={trackUrl(featured.id)} target="_blank" rel="noreferrer">{t.listen}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className={s.portraits}>
          <figure className={s.cover}>
            <div className={s.coverPrint}><Image src={featured.artwork} alt={t.artwork} width={640} height={640} sizes="(max-width: 700px) 86vw, 460px" preload /></div>
            <figcaption><span lang="es">{featured.title}</span><span>2026</span></figcaption>
          </figure>
          <figure className={s.guitarPrint}>
            <Image src="/images/guitar-by-the-pool.webp" alt={t.guitarAlt} width={640} height={800} sizes="(max-width: 700px) 105px, 125px" />
            <figcaption>{t.guitarCaption}</figcaption>
          </figure>
        </div>
        <a className={s.scroll} href="#music">{t.music}<span aria-hidden="true">↓</span></a>
      </section>

      <section id="music" className={s.music} aria-labelledby="music-title">
        <div className={s.sectionCopy}>
          <h2 id="music-title">{t.selected}</h2>
          <p>{t.musicIntro}</p>
          <a href={artist.spotify} target="_blank" rel="noreferrer">Spotify <span aria-hidden="true">↗</span></a>
        </div>
        <div className={s.listeningPaper}>
          <div className={s.paperLabel}><span>Lourdes Martín</span><span>Spotify</span></div>
          <SpotifyEmbed locale={locale} />
        </div>
      </section>

      <section id="photos" className={s.photos} aria-labelledby="photos-title">
        <div className={s.photosHeading}><h2 id="photos-title">{t.cameraRoll}</h2><p>{t.photosIntro}</p></div>
        <div className={s.photoLayout}>
          <div className={s.photoPair}>
            <figure className={s.acousticPrint}>
              <Image src="/images/lourdes-acoustic.webp" alt={t.acousticAlt} width={640} height={800} sizes="(max-width: 700px) 42vw, 270px" />
              <figcaption>{t.acousticCaption}</figcaption>
            </figure>
            <figure className={s.poolPrint}>
              <Image src="/images/guitar-by-the-pool.webp" alt={t.guitarAlt} width={640} height={800} sizes="(max-width: 700px) 42vw, 270px" />
              <figcaption>{t.guitarCaption}</figcaption>
            </figure>
          </div>
          <a className={s.instagram} href={artist.instagram} target="_blank" rel="noreferrer"><span>{t.instagram} <span aria-hidden="true">↗</span></span><small>{artist.instagramHandle}</small></a>
        </div>
      </section>
    </main>
    <CutoutFooter locale={locale} treatment={treatment} />
  </div>;
}
