const express = require("express");
const router = express.Router();
const HomeworkController = require("./zadanieDomowe.controller");
const authMiddleware = require('../middleware/authMiddleware');

router.post("/dodaj", HomeworkController.create);
router.get("/prace-domowe-grupy/:id_grupy/wszystkie", authMiddleware, HomeworkController.getAllForGroupWithStatus);
router.get("/prace-domowe-grupy/:id_grupy",authMiddleware, HomeworkController.getForGroup);

module.exports = router;
