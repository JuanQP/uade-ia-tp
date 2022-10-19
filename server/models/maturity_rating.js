'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaturityRating extends Model {
    static associate(models) {
      MaturityRating.hasMany(models.Contenido, {
        as: 'contenidos',
        foreignKey: 'maturity_rating_id',
     });
    }
  }
  MaturityRating.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MaturityRating',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });
  return MaturityRating;
};
