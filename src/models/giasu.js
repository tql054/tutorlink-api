'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiaSu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GiaSu.init({
    soDienThoai: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    phuongXa: DataTypes.STRING,
    cccd: DataTypes.STRING,
    trinhdo: DataTypes.STRING,
    tinhTrang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GiaSu',
  });
  return GiaSu;
};