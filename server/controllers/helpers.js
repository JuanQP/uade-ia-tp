const DEFAULT_PAGE_LIMIT = 3;

module.exports = {
  getPaginationOptions: (page) => {
    const paginationOptions = page ? {
      distinct: true,
      offset: Number(page) * DEFAULT_PAGE_LIMIT,
      limit: DEFAULT_PAGE_LIMIT,
    } : { distinct: true };

    return paginationOptions;
  },

  getPaginationResults: (page, count) => {
    const paginationResults = page ? {
      currentPage: Number(page),
      totalPages: Math.ceil(count / DEFAULT_PAGE_LIMIT),
    } : {};

    return paginationResults;
  }
};
