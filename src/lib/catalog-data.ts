export interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export type FormatType = "one-piece" | "triptych" | "five-piece";

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
      { id: "op-1", title: "Monochrome Heights", description: "Rascacielos en claroscuro brutalista.", image: "/assets/gallery-3-v2.png", price: 299 },
      { id: "op-2", title: "Wabi Sabi Enso", description: "Círculo zen imperfecto sobre lino.", image: "/assets/gallery-2-v2.png", price: 249 },
      { id: "op-3", title: "Caravaggio Light", description: "Claroscuro hiperrealista contemporáneo.", image: "/assets/gallery-4-v2.png", price: 420 },
    ]
  },
  {
    id: "triptych",
    title: "Trípticos",
    description: "Tres lienzos que expanden la narrativa visual.",
    roomImage: "/assets/room-triptych.png", 
    artworks: [
      { id: "tr-1", title: "Urban Shadow", description: "Calles oscuras de alto contraste.", image: "/assets/gallery-3-v2.png", price: 450 },
      { id: "tr-2", title: "Crimson Depth", description: "Abstracción geométrica en rojo profundo.", image: "/assets/gallery-1-v2.png", price: 420 },
      { id: "tr-3", title: "Dark Roses", description: "Bodegón barroco en sombras.", image: "/assets/gallery-4-v2.png", price: 480 },
    ]
  },
  {
    id: "five-piece",
    title: "5 Piezas",
    description: "Arreglos monumentales que transforman todo el espacio.",
    roomImage: "/assets/room-fivepiece.png", 
    artworks: [
      { id: "fp-1", title: "Ethereal Smoke", description: "Humo de neón sobre fondo obsidiana.", image: "/assets/gallery-1-v2.png", price: 650 },
      { id: "fp-2", title: "Golden Veins", description: "Fluidos oscuros con oro líquido.", image: "/assets/art-v4.png", price: 720 },
      { id: "fp-3", title: "Negative Space", description: "Composición minimalista extendida.", image: "/assets/gallery-2-v2.png", price: 600 },
    ]
  }
];
