'use strict';
module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        type: DataTypes.STRING,
        note: DataTypes.TEXT,
        status: DataTypes.STRING
    }, {});
    Request.associate = function(models) {
        // associations can be defined here
        Request.belongsTo(models.User);
        Request.belongsTo(models.bookInfo)
    };
    return Request;
};