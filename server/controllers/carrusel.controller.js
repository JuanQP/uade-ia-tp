const { Carrusel, Contenido, ContenidoCarrusel, Genero, MaturityRating } = require('../models');

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
      through: {
        attributes: ['order'],
      },
    }],
    order: [
      [
        { model: Contenido, as: 'contenidos' },
        ContenidoCarrusel,
        'order',
        'ASC',
      ],
    ],
  },
  table: {
    attributes: [
      'id',
      'title',
    ],
  },
};

/**
 * Map Contenido JSON to Sequelize Model Instance.
 * This is necessary to update the through table attributes.
 * https://sequelize.org/api/v6/class/src/associations/belongs-to-many.js~belongstomany
 */
function toSequelizeInstance(contenido) {
  const contenidoInstance = Contenido.build({ id: contenido.id });
  contenidoInstance.ContenidoCarrusel = contenido.ContenidoCarrusel;

  return contenidoInstance;
}

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
      const newContenidos = contenidos.map(toSequelizeInstance);

      await newCarousel.setContenidos(newContenidos);
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
      const newContenidos = contenidos.map(toSequelizeInstance);

      await savedCarousel.setContenidos(newContenidos);
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
