'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    friends: DataTypes.INTEGER
  }, {
        classMethods: {
            associate: function(models) {
                User.belongsTo(models.Beach, {foreignKey: 'userId'})
            }
        }
  });
  return User;
};
