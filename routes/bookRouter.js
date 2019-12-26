let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
    if (req.query.sort == null) {
        req.query.sort = 'null';
    }
    if (req.query.author == null) {
        req.query.author = '';
    }
    if (req.query.category == null) {
        req.query.category = '';
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
    if (req.query.search == '') {
        res.locals.books = null;
        res.render('lookup');
    } else {
        console.log(req.query.type);
        if (req.query.type == 'bookName') {
            bookController
                .getAllBookName(req.query)
                .then(data => {
                    //console.log(data.length);
                    res.locals.books = data.rows;
                    res.locals.pagination = {
                            page: parseInt(req.query.page),
                            limit: parseInt(req.query.limit),
                            totalRows: data.count
                        }
                        //res.render('lookup');
                    return bookController.getAllAuthorSearch();
                })
                .then(array => {

                    var uniqueArray = [];
                    var categories = [];
                    for (i = 0; i < array.length; i++) {
                        categories.push(array[i]["dataValues"]["category"])
                    }


                    for (var value of categories) {
                        if (value != null) {
                            if (uniqueArray.indexOf(value) === -1) {
                                uniqueArray.push(value);
                                console.log(value);
                            }
                        }
                    }

                    uniqueArray.sort();
                    res.locals.categories = uniqueArray;
                    return bookController.getAllAuthorSearch();
                    //res.render('lookup');
                })
                .then(array => {

                    var uniqueArray = [];
                    var authors = [];
                    for (i = 0; i < array.length; i++) {
                        authors.push(array[i]["dataValues"]["author"])
                    }


                    for (var value of authors) {
                        if (value != null) {
                            if (uniqueArray.indexOf(value) === -1) {
                                uniqueArray.push(value);
                                console.log(value);
                            }
                        }
                    }

                    uniqueArray.sort();
                    res.locals.authors = uniqueArray;
                    res.render('lookup');
                })
                .catch(error => {
                    next(error);
                });
        }
        if (req.query.type == 'author') {
            bookController
                .getAllAuthor(req.query)
                .then(data => {
                    //console.log(data.length);

                    res.locals.books = data.rows;
                    res.locals.pagination = {
                        page: parseInt(req.query.page),
                        limit: parseInt(req.query.limit),
                        totalRows: data.count
                    }
                    res.render('lookup');
                })
                .catch(error => {
                    next(error);
                });
        }
        if (req.query.type == 'category') {
            bookController
                .getAllCategory(req.query)
                .then(data => {
                    //console.log(data.length);
                    res.locals.books = data.rows;
                    res.locals.pagination = {
                        page: parseInt(req.query.page),
                        limit: parseInt(req.query.limit),
                        totalRows: data.count
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
    console.log('hello');
    console.log(req.params.id)
    console.log(req.params.id.split('-')[0])
    bookController
        .getById((req.params.id))
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