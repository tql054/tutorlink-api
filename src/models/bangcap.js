'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BangCap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BangCap.init({
    sdtGiaSu: DataTypes.STRING,
    ngayThem: DataTypes.DATE,
    ngayHetHan: DataTypes.DATE,
    tinhtrang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BangCap',
  });
  return BangCap;
};