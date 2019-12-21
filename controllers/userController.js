let controller = {};
let models = require("../models");
let User = models.User;
let bcrypt = require("bcryptjs");

controller.createUser = user => {
  var salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  return User.create(user);
};
controller.getUserByUserName = name => {
  return User.findOne({
    where: { userName: name }
  });
};
controller.getUserByEmail = email => {
  return User.findOne({
    where: { email: email }
  });
};
controller.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
controller.getUserByToken = token => {
  return User.findOne({
    where: { passwordResetToken: token }
    //resetPasswordTokenExpire: {$gt: Date.now()}}
  });
};

controller.getAll = () => {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then(data => resolve(data))
      .catch(error => reject(new Error(error)));
  });
};
module.exports = controller;
