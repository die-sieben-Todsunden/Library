"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      isActivated: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      name: DataTypes.STRING,
      personalID: DataTypes.STRING,
      address: DataTypes.STRING,
      birth: DataTypes.DATEONLY,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING
      //passwordResetTokenExpire: DataTypes.DATE
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here

    User.hasMany(models.Request);
    User.hasMany(models.BookManagement);
  };
  return User;
};
