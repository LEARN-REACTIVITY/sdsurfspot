'use strict';
const crypto = require('crypto')
const uuid = require('uuid/v1')


module.exports = (sequelize, DataTypes) => {
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
          password(value) {
              if(value) {
                  const salt = uuid();
                  this.setDataValue('salt', salt)
                  const hash = this.encrypt(value);
                  this.setDataValue('encryptedPassword', hash)
              }
          }
      },
      instanceMethods: {
          toJSON() {
              return {
                  id: this.get('id'),
                  name: this.get('name'),
                  email: this.get('email'),
                  authToken: this.get('authToken'),
                  authTokenExpiration: this.get('authTokenExpiration')
              }
          },
          encrypt(value) {
              const salt = this.get('salt');
              return crypto.createHmac('sha512', salt)
              .update(value)
              .digest('hex')
          },
          setAuthToken() {
              const token = uuid();
              const expiration = new Date();
              expiration.setMonth(expiration.getMonth() + 1)
              this.setDataValue('authToken', token)
              this.setDataValue('authTokenExpiration', expiration)
          },
          verifyPassword(unverifiedPassword) {
              const encryptedUnverifiedPassword = this.encrypt(unverifiedPassword);
              return encryptedUnverifiedPassword === this.get('encryptedPassword')
          }
      },
      hooks: {
          beforeCreate: function(user, options) {
              user.setAuthToken()
          }
      },
      classMethods: {
          associate: function(models) {
              User.belongsToMany(models.Beach, {
                  through: models.user_beaches,
                  foreignKey: 'user_id'})
          }
      }
  });
  return User;
};
