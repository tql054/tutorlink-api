'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentPosts', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacherLevel: {
        type: Sequelize.STRING
      },
      teacherExperience: {
        type: Sequelize.STRING
      },
      otherRequires: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      idWard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      studentPhone: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: 'Students', // name of Target model
          key: 'phoneNumber', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      teacherPhone: {
        type: Sequelize.STRING(11),
        allowNull: true,
        references: {
          model: 'Teachers', // name of Target model
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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes', // name of Target model
          key: 'id', // key in Target model that we're referencing
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
    await queryInterface.dropTable('StudentPosts');
  }
};