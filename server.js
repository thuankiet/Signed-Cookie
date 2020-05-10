// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const bookRoute = require("./routes/book.route.js");
const userRoute = require("./routes/user.route.js");
const transactionRoute = require("./routes/transaction.route.js");
const authRoute = require("./routes/auth.route.js");

const authMiddleware = require("./middlewares/auth.middleware.js");
const authorizationMiddleware = require("./middlewares/authorization.middleware.js")

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('dhdafgsdgfjdhsdfs53s13515s'));

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("./index.pug");
});

app.use("/books", authMiddleware.requireAuth, authorizationMiddleware.authorization, bookRoute);
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/transactions", authMiddleware.requireAuth, authorizationMiddleware.authorization, transactionRoute);
app.use("/auth", authRoute);
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
