const { Op } = require('sequelize');
const { Contenido, Genero, MaturityRating } = require('../models');

const ATTRIBUTES_FORMAT = {
  default: {
    include: [
      { model: Genero, as: 'genres' },
      { model: MaturityRating },
    ]
  },
  table: {
    attributes: [
      'id',
      'title',
      'year',
      'duration',
      'director',
    ],
  },
  card: {
    attributes: [
      'id',
      'title',
      'urlImage',
    ],
    include: [
      { model: Genero, as: 'genres' },
      { model: MaturityRating },
    ],
  },
};

module.exports = {
  list: async (req, res) => {
    try {
      const { title: titleSearch = '', format: formatQuery } = req.query;
      const format = ATTRIBUTES_FORMAT[formatQuery] ?? ATTRIBUTES_FORMAT.default;
      const contenidos = await Contenido.findAll({
        where: {
          title: { [Op.iLike]: `%${titleSearch}%` },
        },
        ...format,
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
        ...ATTRIBUTES_FORMAT.default,
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
