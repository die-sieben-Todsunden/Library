'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('bookInfos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ISBN_API: {
                type: Sequelize.STRING
            },
            year: {
                type: Sequelize.INTEGER
            },
            language: {
                type: Sequelize.STRING
            },
            bookName: {
                type: Sequelize.STRING
            },
            total: {
                type: Sequelize.INTEGER
            },
            borrowed: {
                type: Sequelize.INTEGER
            },
            remain: {
                type: Sequelize.INTEGER
            },
            canBorrow: {
                type: Sequelize.INTEGER
            },
            isValid: {
                type: Sequelize.BOOLEAN
            },
            isHidden: {
                type: Sequelize.BOOLEAN
            },
            note: {
                type: Sequelize.TEXT
            },
            imgPath: {
                type: Sequelize.STRING
            },
            borrowTimes: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('bookInfos');
    }
};