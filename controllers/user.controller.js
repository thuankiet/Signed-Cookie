const shortId = require("shortid");

const db = require("../db.js");

// display Archives ('/users')
module.exports.index = (request, response, next) => {
  response.render("./users/listBook.user.pug", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
  next();
};


// edit user name
module.exports.edit = (request, response) => {
  var userId = request.params.userId;
  db.get("users")
    .value()
    .filter(user => {
      if (user.id === userId) {
        response.render("./users/edit.user.pug", {
          user: user
        });
      }
    });
};

module.exports.postEdit = (request, response) => {
  var id = request.params.userId;
  db.get("users")
    .find({ id: id })
    .assign(request.body)
    .write();
  response.redirect("/users");
};

//delete book
module.exports.delete = (request, response) => {
  var bookId = request.params.bookId;
  var user = response.locals.user;
  db.get("users")
    .find({id: user.id})
    .get("books")
    .remove({ bookId: bookId })
    .write();
  response.redirect("/users");
};

// borrow book
module.exports.borrow = (request, response) => {
  response.render("./users/borrow.user.pug", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.postBorrow = (request, response) => {
  var book = request.body.book;
  var id = shortId.generate();
  var user = response.locals.user;
  console.log(db.get("users")
    .find({ id: user.id })
    .get("books")
    .push({bookId: id, bookName: book})
    .write())
  response.locals.user = user
  response.redirect("/users");
};
