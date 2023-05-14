'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeachingDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TeachingDate.init({
    teacherPhone: DataTypes.STRING,
    dayOfWeek: DataTypes.STRING,
    timeBegin: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    numberOfStudent: DataTypes.INTEGER,
    idSubject: DataTypes.INTEGER,
    idClass: DataTypes.INTEGER,
    studentPhone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TeachingDate',
  });
  return TeachingDate;
};