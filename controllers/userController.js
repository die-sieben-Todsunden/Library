let controller = {};
let models = require('../models');
let User = models.User;
let bcrypt = require('bcryptjs');

controller.createUser = (user) =>{
  var salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  return User.create(user);
};
controller.getUserByEmail = (email) =>{
  return User.findOne({
    where: {userName: email}
  });
};

controller.comparePassword= (password, hash)=>{
  return bcrypt.compareSync(password, hash);
}

module.exports = controller;

