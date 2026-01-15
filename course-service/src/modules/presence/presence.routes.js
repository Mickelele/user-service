const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const PresenceController = require('./presence.controller');

router.get('/:lessonId/obecnosci', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), PresenceController.getAllForLesson);

router.get('/obecnosci/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), PresenceController.getOne);

router.post('/:lessonId/obecnosci/dodaj', authMiddleware, checkRole(['administrator', 'nauczyciel']), (req, res, next) => {
    req.body.id_zajec = req.params.lessonId;
    next();
}, PresenceController.create);

router.put('/obecnosci/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.update);

router.delete('/obecnosci/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.delete);

router.get('/obecnosciUcznia/:userId', authMiddleware, checkRole(['administrator', 'nauczyciel', 'uczen', 'opiekun']), PresenceController.getForUser);

router.get('/grupa/:id_grupy/obecnosci', PresenceController.getByGroupId);

router.put('/obecnosci/:id/ustaw', PresenceController.setPresence);



module.exports = router;
