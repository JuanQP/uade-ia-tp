'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrusel extends Model {
    static associate(models) {
      Carrusel.belongsToMany(models.Contenido, {
        through: "ContenidoCarrusel",
        as: 'contenidos',
     });
    }
  }
  Carrusel.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrusel',
  });
  return Carrusel;
};