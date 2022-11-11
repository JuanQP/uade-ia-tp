const { prisma } = require("../prisma");
const { getPaginationOptions, getPaginationResults, findManyAndCount, formatContent } = require('./helpers');

function genresToConnect(genre) {
  if(typeof genre !== 'number' && genre.id === undefined) {
    throw new Error("No se enviaron géneros válidos");
  }
  return {
    genre: { connect: { id: Number(genre.id ?? genre) } }
  };
}

/**
 * Default list of contenidos
 */
async function defaultList (page, searchText) {
  const paginationOptions = getPaginationOptions(page);
  const [count, rows] = await findManyAndCount(prisma.content, {
    where: {
      title: { contains: `${searchText}`, mode: "insensitive" },
    },
    ...paginationOptions,
    ...ATTRIBUTES_FORMAT.default.attributes,
  });
  const paginationResults = getPaginationResults(page, count);

  return {
    count,
    ...paginationResults,
    results: rows.map(formatContent),
  };
};

async function tableList (page, searchText) {
  const paginationOptions = getPaginationOptions(page);
  const [count, rows] = await findManyAndCount(prisma.content, {
    where: {
      title: { contains: `%${searchText}%`, mode: "insensitive" },
    },
    select: {
      id: true,
      title: true,
      year: true,
      duration: true,
      director: true,
    },
    orderBy: {
      id: 'desc',
    },
    ...paginationOptions,
  });
  const paginationResults = getPaginationResults(page, count);

  return {
    count,
    ...paginationResults,
    results: rows
  };
}

async function cardList (page, searchText) {
  const rows = await prisma.content.findMany({
      where: {
        title: { contains: `%${searchText}%`, mode: "insensitive" },
      },
      select: {
        id: true,
        title: true,
        urlImage: true,
        genres: { include: { genre: true } },
        maturityRating: true,
      },
    });
  return {
    count: rows.length,
    results: rows.map(formatContent),
  };
}

const ATTRIBUTES_FORMAT = {
  default: {
    getContents: defaultList,
    attributes: {
      include: {
        genres: { include: { genre: true } },
        maturityRating: true,
      },
    },
  },
  table: {
    getContents: tableList,
  },
  card: {
    getContents: cardList,
  },
};

module.exports = {
  list: async (req, res) => {
    try {
      const { page } = req.query;
      const { title: titleSearch = '', format: formatQuery } = req.query;
      const { getContents } = ATTRIBUTES_FORMAT[formatQuery] ?? ATTRIBUTES_FORMAT.default;
      const response = await getContents(page, titleSearch);

      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { genres, ...fields } = req.body;
      const newContent = await prisma.content.create({
        data: {
          ...fields,
          genres: {
            create: genres.map(genresToConnect),
          },
        },
        include: {
          genres: true,
        },
      });
      res.status(200).send({ content: formatContent(newContent) });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const content = await prisma.content.findFirstOrThrow({
        where: { id: Number(id) },
        ...ATTRIBUTES_FORMAT.default.attributes,
      });
      res.status(200).send(formatContent(content));
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const { genres, ...fields } = req.body;
      const content = await prisma.content.update({
        where: { id: Number(id) },
        data: {
          ...fields,
          genres: {
            // Delete all and reassign
            deleteMany: {},
            create: genres.map(genresToConnect),
          },
        },
      });
      res.status(200).send({ content });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.content.delete({
        where: { id: Number(id) },
      });
      res.status(200).send({ message: `Content deleted.` });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },
};
