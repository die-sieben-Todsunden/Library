var controller = {};

var models = require("../models");
let borrow = models.BookManagement;
controller.getAll = function() {
  return borrow.findAll();
};

/*controller.getById = function(id){
    return models.Article
		.findOne({ 
			where: {id: id},
			include: [models.Comment]
		});
};*/
module.exports = controller;
