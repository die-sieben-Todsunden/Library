let controller = {};
let models = require("../models");
let User = models.User;
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
    if (query.sort) {
      switch (query.sort) {
        case "userName":
          options.order = [["userName", "ASC"]];
          break;
        case "name":
          options.order = [["name", "ASC"]];
          break;
        case "personalID":
          options.order = [["personalID", "ASC"]];
          break;
      }
    }
    if (query.search) {
      options.where.userName = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    User.findAll()
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getAllUserName = query => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {}
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }
    if (query.sort) {
      switch (query.sort) {
        case "userName":
          options.order = [["userName", "ASC"]];
          break;
        case "name":
          options.order = [["name", "ASC"]];
          break;
        case "personalID":
          options.order = [["personalID", "ASC"]];
          break;
        /*default:
          options.order = [["bookName", "ASC"]];
          break;*/
      }
    }
    console.log(query.sort);
    console.log(query.search);
    if (query.search) {
      options.where.userName = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    User.findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.getAllName = query => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {}
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }
    if (query.sort) {
      switch (query.sort) {
        case "userNameASC":
          options.order = [["userName", "ASC"]];
          break;
        case "nameASC":
          options.order = [["name", "ASC"]];
          break;
        case "personalIDASC":
          options.order = [["personalID", "ASC"]];
      }
    }
    console.log(query.sort);
    console.log(query.search);
    if (query.search) {
      options.where.name = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    User.findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getAllPersonalID = query => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {}
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }
    if (query.sort) {
      switch (query.sort) {
        case "userNameASC":
          options.order = [["userName", "ASC"]];
          break;
        case "nameASC":
          options.order = [["name", "ASC"]];
          break;
        case "personalIDASC":
          options.order = [["personalID", "ASC"]];
      }
    }
    console.log(query.sort);
    console.log(query.search);
    if (query.search) {
      options.where.personalID = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    User.findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
module.exports = controller;
