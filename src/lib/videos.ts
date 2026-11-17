// Vídeos de YouTube. El destacado se elige a mano; «lo último» sale solo del canal y se
// refresca una vez al día, así que Lourdes no tiene que tocar la web cuando sube un vídeo.
const channelId = "UCyxehJb_zUWB4MRkveLH-yw";
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

export type Video = { id: string; title: string };

export const featuredVideo: Video = { id: "bHIWU0SM74Y", title: "antes moría por verte (videoclip oficial)" };

// Videoclips oficiales, del más nuevo al más antiguo. Al sacar uno nuevo, se añade arriba y se cambia el destacado.
export const videoclips: Video[] = [
  { id: "3O8ehu78l5U", title: "lo que siento por ti" },
  { id: "JZLp097PO_M", title: "ya no lloro" },
  { id: "1txHu0BC8Ws", title: "el problema" },
];
const curated = new Set([featuredVideo.id, ...videoclips.map(video => video.id)]);

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const videoPoster = (id: string, size: "large" | "small" = "small") => `https://i.ytimg.com/vi/${id}/${size === "large" ? "maxresdefault" : "hqdefault"}.jpg`;

const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
// Channel titles repeat the artist's name ("… - lourdes martín - vlog #19"); the page already says whose they are.
const tidy = (title: string) => decode(title).replace(/\s*-\s*lourdes [ml]art[ií]n\s*-?\s*/i, " · ").replace(/\s*·\s*$/, "").replace(/\s+/g, " ").trim().toLowerCase();

/** Latest long-form uploads (Shorts excluded). Returns an empty list if YouTube cannot be reached, and the row is then not shown. */
export async function latestVideos(limit = 4): Promise<Video[]> {
  try {
    const response = await fetch(feedUrl, { next: { revalidate: 86400 } });
    if (!response.ok) return [];
    const entries = (await response.text()).split("<entry>").slice(1);
    return entries
      .filter(entry => !entry.includes("youtube.com/shorts/"))
      .map(entry => ({ id: entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1] ?? "", title: tidy(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? "") }))
      .filter(video => video.id && video.title && !curated.has(video.id))
      .slice(0, limit);
  } catch {
    return [];
  }
}
