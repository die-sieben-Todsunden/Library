let express = require("express");
let router = express.Router();

router.get("/bookCatalog", function(req, res) {
  res.render("bookCatalog");
});

module.exports = router;