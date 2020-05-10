const shortId = require("shortid");

const db = require("../db.js");

// display transactions
module.exports.index = (request, response) => {
  response.render("./transactions/transactions.pug", {
    transactions: db.get("transactions").value(),
    users: db.get("users").value()
  });
};

// show info
module.exports.info = (request, response) => {
  var userId = request.params.userId;
  response.render("./transactions/info.pug", {
    books: db.get("users").find({id: userId}).get("books").value()
  });
};

// delete user
module.exports.delete = (request, response) => {
  var userId = request.params.userId;
  db.get("users")
    .remove({ id: userId })
    .write();
  response.redirect("/transactions");
};
