/**
 * Content type sent by server
 */
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
  MaturityRating?: MaturityRating,
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

interface ContenidoGenero {
  createdAt: string;
  updatedAt: string;
  ContenidoId: number;
  GeneroId: number;
}
