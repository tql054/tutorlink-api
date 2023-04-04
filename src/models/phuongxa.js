'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhuongXa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PhuongXa.init({
    phuongXa: DataTypes.STRING,
    quanHuyen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhuongXa',
  });
  return PhuongXa;
};