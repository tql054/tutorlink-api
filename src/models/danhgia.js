'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhGia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DanhGia.init({
    giaSu: DataTypes.STRING,
    hocVien: DataTypes.STRING,
    monHoc: DataTypes.STRING,
    khoi: DataTypes.STRING,
    danhGia: DataTypes.INTEGER,
    binhLuan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DanhGia',
  });
  return DanhGia;
};