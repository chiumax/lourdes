import type { Metadata } from "next";
import Image from "next/image";
import { Signature } from "@/components/signature";
import { SpotifyPlayer } from "@/components/spotify-player";
import { ConceptNav } from "@/components/concept-nav";
import { ScribbleArrow } from "@/components/doodles";
import { artist } from "@/lib/artist";
import s from "./bedroom.module.css";

export const metadata: Metadata = { title: "Lourdes Martín — Bedroom Floor" };
export default function BedroomFloor() {
  return <div className={s.world}>
    <header className={s.header}><a href="#home">LM<span>THE PERSONAL EDIT</span></a><nav aria-label="Main navigation"><a href="#mixtape">01 / LISTEN</a><a href="#offrecord">02 / OFF THE RECORD</a><a href={artist.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a></nav><span className={s.headerStar} aria-hidden="true">✳</span></header>
    <main id="main">
      <section className={s.wall} id="home" aria-labelledby="artist-name">
        <div className={s.gridPaper} aria-hidden="true" />
        <span className={s.cornerNote}>a little messy.<br />a little me.</span>
        <p className={s.headline}><span>LOUD HEART.</span><span>SOFT</span><span className={s.songWord}>SONGS.</span></p>
        <figure className={s.starPhoto}><Image src="/images/lourdes-sunshine.webp" alt="Lourdes smiling by the sea, framed in a cut-paper star" width={1080} height={1080} sizes="(max-width: 700px) 92vw, 510px" preload /></figure>
        <span className={s.markerStar} aria-hidden="true">✦</span>
        <h1 id="artist-name" className={s.nameTape}><span className="sr-only">Lourdes Martín</span><Signature /></h1>
        <div className={s.handNote}>acoustic pop.<br />straight from the heart.<ScribbleArrow /></div>
        <figure className={s.contactPhoto}><span className={s.tape} aria-hidden="true"/><Image src="/images/lourdes-acoustic.webp" alt="Lourdes with her acoustic guitar" width={640} height={800} sizes="(max-width: 700px) 130px, 170px" /><figcaption>NO FILTER. JUST MUSIC.</figcaption></figure>
        <a className={s.heartSticker} href={artist.spotify} target="_blank" rel="noreferrer"><span>PUT YOUR</span><strong>heart</strong><span>INTO IT ↗</span><span className="sr-only">Listen to Lourdes on Spotify</span></a>
        <a className={s.mainAction} href="#mixtape">PRESS PLAY <span aria-hidden="true">↘</span></a>
        <p className={s.issue}>VOL. 01<br />THE LOURDES PAGES</p>
      </section>
      <div className={s.ticker} aria-hidden="true"><span>LESS PERFECT. MORE PERSONAL.</span><span>✳</span><span>ACOUSTIC POP & BIG FEELINGS</span><span>✳</span><span>LESS PERFECT. MORE PERSONAL.</span></div>
      <section id="mixtape" className={s.music} aria-labelledby="mixtape-title">
        <div className={s.musicHeading}><span className={s.label}>SIDE A / TURN IT UP</span><h2 id="mixtape-title">YOUR NEXT<br /><span>ON REPEAT.</span></h2><p>Small songs. Big headphone energy.<br />Meet Lourdes, one listen at a time.</p><a href={artist.spotify} target="_blank" rel="noreferrer">GO STRAIGHT TO SPOTIFY ↗</a></div>
        <div className={s.deck}>
          <div className={s.cassette} aria-hidden="true"><span className={s.screwOne}>+</span><span className={s.screwTwo}>+</span><div className={s.cassetteLabel}><span>A</span><strong>lourdes, on repeat</strong><small>ACOUSTIC POP / KEEP FOREVER</small></div><div className={s.reels}><i/><span/><i/></div><div className={s.cassetteBottom}/></div>
          <SpotifyPlayer />
        </div>
      </section>
      <section id="offrecord" className={s.offrecord} aria-labelledby="offrecord-title">
        <div className={s.offHeading}><span className={s.label}>SIDE B / CAMERA ROLL</span><h2 id="offrecord-title">OFF THE<br /><span>RECORD.</span></h2><p>Guitars, sunshine, and the bits in between.</p></div>
        <div className={s.pinboard}>
          <figure className={s.pool}><span className={s.tape} aria-hidden="true"/><Image src="/images/guitar-by-the-pool.webp" alt="A guitar resting on the edge of a pool" width={640} height={800} sizes="(max-width: 700px) 65vw, 270px" /><figcaption>things I make room for ↑</figcaption></figure>
          <div className={s.cutoutNote}><span>LESS</span><span>SCROLLING.</span><em>more feeling.</em><span aria-hidden="true">♡</span></div>
          <figure className={s.practice}><Image src="/images/lourdes-acoustic.webp" alt="Lourdes singing and playing guitar in a blue shirt" width={640} height={800} sizes="(max-width: 700px) 65vw, 260px" /><figcaption>from the camera roll / 02</figcaption></figure>
          <a className={s.socialTicket} href={artist.instagram} target="_blank" rel="noreferrer"><span>THERE’S MORE OVER HERE</span><strong>@lourdesmartin15 ↗</strong><span className={s.barcode} aria-hidden="true"/></a>
        </div>
      </section>
    </main>
    <footer className={s.footer}><p>KEEP IN<br /><em>TOUCH.</em><span aria-hidden="true">✳</span></p><div><a href={artist.spotify} target="_blank" rel="noreferrer">SPOTIFY ↗</a><a href={artist.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href="#home">BACK UP ↑</a></div><small>LOURDES MARTÍN / ALL HEART</small></footer>
    <ConceptNav current="/bedroom-floor" />
  </div>;
}
