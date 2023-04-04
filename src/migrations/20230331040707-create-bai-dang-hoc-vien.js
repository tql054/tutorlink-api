'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BaiDangHocViens', {
      idBaiDang: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'BaiDangs', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      trinhDoGiaSu: {
        type: Sequelize.STRING
      },
      diaChiDay: {
        type: Sequelize.STRING
      },
      phuongXa: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'PhuongXas', // name of Target model
          key: 'phuongXa', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sdt: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: 'HocViens', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      yeuCauKhac: {
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
    await queryInterface.dropTable('BaiDangHocViens');
  }
};