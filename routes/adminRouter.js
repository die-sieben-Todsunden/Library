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
  res.render("admin/bookmanagement");
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
