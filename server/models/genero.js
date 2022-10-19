'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    static associate(models) {
      Genero.belongsToMany(models.Contenido, {
        through: "ContenidoGenero",
        as: 'contenidos',
     });
    }
  }
  Genero.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genero',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });
  return Genero;
};
