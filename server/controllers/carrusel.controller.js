const { Carrusel, Contenido } = require('../models');

module.exports = {
  list: async (_, res) => {
    try {
      const carruseles = await Carrusel.findAll({
        attributes: ['id', 'title'],
        include: [{ model: Contenido, as: 'contenidos' }],
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
        include: [{ model: Contenido, as: 'contenidos' }],
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
