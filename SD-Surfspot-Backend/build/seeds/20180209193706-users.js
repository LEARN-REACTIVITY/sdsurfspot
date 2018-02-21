'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            name: 'Leeann',
            username: 'dabo$$',
            email: 'dabo$$@gmail.com',
            encryptedPassword: 'password',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Christina',
            username: 'chrissychrissy',
            email: 'chrissychrissy@gmail.com',
            encryptedPassword: 'password',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Jordan',
            username: 'daRealBo$$',
            email: 'daRealBo$$@gmail.com',
            encryptedPassword: 'password',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Max',
            username: 'maxattack',
            email: 'maxattack@gmail.com',
            encryptedPassword: 'password',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: function down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};