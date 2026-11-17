import Image from "next/image";
import type { CSSProperties } from "react";
import { Heart, Star } from "@/components/doodles";
import { SparkleStage } from "@/components/sparkle-stage";
import { artist } from "@/lib/artist";
import { concertDay, concertMonth, upcomingConcerts } from "@/lib/concerts";
import { featured, songs, trackUrl } from "@/lib/music";
import { live, wall, type Photo } from "@/lib/photos";
import { PhotoWall } from "@/components/photo-wall";
import { Vinyl } from "@/components/vinyl";
import { artistStructuredData } from "@/lib/seo";
import { socials } from "@/lib/social";
import { featuredVideo, latestVideos, videoclips, videoUrl } from "@/lib/videos";
import { VideoStage } from "@/components/video-stage";
import s from "./estrella.module.css";

const tilt = (degrees: number) => ({ "--tilt": `${degrees}deg` }) as CSSProperties;
const place = (top: string, left: string, size: string, turn = 0, depth = 18) => ({ top, left, width: size, rotate: `${turn}deg`, "--depth": depth }) as CSSProperties;
const boom = Array.from({ length: 14 }, (_, index) => ({ "--angle": `${index * 25.7}deg`, "--reach": `${34 + (index * 29) % 30}vmin`, "--delay": `${(index % 5) * 40}ms` }) as CSSProperties);
const Ghost = ({ word }: { word: string }) => <span className={s.ghost} aria-hidden="true">{`${word} ${word} ${word}`}</span>;
const External = () => <span aria-hidden="true">↗</span>;

function Lettering({ className }: { className?: string }) {
  return <span className={`${s.lettering} ${className ?? ""}`} aria-hidden="true" />;
}

function Framed({ photo, sizes, className }: { photo: Photo; sizes: string; className?: string }) {
  return <figure className={`${s.framed} ${s[photo.frame]} ${className ?? ""}`} style={tilt(photo.tilt)}>
    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} />
    {photo.note && <figcaption>{photo.note}</figcaption>}
  </figure>;
}

