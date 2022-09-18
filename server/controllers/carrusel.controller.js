const { Carrusel, Contenido } = require('../models');

module.exports = {
  list: async (_, res) => {
    try {
      const carruseles = await Carrusel.findAll(
        {attributes: ['id', 'title']},
        {include: [Contenido]}
      );
      res.status(200).send({ carruseles });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
