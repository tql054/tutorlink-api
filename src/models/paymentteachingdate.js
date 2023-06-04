'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentTeachingDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PaymentTeachingDate.init({
    paymentId: DataTypes.STRING,
    teacherPhone: DataTypes.STRING,
    dayOfWeek: DataTypes.STRING,
    timeBegin: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentTeachingDate',
  });
  return PaymentTeachingDate;
};