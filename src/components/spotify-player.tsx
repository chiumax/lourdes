"use client";

import { useId, useState } from "react";
import { artist } from "@/lib/artist";
import { getCopy, type Locale } from "@/lib/i18n";

export function SpotifyPlayer({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const t = getCopy(locale);
  return <div className="player-wrap">
    <button className="player-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <span aria-hidden="true">{open ? "−" : "+"}</span>{open ? t.playerClose : t.playerOpen}
    </button>
    <div id={id} hidden={!open} className="loaded-player">
      {open && <>
        <iframe title={t.playerTitle} src={`${artist.spotifyEmbed}&locale=${locale}`} width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
        <a className="embed-fallback" href={artist.spotify} target="_blank" rel="noreferrer">{t.playerFallback} ↗</a>
      </>}
    </div>
    {!open && <p className="embed-note">{t.playerNote}</p>}
  </div>;
}
