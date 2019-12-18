var express = require("express");
var app = express();
// body parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Use Cookie-parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());
//Use session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: null},
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}));

//Applications
app.use(express.static(__dirname));
// Database init
var models = require("./models");
app.get("/sync", function(req, res) {
  models.sequelize.sync().then(function() {
    res.send("database sync completed!");
  });
});
//Setting for app here


var expressHbs = require("express-handlebars");
// if (localStorage.getItem("role") == "admin")
//   var hbs = expressHbs.create({
//     extname: "hbs",
//     defaultLayout: "layoutAdmin",
//     layoutsDir: __dirname + "/views/layouts/",
//     partialsDir: __dirname + "/views/partials/"
//   });
// else
var hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use((req, res, next) => {

  let role = req.session.user?req.session.user.role:'';
  if (role == 'admin') res.locals.isAdmin = true;
  res.locals.username = req.session.user ? req.session.user.name : '';
  res.locals.isLoggedIn = req.session.user?true:false;
  next();
});
// Define route
app.use("/admin", require("./routes/adminRouter"));
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/book_info", function(req, res) {
  res.render("book_info");
});

app.get("/bookCatalog", function(req, res) {
  res.render("bookCatalog");
});

app.get("/lookup", function(req, res) {
  res.render("lookup");
});

app.get("/lookup_res1", function(req, res) {
  res.render("lookup_res1");
});

app.get("/manage_books", function(req, res) {
  res.render("manage_books");
});

app.use("/user", require("./routes/UserRouter"));

//Set Server Port & Start Server

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server is listening at port " + app.get("port"));
});
