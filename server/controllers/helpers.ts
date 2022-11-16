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

export function getPaginationOptions (page: number | undefined): PaginationOptions {
  const paginationOptions = page ? {
    skip: Number(page) * DEFAULT_PAGE_LIMIT,
    take: DEFAULT_PAGE_LIMIT,
  } : {};

  return paginationOptions;
}

export function getPaginationResults (page: number | undefined, count: number) {
  const paginationResults = page ? {
    currentPage: Number(page),
    totalPages: Math.ceil(count / DEFAULT_PAGE_LIMIT),
  } : {};

  return paginationResults;
}
