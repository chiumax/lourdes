import Image from "next/image";
import { Signature } from "@/components/signature";
import { SpotifyPlayer } from "@/components/spotify-player";
import { artist } from "@/lib/artist";

function Arrow({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 102 65" fill="none" aria-hidden="true"><path d="M4 8C25 0 69 8 70 33c1 20-26 26-36 13-10-15 19-27 41-12l21 19m-3-20 4 21-22-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="home-label" href="#home" aria-label="Lourdes Martín home">lourdes <span aria-hidden="true">♡</span></a>
        <nav aria-label="Main navigation">
          <a href="#music">the music</a>
          <a href="#scrapbook">little moments</a>
          <a className="social-link" href={artist.instagram} target="_blank" rel="noreferrer">say hola <span aria-hidden="true">↗</span><span className="sr-only"> on Instagram (opens a new tab)</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="margin-note" aria-hidden="true">a few pages from my world</div>
          <div className="hero-intro">
            <p className="eyebrow"><span className="tiny-star" aria-hidden="true">✳</span> SONGS & LITTLE THINGS</p>
            <h1 id="hero-title"><span className="sr-only">Lourdes Martín</span><Signature /></h1>
            <p className="hero-note handwritten">a guitar, a little sunshine,<br />and something to say.</p>
            <div className="hero-action">
              <a className="ink-button" href={artist.spotify} target="_blank" rel="noreferrer">Listen on Spotify <span aria-hidden="true">↗</span><span className="sr-only"> (opens a new tab)</span></a>
              <span className="genre-note">acoustic pop,<br />from me to you.</span>
            </div>
          </div>

          <div className="hero-collage">
            <div className="pink-paper" aria-hidden="true"><span>keep the little things.</span></div>
            <figure className="polaroid hero-photo">
              <span className="tape" aria-hidden="true" />
              <Image src="/images/lourdes-sunshine.webp" alt="Lourdes smiling in the sunshine beside the sea" width={1080} height={1080} sizes="(max-width: 700px) 76vw, 390px" preload />
              <figcaption className="handwritten">somewhere in the sunshine ♡</figcaption>
            </figure>
            <span className="sun-doodle" aria-hidden="true">✳</span>
            <span className="hello-note handwritten" aria-hidden="true">hola, I’m lourdes!</span>
            <Arrow className="hello-arrow" />
            <figure className="tiny-photo">
              <Image src="/images/guitar-by-the-pool.webp" alt="An acoustic guitar resting beside a bright blue swimming pool" width={640} height={800} sizes="160px" />
              <figcaption className="handwritten">the essentials</figcaption>
            </figure>
            <div className="music-sticker" aria-hidden="true">made of<br /><span>music</span><br />& sunshine</div>
          </div>
          <a className="turn-page" href="#music"><span className="handwritten">there’s more down here</span><span aria-hidden="true">↓</span></a>
        </section>

        <section className="music-section" id="music" aria-labelledby="music-title">
          <div className="music-intro">
            <span className="section-number">01 / THE MUSIC</span>
            <h2 id="music-title">For your<br /><em>headphones.</em></h2>
            <p>A little acoustic pop for wherever<br className="desktop-break" /> the day takes you.</p>
            <a className="text-link" href={artist.spotify} target="_blank" rel="noreferrer">Find me on Spotify <span aria-hidden="true">↗</span><span className="sr-only"> (opens a new tab)</span></a>
            <Arrow className="music-arrow" />
          </div>
          <div className="music-paper">
            <span className="tape" aria-hidden="true" />
            <div className="paper-heading"><span>on repeat</span><span aria-hidden="true">♡</span></div>
            <SpotifyPlayer />
          </div>
        </section>

        <section className="scrapbook-section" id="scrapbook" aria-labelledby="scrapbook-title">
          <div className="scrapbook-heading">
            <div><span className="section-number">02 / IN BETWEEN SONGS</span><h2 id="scrapbook-title">Little <em>moments.</em></h2></div>
            <p className="handwritten">the camera roll version.</p>
          </div>
          <div className="photo-strip">
            <figure className="polaroid moment moment-one">
              <Image src="/images/lourdes-acoustic.webp" alt="Lourdes playing an acoustic guitar in a blue shirt" width={640} height={800} sizes="(max-width: 700px) 66vw, 280px" />
              <figcaption className="handwritten">just me & my guitar</figcaption>
            </figure>
            <figure className="polaroid moment moment-two">
              <span className="tape" aria-hidden="true" />
              <Image src="/images/guitar-by-the-pool.webp" alt="An acoustic guitar beside the pool" width={640} height={800} sizes="(max-width: 700px) 66vw, 280px" />
              <figcaption className="handwritten">a good place to start</figcaption>
            </figure>
            <a className="instagram-note" href={artist.instagram} target="_blank" rel="noreferrer">
              <span className="note-star" aria-hidden="true">✳</span>
              <span className="handwritten">More little things,<br />over here.</span>
              <span className="instagram-handle">{artist.instagramHandle} <span aria-hidden="true">↗</span></span>
              <span className="sr-only"> on Instagram (opens a new tab)</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><p className="handwritten">thanks for being here. ♡</p><span>LOURDES MARTÍN</span><a href="#home">back to the top ↑</a></footer>
    </>
  );
}
