const { prisma } = require("../prisma");

module.exports = {
  list: async (req, res) => {
    try {
      const searchText = req.query.description ?? '';
      const results = await prisma.maturityRating.findMany({
        select: { id: true, description: true },
        where: {
          description: { contains: `${searchText}`, mode: "insensitive" },
        },
      });
      res.status(200).send({ results });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const maturityRating = await prisma.maturityRating.findFirstOrThrow({
        where: { id: Number(id) },
      });
      res.status(200).send({ maturityRating });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },
};
