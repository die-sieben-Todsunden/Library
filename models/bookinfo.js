'use strict';
module.exports = (sequelize, DataTypes) => {
    const bookInfo = sequelize.define('bookInfo', {
        ISBN_API: DataTypes.STRING,
        author: DataTypes.STRING,
        category: DataTypes.STRING,
        description: DataTypes.TEXT,
        year: DataTypes.INTEGER,
        rate: DataTypes.STRING,
        bookName: DataTypes.STRING,
        total: DataTypes.INTEGER,
        borrowed: DataTypes.INTEGER,
        remain: DataTypes.INTEGER,
        canBorrow: DataTypes.INTEGER,
        isValid: DataTypes.BOOLEAN,
        isHidden: DataTypes.BOOLEAN,
        note: DataTypes.TEXT,
        imgPath: DataTypes.STRING,
        borrowTimes: DataTypes.INTEGER
    }, {});
    bookInfo.associate = function(models) {
        // associations can be defined here
        bookInfo.hasMany(models.Book);
        bookInfo.belongsToMany(models.BookCategory, { through: models.ManageBookCategory });
        bookInfo.belongsToMany(models.Author, { through: models.ManageBookAuthor });

        bookInfo.hasMany(models.Request)
    };
    return bookInfo;
};