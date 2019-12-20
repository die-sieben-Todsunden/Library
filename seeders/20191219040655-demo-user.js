"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [
      {
        userName: "dinh",
        password:
          "$2a$10$.awhk3N2XApgWrq/R2dexej1XM3737nnQ/yM.S56KiY4R7iMVW2hG", // 123
        name: "Dinh nguyen",
        personalID: "1753003",
        address: "Binh Thanh, TP Ho Chi Minh",
        birth: "1999-05-05",
        phone: "112423412",
        email: "1753003@student.hcmus.edu.vn"
      },
      {
        userName: "admin",
        password:
          "$2a$10$.awhk3N2XApgWrq/R2dexej1XM3737nnQ/yM.S56KiY4R7iMVW2hG", // 123
        name: "Admin",
        personalID: "12312313",
        address: "Binh Thanh, TP Ho Chi Minh",
        birth: "1999-05-05",
        phone: "112423412",
        email: "admin@gmail.com",
        role: "admin"
      }
    ];
    data.map(item => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
      return item;
    });
    return queryInterface.bulkInsert("Users", data, {});
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
    return queryInterface.bulkInsert("Users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
