'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BaiDangHocViens', {
      idBaiDang: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trinhDoGiaSu: {
        type: Sequelize.STRING
      },
      kinhNghiem: {
        type: Sequelize.STRING
      },
      yeuCauKhac: {
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
      hocVien: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: 'HocViens', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      giaSu: {
        type: Sequelize.STRING(11),
        allowNull: true,
        references: {
          model: 'GiaSus', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
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
      khoi: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Khois', // name of Target model
          key: 'khoi', // key in Target model that we're referencing
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
    await queryInterface.dropTable('BaiDangHocViens');
  }
};