let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
  if (req.query.sort == null) {
      req.query.sort = 'null';
  }
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.type == null || isNaN(req.query.type)) {
    req.query.type = 'bookName';
  }
  if (req.query.page == null || isNaN(req.query.page)) {
      req.query.page = 1;
  }
  if (req.query.search == null || (req.query.search.trim() == '')) {
      req.query.search = '';
  }
  let bookController = require('../controllers/bookController');
  if (req.query.search ==''){
    res.locals.books = null;
    res.render('lookup');
  } else{
      if(req.query.type == 'bookName'){
        bookController
        .getAllBookName(req.query)
        .then(data => {
            //console.log(data.length);
            res.locals.books = data.rows;
            res.locals.pagination={
              page: parseInt(req.query.page),
              limit:  parseInt(req.query.limit),
              totalRows : data.count
            }
            res.render('lookup');
        })
        .catch(error => {
            next(error);
        });
      }
      if(req.query.type == 'author'){
        bookController
        .getAllAuthor(req.query)
        .then(data => {
            //console.log(data.length);
            res.locals.books = data.rows;
            res.locals.pagination={
              page: parseInt(req.query.page),
              limit:  parseInt(req.query.limit),
              totalRows : data.count
            }
            res.render('lookup');
        })
        .catch(error => {
            next(error);
        });
      }
      if(req.query.type == 'category'){
        bookController
        .getAllCategory(req.query)
        .then(data => {
            //console.log(data.length);
            res.locals.books = data.rows;
            res.locals.pagination={
              page: parseInt(req.query.page),
              limit:  parseInt(req.query.limit),
              totalRows : data.count
            }
            res.render('lookup');
        })
        .catch(error => {
            next(error);
        });
      }
  }
    
});


router.get("/:id", (req, res, next) => {
    let bookController = require('../controllers/bookController');
    bookController
        .getById(req.params.id)
        .then(data => {
            res.locals.book = data;
            return bookController.getAllIndex();

        })
        .then(result => {
            res.locals.same = result;
            res.render('book_info');
        })
        .catch(error => {
            next(error);
        })
});



module.exports = router;