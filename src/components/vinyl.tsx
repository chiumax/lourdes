"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import s from "./vinyl.module.css";

// The parts of Spotify's iFrame API this component uses. https://developer.spotify.com/documentation/embeds/references/iframe-api
type SpotifyController = { play: () => void; togglePlay: () => void; addListener: (event: "ready" | "playback_update", handler: (event: { data: { isPaused: boolean } }) => void) => void };
type SpotifyApi = { createController: (element: HTMLElement, options: { uri: string; width: string; height: number }, ready: (controller: SpotifyController) => void) => void };
declare global { interface Window { onSpotifyIframeApiReady?: (api: SpotifyApi) => void } }

const angleTo = (event: PointerEvent<HTMLDivElement>) => {
  const box = event.currentTarget.getBoundingClientRect();
  return Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180 / Math.PI;
};

/**
 * The single as a record sliding out of its sleeve. Press it to play the song through Spotify's
 * own player, which only loads on that first press; grab it to scratch it by hand.
 */
export function Vinyl({ cover, label, trackId, title }: { cover: string; label: string; trackId: string; title: string }) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const controller = useRef<SpotifyController | null>(null);
  const player = useRef<HTMLDivElement>(null);
  const turned = useRef(0);
  const grab = useRef<{ from: number; base: number; moved: boolean } | null>(null);

  const toggle = () => {
    if (controller.current) { controller.current.togglePlay(); return; }
    if (state === "loading" || !player.current) return;
    setState("loading");
    const slot = player.current.appendChild(document.createElement("div"));
    window.onSpotifyIframeApiReady = api => api.createController(slot, { uri: `spotify:track:${trackId}`, width: "100%", height: 80 }, created => {
      controller.current = created;
      created.addListener("playback_update", event => setState(event.data.isPaused ? "paused" : "playing"));
      created.addListener("ready", () => created.play());
    });
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => setState("idle");
    document.body.appendChild(script);
  };

  const start = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.held = "true";
    grab.current = { from: angleTo(event), base: turned.current, moved: false };
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const held = grab.current;
    if (!held) return;
    const delta = angleTo(event) - held.from;
    if (Math.abs(delta) > 4) held.moved = true;
    turned.current = held.base + delta;
    event.currentTarget.style.rotate = `${turned.current}deg`;
  };
  const release = (event: PointerEvent<HTMLDivElement>) => {
    const tapped = grab.current && !grab.current.moved && event.type === "pointerup";
    grab.current = null;
    delete event.currentTarget.dataset.held;
    if (tapped) toggle();
  };

  const playing = state === "playing";
  return <div className={s.stack}>
    <div className={s.wrap}>
      <div className={s.disc} data-playing={playing || undefined} onPointerDown={start} onPointerMove={move} onPointerUp={release} onPointerCancel={release} aria-hidden="true">
        <span className={s.label}><Image src={cover} alt="" width={640} height={640} sizes="160px" draggable={false} /></span>
      </div>
      <figure className={s.sleeve}><Image src={cover} alt={label} width={640} height={640} sizes="(max-width: 800px) 62vw, 420px" draggable={false} /></figure>
      <button type="button" className={s.play} onClick={toggle} aria-label={playing ? `Pausar ${title}` : `Reproducir ${title}`} data-state={state}>
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
    </div>
    <p className={s.hint} aria-live="polite">{state === "idle" ? "pulsa el vinilo para que suene" : state === "loading" ? "poniendo la aguja…" : playing ? "sonando ♥" : "en pausa"}</p>
    <div className={s.player} ref={player} data-open={state !== "idle" || undefined} />
  </div>;
}
