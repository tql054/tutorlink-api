'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BaiDangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hocPhi: {
        type: Sequelize.INTEGER
      },
      soLuongHocVien: {
        type: Sequelize.INTEGER
      },
      idMonHoc: {
        type: Sequelize.STRING,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'MonHocs', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('BaiDangs');
  }
};