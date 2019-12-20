'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [{
                AuthorId: '1',
                bookInfoId: '1',
            },
            {
                AuthorId: '2',
                bookInfoId: '1',
            },
            {
                AuthorId: '3',
                bookInfoId: '2',
            },
            {
                AuthorId: '4',
                bookInfoId: '3',
            },
            {
                AuthorId: '4',
                bookInfoId: '4',
            },
            {
                AuthorId: '5',
                bookInfoId: '4',
            },
            {
                AuthorId: '4',
                bookInfoId: '1',
            },





        ];
        data.map(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            return item;
        });
        return queryInterface.bulkInsert('ManageBookAuthors', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ManageBookAuthors', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};