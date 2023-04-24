'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BangCaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sdtGiaSu: {
        type: Sequelize.STRING(11),
        references: {
          model: 'GiaSus', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ngayThem: {
        type: Sequelize.DATE
      },
      ngayHetHan: {
        type: Sequelize.DATE
      },
      tinhtrang: {
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
    await queryInterface.dropTable('BangCaps');
  }
};