'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DangKyDays', {
      giaSu: {
        type: Sequelize.STRING(11),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references: {
          model: 'GiaSus', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      thu: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      gioHoc: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      thoiLuong: {
        type: Sequelize.STRING
      },
      soLuongHocSinh: {
        type: Sequelize.INTEGER
      },
      khoi: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'Khois', // name of Target model
          key: 'khoi', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      monHoc: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'MonHocs', // name of Target model
          key: 'mocHoc', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      hocSinh: {
        type: Sequelize.STRING(11),
        allowNull: true,
        references: {
          model: 'HocViens', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      trangThai: {
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
    await queryInterface.dropTable('DangKyDays');
  }
};