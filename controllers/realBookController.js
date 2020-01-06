let controller = {};
let models = require("../models");
let Book = models.Book;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

controller.getById = id => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        id: id
      }
    };
    Book.findOne(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};

/*controller.createAuthor = author => {
  return Author.create(author);
};*/
module.exports = controller;
