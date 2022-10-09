'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contenido extends Model {
    static associate(models) {
      Contenido.belongsToMany(models.Carrusel, {
        through: "ContenidoCarrusel",
        as: 'carousels',
     });
      Contenido.belongsToMany(models.Genero, {
        through: "ContenidoGenero",
        as: 'genres',
     });
      Contenido.belongsTo(models.MaturityRating, {
        foreignKey: 'maturity_rating_id',
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
    urlImage: DataTypes.STRING,
    urlVideo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contenido',
  });
  return Contenido;
};
