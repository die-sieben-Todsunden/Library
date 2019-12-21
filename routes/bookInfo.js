let express = require("express");
let router = express.Router();

router.get("/", function(req, res) {
    res.render("book_info");
});
module.exports = router;