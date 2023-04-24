'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonDayGiaSu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MonDayGiaSu.init({
    sdtGiaSu: DataTypes.STRING,
    monDay: DataTypes.STRING(100),
    khoi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MonDayGiaSu',
  });
  return MonDayGiaSu;
};