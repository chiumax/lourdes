// Fotos del directo y del carrete, con el color de marco e inclinación de cada una.
export type Frame = "sky" | "yellow" | "flush" | "delicate" | "cosmos" | "dazzle";
export type Photo = { src: string; alt: string; width: number; height: number; frame: Frame; tilt: number; note?: string };

export const live: Photo[] = [
  { src: "/images/directo/guitarra-violeta.webp", alt: "Lourdes cantando con la guitarra acústica bajo luces violetas", width: 1100, height: 1615, frame: "sky", tilt: -2 },
  { src: "/images/directo/corazon-arriba.webp", alt: "Lourdes sonriendo en el escenario, haciendo un corazón con las manos sobre la cabeza", width: 1400, height: 1097, frame: "flush", tilt: 1.5 },
  { src: "/images/directo/la-movida-naranja.webp", alt: "Lourdes con la guitarra en el escenario de La Movida, con luces naranjas", width: 1100, height: 1649, frame: "yellow", tilt: 2.5 },
  { src: "/images/directo/banda-azul.webp", alt: "Lourdes cantando con banda bajo focos azules", width: 1400, height: 934, frame: "delicate", tilt: -1.5 },
  { src: "/images/directo/la-movida-rojo.webp", alt: "Lourdes cantando con los ojos cerrados bajo luces rojas", width: 1100, height: 1649, frame: "cosmos", tilt: -2.5 },
  { src: "/images/directo/banda-rojo.webp", alt: "Lourdes con la banda en directo, bañados en luz roja", width: 1400, height: 934, frame: "yellow", tilt: 2 },
];

export const wall: Photo[] = [
  { src: "/images/directo/corazon.webp", alt: "Lourdes sonriendo y haciendo un corazón con las manos", width: 1100, height: 1651, frame: "yellow", tilt: -2 },
  { src: "/images/lourdes-acoustic.webp", alt: "Lourdes tocando la guitarra acústica", width: 640, height: 800, frame: "flush", tilt: 2.5 },
  { src: "/images/directo/princesa-del-pop.webp", alt: "Lourdes sosteniendo un cartel hecho a mano que dice «la princesa del pop»", width: 1100, height: 1651, frame: "dazzle", tilt: -1.5, note: "la princesa del pop ♥" },
  { src: "/images/directo/camerino.webp", alt: "Lourdes sonriendo apoyada en una pared antes de un concierto", width: 1100, height: 1467, frame: "sky", tilt: 2 },
  { src: "/images/directo/guitarra-azul.webp", alt: "Lourdes cantando con una guitarra acústica oscura", width: 1100, height: 1651, frame: "delicate", tilt: -2.5 },
  { src: "/images/directo/guitarra-rosa.webp", alt: "Lourdes cantando al micrófono con la guitarra, bajo luces rosas", width: 1100, height: 1650, frame: "cosmos", tilt: 1 },
  { src: "/images/directo/sentada.webp", alt: "Lourdes cantando sentada en un taburete", width: 638, height: 1134, frame: "yellow", tilt: -1 },
];
