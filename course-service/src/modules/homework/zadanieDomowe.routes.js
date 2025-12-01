const express = require("express");
const router = express.Router();
const HomeworkController = require("./zadanieDomowe.controller");

router.post("/dodaj", HomeworkController.create);

module.exports = router;
