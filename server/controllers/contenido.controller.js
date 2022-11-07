const { Op } = require('sequelize');
const { Contenido, Genero, MaturityRating } = require('../models');
const { getPaginationOptions, getPaginationResults } = require('./helpers');

function genresToIDs(genre) {
  if(typeof genre !== 'number' && genre.id === undefined) {
    throw new Error("No se enviaron géneros válidos");
  }
  return genre.id ?? genre;
}

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
    order: [
      ['id', 'DESC'],
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
      const { page } = req.query;
      const { title: titleSearch = '', format: formatQuery } = req.query;
      const format = ATTRIBUTES_FORMAT[formatQuery] ?? ATTRIBUTES_FORMAT.default;
      const paginationOptions = getPaginationOptions(page);

      const { rows, count } = await Contenido.findAndCountAll({
        where: {
          title: { [Op.iLike]: `%${titleSearch}%` },
        },
        ...paginationOptions,
        ...format,
      });

      const paginationResults = getPaginationResults(page, count);

      res.status(200).send({
        count,
        ...paginationResults,
        results: rows,
      });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  create: async (req, res) => {
    try {
      const { genres, ...fields } = req.body;
      const newContent = await Contenido.create(fields);
      await newContent.setGenres(genres.map(genresToIDs));
      res.status(200).send(newContent);
    } catch (error) {
      res.status(400).send({message: error.message});
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
      res.status(400).send({message: error.message});
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const { genres, ...fields } = req.body;
      const content = await Contenido.findByPk(id);
      const savedContent = await content.update(fields);
      await savedContent.setGenres(genres.map(genresToIDs));
      res.status(200).send(savedContent);
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCount = await Contenido.destroy({ where: { id } });
      res.status(200).send({ message: `${deletedCount} contents deleted.` });
    } catch (error) {
      res.status(400).send({message: error.message});
    }
  },
};
