'use strict';
const fs = require('fs');

let rawdata = fs.readFileSync('database_sample/bookInfo.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(rawdata);
    
    // console.log(data);
    data.map(item => {
      item.year = item.year.slice( item.year.length -4, item.year.length);
    });
    data.map(item =>{
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
      return item;
    })
    return queryInterface.bulkInsert('bookInfos', data, {});
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
    return queryInterface.bulkDelete('bookInfos', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
