let controller = {};
let models = require("../models");
let Request = models.Request;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

controller.createRequest = request => {
  return Request.create(request);
};
module.exports = controller;
