const { prisma } = require("../prisma");

const DEFAULT_PAGE_LIMIT = 10;

module.exports = {

    /**
   * Maps ContentGenre to Genre in field content.genres
   */
  formatContent: function (content) {
    return {
      ...content,
      genres: content.genres.map(g => g.genre),
    }
  },

  findManyAndCount: async function (prismaModel, options) {
    const { where } = options;

    return await prisma.$transaction([
      prismaModel.count({ where }),
      prismaModel.findMany(options),
    ]);
  },

  getPaginationOptions: (page) => {
    const paginationOptions = page ? {
      skip: Number(page) * DEFAULT_PAGE_LIMIT,
      take: DEFAULT_PAGE_LIMIT,
    } : {};

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
