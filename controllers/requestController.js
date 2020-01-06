let controller = {};
let models = require("../models");
let Request = models.Request;
let bcrypt = require("bcryptjs");
let Sequelize = require("sequelize");
let Op = Sequelize.Op;
controller.getAll = query => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {},
      include: [
        {
          model: models.User
        },
        {
          model: models.bookInfo
        }
      ]
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }
    console.log(query.search);
    if (query.search) {
      if (query.search != "")
        options.where.type = {
          [Op.iLike]: `%${query.search}%`
        };
    }
    options.where.status = {
      [Op.iLike]: `Not Checked`
    };
    Request.findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.createRequest = request => {
  return Request.create(request);
};

controller.getById = id => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        id: id
      }
    };
    Request.findOne(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
module.exports = controller;
