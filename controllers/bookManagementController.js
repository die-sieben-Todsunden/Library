var controller = {};

var models = require("../models");
let borrow = models.BookManagement;
let bookInfo = models.bookInfo;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;
// controller.getAll = function() {
//   return borrow.findAll();
// };

controller.getAll = user => {
  return new Promise((resolve, reject) => {
    borrow
      .findAndCountAll({
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
controller.getAlls = query => {
  return new Promise((resolve, reject) => {
    let options = {
      where: {},
      include: [
        {
          model: models.User
        },
        {
          model: models.Book,
          include: {
            model: models.bookInfo
          }
        }
      ]
    };
    if (query.limit > 0) {
      options.limit = query.limit;
      options.offset = query.limit * (query.page - 1);
    }

    if (query.search) {
      if (query.search != "")
        options.where.type = {
          [Op.iLike]: `%${query.search}%`
        };
    }
    options.where.status = {
      [Op.iLike]: `borrowing`
    };
    borrow
      .findAndCountAll(options)
      .then(data => resolve(data))
      .catch(error => reject(new Error(error)));
  });
};

controller.getAllStatistic = () => {
  return new Promise((resolve, reject) => {
    borrow
      .findAll()
      .then(data => resolve(data))
      .catch(error => reject(new Error(error)));
  });
};
controller.createBorrow = borrows => {
  return borrow.create(borrows);
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
controller.getById = id => {
  return new Promise((resovle, reject) => {
    let options = {
      where: {
        id: id
      }
    };
    borrow
      .findOne(options)
      .then(data => resovle(data))
      .catch(error => reject(new Error(error)));
  });
};
module.exports = controller;
