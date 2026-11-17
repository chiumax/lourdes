// Próximos conciertos. Para añadir uno, copia el ejemplo dentro de la lista y cambia los datos.
// Los conciertos cuya fecha ya ha pasado dejan de mostrarse solos en el siguiente despliegue.
//
//   { date: "2027-03-14", city: "Palma", venue: "Nombre de la sala", time: "21:00", tickets: "https://…" },
//
// `time` y `tickets` son opcionales. Si no hay enlace de entradas se muestra «entrada libre / próximamente».
export type Concert = { date: string; city: string; venue: string; time?: string; tickets?: string; note?: string };

export const concerts: Concert[] = [];

const today = () => new Date().toISOString().slice(0, 10);
export const upcomingConcerts = () => concerts.filter(concert => concert.date >= today()).sort((a, b) => a.date.localeCompare(b.date));

const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export const concertDay = (date: string) => date.slice(8, 10);
export const concertMonth = (date: string) => `${months[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;
