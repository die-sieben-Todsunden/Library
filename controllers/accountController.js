let controller = {};
let models = require("../models");
let User = models.User;

controller.getAll = () => {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then(data => resolve(data))
      .catch(error => reject(new Error(error)));
  });
};
module.exports = controller;
