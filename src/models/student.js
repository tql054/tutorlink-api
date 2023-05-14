'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    phoneNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    idWard: DataTypes.INTEGER,
    idClass: DataTypes.INTEGER,
    schoolName: DataTypes.STRING,
    studentCard: DataTypes.STRING,
    ability: DataTypes.STRING,
    transcript: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};