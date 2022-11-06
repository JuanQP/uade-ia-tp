type Carousel = {
  id: number;
  title: string;
  contenidos: Content[];
}

type CarouselFormValues = {
  id?: number;
  title: string;
  contenidos: {
    id: number;
    ContenidoCarrusel: {
      order: number
    }
  }[];
}

type FetchCarouselsOptions = {
  title: string,
  format: 'table' | 'card' | 'default',
  page: number,
}

interface CarouselResponse {
  id: number;
  title: string;
  contenidos: Contenido[];
}

interface Contenido {
  id: number;
  title: string;
  description: string;
  year: number;
  duration: number;
  director: string;
  cast: string;
  writer: string;
  urlImage: string;
  verticalUrlImage: string;
  urlVideo: string;
  maturity_rating_id: number;
  ContenidoCarrusel: ContenidoCarrusel;
  genres: Genre[];
  MaturityRating: MaturityRating;
}

interface MaturityRating {
  id: number;
  description: string;
}

interface Genre {
  id: number;
  description: string;
  ContenidoGenero: ContenidoGenero;
}

interface ContenidoGenero {
  createdAt: string;
  updatedAt: string;
  ContenidoId: number;
  GeneroId: number;
}

interface ContenidoCarrusel {
  order: number;
}

interface TableFormatCarousel {
  id: number;
  title: string;
}
