'use strict';
module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        name: DataTypes.STRING
    }, {});
    Author.associate = function(models) {
        // associations can be defined here
        Author.belongsToMany(models.bookInfo, { through: models.ManageBookAuthor });
    };
    return Author;
};