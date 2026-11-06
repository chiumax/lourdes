"use client";

import { useState } from "react";
import { artist } from "@/lib/artist";

export function SpotifyPlayer() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="player-wrap">
      {loaded ? (
        <div className="loaded-player">
          <iframe
            title="Listen to Lourdes Martín on Spotify"
            src={artist.spotifyEmbed}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <p className="embed-fallback">Player not appearing? <a href={artist.spotify}>Listen on Spotify ↗</a></p>
        </div>
      ) : (
        <div className="player-placeholder">
          <span className="player-label">A LITTLE SOMETHING TO LISTEN TO</span>
          <button className="play-button" onClick={() => setLoaded(true)} aria-label="Load the Spotify player for Lourdes Martín">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 4.5 20 12 8 19.5Z" fill="currentColor" /></svg>
          </button>
          <span className="handwritten">press play, stay a while</span>
          <p className="embed-note">Loads Spotify when you click. Playback may require Spotify.</p>
        </div>
      )}
    </div>
  );
}
