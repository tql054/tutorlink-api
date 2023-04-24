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
    kinhNghiem: DataTypes.STRING,
    yeuCauKhac: DataTypes.STRING,
    diaChiDay: DataTypes.STRING,
    phuongXa: DataTypes.STRING,
    hocVien: DataTypes.STRING(11),
    giaSu: DataTypes.STRING(11),
    monHoc: DataTypes.STRING,
    trangThai: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'BaiDangHocVien',
  });
  return BaiDangHocVien;
};