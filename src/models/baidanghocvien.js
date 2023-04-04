'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaiDangHocVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BaiDangHocVien.init({
    idBaiDang: DataTypes.INTEGER,
    trinhDoGiaSu: DataTypes.STRING,
    diaChiDay: DataTypes.STRING,
    phuongXa: DataTypes.STRING,
    sdt: DataTypes.STRING,
    yeuCauKhac: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BaiDangHocVien',
  });
  return BaiDangHocVien;
};