'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhMucLop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DanhMucLop.init({
    tenLop: DataTypes.STRING,
    cap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DanhMucLop',
  });
  return DanhMucLop;
};