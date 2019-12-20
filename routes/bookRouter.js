let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
    if (req.query.sort == null) {
        req.query.sort = 'null';
    }
    // if(req.query.limit == null ||isNaN(req.query.limit)){
    //   req.query.limit = 9;
    // }
    if (req.query.page == null || isNaN(req.query.page)) {
        req.query.page = 9;
    }
    if (req.query.search == null || (req.query.search.trim() == '')) {
        req.query.search = '';
    }
    let bookController = require('../controllers/bookController');
    console.log(req.query.search);
    bookController
        .getAll(req.query)
        .then(data => {
            console.log(data.length);
            res.locals.books = data;
            res.render('lookup');
        })
        .catch(error => {
            next(error);
        })
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