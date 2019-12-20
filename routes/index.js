let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/lookup", function(req, res) {
  res.render("lookup");
});
router.get("/lookup_res1", function(req, res) {
  res.render("lookup_res1");
});

module.exports = router;
