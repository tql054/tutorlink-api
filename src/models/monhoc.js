'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonHoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MonHoc.init({
    mocHoc: DataTypes.STRING,
    idLop: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MonHoc',
  });
  return MonHoc;
};