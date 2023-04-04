'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuanHuyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuanHuyen.init({
    quanHuyen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuanHuyen',
  });
  return QuanHuyen;
};