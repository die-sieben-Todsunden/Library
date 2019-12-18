let express = require("express");
let userController = require('../controllers/userController');
let router = express.Router();

router.get("/profile", function(req, res) {
  res.render("profile");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/signUp", function(req, res) {
  res.render("SignUp");
});

router.post('/login', function(req, res, next){
  let email = req.body.username;
  let password = req.body.password;
  // console.log(email);
  // console.log(password);
  userController
    .getUserByEmail(email)
    .then(user=>{
      
      if(user){
        if (userController.comparePassword(password, user.password)){
            req.session.cookie.maxAge = req.body.keepLoggedIn ? 30 * 24 * 60 * 60 * 1000 :null;
            req.session.user = user;
            // console.log('success');
            if(user.role =='admin')
              {
                req.session.user.role = 'admin';
                res.redirect('/admin/statistic');
              }
            else
              res.redirect('/');
          }else{
            res.render('login', {
                message :'password is incorect',
                type : 'alert-danger'
              });
          }
      } else{
        res.render('login', {
          message :'password is incorect',
          type : 'alert-danger'
          });
      }
    });
});

router.post('/signUp', (req, res, next)=>{
  let name= req.body.fullname;
  let email= req.body.username;
  let password= req.body.password;
  let confirmPassword= req.body.confirmPassword;
  let keepLoggedIn = (req.body.keepLoggedIn!= undefined);
  // console.log(req.body);
  // console.log(user.password);
  // console.log(confirmPassword);
  //Kiem tra confirmpassword va password
  if( password != confirmPassword){
    return res.render('signUp', {
      message: 'Confirm password does not match',
      type:  'alert-danger'
    });
  };
  //Kiem tra user name valid
  userController
  .getUserByEmail(email)
  .then(user=>{
      if(user){
        return res.render('signUp', {
          message: `Email ${user.username} exists`,
          type:  'alert-danger'
        });
      }
      user = {
        name,
        userName: email,
        password
      };
      return userController
        .createUser(user)
        .then(user =>{
          // console.log(user)
          if(keepLoggedIn){
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            req.session.user = user;
            res.render('/')
          }else{
            return res.render('login', {
              message: 'sign up completed, pls login',
              type: 'alert-primary'
            });
          }
        })
        .catch(error=>next(error));
    });
  //tao tk
});

router.get('/logout', (req,res,next)=>{
  req.session.destroy(error =>{
    if(error) return next(error);
    return res.redirect('/');
  })
});

module.exports = router;