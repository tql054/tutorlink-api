'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HocViens', {
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
        type: Sequelize.STRING,
        references: {
          model: 'PhuongXas', // name of Target model
          key: 'phuongXa', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lop: {
        type: Sequelize.STRING
      },
      theHocSinh: {
        type: Sequelize.STRING
      },
      hocLuc: {
        type: Sequelize.STRING
      },
      bangDiem: {
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
    await queryInterface.dropTable('HocViens');
  }
};