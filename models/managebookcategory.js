'use strict';
module.exports = (sequelize, DataTypes) => {
  const ManageBookCategory = sequelize.define('ManageBookCategory', {
    note: DataTypes.TEXT
  }, {});
  ManageBookCategory.associate = function(models) {
    // associations can be defined here
  };
  return ManageBookCategory;
};