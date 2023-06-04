'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PaymentTeachingDates', {
      paymentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      teacherPhone: {
        type: Sequelize.STRING,
        references: {
          model: 'Teachers', // name of Target model
          key: 'phoneNumber', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dayOfWeek: {
        type: Sequelize.STRING
      },
      timeBegin: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PaymentTeachingDates');
  }
};