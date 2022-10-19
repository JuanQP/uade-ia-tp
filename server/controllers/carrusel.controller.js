const { Carrusel, Contenido, Genero, MaturityRating } = require('../models');

const ATTRIBUTES_FORMAT = {
  default: {
    attributes: [
      'id',
      'title',
    ],
    include: [{
      model: Contenido,
      as: 'contenidos',
      include: [
        { model: Genero, as: 'genres' },
        { model: MaturityRating },
      ],
    }],
  },
  table: {
    attributes: [
      'id',
      'title',
    ],
  },
};

module.exports = {
  list: async (req, res) => {
    try {
      const format = req.query?.format === 'table' ? ATTRIBUTES_FORMAT.table : ATTRIBUTES_FORMAT.default;
      const carruseles = await Carrusel.findAll({
        ...format,
      });
      res.status(200).send({ results: carruseles });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { contenidos, ...fields } = req.body;
      const newCarousel = await Carrusel.create(fields);
      await newCarousel.setContenidos(contenidos);
      res.status(200).send(newCarousel);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const carousel = await Carrusel.findByPk(id, {
        ...ATTRIBUTES_FORMAT.default,
      });
      res.status(200).send(carousel);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const { contenidos, ...fields } = req.body;
      const carousel = await Carrusel.findByPk(id);
      const savedCarousel = await carousel.update(fields);
      await savedCarousel.setContenidos(contenidos);
      res.status(200).send(savedCarousel);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCount = await Carrusel.destroy({ where: { id } });
      res.status(200).send({ message: `${deletedCount} carousels deleted.` });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
