const db = require("../db.js");

module.exports.postCreate = (request, response, next) => {
  var error = [];
  if (request.body.userName.split("").length > 30) {
    error.push(
      "Can not create user, the length of charaters are longer than 30."
    );
  }
  if (error.length) {
    response.render("./users/list.user.pug", {
      error: error,
      users: db.get("users").value()
    });
    return;
  }
  next();
};
