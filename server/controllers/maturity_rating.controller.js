const { Op } = require('sequelize');
const { MaturityRating } = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const searchText = req.query.description ?? '';
      const maturity_ratings = await MaturityRating.findAll({
        attributes: ['id', 'description'],
        where: {
          description: { [Op.iLike]: `%${searchText}%` },
        },
      });
      res.status(200).send({ maturity_ratings });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const maturity_rating = await MaturityRating.findByPk(id);
      res.status(200).send({ maturity_rating });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
