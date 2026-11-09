// Verified against the public Spotify artist embed on 2026-11-09.
// Titles are the artist's own catalogue labels and are not translated.
export const songs = [
  { id: "2mvtMnxyRxaSTgcYTV8JIe", title: "antes moría por verte", duration: "2:12" },
  { id: "4SK5CTgzKEBu7pcsSjbqGs", title: "el problema", duration: "3:00" },
  { id: "6c7xGiUPfB8iDrfQ9NJcxz", title: "Que raro fue", duration: "3:12" },
  { id: "7Io1Ws8fngOaPx6HTSKgkW", title: "ya no lloro", duration: "2:34" },
  { id: "2PFr2WppXicoSHknhx9yDS", title: "lo que siento por ti", duration: "3:10" },
] as const;
export const featured = { ...songs[0], date: "24.07.2026", artwork: "/images/antes-moria-por-verte.webp" };
export const trackUrl = (id: string) => `https://open.spotify.com/track/${id}`;
