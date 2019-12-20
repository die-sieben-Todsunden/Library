'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [{
                bookID: '123',
                isBorrowed: 'true',
                Note: 'first book',
                bookInfoId: '1'
            },
            {
                bookID: '124',
                isBorrowed: 'true',
                Note: 'first book',
                bookInfoId: '2'
            },
            {
                bookID: '125',
                isBorrowed: 'true',
                Note: 'first book',
                bookInfoId: '3'
            },
            {
                bookID: '126',
                isBorrowed: 'true',
                Note: 'first book',
                bookInfoId: '4'
            },

        ];
        data.map(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            return item;
        });
        return queryInterface.bulkInsert('Books', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Books', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};