type Content = {
  id?: number,
  title: string,
  description: string,
  year: number,
  duration: number,
  director: string,
  writer: string,
  cast: string,
  urlImage: string,
  verticalUrlImage: string,
  urlVideo: string,
  genres: Genre[],
  maturity_rating_id: number | null,
  MaturityRating: MaturityRating | undefined,
}

type ContentFormValues = Omit<Content, 'genres' | 'MaturityRating'> & {
  genres: number[];
}

type Genre = {
  id?: number;
  description: string;
}

type MaturityRating = {
  id?: number;
  description: string;
}

type FetchContentsOptions = {
  title: string,
  format: 'table' | 'card' | 'default',
  page: number,
}

interface CardFormatContent {
  id: number;
  title: string;
  urlImage: string;
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
