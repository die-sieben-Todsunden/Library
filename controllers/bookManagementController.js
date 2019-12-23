var controller = {};

var models = require("../models");
let borrow = models.BookManagement;
let bookInfo = models.bookInfo;
// controller.getAll = function() {
//   return borrow.findAll();
// };

controller.getAll = user => {
  return new Promise((resolve, reject) => {
    borrow
      .findAll({
        include: [
          {
            model: models.Book,
            include: [
              {
                model: models.bookInfo
              }
            ]
          }
        ],
        where: [
          {
            UserId: user
          }
        ]
      })
      .then(data => resolve(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.getAlls = () => {
  return new Promise((resolve, reject) => {
    borrow
      .findAll()
      .then(data => resolve(data))
      .catch(error => reject(new Error(error)));
  });
};
// controller.getAll = (user) => {
//     return new Promise((resolve, reject) => {
//         models.sequelize.query('SELECT * FROM "BookManagements","Books","ManageBookAuthors","Authors","bookInfos" WHERE "BookManagements"."UserId"=:user AND "Books"."bookInfoId"="ManageBookAuthors"."bookInfoId" AND "ManageBookAuthors"."bookInfoId"="bookInfos"."id" AND "ManageBookAuthors"."AuthorId"="Authors"."id"', {
//                 replacements: { user: user },
//                 type: models.sequelize.QueryTypes.SELECT
//             })
//             .then(data => resolve(data))
//             // .catch(error => reject(new Error(error)));
//     });
// };

/*controller.getById = function(id){
    return models.Article
		.findOne({ 
			where: {id: id},
			include: [models.Comment]
		});
};*/
module.exports = controller;
