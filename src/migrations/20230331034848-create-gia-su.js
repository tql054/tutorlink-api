'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GiaSus', {
      soDienThoai: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(11),
        references: {
          model: 'TaiKhoans', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      hoTen: {
        type: Sequelize.STRING
      },
      diaChi: {
        type: Sequelize.STRING
      },
      phuongXa: {
        type: Sequelize.STRING
      },
      cccd: {
        allowNull: false,
        type: Sequelize.STRING(12),
      },
      trinhdo: {
        type: Sequelize.STRING
      },
      tinhTrang: {
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
    await queryInterface.dropTable('GiaSus');
  }
};