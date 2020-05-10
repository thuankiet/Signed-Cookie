const express = require("express");

const controller = require("../controllers/user.controller.js");
const validation = require("../validation/user.validate.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/edit-user/:userId", controller.edit);

router.post("/edit-user/:userId", controller.postEdit);

router.get("/deleteBook/:bookId", controller.delete);

router.get("/borrow", controller.borrow);

router.post("/borrow", controller.postBorrow);

module.exports = router;
