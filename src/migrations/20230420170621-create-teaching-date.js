'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TeachingDates', {
      teacherPhone: {
        type: Sequelize.STRING(11),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references: {
          model: 'Teachers', // name of Target model
          key: 'phoneNumber', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dayOfWeek: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      timeBegin: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      duration: {
        type: Sequelize.INTEGER
      },
      numberOfStudent: {
        type: Sequelize.INTEGER
      },
      idSubject: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idClass: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      studentPhone: {
        type: Sequelize.STRING(11),
        allowNull: true,
        references: {
          model: 'Students', // name of Target model
          key: 'phoneNumber', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
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
    await queryInterface.dropTable('TeachingDates');
  }
};