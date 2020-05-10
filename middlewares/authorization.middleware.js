const db = require("../db.js");

module.exports.authorization = (request, response, next) => {
  var user = response.locals.user;
  if(user.isAdmin === false) {
    return response.sendStatus(403);
  };
  response.locals.user = user;
  next();
};
