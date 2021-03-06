let controller = {};
let models = require("../models");
let Category = models.BookCategory;
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
    if (!(query.search == undefined))
      if (query.search) {
        options.where.name = {
          [Op.iLike]: `%${query.search}%`
        };
      }

    Category.findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.createCategory = category => {
  return Category.create(category);
};

controller.getById = id => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        id: id
      }
    };
    Category.findOne(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getByName = name => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        name: name
      }
    };
    Category.findOne(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

module.exports = controller;
