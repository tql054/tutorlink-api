'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MonDayGiaSus', {
      sdtGiaSu: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(11),
        references: {
          model: 'GiaSus', // name of Target model
          key: 'soDienThoai', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      monDay: {
        allowNull: false,
        primaryKey: true,
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
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'Khois', // name of Target model
          key: 'khoi', // key in Target model that we're referencing
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
    await queryInterface.dropTable('MonDayGiaSus');
  }
};