import { artist } from "@/lib/artist";
import { getCopy, type Locale } from "@/lib/i18n";

/** The selected Tinta layout loads the player directly, without an opt-in toggle. */
export function SpotifyEmbed({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <div className="loaded-player">
    <iframe
      title={t.playerTitle}
      src={`${artist.spotifyEmbed}&locale=${locale}`}
      width="100%"
      height="352"
      loading="eager"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
    />
    <a className="embed-fallback" href={artist.spotify} target="_blank" rel="noreferrer">{t.playerFallback} ↗</a>
  </div>;
}
