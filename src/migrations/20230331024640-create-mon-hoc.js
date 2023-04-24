'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MonHocs', {
      mocHoc: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING  
      },
      lopMin: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      lopMax: {
        allowNull: true,
        type: Sequelize.INTEGER 
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
    await queryInterface.dropTable('MonHocs');
  }
};