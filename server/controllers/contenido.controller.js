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
};
