let express = require("express");
let router = express.Router();

router.get("/", (req, res, next)=> {
  if(req.query.sort== null){
    req.query.sort = 'null';
  }
  // if(req.query.limit == null ||isNaN(req.query.limit)){
  //   req.query.limit = 9;
  // }
  if(req.query.page == null ||isNaN(req.query.page)){
    req.query.page = 9;
  }
  if(req.query.search== null || (req.query.search.trim() == '')){
    req.query.search = '';
  }
  let bookController = require('../controllers/bookController');
  console.log(req.query.search);
  if()
  bookController
    .getAll(req.query)
    .then(data=>{
      console.log(data.length);
      res.locals.books = data;
      res.render('lookup');
    })
});

module.exports = router;