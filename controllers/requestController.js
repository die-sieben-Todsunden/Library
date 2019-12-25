let controller = {};
let models = require("../models");
let Request = models.Request;
let bcrypt = require("bcryptjs");

controller.createRequest = request => {
    return Request.create(request);
};

module.exports = controller;