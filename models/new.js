"use strict";
module.exports = (sequelize, DataTypes) => {
  const New = sequelize.define(
    "New",
    {
      content: DataTypes.TEXT,
      isAll: DataTypes.BOOLEAN
    },
    {}
  );
  New.associate = function(models) {
    // associations can be defined here
    New.belongsTo(models.User);
  };
  return New;
};
