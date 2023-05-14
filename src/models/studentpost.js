'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StudentPost.init({
    teacherLevel: DataTypes.STRING,
    teacherExperience: DataTypes.STRING,
    otherRequires: DataTypes.STRING,
    address: DataTypes.STRING,
    idWard: DataTypes.INTEGER,
    studentPhone: DataTypes.STRING(11),
    teacherPhone: DataTypes.STRING(11),
    idSubject: DataTypes.INTEGER,
    idClass: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentPost',
  });
  return StudentPost;
};