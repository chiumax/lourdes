import type { Metadata } from "next";
import Image from "next/image";
import { Signature } from "@/components/signature";
import { SpotifyPlayer } from "@/components/spotify-player";
import { ConceptNav } from "@/components/concept-nav";
import { Flower, ScribbleArrow } from "@/components/doodles";
import { artist } from "@/lib/artist";
import s from "./postmarked.module.css";
export const metadata: Metadata = { title: "Lourdes Martín — Postmarked, Yours" };
export default function Postmarked() {
  return <div className={s.world}>
    <header className={s.header}><a href="#home" className={s.home}>lourdes martín<span>ACOUSTIC POP & OTHER LITTLE THINGS</span></a><nav aria-label="Main navigation"><a href="#music">the music</a><a href="#postcards">postcards</a><a href={artist.instagram} target="_blank" rel="noreferrer">say hola ↗</a></nav></header>
    <main id="main">
      <section id="home" className={s.arrival} aria-labelledby="artist-name">
        <p className={s.overline}>SOMETHING GOOD IN THE POST <span aria-hidden="true">✶</span> OPEN WHENEVER YOU NEED A LITTLE SUNSHINE</p>
        <div className={s.postcard}>
          <div className={s.message}><span className={s.micro}>FROM THE LITTLE WORLD OF</span><h1 id="artist-name" className={s.signature}><span className="sr-only">Lourdes Martín</span><Signature /></h1><p className={s.title}>Wish you<br />were <em>listening.</em></p><p className={s.intro}>A few songs, a little sunshine.<br />Something to take with you.</p><a className={s.listen} href={artist.spotify} target="_blank" rel="noreferrer">Listen on Spotify <span aria-hidden="true">↗</span></a></div>
          <div className={s.pictureSide}><figure className={s.stamp}><div className={s.stampHeading}><span>THE LITTLE THINGS</span><span>♡</span></div><Image src="/images/lourdes-sunshine.webp" alt="Lourdes smiling in the sunshine by the sea" width={1080} height={1080} sizes="(max-width: 700px) 78vw, 390px" preload /><figcaption><span>sunshine enclosed</span><span>LM</span></figcaption></figure><div className={s.postmark} aria-hidden="true"><span>SENT WITH LOVE</span><strong>♡</strong><span>LOURDES MARTÍN</span></div><div className={s.address}><span className="handwritten">To: you, wherever you are.</span><div /><div /><span className={s.micro}>NO RETURN ADDRESS NEEDED</span></div></div>
          <span className={s.edgeText} aria-hidden="true">A LITTLE MUSIC GOES A LONG WAY</span>
        </div>
        <Flower className={s.flower} /><p className={s.loveNote}>with love, always <span aria-hidden="true">↗</span></p><a href="#music" className={s.scroll}>turn over for the music <span aria-hidden="true">↓</span></a>
      </section>
      <section className={s.music} id="music" aria-labelledby="music-title"><div className={s.musicCopy}><span className={s.micro}>ENCLOSURE NO. 01 / THE MUSIC</span><h2 id="music-title">For the long way<br /><em>home.</em></h2><p>Acoustic pop for your headphones.<br />Let’s make a little room for a song.</p><a href={artist.spotify} target="_blank" rel="noreferrer">All the music on Spotify ↗</a><ScribbleArrow className={s.arrow} /></div><div className={s.letter}><div className={s.letterTop}><span>Dear listener,</span><span aria-hidden="true">♪</span></div><SpotifyPlayer /><p className={s.signoff}>yours, lourdes ♡</p></div></section>
      <section className={s.memories} id="postcards" aria-labelledby="postcards-title"><div className={s.memoryHeading}><span className={s.micro}>ENCLOSURE NO. 02 / BETWEEN SONGS</span><h2 id="postcards-title">Kept for <em>the feeling.</em></h2><p>A couple of things from the camera roll.</p></div><div className={s.scraps}><figure className={s.guitarCard}><Image src="/images/guitar-by-the-pool.webp" alt="An acoustic guitar beside a blue swimming pool" width={640} height={800} sizes="(max-width: 700px) 66vw, 270px" /><figcaption>01. a guitar & nowhere to rush</figcaption></figure><div className={s.miniLetter}><Flower /><p>Some things<br />are better<br /><em>with a song.</em></p><span>TAKE ONE WITH YOU</span></div><figure className={s.acousticCard}><span className={s.paperclip} aria-hidden="true"/><Image src="/images/lourdes-acoustic.webp" alt="Lourdes playing her acoustic guitar" width={640} height={800} sizes="(max-width: 700px) 66vw, 270px" /><figcaption>02. just me, just a guitar</figcaption></figure></div><a className={s.follow} href={artist.instagram} target="_blank" rel="noreferrer">More postcards from my world <span>{artist.instagramHandle} ↗</span></a></section>
    </main>
    <footer className={s.footer}><span>THANK YOU FOR STOPPING BY</span><p>Until the next song.</p><a href="#home">back to the beginning ↑</a></footer><ConceptNav current="/postmarked" />
  </div>;
}
