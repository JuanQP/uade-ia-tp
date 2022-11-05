const { Op } = require('sequelize');
const { Genero } = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const searchText = req.query.description ?? '';
      const generos = await Genero.findAll({
        attributes: ['id', 'description'],
        where: {
          description: { [Op.iLike]: `%${searchText}%` },
        },
      });
      res.status(200).send({ generos });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);
      res.status(200).send({ genero });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
