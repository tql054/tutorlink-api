'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ngayBatDau: {
        type: Sequelize.DATE
      },
      ngayKetThuc: {
        type: Sequelize.DATE
      },
      hocPhi: {
        type: Sequelize.FLOAT
      },
      danhGiaHocVien: {
        type: Sequelize.INTEGER
      },
      danhGiaGiaSu: {
        type: Sequelize.INTEGER
      },
      sdtHocVien: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: 'HocViens', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sdtGiaSu: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: 'GiaSus', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
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
    await queryInterface.dropTable('Lops');
  }
};