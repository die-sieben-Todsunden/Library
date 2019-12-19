"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookManagement = sequelize.define(
    "BookManagement",
    {
      borrowedDate: DataTypes.DATEONLY,
      dueDate: DataTypes.DATEONLY,
      returnDate: DataTypes.DATEONLY,
      status: DataTypes.STRING,
      note: DataTypes.TEXT
      /*bookID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,*/
    },
    {}
  );
  BookManagement.associate = function(models) {
    // associations can be defined here
    BookManagement.belongsTo(models.User);
    BookManagement.belongsTo(models.Book);
  };
  return BookManagement;
};
