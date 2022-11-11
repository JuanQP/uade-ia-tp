const { prisma } = require("../prisma");
const { getPaginationResults, getPaginationOptions, findManyAndCount, formatContent } = require('./helpers');

function format(carousel) {
  return {
    ...carousel,
    contents: carousel.contents.map(c => ({
      order: c.order,
      ...formatContent(c.content),
    })),
  }
}

async function defaultList (page, searchText) {
  const paginationOptions = getPaginationOptions(page);
  const [count, rows] = await findManyAndCount(prisma.carousel, {
    where: {
      title: { contains: `%${searchText}%`, mode: "insensitive" },
    },
    ...paginationOptions,
    ...ATTRIBUTES_FORMAT.default.attributes,
  });
  const paginationResults = getPaginationResults(page, count);

  return {
    count,
    ...paginationResults,
    results: rows.map(format),
  };
};

async function tableList (page, searchText) {
  const paginationOptions = getPaginationOptions(page);
  const [count, rows] = await findManyAndCount(prisma.carousel, {
    where: {
      title: { contains: `%${searchText}%`, mode: "insensitive" },
    },
    ...paginationOptions,
    ...ATTRIBUTES_FORMAT.table.attributes,
  });
  const paginationResults = getPaginationResults(page, count);

  return {
    count,
    ...paginationResults,
    results: rows,
  };
}

const ATTRIBUTES_FORMAT = {
  default: {
    getCarousels: defaultList,
    attributes: {
      select: {
        id: true,
        title: true,
        contents: {
          include: {
            content: {
              include: {
                genres: {
                  include: {
                    genre: true
                  }
                },
                maturityRating: true,
              }
            },
          },
          orderBy: {
            order: 'asc',
          }
        },
      },
    }
  },
  table: {
    getCarousels: tableList,
    attributes: {
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        id: 'desc',
      },
    }
  },
};

function contentsToConnect(content) {
  if(typeof content !== 'number' && content.id === undefined) {
    throw new Error("No se enviaron contenidos válidos");
  }
  return {
    content: {
      connect: {
        id: Number(content.id ?? content),
      },
    },
    order: Number(content.order),
  };
}

module.exports = {
  list: async (req, res) => {
    try {
      const { title: titleSearch = '', page } = req.query;
      const { getCarousels } = req.query?.format === 'table' ? ATTRIBUTES_FORMAT.table : ATTRIBUTES_FORMAT.default;
      const response = await getCarousels(page, titleSearch);

      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  create: async (req, res) => {
    try {
      const { contents, ...fields } = req.body;
      const newCarousel = await prisma.carousel.create({
        data: {
          ...fields,
          contents: {
            create: contents.map(contentsToConnect),
          }
        },
        include: {
          contents: true,
        },
      });

      res.status(200).send({
        carousel: format(newCarousel),
      });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const carousel = await prisma.carousel.findFirstOrThrow({
        where: { id: Number(id) },
        ...ATTRIBUTES_FORMAT.default.attributes,
      });
      res.status(200).send(format(carousel));
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const { contents, ...fields } = req.body;
      const carousel = await prisma.carousel.update({
        where: { id: Number(id) },
        data: {
          ...fields,
          contents: {
            deleteMany: {},
            create: contents.map(contentsToConnect),
          }
        }
      });
      res.status(200).send({ carousel });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.carousel.delete({
        where: { id: Number(id) },
      });
      res.status(200).send({ message: `Carousel deleted.` });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },
};
