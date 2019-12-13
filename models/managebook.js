'use strict';
module.exports = (sequelize, DataTypes) => {
    const ManageBook = sequelize.define('ManageBook', {
        note: DataTypes.TEXT
    }, {});
    ManageBook.associate = function(models) {
        // associations can be defined here

    };
    return ManageBook;
};