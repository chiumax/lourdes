import type { Metadata } from "next";
import Image from "next/image";
import { Signature } from "@/components/signature";
import { SpotifyPlayer } from "@/components/spotify-player";
import { ConceptNav } from "@/components/concept-nav";
import { artist } from "@/lib/artist";
import s from "./blue-book.module.css";

export const metadata: Metadata = { title: "Lourdes Martín — The Blue Book" };
export default function BlueBook() {
  return <div className={s.world}>
    <header className={s.header}><a className={s.wordmark} href="#home">lourdes martín<span>A PERSONAL SONGBOOK</span></a><nav aria-label="Main navigation"><a href="#music"><span>01</span> the songs</a><a href="#pages"><span>02</span> the margins</a><a href={artist.instagram} target="_blank" rel="noreferrer">find me ↗</a></nav></header>
    <main id="main">
      <section id="home" className={s.hero} aria-labelledby="artist-name">
        <div className={s.bookLabel}><span>THE BLUE BOOK</span><span>SONGS, PHOTOGRAPHS & THINGS WORTH KEEPING</span><span>VOL. I</span></div>
        <div className={s.book}>
          <div className={s.leftPage}>
            <span className={s.pageLabel}>COLLECTED MOMENTS / 001</span>
            <svg className={s.constellation} viewBox="0 0 160 80" aria-hidden="true"><path d="m8 56 42-40 34 36 35-42 30 52" fill="none" stroke="currentColor" strokeWidth=".6"/>{[[8,56],[50,16],[84,52],[119,10],[149,62]].map(([x,y])=><circle key={x} cx={x} cy={y} r="2.5" fill="currentColor" />)}</svg>
            <figure className={s.bluePhoto}><Image src="/images/lourdes-sunshine.webp" alt="Lourdes smiling beside the sea" width={1080} height={1080} sizes="(max-width: 700px) 76vw, 355px" preload /><figcaption>light, saved for later.</figcaption></figure>
            <div className={s.tracingPaper}><span>note to self:</span><p>keep the<br />little things.</p><span aria-hidden="true">✧</span></div>
            <div className={s.smallFilm}><Image src="/images/guitar-by-the-pool.webp" alt="A guitar by the water, printed as a small film frame" width={640} height={800} sizes="110px" /><span>02 — A QUIET MOMENT</span></div>
            <span className={s.pageNumber}>01</span>
          </div>
          <div className={s.spine} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i}/>)}</div>
          <div className={s.rightPage}>
            <span className={s.pageLabel}>THIS BOOK BELONGS TO</span>
            <h1 id="artist-name" className={s.signature}><span className="sr-only">Lourdes Martín</span><Signature /></h1>
            <p className={s.title}>A place for<br />the <em>quiet</em><br />things.</p>
            <p className={s.intro}>A guitar. A voice. A little space to feel.<br />Welcome to my corner of the world.</p>
            <a className={s.listen} href={artist.spotify} target="_blank" rel="noreferrer"><span aria-hidden="true">▷</span> Listen to Lourdes <span aria-hidden="true">↗</span></a>
            <p className={s.pencilNote}>stay for a song or two.</p>
            <span className={s.pageNumber}>02</span>
            <a href="#music" className={s.ribbon}>THE SONGS ↓</a>
          </div>
        </div>
        <div className={s.bookBottom}><span>ACOUSTIC POP</span><p>Some things are worth putting on paper.</p><a href="#music">next chapter ↓</a></div>
      </section>
      <section className={s.music} id="music" aria-labelledby="music-title">
        <div className={s.chapterNumber}><span>CHAPTER</span><strong>01</strong></div>
        <div className={s.musicCopy}><span className={s.smallLabel}>THE SONGS</span><h2 id="music-title">Leave a little<br /><em>room to listen.</em></h2><p>Acoustic pop for the moments<br />you want to keep to yourself.</p><a href={artist.spotify} target="_blank" rel="noreferrer">Lourdes Martín on Spotify ↗</a></div>
        <div className={s.listeningPage}><div className={s.listeningHeading}><span>listening notes</span><span>♪</span></div><SpotifyPlayer /><span className={s.pageNumber}>03</span></div>
      </section>
      <section className={s.margins} id="pages" aria-labelledby="pages-title">
        <div className={s.marginsHeading}><div><span className={s.smallLabel}>CHAPTER 02 / THE MARGINS</span><h2 id="pages-title">Between <em>the lines.</em></h2></div><p>The photographs tucked<br />between the pages.</p></div>
        <details className={s.contactSheet} open>
          <summary><span>CONTACT SHEET — LITTLE MOMENTS</span><span className={s.foldLabel}>open / close <span aria-hidden="true">+</span></span></summary>
          <div className={s.frames}>
            <figure><div className={s.frame}><Image src="/images/lourdes-acoustic.webp" alt="Lourdes playing acoustic guitar" width={640} height={800} sizes="(max-width: 700px) 72vw, 270px" /></div><figcaption><span>01</span><p>where the songs begin</p></figcaption></figure>
            <figure><div className={s.frame}><Image src="/images/guitar-by-the-pool.webp" alt="An acoustic guitar by a swimming pool" width={640} height={800} sizes="(max-width: 700px) 72vw, 270px" /></div><figcaption><span>02</span><p>taking the long way</p></figcaption></figure>
            <figure><div className={s.frame}><Image src="/images/lourdes-sunshine.webp" alt="Lourdes in the sunshine" width={1080} height={1080} sizes="(max-width: 700px) 72vw, 270px" /></div><figcaption><span>03</span><p>a little light to keep</p></figcaption></figure>
          </div>
        </details>
        <div className={s.marginFooter}><span>TO BE CONTINUED...</span><a href={artist.instagram} target="_blank" rel="noreferrer">More of the everyday <em>@lourdesmartin15 ↗</em></a></div>
      </section>
    </main>
    <footer className={s.footer}><span className={s.endMark} aria-hidden="true">✧</span><p>Thank you for<br /><em>being here.</em></p><div><span>LOVE, LOURDES</span><a href="#home">back to page one ↑</a></div></footer>
    <ConceptNav current="/blue-book" />
  </div>;
}
