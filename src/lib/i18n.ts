export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.some(locale => locale === value);
export const concepts = ["postmarked", "bedroom-floor", "blue-book"] as const;
export type Concept = (typeof concepts)[number];
export const isConcept = (value: string): value is Concept => concepts.some(concept => concept === value);

const es = {
  description: "Lourdes Martín. Pop acústico desde Mallorca. Escucha sus canciones y descubre su archivo de conciertos.",
  music: "Música", archive: "Archivo", photos: "Fotos", home: "Inicio", genre: "Pop acústico", location: "Mallorca",
  navigation: "Navegación principal", skip: "Saltar al contenido", language: "Idioma", back: "Volver arriba",
  listen: "Escuchar en Spotify", allMusic: "Todas las canciones en Spotify", selected: "Canciones", featured: "Para escuchar",
  playerOpen: "Abrir reproductor de Spotify", playerClose: "Cerrar reproductor", playerTitle: "Escucha a Lourdes Martín en Spotify",
  playerNote: "Al abrir el reproductor se carga contenido de Spotify.", playerFallback: "También puedes escuchar en Spotify", playerLoading: "Cargando Spotify…",
  artwork: "Portada de «antes moría por verte», con Lourdes junto al mar", portrait: "Lourdes sonriendo junto al mar",
  acousticAlt: "Lourdes tocando la guitarra acústica", guitarAlt: "Una guitarra junto a una piscina",
  volanderAlt: "Cartel del concierto de Lourdes Martín en El Volander, 15 de mayo de 2023",
  movidaAlt: "Cartel de Lourdes Martín en La Movida, Palma, con su retrato dentro de una estrella",
  archiveTitle: "Carteles guardados.", archiveNote: "Un par de conciertos del archivo. No son próximas fechas.",
  viewPoster: "Ver cartel completo", archiveLabel: "Archivo de conciertos", cameraRoll: "Entre canciones", cameraNote: "Guitarras, ensayos y fotos del carrete.",
  acousticCaption: "Con la guitarra", guitarCaption: "Al lado de la piscina", instagram: "Más fotos en Instagram",
  songLink: "Escuchar", duration: "Duración", compare: "Ver otros diseños", compareLabel: "Comparar las tres versiones",
  postcard: "Postales", bedroom: "Recortes", notebook: "Cuaderno", thanks: "Gracias por escuchar.",
  postIntro: "Música, fotos y algunos carteles que merecía la pena guardar.",
  bedroomIntro: "Canciones y recortes.", blueIntro: "Música y apuntes.",
  pages: "Páginas", sheet: "Fotos del cuaderno", toggleSheet: "Abrir o cerrar las fotos", contents: "Índice",
  credits: "Lourdes Martín", notFound: "Esta página no está aquí.", returnHome: "Volver al inicio",
} as const;
type Dictionary = { [Key in keyof typeof es]: string };
const en: Dictionary = {
  description: "Lourdes Martín. Acoustic pop from Mallorca. Listen to her songs and explore her concert archive.",
  music: "Music", archive: "Archive", photos: "Photos", home: "Home", genre: "Acoustic pop", location: "Mallorca",
  navigation: "Main navigation", skip: "Skip to content", language: "Language", back: "Back to top",
  listen: "Listen on Spotify", allMusic: "All songs on Spotify", selected: "Songs", featured: "Listen to",
  playerOpen: "Open Spotify player", playerClose: "Close player", playerTitle: "Listen to Lourdes Martín on Spotify",
  playerNote: "Opening the player loads content from Spotify.", playerFallback: "You can also listen on Spotify", playerLoading: "Loading Spotify…",
  artwork: "Cover of antes moría por verte, showing Lourdes beside the sea", portrait: "Lourdes smiling beside the sea",
  acousticAlt: "Lourdes playing acoustic guitar", guitarAlt: "An acoustic guitar beside a swimming pool",
  volanderAlt: "Poster for Lourdes Martín at El Volander, 15 May 2023",
  movidaAlt: "Poster for Lourdes Martín at La Movida, Palma, with a star-framed portrait",
  archiveTitle: "Posters worth keeping.", archiveNote: "Two concerts from the archive. These are not upcoming dates.",
  viewPoster: "View full poster", archiveLabel: "Concert archive", cameraRoll: "Between songs", cameraNote: "Guitars, rehearsals, and photos from the camera roll.",
  acousticCaption: "With the guitar", guitarCaption: "Beside the pool", instagram: "More photos on Instagram",
  songLink: "Listen to", duration: "Duration", compare: "Explore the other designs", compareLabel: "Compare the three versions",
  postcard: "Postcards", bedroom: "Cuttings", notebook: "Notebook", thanks: "Thanks for listening.",
  postIntro: "Music, photographs, and a few concert posters worth keeping.",
  bedroomIntro: "Songs & cuttings.", blueIntro: "Music & notes.",
  pages: "Pages", sheet: "Notebook photographs", toggleSheet: "Open or close the photographs", contents: "Contents",
  credits: "Lourdes Martín", notFound: "This page isn’t here.", returnHome: "Back to home",
};
export const dictionaries: Record<Locale, Dictionary> = { es, en };
export const getCopy = (locale: Locale) => dictionaries[locale];
