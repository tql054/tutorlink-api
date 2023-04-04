'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HocVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HocVien.init({
    soDienThoai: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    phuongXa: DataTypes.STRING,
    lop: DataTypes.STRING,
    theHocSinh: DataTypes.STRING,
    hocLuc: DataTypes.STRING,
    bangDiem: DataTypes.STRING,
    tinhTrang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HocVien',
  });
  return HocVien;
};