'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuoiHoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BuoiHoc.init({
    thu: DataTypes.STRING,
    thoigianbd: DataTypes.STRING,
    thoigiankt: DataTypes.STRING,
    idlop: DataTypes.INTEGER,
    idbaidang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BuoiHoc',
  });
  return BuoiHoc;
};