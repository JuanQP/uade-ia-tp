const { Contenido } = require('../models');

module.exports = {
  list: async (_, res) => {
    try {
      const contenidos = await Contenido.findAll();
      res.status(200).send({ contenidos });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const newContent = await Contenido.create(req.body);
      res.status(200).send({ content: newContent });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const content = await Contenido.findByPk(id);
      res.status(200).send({ content });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const content = await Contenido.findByPk(id);
      const savedContent = await content.update({...req.body});
      res.status(200).send({ content: savedContent });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Contenido.destroy({ where: { id }});
      res.status(200).send({});
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
