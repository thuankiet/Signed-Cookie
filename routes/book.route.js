const express = require("express");

const controller = require("../controllers/book.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/edit-form/:id", controller.edit);

router.post("/edit/:id", controller.postEdit);

router.get("/:id/delete", controller.delete);

module.exports = router;
