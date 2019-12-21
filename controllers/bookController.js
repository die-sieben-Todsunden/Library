var controller = {};

var models = require("../models");
let bookInfo = models.bookInfo;
let author = models.Author;
let category = models.Category;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

controller.getAll = query => {
  return new Promise((resovle, reject) => {
    /*let options = {
      where: {}
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }
    if (query.sort) {
      switch (query.sort) {
        case "name":
          options.sort = [["name", "ASC"]];
          break;
        case "category":
          options.sort = [["category", "ASC"]];
          break;
        case "author":
          options.sort = [["author", "ASC"]];
          break;
        default:
          options.sort = [["name", "ASC"]];
          break;
      }
    }
    if (query.search) {
      options.where.bookName = {
        [Op.iLike]: `%${query.search}%`
      };
    }*/
    bookInfo
      .findAll()
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getAllIndex = () => {
  return new Promise((resovle, reject) => {
    bookInfo
      .findAll({
        limit: "4"
      })
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.getAllBookName = query => {
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
        case "bookNameASC":
          options.order = [["bookName", "ASC"]];
          break;
        case "year":
          options.order = [["year", "ASC"]];
          break;
        case "bookNameDES":
          options.order = [["bookName", "DESC"]];
          break;
        default:
          options.order = [["bookName", "ASC"]];
          break;
      }
    }
    console.log(query.sort);
    console.log(query.search);
    if (query.search) {
      options.where.bookName = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    bookInfo
      .findAndCountAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.getAllCategory = query => {
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
        case "bookNameASC":
          options.order = [["bookName", "ASC"]];
          break;
        case "year":
          options.order = [["year", "ASC"]];
          break;
        case "bookNameDES":
          options.order = [["author", "DES"]];
          break;
        default:
          options.order = [["bookName", "ASC"]];
          break;
      }
    }
    if (query.search) {
      options.where.bookName = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    category
      .findAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.getAllAuthor = query => {
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
        case "bookNameASC":
          options.order = [["bookName", "ASC"]];
          break;
        case "year":
          options.order = [["year", "ASC"]];
          break;
        case "bookNameDES":
          options.order = [["author", "DES"]];
          break;
        default:
          options.order = [["bookName", "ASC"]];
          break;
      }
    }
    if (query.search) {
      options.where.bookName = {
        [Op.iLike]: `%${query.search}%`
      };
    }
    author
      .findAll(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getById = id => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        id: id
      }
    };
    bookInfo
      .findOne(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

module.exports = controller;
