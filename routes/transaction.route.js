const express = require("express");

const controller = require("../controllers/transaction.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/info/:userId", controller.info);

router.get("/delete/:userId", controller.delete);

module.exports = router;
