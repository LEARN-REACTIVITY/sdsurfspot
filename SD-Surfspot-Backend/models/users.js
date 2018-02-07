'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    friends: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};