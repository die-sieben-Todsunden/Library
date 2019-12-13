'use strict';
module.exports = (sequelize, DataTypes) => {
  const ManageBookAuthor = sequelize.define('ManageBookAuthor', {
    note: DataTypes.TEXT
  }, {});
  ManageBookAuthor.associate = function(models) {
    // associations can be defined here
  };
  return ManageBookAuthor;
};