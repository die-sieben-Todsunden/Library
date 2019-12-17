"use strict";
const fs = require("fs");

let rawdata = fs.readFileSync("database_sample/bookManagement.json");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(rawdata);
    // console.log(data);
    data.map(item => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
      return item;
    });
    return queryInterface.bulkInsert("BookManagements", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BookManagements", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
