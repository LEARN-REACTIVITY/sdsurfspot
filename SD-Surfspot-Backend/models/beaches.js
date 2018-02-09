'use strict';
module.exports = (sequelize, DataTypes) => {
  var Beach = sequelize.define('Beach', {
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Beach.belongsToMany(models.User, {
            through: models.user_beaches,
            foreignKey: 'beach_id'})
      }
    }
  });
  return Beach;
};
