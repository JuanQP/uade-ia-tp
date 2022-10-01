const { Carrusel, Contenido } = require('../models');

module.exports = {
  list: async (_, res) => {
    try {
      const carruseles = await Carrusel.findAll({
        attributes: ['id', 'title'],
        include: [{model: Contenido, as: 'contenidos'}],
      });
      res.status(200).send({ carruseles });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const newCarousel = await Carrusel.create(req.body);
      res.status(200).send({ carousel: newCarousel });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const carousel = await Carrusel.findByPk(id);
      res.status(200).send({ carousel });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const carousel = await Carrusel.findByPk(id);
      const savedCarousel = await carousel.update({...req.body});
      res.status(200).send({ carousel: savedCarousel });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Carrusel.destroy({ where: { id }});
      res.status(200).send({});
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
