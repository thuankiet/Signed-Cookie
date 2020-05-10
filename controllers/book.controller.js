const shortId = require("shortid");

const db = require("../db.js");

//display List of books
module.exports.index = (request, response) => {
  response.render("./books/book.pug", {
    books: db.get("books").value()
  });
};

// create new book
module.exports.create = (request, response) => {
  response.render("./books/create.book.pug");
};

module.exports.postCreate = (request, response) => {
  var bookId = shortId.generate();
  var bookTitle = request.body.title;
  var bookDescription = request.body.description;
  db.get("books")
    .push({
      title: bookTitle,
      description: bookDescription,
      id: bookId
    })
    .write();
  response.redirect("/books");
};


// edit book
module.exports.edit = (request, response) => {
  var id = request.params.id;
  db.get("books")
    .value()
    .filter(book => {
      if (book.id === id) {
        response.render("./books/edit.book.pug", {
          book: book
        });
      }
    });
};

module.exports.postEdit = (request, response) => {
  var id = request.params.id;
  db.get("books")
    .find({ id: id })
    .assign(request.body)
    .write();
  response.redirect("/books");
};

// delete book
module.exports.delete = (request, response) => {
  var id = request.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  response.redirect("/books");
};
