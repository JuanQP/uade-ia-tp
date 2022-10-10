const { Op } = require('sequelize');
const { Contenido, Genero, MaturityRating } = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const titleSearch = req.query.title ?? '';
      const contenidos = await Contenido.findAll({
        include: [
          { model: Genero, as: 'genres' },
          { model: MaturityRating },
        ],
        where: {
          title: { [Op.iLike]: `%${titleSearch}%` },
        }
      });
      res.status(200).send({ results: contenidos });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { genres, ...fields } = req.body;
      const newContent = await Contenido.create(fields);
      await newContent.setGenres(genres);
      res.status(200).send(newContent);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const content = await Contenido.findByPk(id, {
        include: [
          { model: Genero, as: 'genres' },
          { model: MaturityRating },
        ],
      });
      res.status(200).send(content);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const { genres, ...fields } = req.body;
      const content = await Contenido.findByPk(id);
      const savedContent = await content.update(fields);
      await savedContent.setGenres(genres);
      res.status(200).send(savedContent);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCount = await Contenido.destroy({ where: { id } });
      res.status(200).send({ message: `${deletedCount} contents deleted.` });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
