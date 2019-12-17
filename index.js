var express = require("express");
var app = express();

//Setting for app here
app.use(express.static(__dirname + "/public"));

var expressHbs = require("express-handlebars");

var models = require("./models");
app.get("/sync", function(req, res) {
  models.sequelize.sync().then(function() {
    res.send("database sync completed!");
  });
});
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

app.get("/signIn", function(req, res) {
  res.render("signIn");
});

app.get("/signUp", function(req, res) {
  res.render("SignUp");
});

app.get("/user_profile", function(req, res) {
  res.render("user_profile");
});
if (localStorage.getItem("role") == "admin")
  var hbs = expressHbs.create({
    extname: "hbs",
    defaultLayout: "layoutAdmin",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  });
else
  var hbs = expressHbs.create({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
//Define your route here

// Set Public Folder

//Set Server Port & Start Server

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server is listening at port " + app.get("port"));
});
