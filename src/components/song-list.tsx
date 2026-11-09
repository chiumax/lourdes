import { getCopy, type Locale } from "@/lib/i18n";
import { songs, trackUrl } from "@/lib/music";
import { SpotifyPlayer } from "./spotify-player";

export function SongList({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <div className="song-selection">
    <ol className="song-list" aria-label={t.selected}>
      {songs.map((song, index) => <li key={song.id}>
        <a href={trackUrl(song.id)} target="_blank" rel="noreferrer" aria-label={`${t.songLink} ${song.title} — Spotify`}>
          <span className="song-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="song-name" lang="es">{song.title}</span>
          <span className="song-duration" aria-label={`${t.duration}: ${song.duration}`}>{song.duration}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </li>)}
    </ol>
    <SpotifyPlayer locale={locale} />
  </div>;
}
