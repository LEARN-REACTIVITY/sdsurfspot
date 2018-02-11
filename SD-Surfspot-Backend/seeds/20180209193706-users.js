'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
        [
            {
                name: 'Leeann',
                username: 'dabo$$',
                password: 'password',
                email: 'dabo$$@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Christina',
                username: 'chrissychrissy',
                password: 'password',
                email: 'chrissychrissy@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Jordan',
                username: 'daRealBo$$',
                password: 'password',
                email: 'daRealBo$$@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Max',
                username: 'maxattack',
                password: 'password',
                email: 'maxattack@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {})
  }
};
