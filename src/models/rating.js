'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Rating.init({
    teacherPhone: DataTypes.STRING,
    studentPhone: DataTypes.STRING,
    idSubject: DataTypes.INTEGER,
    idClass: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};