'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DanhGia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      giaSu: {
        type: Sequelize.STRING(11),
        allowNull: true,
        autoIncrement: false,
        references: {
          model: 'GiaSus', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      hocVien: {
        type: Sequelize.STRING(11),
        allowNull: true,
        autoIncrement: false,
        references: {
          model: 'HocViens', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      monDay: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'MonHocs', // name of Target model
          key: 'mocHoc', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      danhGia: {
        type: Sequelize.INTEGER
      },
      binhLuan: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('DanhGia');
  }
};