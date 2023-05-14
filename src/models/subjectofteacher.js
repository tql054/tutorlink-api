'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectOfTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SubjectOfTeacher.init({
    teacherPhone: DataTypes.STRING,
    idSubject: DataTypes.INTEGER,
    idClass: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubjectOfTeacher',
  });
  return SubjectOfTeacher;
};