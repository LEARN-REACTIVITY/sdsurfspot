'use strict';
module.exports = (sequelize, DataTypes) => {
  var Beach = sequelize.define('Beach', {
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Beach.hasMany(models.User, {foreignKey: 'userId'})
      }
    }
  });
  return Beach;
};
