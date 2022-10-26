'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContenidoCarrusel extends Model {
  }
  ContenidoCarrusel.init({
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    sequelize,
    tableName: 'ContenidoCarrusel',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });
  return ContenidoCarrusel;
};
