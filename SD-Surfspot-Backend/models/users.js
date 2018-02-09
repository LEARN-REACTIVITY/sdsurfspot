'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
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
