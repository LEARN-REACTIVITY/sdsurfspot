'use strict';

var crypto = require('crypto');
var uuid = require('uuid/v1');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
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
          firstName: this.get('firstName'),
          lastName: this.get('lastName'),
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
      veryifyPassword: function veryifyPassword(unverifiedPassword) {
        var encryptedUnverifiedPassword = this.encrypt(unverifiedPassword);
        return encryptedUnverifiedPassword === this.get('encryptedPassword');
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user, options) {
        user.setAuthToken();
      }
    }
  });
  return User;
};