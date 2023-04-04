'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaiDang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BaiDang.init({
    hocPhi: DataTypes.INTEGER,
    soLuongHocVien: DataTypes.INTEGER,
    idMonHoc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BaiDang',
  });
  return BaiDang;
};