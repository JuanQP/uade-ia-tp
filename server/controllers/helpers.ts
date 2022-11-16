const DEFAULT_PAGE_LIMIT = 10;

// TODO: Fix this two "any" types
export function formatContent (content: any) {
  return {
    ...content,
    genres: content.genres.map((g: any) => g.genre),
  }
}

type PaginationOptions = {
  skip: number;
  take: number;
} | {};

export function getPaginationOptions (page: number | string | undefined): PaginationOptions {
  const paginationOptions = isNaN(Number(page)) ? {} : {
    skip: Number(page) * DEFAULT_PAGE_LIMIT,
    take: DEFAULT_PAGE_LIMIT,
  };

  return paginationOptions;
}

export function getPaginationResults (page: number | string | undefined, count: number) {
  const paginationResults = isNaN(Number(page)) ? {} : {
    currentPage: Number(page),
    totalPages: Math.ceil(count / DEFAULT_PAGE_LIMIT),
  };

  return paginationResults;
}
