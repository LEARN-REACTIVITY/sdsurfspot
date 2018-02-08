'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('beaches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
     },
      contactId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
              model: 'users',
              key: 'id',
              as: 'userID'
          }
     }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('beaches');
  }
};
