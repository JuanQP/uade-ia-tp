type Carousel = {
  id?: number;
  title: string;
  contents: ContentWithOrderField[];
}

interface ContentWithOrderField extends CardFormatContent {
  order: number;
}

type CarouselFormValues = Omit<Carousel, 'id' | 'contents'> & {
  contents: ContentWithOrderField[];
}

type FetchCarouselsOptions = {
  title: string,
  format: 'table' | 'card' | 'default',
  page: number,
}


interface TableFormatCarousel {
  id: number;
  title: string;
}
