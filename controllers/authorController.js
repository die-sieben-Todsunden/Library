let controller = {};
let models = require("../models");
let Author = models.Author;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

controller.getAll = query => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {}
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }
    console.log(query.search);
    if (query.search) {
      options.where.name = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    Author.findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

module.exports = controller;
