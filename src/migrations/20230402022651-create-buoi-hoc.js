'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BuoiHocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      thu: {
        type: Sequelize.STRING
      },
      thoigianbd: {
        type: Sequelize.STRING
      },
      thoigiankt: {
        type: Sequelize.STRING
      },
      idlop: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Lops', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idbaidang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BaiDangs', // name of Target model
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
    await queryInterface.dropTable('BuoiHocs');
  }
};