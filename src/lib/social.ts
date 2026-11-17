import { artist } from "./artist";

// Redes de la artista, en el orden en que se muestran.
export type Social = { id: "instagram" | "tiktok" | "youtube" | "spotify"; name: string; handle: string; url: string; line: string };

export const socials: Social[] = [
  { id: "instagram", name: "Instagram", handle: artist.instagramHandle, url: artist.instagram, line: "fotos, ensayos y el día a día" },
  { id: "tiktok", name: "TikTok", handle: artist.tiktokHandle, url: artist.tiktok, line: "canciones a medias y tonterías varias" },
  { id: "youtube", name: "YouTube", handle: artist.youtubeHandle, url: artist.youtube, line: "videoclips y vlogs" },
  { id: "spotify", name: "Spotify", handle: artist.name, url: artist.spotify, line: "todas las canciones, del tirón" },
];
