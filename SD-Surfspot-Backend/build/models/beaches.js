

'use strict';

module.exports = function (sequelize, DataTypes) {
  var Beach = sequelize.define('Beach', {
    api_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        Beach.belongsToMany(models.User, {
          through: models.user_beaches,
          foreignKey: 'beach_id' });
      }
    }
  });
  return Beach;
};