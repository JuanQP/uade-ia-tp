const { Contenido } = require('../models');

module.exports = {
  list: async (_, res) => {
    try {
      const contenidos = await Contenido.findAll({attributes: ['id', 'title']});
      res.status(200).send({ contenidos });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
