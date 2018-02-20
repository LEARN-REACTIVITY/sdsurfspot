'use strict';

var crypto = require('crypto');
var uuid = require('uuid/v1');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        encryptedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authToken: DataTypes.STRING,
        authTokenExpiration: DataTypes.DATE,
        salt: DataTypes.STRING
    }, {
        setterMethods: {
            password: function password(value) {
                if (value) {
                    var salt = uuid();
                    this.setDataValue('salt', salt);
                    var hash = this.encrypt(value);
                    this.setDataValue('encryptedPassword', hash);
                }
            }
        },
        instanceMethods: {
            toJSON: function toJSON() {
                return {
                    id: this.get('id'),
                    name: this.get('name'),
                    email: this.get('email'),
                    authToken: this.get('authToken'),
                    authTokenExpiration: this.get('authTokenExpiration')
                };
            },
            encrypt: function encrypt(value) {
                var salt = this.get('salt');
                return crypto.createHmac('sha512', salt).update(value).digest('hex');
            },
            setAuthToken: function setAuthToken() {
                var token = uuid();
                var expiration = new Date();
                expiration.setMonth(expiration.getMonth() + 1);
                this.setDataValue('authToken', token);
                this.setDataValue('authTokenExpiration', expiration);
            },
            verifyPassword: function verifyPassword(unverifiedPassword) {
                var encryptedUnverifiedPassword = this.encrypt(unverifiedPassword);
                return encryptedUnverifiedPassword === this.get('encryptedPassword');
            }
        },
        hooks: {
            beforeCreate: function beforeCreate(user, options) {
                user.setAuthToken();
            }
        },
        classMethods: {
            associate: function associate(models) {
                User.belongsToMany(models.Beach, {
                    through: models.user_beaches,
                    foreignKey: 'user_id' });
            }
        }
    });
    return User;
};