export async function Estrella() {
  const dates = upcomingConcerts();
  const moreVideos = await latestVideos();
  const ticker = [...songs.map(song => song.title), "pop acústico", "mallorca"];

  return <SparkleStage className={s.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistStructuredData()).replace(/</g, "\\u003c") }} />

    <div className={s.intro} aria-hidden="true"><span /><span /><Lettering className={s.introLogo} /></div>

    <header className={s.nav}>
      <a className={s.navLogo} href="#inicio" aria-label="Lourdes Martín, inicio"><Lettering /></a>
      <nav aria-label="Navegación principal">
        <a href="#musica">música</a>
        <a href="#conciertos">conciertos</a>
        <a href="#videos">vídeos</a>
        <a href="#fotos">fotos</a>
        <a href="#redes">sígueme</a>
      </nav>
    </header>

    <main id="main">
      <section className={s.hero} id="inicio" aria-labelledby="artist-name">
        <Image className={s.heroImage} src="/images/hero-playa.webp" alt="Lourdes corriendo por la playa al atardecer" width={2048} height={1152} sizes="100vw" preload />
        {/* Provisional: recorte de «ya no lloro» sacado de YouTube. Sustituir por el archivo original. */}
        <video className={s.heroVideo} src="/video/hero-playa.mp4" poster="/images/hero-playa.webp" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
        <div className={s.heroShade} aria-hidden="true" />
        <Star className={s.spin} look="outline" style={{ ...place("16%", "58%", "clamp(44px,7vw,96px)", 12), color: "var(--yellow)" }} />
        <Star className={s.twinkle} points={8} inner={0.5} style={{ ...place("62%", "8%", "clamp(34px,5vw,70px)", -8), color: "var(--cosmos)" }} />
        <Star look="dots" style={{ ...place("24%", "84%", "clamp(40px,6vw,84px)", 20), color: "var(--sky)" }} />
        <Star className={s.twinkle} points={4} inner={0.3} style={{ ...place("12%", "30%", "clamp(22px,3vw,44px)", 0), color: "var(--silence)" }} />
        <Heart className={s.spinSlow} style={{ ...place("70%", "46%", "clamp(30px,4vw,58px)", -14), color: "var(--flush)" }} />

        <div className={s.boom} aria-hidden="true">{boom.map((style, index) => <i key={index} style={style} />)}</div>
        <div className={s.heroText}>
          <h1 id="artist-name" className={s.heroName}><span className="sr-only">Lourdes Martín</span><Lettering /></h1>
          <p className={s.heroTag}>pop acústico <span aria-hidden="true">★</span> desde mallorca</p>
        </div>

        <a className={s.single} href={trackUrl(featured.id)} target="_blank" rel="noreferrer">
          <svg className={s.badge} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <circle cx="60" cy="60" r="59" />
            <path id="badge-ring" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" fill="none" />
            <text><textPath href="#badge-ring">nuevo single ★ nuevo single ★</textPath></text>
            <polygon points="60,42 65,54 78,54 68,62 72,75 60,67 48,75 52,62 42,54 55,54" />
          </svg>
          <Image src={featured.artwork} alt="Portada de «antes moría por verte»" width={640} height={640} sizes="150px" />
          <span className={s.singleText}>
            <small>último single</small>
            <strong lang="es">{featured.title}</strong>
            <em>escúchalo ya <External /></em>
          </span>
        </a>
      </section>

      <div className={s.tapes} aria-hidden="true">
        <div className={s.ticker}><div className={s.tickerTrack}>
          {[0, 1].map(copy => <span key={copy}>{ticker.map(word => <span key={word}>{word}<Star /></span>)}</span>)}
        </div></div>
        <div className={`${s.ticker} ${s.tickerPink}`}><div className={s.tickerTrack}>
          {[0, 1].map(copy => <span key={copy}>{[0, 1, 2, 3].map(index => <span key={index}>lourdes martín<Heart />la princesa del pop<Star points={8} inner={0.5} /></span>)}</span>)}
        </div></div>
      </div>

      <section className={`${s.section} ${s.release}`} id="single" aria-labelledby="single-title">
        <Ghost word="nuevo single" />
        <Star className={s.twinkle} points={8} inner={0.5} style={{ ...place("10%", "90%", "clamp(40px,6vw,90px)", 0), color: "var(--cosmos)" }} />
        <Star look="outline" className={s.spin} style={{ ...place("76%", "46%", "clamp(34px,5vw,74px)", 10), color: "var(--sky)" }} />
        <div className={s.releaseGrid}>
          <Vinyl cover={featured.artwork} label="Portada de «antes moría por verte»" trackId={featured.id} title={featured.title} />
          <div className={s.releaseText}>
            <p className={s.releaseMeta}><span>single</span>{featured.date}</p>
            <h2 id="single-title" className={s.releaseTitle} lang="es">antes moría <em>por verte</em></h2>
            <p className={s.lead}>ya está fuera. pulsa el vinilo, gíralo, súbele el volumen.</p>
            <div className={s.releaseButtons}>
              <a className={s.button} href={trackUrl(featured.id)} target="_blank" rel="noreferrer">escuchar en spotify <External /></a>
              <a className={`${s.button} ${s.buttonPink}`} href={videoUrl(featuredVideo.id)} target="_blank" rel="noreferrer">ver el videoclip <External /></a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.music}`} id="musica" aria-labelledby="musica-title">
        <Ghost word="canciones" />
        <Star look="dots" style={{ ...place("6%", "4%", "clamp(60px,9vw,130px)", -12), color: "var(--flush)" }} />
        <Star className={s.spin} look="outline" style={{ ...place("78%", "90%", "clamp(44px,6vw,90px)", 8), color: "var(--dazzle)" }} />
        <div className={s.sectionHead}>
          <span className={s.chapa}>01</span>
          <h2 id="musica-title" className={s.title}>canciones</h2>
          <p className={s.lead}>cinco canciones escritas con la guitarra en las rodillas. dale al play.</p>
        </div>
        <div className={s.musicGrid}>
          <div className={s.musicCover}>
            <figure className={`${s.framed} ${s.yellow} ${s.cover}`} style={tilt(-3)}>
              <Image src="/images/directo/blanco-y-negro.webp" alt="Lourdes riendo con la guitarra, en blanco y negro" width={1100} height={1651} sizes="(max-width: 800px) 70vw, 380px" />
              <figcaption>voz, guitarra y poco más</figcaption>
            </figure>
          </div>
          <div className={s.songSheet}>
            <ol className={s.songs} aria-label="Canciones">
              {songs.map((song, index) => <li key={song.id}>
                <a href={trackUrl(song.id)} target="_blank" rel="noreferrer" aria-label={`Escuchar ${song.title} en Spotify`}>
                  <span className={s.songNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className={s.songName} lang="es">{song.title}</span>
                  <span className={s.songTime}>{song.duration}</span>
                  <span className={s.songPlay} aria-hidden="true">▶</span>
                </a>
              </li>)}
            </ol>
            <iframe className={s.player} title="Escucha a Lourdes Martín en Spotify" src={`${artist.spotifyEmbed}&locale=es`} width="100%" height="352" loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
            <a className={s.button} href={artist.spotify} target="_blank" rel="noreferrer">todas en spotify <External /></a>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.concerts}`} id="conciertos" aria-labelledby="conciertos-title">
        <Ghost word="conciertos" />
        <div className={s.beams} aria-hidden="true" />
        <Star className={s.twinkle} points={8} inner={0.5} style={{ ...place("5%", "86%", "clamp(40px,6vw,90px)", 10), color: "var(--yellow)" }} />
        <Star look="outline" style={{ ...place("42%", "2%", "clamp(34px,5vw,70px)", -20), color: "var(--sky)" }} />
        <div className={s.sectionHead}>
          <span className={s.chapa}>02</span>
          <h2 id="conciertos-title" className={s.title}>conciertos</h2>
        </div>
        {dates.length > 0 ? <ol className={s.dates}>
          {dates.map(concert => <li key={`${concert.date}-${concert.venue}`}>
            <time dateTime={concert.date}><strong>{concertDay(concert.date)}</strong><span>{concertMonth(concert.date)}</span></time>
            <div><strong>{concert.city}</strong><span>{concert.venue}{concert.time ? ` · ${concert.time}` : ""}{concert.note ? ` · ${concert.note}` : ""}</span></div>
            {concert.tickets ? <a className={s.button} href={concert.tickets} target="_blank" rel="noreferrer">entradas <External /></a> : <span className={s.soon}>entradas pronto</span>}
          </li>)}
        </ol> : <div className={s.noDates}>
          <p className={s.noDatesBig}>ahora mismo no hay fechas…</p>
          <p className={s.noDatesHand}>pero vuelvo pronto al escenario ♥</p>
          <a className={s.button} href={artist.instagram} target="_blank" rel="noreferrer">entérate la primera en instagram <External /></a>
        </div>}
        <h3 className={s.handTitle}>así suena en directo</h3>
        <div className={s.liveGrid}>
          {live.map(photo => <Framed key={photo.src} photo={photo} sizes="(max-width: 800px) 46vw, 30vw" />)}
        </div>
      </section>

      <section className={`${s.section} ${s.videos}`} id="videos" aria-labelledby="videos-title">
        <Ghost word="vídeos" />
        <Star look="dots" style={{ ...place("8%", "88%", "clamp(50px,7vw,110px)", 14), color: "var(--cosmos)" }} />
        <Heart style={{ ...place("80%", "4%", "clamp(36px,5vw,70px)", -12), color: "var(--dazzle)" }} />
        <div className={s.sectionHead}>
          <span className={s.chapa}>03</span>
          <h2 id="videos-title" className={s.title}>vídeos</h2>
          <p className={s.lead}>videoclips, vlogs y cómo se hace todo esto. dale al play.</p>
        </div>
        <VideoStage featured={featuredVideo} groups={[{ label: "videoclips", videos: videoclips }, { label: "lo último del canal", videos: moreVideos }]} />
        <a className={s.button} href={artist.youtube} target="_blank" rel="noreferrer">todo el canal en youtube <External /></a>
      </section>

      <section className={`${s.section} ${s.photos}`} id="fotos" aria-labelledby="fotos-title">
        <Ghost word="del carrete" />
        <Star className={s.spin} look="outline" style={{ ...place("3%", "6%", "clamp(44px,6vw,90px)", 0), color: "var(--dazzle)" }} />
        <Star points={4} inner={0.3} className={s.twinkle} style={{ ...place("50%", "94%", "clamp(26px,3vw,48px)", 0), color: "var(--silence)" }} />
        <div className={s.sectionHead}>
          <span className={s.chapa}>04</span>
          <h2 id="fotos-title" className={s.title}>del carrete</h2>
          <p className={s.lead}>muévelas, amontónalas, tócalas para verlas en grande.</p>
        </div>
        <PhotoWall photos={wall} />
      </section>

      <section className={`${s.section} ${s.follow}`} id="redes" aria-labelledby="redes-title">
        <Ghost word="sígueme" />
        <Star look="dots" style={{ ...place("10%", "80%", "clamp(50px,8vw,120px)", -10), color: "var(--sky)" }} />
        <div className={s.sectionHead}>
          <span className={s.chapa}>05</span>
          <h2 id="redes-title" className={s.title}>sígueme</h2>
          <p className={s.lead}>nos vemos por aquí.</p>
        </div>
        <ul className={s.networks}>
          {socials.map(network => <li key={network.id}>
            <a className={s[network.id]} href={network.url} target="_blank" rel="noreferrer">
              <span className={s.networkName}>{network.name.toLowerCase()}</span>
              <span className={s.networkHandle}>{network.handle}</span>
              <span className={s.networkLine}>{network.line}</span>
              <span className={s.networkArrow} aria-hidden="true">↗</span>
            </a>
          </li>)}
        </ul>
      </section>
    </main>

    <footer className={s.footer}>
      <Star className={s.twinkle} points={8} inner={0.5} style={{ ...place("12%", "8%", "clamp(34px,5vw,70px)", 0), color: "var(--yellow)" }} />
      <Star look="outline" style={{ ...place("20%", "88%", "clamp(40px,6vw,84px)", 16), color: "var(--flush)" }} />
      <p className={s.footerHand}>hasta la próxima.</p>
      <Lettering className={s.footerLogo} />
      <nav className={s.footerLinks} aria-label="Redes">
        {socials.map(network => <a key={network.id} href={network.url} target="_blank" rel="noreferrer">{network.name.toLowerCase()} <External /></a>)}
      </nav>
      <div className={s.footerBar}>
        <span>© 2026 Lourdes Martín · Mallorca</span>
        <a href="#inicio">volver arriba ↑</a>
      </div>
    </footer>
  </SparkleStage>;
}
