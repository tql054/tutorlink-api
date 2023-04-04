'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PhuongXas', {
      phuongXa: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      quanHuyen: {
        type: Sequelize.STRING,
        references: {
          model: 'QuanHuyens', // name of Target model
          key: 'quanHuyen', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('PhuongXas');
  }
};