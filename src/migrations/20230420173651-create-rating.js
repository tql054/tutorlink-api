'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      idSubject: {
        allowNull: false,
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
      rating: {
        type: Sequelize.FLOAT
      },
      comments: {
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
    await queryInterface.dropTable('Ratings');
  }
};