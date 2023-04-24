'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khoi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Khoi.init({
    khoi: DataTypes.STRING,
    cap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Khoi',
  });
  return Khoi;
};