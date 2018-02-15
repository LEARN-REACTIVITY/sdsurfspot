


'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_beaches = sequelize.define('user_beaches', {
    user_id: DataTypes.INTEGER,
    beach_id: DataTypes.INTEGER,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // user_beaches.belongsToMany(models.Beach, {foreignKey: 'beach_id'})
        // user_beaches.belongsToMany(models.User, {foreignKey: 'user_Id'})
      }
    }
  });
  return user_beaches;
};
