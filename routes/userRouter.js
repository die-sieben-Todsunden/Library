let express = require("express");
let userController = require('../controllers/userController');
let router = express.Router();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
router.get("/books", function(req, res) {
  res.render("manage_books");
});

router.get("/profile", function(req, res) {
  res.render("profile");
});
router.get("/resetPasswordRequest", function(req, res) {
  res.render("resetPasswordRequest");
});
router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/signUp", function(req, res) {
  res.render("SignUp");
});

router.post('/login', function(req, res, next){
  let userName = req.body.username;
  let password = req.body.password;
  // console.log(email);
  // console.log(password);
  userController
    .getUserByUserName(userName)
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
router.post('/resetPasswordRequest', function(req,res,next){
  let resetPasswordEmail = req.body.resetPasswordEmail;
  userController
    .getUserByEmail(resetPasswordEmail)
    .then(user=>{
      if(!user){
        return res.render('resetPasswordRequest',{
          message : 'Account with that Email not exist',
          type: 'alert-danger'
        })
      }
      let token = 'hex';
      user.passwordResetToken = token;
      user.passwordResetTokenExpire = Date.now() +360000 ;// after an hour
      user.save(function (err) {
        if (err) return handleError(err); // saved!
      });
      return res.render('resetPasswordRequest',{
        message : `Password reset for ${resetPasswordEmail} has been send.`,
        type: 'alert-primary'
      })
    })
  console.log(resetPasswordEmail);
  console.log('afsdgasd');
});
router.get('/resetPassword/:token',(req, res, next)=>{
  // console.log(req.params.token);
  userController
    .getUserByToken(req.params.token)
    .then(user=>{
      if(user == undefined){
        return res.render('resetPasswordRequest',{
          message : 'Password reset token is invalid or has been expired. PLease re enter your email',
          type: 'alert-danger'
        })
      }
      res.render('resetPassword', {token: req.params.token});
    })
});
router.post('/resetPassword/:token', (req,res,next)=>{
  // console.log(res.params.token);
  userController
    .getUserByToken(req.params.token)
    .then(user=>{
      if(user == undefined){
        return res.render('resetPasswordRequest',{
          message : 'Password reset token is invalid or has been expired. PLease re enter your email',
          type: 'alert-danger'
        })
      }
      let reset = req.body.resetPassword;
      let confirm = req.body.confirmResetPassword;
      if(reset == confirm){
        user.password = reset;
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpire = undefined;
        user.save(function (err) {
          if (err) return handleError(err); // saved!
        });
        
        return res.redirect('/user/login');
        // return res.render('login',{
        //   message : `Reset password sucessfully`,
        //   type: 'alert-primary'
        // })
      }else{
        return res.render('resetPasswordRequest',{
          message : 'Password reset token is invalid or has been expired. PLease re enter your email',
          type: 'alert-danger'
        })
      }
    })
});
router.post('/signUp', (req, res, next)=>{
  let name= req.body.fullname;
  let userName= req.body.username;
  let password= req.body.password;
  let confirmPassword= req.body.confirmPassword;
  let keepLoggedIn = (req.body.keepLoggedIn!= undefined);
  // console.log(req.body);
  // console.log(user.password);
  // console.log(confirmPassword);
  //Kiem tra confirmpassword va password
  console.log(name);
  if( name == undefined){
    return res.render('signUp', {
      message: 'Empty',
      type:  'alert-danger'
    });
  };
  if( password == undefined){
    return res.render('signUp', {
      message: 'Empty',
      type:  'alert-danger'
    });
  };
  if( password != confirmPassword){
    return res.render('signUp', {
      message: 'Confirm password does not match',
      type:  'alert-danger'
    });
  };
  //Kiem tra user name valid
  userController
  .getUserByUserName(userName)
  .then(user=>{
      if(user){
        return res.render('signUp', {
          message: `Email ${user.username} exists`,
          type:  'alert-danger'
        });
      }
      user = {
        name,
        userName: userName,
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