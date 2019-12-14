'use strict';
module.exports = (sequelize, DataTypes) => {
    const BookCategory = sequelize.define('BookCategory', {
        name: DataTypes.STRING,
        total: DataTypes.INTEGER
    }, {});
    BookCategory.associate = function(models) {
        // associations can be defined here
        BookCategory.belongsToMany(models.bookInfo, { through: models.ManageBookCategory });
    };
    return BookCategory;
};