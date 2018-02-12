'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
        [
            {
                name: 'Leeann',
                username: 'dabo$$',
                email: 'dabo$$@gmail.com',
                password: 'password',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Christina',
                username: 'chrissychrissy',
                email: 'chrissychrissy@gmail.com',
                password: 'password',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Jordan',
                username: 'daRealBo$$',
                email: 'daRealBo$$@gmail.com',
                password: 'password',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Max',
                username: 'maxattack',
                email: 'maxattack@gmail.com',
                password: 'password',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {})
  }
};
