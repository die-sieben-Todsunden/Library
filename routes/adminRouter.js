let express = require("express");
let router = express.Router();
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const nodemailer = require("nodemailer");

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
  if (req.query.type == null) {
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
    if (req.query.type == "id") {
      return bookController
        .getAllId(req.query)
        .then(data => {
          //console.log(data.length);
          res.locals.books = data;
          console.log(res.locals.books);

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
});

router.get("/author-management", (req, res, next) => {
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
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
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
  }
  let categoryController = require("../controllers/categoryController");
  console.log(req.query);
  categoryController
    .getAll(req.query)
    .then(data => {
      res.locals.Category = data.rows;
      res.locals.pagination = {
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
        totalRows: data.count
      };
      //console.log(res.locals.books);
      res.render("admin/categorymanagement");
    })
    .catch(error => {
      next(error);
    });
});

router.get("/borrow-management", (req, res, next) => {
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 10;
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
  }
  let borrowController = require("../controllers/bookManagementController");
  borrowController
    .getAlls(req.query)
    .then(data => {
      //console.log(data.length);
      res.locals.borrow = data.rows;
      res.locals.pagination = {
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
        totalRows: data.count
      };
      //console.log(res.locals.books);
      res.render("admin/borrowmanagement");
    })
    .catch(error => {
      next(error);
    });
});
router.get("/statistic", (req, res) => {
  let bookManagementController = require("../controllers/bookManagementController");
  bookManagementController.getAllStatistic().then(data => {
    res.locals.borrow = data;
    res.render("admin/statistic");
  });
  console.log();
});

router.post("/book-management", function(req, res, next) {
  let name = req.body.newName;
  let isbn = req.body.newISBN;
  let author = req.body.newAuthor;
  let category = req.body.newCategory;
  let description = req.body.newDes;
  let year = req.body.newYear;
  let language = req.body.newLanguage;
  let total = req.body.newTotal;
  let img = req.body.newImg;

  if (
    name == "" ||
    isbn == "" ||
    author == "" ||
    category == "" ||
    description == "" ||
    year == "" ||
    language == "" ||
    total == "" ||
    img == ""
  ) {
    return res.render("admin/bookmanagement", {
      message: "Empty",
      type: "alert-danger"
    });
  }
  console.log(!isNaN(year));
  if (isNaN(year))
    return res.render("admin/bookmanagement", {
      message: "Năm xuất bản phải là số.",
      type: "alert-danger"
    });
  if (isNaN(total))
    return res.render("admin/bookmanagement", {
      message: "Số lượng sách phải là số.",
      type: "alert-danger"
    });
  let bookController = require("../controllers/bookController");
  bookController.getBookByISBN(isbn).then(book => {
    if (book) {
      return res.render("admin/bookmanagement", {
        message: `ISBN ${book.ISBN_API} exists`,
        type: "alert-danger"
      });
    }

    book = {
      ISBN_API: isbn,
      author: author,
      category: category,
      description: description,
      year: year,
      language: language,
      bookName: name,
      total: total,
      canBorrow: total,
      isValid: true,
      isHidden: false,
      borrowed: 0,
      remain: total,
      imgPath: img,
      borrowTimes: 0
    };

    return bookController
      .createBookInfo(book)
      .then(user => {
        // console.log(user)
        return res.render("admin/bookmanagement", {
          message: "Tạo thành công!",
          type: "alert-primary"
        });
      })
      .catch(error => next(error));
  });
  console.log(req.body);
});

router.get("/book-management/edit", (req, res, next) => {
  let bookController = require("../controllers/bookController");
  return bookController
    .getAllId(req.query)
    .then(data => {
      //console.log(data.length);
      res.locals.books = data;
      let temp = req.params.index;
      res.render("admin/editbook");
    })
    .catch(error => {
      next(error);
    });
});

