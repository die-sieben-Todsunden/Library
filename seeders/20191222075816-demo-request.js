'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [{
                type: 'Borrow book',
                note: 'Book Name: Oral Epics from Africa, ISBN: 9780253211101',
                status: 'Not Checked',
                bookInfoId: '9',
                UserId: '1'

            },
            {
                type: 'Borrow book',
                note: 'Book Name: An Anthology of Interracial Literature: Black-White Contacts in the Old World and the New, ISBN: 9780814781449',
                status: 'Not Checked',
                bookInfoId: '32',
                UserId: '1'


            },
            {
                type: 'Return book',
                note: 'Book Name: Traditions in World Literature: Literature of Africa, Softcover Student Edition, ISBN: 9780844212029',
                status: 'Not Checked',
                bookInfoId: '17',
                UserId: '1'


            },
            {
                type: 'Create account',
                status: 'Not Checked',
                note: 'Email: 1753057@student.hcmus.edu.vn, Password: 123123123',
                bookInfoId: null,
                UserId: null
            },
            {
                type: 'Borrow book',
                note: 'Book Name: The Oxford Book of American Short Stories, ISBN: 9780195092622',
                status: 'Not Checked',
                bookInfoId: '40',
                UserId: '1'


            },
            {
                type: 'Return book',
                note: 'Book Name: The Norton Anthology of Poetry, ISBN: 9780393927399',
                status: 'Not Checked',
                bookInfoId: '54',
                UserId: '1'


            },
            {
                type: 'Borrow book',
                note: 'Book Name: The Best American Poetry 2010, ISBN: 9781439181454',
                status: 'Not Checked',
                bookInfoId: '47',
                UserId: '1'


            },
            {
                type: 'Create account',
                status: 'Not Checked',
                note: 'Email: 1753048@student.hcmus.edu.vn, Password: 123',
                bookInfoId: null,
                UserId: null

            },
            {
                type: 'Extension',
                note: 'Book Name: Women Writing Africa: The Eastern Region, ISBN: 9781558615342',
                status: 'Not Checked',
                bookInfoId: '12',
                UserId: '1'

            },
            {
                type: 'Create account',
                status: 'Not Checked',
                note: 'Email: 1753024@student.hcmus.edu.vn, Password: 12456789',
                bookInfoId: null,
                UserId: null

            }
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            return item;
        });
        return queryInterface.bulkInsert('Requests', data, {});
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Requests', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};