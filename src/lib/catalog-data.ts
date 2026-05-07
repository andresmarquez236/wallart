export interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  themes: ArtworkTheme[];
}

export type FormatType = "one-piece" | "triptych" | "five-piece";
export type ArtworkTheme =
  | "animals"
  | "religious"
  | "abstract"
  | "money"
  | "landscapes"
  | "series-movies"
  | "anime"
  | "cities"
  | "sculptures"
  | "sports"
  | "characters"
  | "video-games"
  | "music"
  | "custom"
  | "textured";

export const CATALOG_THEMES: Array<{ id: ArtworkTheme; label: string }> = [
  { id: "animals", label: "Animales" },
  { id: "religious", label: "Religiosos" },
  { id: "abstract", label: "Abstractos" },
  { id: "money", label: "Dinero" },
  { id: "landscapes", label: "Paisajes" },
  { id: "series-movies", label: "Series y Películas" },
  { id: "anime", label: "Anime" },
  { id: "cities", label: "Ciudades" },
  { id: "sculptures", label: "Esculturas" },
  { id: "sports", label: "Deportes" },
  { id: "characters", label: "Personajes" },
  { id: "video-games", label: "Video Juegos" },
  { id: "music", label: "Música" },
  { id: "custom", label: "Personalizados" },
  { id: "textured", label: "Cuadros con Textura" },
];

export interface Category {
  id: FormatType;
  title: string;
  description: string;
  roomImage: string; // Background empty room image
  artworks: Artwork[];
}

export const CATALOG_DATA: Category[] = [
  {
    id: "one-piece",
    title: "1 Pieza",
    description: "Formatos inmersivos de alto impacto para un enfoque minimalista.",
    roomImage: "/assets/room-onepiece.png", 
    artworks: [
      { id: "op-1", title: "Obsidian Geometry", description: "Arquitectura abstracta en escala monumental.", image: "/assets/muestra_6.png", price: 299, themes: ["cities", "abstract"] },
      { id: "op-2", title: "Silent Texture", description: "Materia visual sobria con presencia de galería.", image: "/assets/muestra_5.png", price: 249, themes: ["abstract", "textured"] },
      { id: "op-3", title: "Concrete Bloom", description: "Contraste botánico con atmósfera editorial.", image: "/assets/muestra_4.png", price: 420, themes: ["religious", "sculptures"] },
    ]
  },
  {
    id: "triptych",
    title: "Trípticos",
    description: "Tres lienzos que expanden la narrativa visual.",
    roomImage: "/assets/room-triptych.png", 
    artworks: [
      { id: "tr-1", title: "Monolith Sequence", description: "Ritmo arquitectónico para espacios amplios.", image: "/assets/muestra_3.jpeg", price: 450, themes: ["cities", "landscapes"] },
      { id: "tr-2", title: "Museum Trace", description: "Gesto abstracto sobre textura cálida.", image: "/assets/muestra_2.jpeg", price: 420, themes: ["abstract", "music"] },
      { id: "tr-3", title: "Nocturne Garden", description: "Naturaleza oscura con tensión cinematográfica.", image: "/assets/muestra_1.jpeg", price: 480, themes: ["textured", "sculptures"] },
    ]
  },
  {
    id: "five-piece",
    title: "5 Piezas",
    description: "Arreglos monumentales que transforman todo el espacio.",
    roomImage: "/assets/room-fivepiece.png", 
    artworks: [
      { id: "fp-1", title: "Editorial Tension", description: "Composición vertical para presencia dominante.", image: "/assets/muestra_6.png", price: 650, themes: ["video-games", "anime"] },
      { id: "fp-2", title: "Golden Silence", description: "Textura oscura con acentos de lujo contenido.", image: "/assets/muestra_5.png", price: 720, themes: ["money", "abstract"] },
      { id: "fp-3", title: "Gallery Field", description: "Paisaje abstracto de alto impacto visual.", image: "/assets/muestra_4.png", price: 600, themes: ["custom", "sports"] },
    ]
  }
];
