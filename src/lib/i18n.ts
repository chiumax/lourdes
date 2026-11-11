export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.some(locale => locale === value);
export const concepts = ["tinta", "amplificador", "recortes", "tinta-editorial", "tinta-estudio"] as const;
export type Concept = (typeof concepts)[number];
export const isConcept = (value: string): value is Concept => concepts.some(concept => concept === value);

// Spanish is the public copy. English is retained as a reference for translation.
const es = {
  description: "Lourdes Martín. Pop acústico desde Mallorca. Canciones, guitarras y fotos entre medias.",
  music: "Música", photos: "Fotos", genre: "Pop acústico", location: "Mallorca",
  navigation: "Navegación principal", skip: "Saltar al contenido", back: "Volver arriba",
  variations: "Versiones", tint: "Tinta", amp: "Amplificador", cuttings: "Recortes",
  compareLabel: "Comparar las tres versiones",
  listen: "Escuchar en Spotify", allMusic: "Todas las canciones en Spotify", selected: "Canciones",
  musicIntro: "Pop acústico, desde Mallorca.", releaseLabel: "En Spotify",
  playerOpen: "Abrir reproductor de Spotify", playerClose: "Cerrar reproductor",
  playerTitle: "Escucha a Lourdes Martín en Spotify",
  playerNote: "Al abrir el reproductor se carga contenido de Spotify.",
  playerFallback: "También puedes escuchar en Spotify",
  artwork: "Portada de «antes moría por verte», con Lourdes junto al mar",
  acousticAlt: "Lourdes tocando la guitarra acústica", guitarAlt: "Una guitarra junto a una piscina",
  cameraRoll: "Entre canciones", photosIntro: "Del carrete.",
  acousticCaption: "Con la guitarra", guitarCaption: "Al lado de la piscina", instagram: "Más fotos en Instagram",
  songLink: "Escuchar", duration: "Duración",
  footerLine: "Hasta la próxima.", pauseMotion: "Pausar animación", playMotion: "Reanudar animación",
  footerPhotoAlt: "Recorte de Lourdes sentada con una chaqueta negra y las rodillas recogidas",
  notFound: "Esta página no está aquí.", returnHome: "Volver al inicio",
} as const;

type Dictionary = { [Key in keyof typeof es]: string };
const en: Dictionary = {
  description: "Lourdes Martín. Acoustic pop from Mallorca. Songs, guitars, and photographs in between.",
  music: "Music", photos: "Photos", genre: "Acoustic pop", location: "Mallorca",
  navigation: "Main navigation", skip: "Skip to content", back: "Back to top",
  variations: "Versions", tint: "Ink", amp: "Amplifier", cuttings: "Cuttings",
  compareLabel: "Compare the three versions",
  listen: "Listen on Spotify", allMusic: "All songs on Spotify", selected: "Songs",
  musicIntro: "Acoustic pop, from Mallorca.", releaseLabel: "On Spotify",
  playerOpen: "Open Spotify player", playerClose: "Close player",
  playerTitle: "Listen to Lourdes Martín on Spotify",
  playerNote: "Opening the player loads content from Spotify.",
  playerFallback: "You can also listen on Spotify",
  artwork: "Cover of antes moría por verte, showing Lourdes beside the sea",
  acousticAlt: "Lourdes playing acoustic guitar", guitarAlt: "An acoustic guitar beside a swimming pool",
  cameraRoll: "Between songs", photosIntro: "From the camera roll.",
  acousticCaption: "With the guitar", guitarCaption: "Beside the pool", instagram: "More photos on Instagram",
  songLink: "Listen to", duration: "Duration",
  footerLine: "See you around.", pauseMotion: "Pause animation", playMotion: "Resume animation",
  footerPhotoAlt: "A cut-out of Lourdes seated in a black jacket with her knees drawn up",
  notFound: "This page isn’t here.", returnHome: "Back to home",
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };
export const getCopy = (locale: Locale) => dictionaries[locale];
