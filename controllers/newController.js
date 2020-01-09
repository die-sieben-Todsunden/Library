let controller = {};
let models = require("../models");
let New = models.New;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

controller.getAll = () => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        isAll: true
      }
    };

    New.findAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getByUserId = id => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        UserId: id
      }
    };

    New.findAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.createNew = news => {
  return New.create(news);
};
module.exports = controller;
