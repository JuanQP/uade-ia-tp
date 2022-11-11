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
  maturityRatingId: number | null,
  maturityRating?: MaturityRating,
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
  maturityRating: MaturityRating;
}
