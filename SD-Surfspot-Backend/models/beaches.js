'use strict';
module.exports = (sequelize, DataTypes) => {
  var beaches = sequelize.define('beaches', {
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        beaches.belongsTo(models.users, {foreignKey: 'userId'})
      }
    }
  });
  return beaches;
};
