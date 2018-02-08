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
          users.hasMany(models.beaches, {foreignKey: 'userId'})
    }
    }
  });
  return users;
};
