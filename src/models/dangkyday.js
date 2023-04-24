'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DangKyDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DangKyDay.init({
    giaSu: DataTypes.STRING,
    thu: DataTypes.STRING,
    gioHoc: DataTypes.STRING,
    thoiLuong: DataTypes.STRING,
    soLuongHocSinh: DataTypes.INTEGER,
    khoi: DataTypes.STRING,
    monHoc: DataTypes.STRING,
    hocSinh: DataTypes.STRING,
    trangThai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DangKyDay',
  });
  return DangKyDay;
};