router.post("/book-management/edit", function(req, res, next) {
  let name = req.body.newName;
  let isbn = req.body.newISBN;
  let author = req.body.newAuthor;
  let category = req.body.newCategory;
  let year = req.body.newYear;
  let remain = req.body.newRemain;
  let borrowed = req.body.newBorrowed;
  let total = req.body.newTotal;
  let img = req.body.newImg;
  let id = req.body.nID;

  if (isNaN(total))
    return res.render("admin/bookmanagement/edit?search=" + id, {
      message: "Số lượng sách phải là số.",
      type: "alert-danger"
    });

  if (isNaN(remain))
    return res.render("admin/bookmanagement/edit?search=" + id, {
      message: "Số lượng sách phải là số.",
      type: "alert-danger"
    });

  if (isNaN(borrowed))
    return res.render("admin/bookmanagement/edit?search=" + id, {
      message: "Số lượng sách phải là số.",
      type: "alert-danger"
    });
  let bookController = require("../controllers/bookController");
  console.log(req.body);
  bookController.getById(id).then(book => {
    if (book) {
      book
        .update({
          ISBN_API: isbn,
          author: author,
          category: category,
          year: year,
          bookName: name,
          total: total,
          borrowed: borrowed,
          remain: remain,
          imgPath: img
        })
        .then(user => {
          // console.log(user)
          return res.render("admin/bookmanagement", {
            message: "Cập nhật thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    }
  });
});

router.post("/book-management-remove", function(req, res, next) {
  let id = req.body.idRemove;

  if (isNaN(id))
    return res.render("admin/bookmanagement", {
      message: "ID phải là số.",
      type: "alert-danger"
    });

  if (id == "")
    return res.render("admin/bookmanagement" + id, {
      message: "ID trống.",
      type: "alert-danger"
    });

  let bookController = require("../controllers/bookController");
  console.log(req.body);
  bookController.getById(id).then(book => {
    if (book) {
      book
        .destroy()
        .then(user => {
          // console.log(user)
          return res.render("admin/bookmanagement", {
            message: "Xóa thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    } else {
      return res.render("admin/bookmanagement", {
        message: "Không tìm thấy ID đã nhập!",
        type: "alert-danger"
      });
    }
  });
});

router.post("/author-management-add", function(req, res, next) {
  let name = req.body.newName;

  if (name == undefined || name == "")
    return res.render("admin/authormanagement", {
      message: "Tên tác giả không được để trống.",
      type: "alert-danger"
    });

  let author = { name: name };
  let authorController = require("../controllers/authorController");
  authorController
    .createAuthor(author)
    .then(author => {
      // console.log(user)
      return res.render("admin/authormanagement", {
        message: "Tạo mới thành công!",
        type: "alert-primary"
      });
    })
    .catch(error => next(error));
});

router.post("/author-management-edit", function(req, res, next) {
  let id = req.body.idEdit;
  let name = req.body.newName;
  console.log(req.body);
  if (isNaN(id))
    return res.render("admin/bookmanagement", {
      message: "ID phải là số.",
      type: "alert-danger"
    });

  if (id == "")
    return res.render("admin/bookmanagement" + id, {
      message: "ID trống.",
      type: "alert-danger"
    });

  if (name == "")
    return res.render("admin/bookmanagement" + id, {
      message: "Tên trống.",
      type: "alert-danger"
    });

  let authorController = require("../controllers/authorController");
  authorController.getById(id).then(author => {
    if (author) {
      console.log(author);
      author
        .update({ name: name })
        .then(user => {
          // console.log(user)
          return res.render("admin/authormanagement", {
            message: "Cập nhật thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    } else {
      return res.render("admin/authormanagement", {
        message: "Không tìm thấy ID đã nhập!",
        type: "alert-danger"
      });
    }
  });
});

router.post("/author-management-remove", function(req, res, next) {
  let id = req.body.idRemove;

  if (isNaN(id))
    return res.render("admin/authormanagement", {
      message: "ID phải là số.",
      type: "alert-danger"
    });

  if (id == "")
    return res.render("admin/authormanagement" + id, {
      message: "ID trống.",
      type: "alert-danger"
    });

  let authorController = require("../controllers/authorController");
  console.log(req.body);
  authorController.getById(id).then(author => {
    if (author) {
      author
        .destroy()
        .then(author => {
          // console.log(user)
          return res.render("admin/authormanagement", {
            message: "Xóa thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    } else {
      return res.render("admin/authormanagement", {
        message: "Không tìm thấy ID đã nhập!",
        type: "alert-danger"
      });
    }
  });
});

////////////
router.post("/category-management-add", function(req, res, next) {
  let name = req.body.newName;
  let total = req.body.newTotal;
  if (name == undefined || name == "" || total == undefined || total == "")
    return res.render("admin/categorymanagement", {
      message: "Empty",
      type: "alert-danger"
    });

  let category = { name: name, total: total };
  let categoryController = require("../controllers/categoryController");
  categoryController
    .createCategory(category)
    .then(category => {
      // console.log(user)
      return res.render("admin/categorymanagement", {
        message: "Tạo mới thành công!",
        type: "alert-primary"
      });
    })
    .catch(error => next(error));
});

router.post("/category-management-edit", function(req, res, next) {
  let id = req.body.idEdit;
  let name = req.body.editName;
  let total = req.body.editTotal;

  if (isNaN(id))
    return res.render("admin/categorymanagement", {
      message: "ID phải là số.",
      type: "alert-danger"
    });

  if (id == "")
    return res.render("admin/categorymanagement" + id, {
      message: "ID trống.",
      type: "alert-danger"
    });

  if (name == "" || total == "")
    return res.render("admin/categorymanagement" + id, {
      message: "Empty.",
      type: "alert-danger"
    });

  let categoryController = require("../controllers/categoryController");
  categoryController.getById(id).then(category => {
    if (category) {
      category
        .update({ name: name, total: total })
        .then(category => {
          // console.log(user)
          return res.render("admin/categorymanagement", {
            message: "Cập nhật thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    } else {
      return res.render("admin/categorymanagement", {
        message: "Không tìm thấy ID đã nhập!",
        type: "alert-danger"
      });
    }
  });
});

router.post("/category-management-remove", function(req, res, next) {
  let id = req.body.idRemove;

  if (isNaN(id))
    return res.render("admin/categorymanagement", {
      message: "ID phải là số.",
      type: "alert-danger"
    });

  if (id == "")
    return res.render("admin/categorymanagement" + id, {
      message: "ID trống.",
      type: "alert-danger"
    });

  let categoryController = require("../controllers/categoryController");

  categoryController.getById(id).then(category => {
    if (category) {
      category
        .destroy()
        .then(category => {
          // console.log(user)
          return res.render("admin/categorymanagement", {
            message: "Xóa thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    } else {
      return res.render("admin/categorymanagement", {
        message: "Không tìm thấy ID đã nhập!",
        type: "alert-danger"
      });
    }
  });
});

router.get("/request", (req, res, next) => {
  if (req.query.limit == null || isNaN(req.query.limit)) {
    req.query.limit = 3;
  }
  if (req.query.page == null || isNaN(req.query.page)) {
    req.query.page = 1;
  }
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
  }
  let requestController = require("../controllers/requestController");
  requestController
    .getAll(req.query)
    .then(data => {
      //console.log(data.length);
      res.locals.Request = data.rows;
      res.locals.pagination = {
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
        totalRows: data.count
      };
      //console.log(res.locals.books);
      res.render("admin/request");
    })
    .catch(error => {
      next(error);
    });
});

router.post("/accept", function(req, res, next) {
  let reqid = req.body.idAccept;
  let status = "Checked";
  const output = `
  <p>Yêu cầu của bạn đã được xác nhận</p>
  <p>Hãy đến đúng hẹn, không quá 5 ngày (không kể thứ 7 và chủ nhật)</p>
  <p>Khác: $(req.body.note)</p>
    `;
  let requestController = require("../controllers/requestController");
  let userId;
  let email;
  requestController.getById(reqid).then(request => {
    if (request) {
      userId = request.dataValues.UserId;
      let userController = require("../controllers/userController");
      userController.getUserById(userId).then(user => {
        if (user) {
          email = user.dataValues.email;

          console.log(email);
          let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "e6026b842e6d96", // generated ethereal user
              pass: "c6e7d292d11d34" // generated ethereal password
            }
            // service: 'gmail',
            // auth:{
            //   user:'chromevi123@gmail.com',
            //   pass:''
            // }
          });
          transporter.sendMail({
            from: "admin.library@library.hcmus.edu.vn", // sender address
            //to: `${user.email}`, // list of receivers
            to: email,
            subject: "Confirm appointment", // Subject line
            html: output // html body
          });

          requestController.getById(reqid).then(request => {
            if (request) {
              request
                .update({ status: status })
                .then(request => {
                  // console.log(user)
                  return res.render("admin/request", {
                    message: "Xác nhận thành công, đã gửi mail thông báo!",
                    type: "alert-primary"
                  });
                })
                .catch(error => next(error));
            } else {
              return res.render("admin/request", {
                message: "Lỗi!",
                type: "alert-danger"
              });
            }
          });
        }
      });
    }
  });
});

router.post("/cancel", function(req, res, next) {
  let reqid = req.body.idCancel;
  let status = "Checked";
  const output = `
  <p>Yêu cầu của bạn không được xác nhận</p>
  <p>Khác: $(req.body.note)</p>
    `;
  let requestController = require("../controllers/requestController");
  let userId;
  let email;
  requestController.getById(reqid).then(request => {
    if (request) {
      userId = request.dataValues.UserId;
      let userController = require("../controllers/userController");
      userController.getUserById(userId).then(user => {
        if (user) {
          email = user.dataValues.email;

          console.log(email);
          let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "e6026b842e6d96", // generated ethereal user
              pass: "c6e7d292d11d34" // generated ethereal password
            }
            // service: 'gmail',
            // auth:{
            //   user:'chromevi123@gmail.com',
            //   pass:''
            // }
          });
          transporter.sendMail({
            from: "admin.library@library.hcmus.edu.vn", // sender address
            //to: `${user.email}`, // list of receivers
            to: email,
            subject: "Cancel appointment", // Subject line
            html: output // html body
          });

          requestController.getById(reqid).then(request => {
            if (request) {
              request
                .update({ status: status })
                .then(request => {
                  // console.log(user)
                  return res.render("admin/request", {
                    message: "Từ chối thành công, đã gửi mail thông báo!",
                    type: "alert-primary"
                  });
                })
                .catch(error => next(error));
            } else {
              return res.render("admin/request", {
                message: "Lỗi!",
                type: "alert-danger"
              });
            }
          });
        }
      });
    }
  });
});

router.post("/borrowAdd", function(req, res, next) {
  let book = req.body.newBook;
  let user = req.body.newUser;
  let note = req.body.newNote;
  let now = new Date();
  let borrowed = now.toString();
  let date = new Date();
  date.setMonth(now.getMonth() + 1);
  let due = date.toString();

  console.log(borrowed + " " + due);

  if (book == "" || user == "") {
    return res.render("admin/borrowmanagement", {
      message: "Empty",
      type: "alert-danger"
    });
  }

  let borrowController = require("../controllers/bookManagementController");
  let userController = require("../controllers/userController");
  let bookController = require("../controllers/realBookController");
  bookController.getById(book).then(books => {
    if (!books) {
      return res.render("admin/borrowmanagement", {
        message: `Book ${book} does not exists`,
        type: "alert-danger"
      });
    }
    userController.getUserById(user).then(users => {
      if (!users) {
        return res.render("admin/borrowmanagement", {
          message: `User ${user} does not exists`,
          type: "alert-danger"
        });
      }
      return borrowController
        .createBorrow({
          borrowedDate: borrowed,
          dueDate: due,
          status: "borrowing",
          note: note,
          BookId: book,
          UserId: user
        })
        .then(borrow => {
          // console.log(user)
          res.render("admin/borrowmanagement", {
            message: "Tạo thành công!",
            type: "alert-primary"
          });
        })
        .catch(error => next(error));
    });
  });
  console.log(req.body);
});

router.post("/borrow-management-extension", function(req, res, next) {
  let id = req.body.extendId;

  if (id == "") {
    return res.render("admin/borrowmanagement", {
      message: "Empty",
      type: "alert-danger"
    });
  }

  let borrowController = require("../controllers/bookManagementController");

  borrowController.getById(id).then(borrow => {
    if (!borrow) {
      return res.render("admin/borrowmanagement", {
        message: `ID: ${id} does not exists`,
        type: "alert-danger"
      });
    }
    let newDueDate = new Date(borrow.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 15);

    return borrow
      .update({
        dueDate: newDueDate
      })
      .then(borrow => {
        // console.log(user)
        res.render("admin/borrowmanagement", {
          message: "Gia hạn thành công!",
          type: "alert-primary"
        });
      })
      .catch(error => next(error));
  });
  console.log(req.body);
});

router.post("/borrow-management-returned", function(req, res, next) {
  let id = req.body.returnId;

  if (id == "") {
    return res.render("admin/borrowmanagement", {
      message: "Empty",
      type: "alert-danger"
    });
  }

  let borrowController = require("../controllers/bookManagementController");

  borrowController.getById(id).then(borrow => {
    if (!borrow) {
      return res.render("admin/borrowmanagement", {
        message: `ID: ${id} does not exists`,
        type: "alert-danger"
      });
    }

    return borrow
      .update({
        status: "returned"
      })
      .then(borrow => {
        // console.log(user)
        res.render("admin/borrowmanagement", {
          message: "Đã trả sách!",
          type: "alert-primary"
        });
      })
      .catch(error => next(error));
  });
  console.log(req.body);
});
module.exports = router;
