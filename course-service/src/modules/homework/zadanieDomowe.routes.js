const express = require("express");
const router = express.Router();
const HomeworkController = require("./zadanieDomowe.controller");
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.post("/dodaj", authMiddleware, checkRole(['nauczyciel']), HomeworkController.create);
router.get("/prace-domowe-grupy/:id_grupy/wszystkie", authMiddleware, checkRole(['opiekun', 'uczen']), HomeworkController.getAllForGroupWithStatus);
router.get("/prace-domowe-grupy/:id_grupy",authMiddleware, HomeworkController.getForGroup);

module.exports = router;
