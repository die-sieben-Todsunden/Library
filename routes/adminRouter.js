let express = require("express");
let router = express.Router();
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

//localStorage.setItem("role", "admin");
//console.log(localStorage.getItem("myFirstKey"));
router.get("/", (req, res, next) => {
  res.render("admin/index");
});

router.get("/book-management", (req, res, next) => {
  if (req.query.sort == null) {
    req.query.sort = "null";
  }
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.type == null || isNaN(req.query.type)) {
    req.query.type = "bookName";
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
  }

  let bookController = require("../controllers/bookController");
  if (req.query.search == "") {
    res.locals.books = null;

    res.render("admin/bookmanagement");
  } else {
    console.log(req.query.type);
    if (req.query.type == "bookName") {
      bookController
        .getAllBookName(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.books = data.rows;
          res.locals.pagination = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            totalRows: data.count
          };
          //console.log(res.locals.books);
          res.render("admin/bookmanagement");
        })
        .catch(error => {
          next(error);
        });
    }
    if (req.query.type == "author") {
      bookController
        .getAllAuthor(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.books = data.rows;
          res.locals.pagination = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            totalRows: data.count
          };
          res.render("admin/bookmanagement");
        })
        .catch(error => {
          next(error);
        });
    }
    if (req.query.type == "category") {
      bookController
        .getAllCategory(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.books = data.rows;
          res.locals.pagination = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            totalRows: data.count
          };
          res.render("admin/bookmanagement");
        })
        .catch(error => {
          next(error);
        });
    }
  }
});

router.get("/account-management", (req, res, next) => {
  //console.log(req.query.type);
  if (req.query.sort == null) {
    req.query.sort = "null";
  }
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.type == null) {
    req.query.type = "userName";
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
  }

  let accountController = require("../controllers/accountController");
  if (req.query.search == "") {
    res.locals.User = null;
    console.log("!");
    res.render("admin/accountmanagement");
  } else {
    console.log(req.query.type);
    if (req.query.type == "userName") {
      console.log("sss");
      accountController
        .getAllUserName(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.User = data.rows;
          res.locals.pagination = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            totalRows: data.count
          };
          //console.log(res.locals.books);
          res.render("admin/accountmanagement");
        })
        .catch(error => {
          next(error);
        });
    }
    if (req.query.type == "name") {
      accountController
        .getAllName(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.User = data.rows;
          res.locals.pagination = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            totalRows: data.count
          };
          res.render("admin/accountmanagement");
        })
        .catch(error => {
          next(error);
        });
    }
    if (req.query.type == "personalID") {
      accountController
        .getAllPersonalID(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.User = data.rows;
          res.locals.pagination = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            totalRows: data.count
          };
          res.render("admin/accountmanagement");
        })
        .catch(error => {
          next(error);
        });
    }
  }
});

router.get("/author-management", (req, res, next) => {
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = " ";
  }
  let authorController = require("../controllers/authorController");

  authorController
    .getAll(req.query)
    .then(data => {
      //console.log(data.length);
      res.locals.Author = data.rows;
      res.locals.pagination = {
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
        totalRows: data.count
      };
      //console.log(res.locals.books);
      res.render("admin/authormanagement");
    })
    .catch(error => {
      next(error);
    });
});

router.get("/catagory-management", (req, res, next) => {
  /* let accountController = require("../controllers/accountController");
   accountController.getAll().then(data => {
     res.locals.User = data;
     res.render("admin/accountmanagement");
   });*/
  res.render("admin/catagorymanagement");
});

router.get("/request", (req, res, next) => {
  /* let accountController = require("../controllers/accountController");
   accountController.getAll().then(data => {
     res.locals.User = data;
     res.render("admin/accountmanagement");
   });*/
  res.render("admin/request");
});

router.get("/borrow-management", (req, res, next) => {
  /* let accountController = require("../controllers/accountController");
   accountController.getAll().then(data => {
     res.locals.User = data;
     res.render("admin/accountmanagement");
   });*/
  res.render("admin/borrowmanagement");
});

router.get("/statistic", (req, res) => {
  let bookManagementController = require("../controllers/bookManagementController");
  bookManagementController.getAll().then(data => {
    res.locals.borrow = data;
    res.render("admin/statistic");
  });
  console.log();
});
module.exports = router;
