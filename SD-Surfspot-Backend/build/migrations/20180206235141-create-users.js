'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                },
                unique: true
            },
            encryptedPassword: {
                type: Sequelize.STRING,
                allowNull: false
            },
            authToken: {
                type: Sequelize.STRING
            },
            authTokenExpiration: {
                type: Sequelize.DATE
            },
            salt: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
                // },
                // user_id: {
                //   type: Sequelize.INTEGER,
                //   onDelete: 'CASCADE',
                //   references: {
                //       model: 'Beach',
                //       key: 'id',
                //       as: 'user_id'
                //   }
                // }
            } });
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    }
};