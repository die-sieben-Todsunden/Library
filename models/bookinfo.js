'use strict';
module.exports = (sequelize, DataTypes) => {
    const bookInfo = sequelize.define('bookInfo', {
        ISBN_API: DataTypes.STRING,
        year: DataTypes.INTEGER,
        language: DataTypes.STRING,
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
        bookInfo.belongsToMany(models.BookCategory, { through: models.ManageBook });
        bookInfo.belongsToMany(models.Author, { through: models.ManageBook });

        bookInfo.hasMany(models.Request)
    };
    return bookInfo;
};