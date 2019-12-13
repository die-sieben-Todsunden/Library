'use strict';
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        bookID: DataTypes.STRING,
        isBorrowed: DataTypes.BOOLEAN,
        Note: DataTypes.TEXT
    }, {});
    Book.associate = function(models) {
        // associations can be defined here
        Book.belongsTo(models.BookInfo);
    };
    return Book;
};