'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contenido extends Model {
    static associate(models) {
      Contenido.belongsToMany(models.Carrusel, {
        through: "ContenidoCarrusel",
     });
    }
  }
  Contenido.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    director: DataTypes.STRING,
    cast: DataTypes.STRING,
    writer: DataTypes.STRING,
    genres: DataTypes.STRING,
    maturity_rating: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Contenido',
  });
  return Contenido;
};