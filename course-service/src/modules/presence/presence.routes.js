const express = require('express');
const router = express.Router();

const PresenceController = require('./presence.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkGuardianStudent, checkTeacherStudent } = require('../middleware/roleMiddleware');

router.get('/:lessonId/obecnosci', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.getAllForLesson);

router.get('/obecnosci/:id', authMiddleware, checkRole(['administrator', 'nauczyciel', 'opiekun', 'uczen']), PresenceController.getOne);

router.post('/:lessonId/obecnosci/dodaj', authMiddleware, checkRole(['administrator', 'nauczyciel']), (req, res, next) => {
    req.body.id_zajec = req.params.lessonId;
    next();
}, PresenceController.create);

router.put('/obecnosci/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.update);

router.delete('/obecnosci/:id', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.delete);

router.get('/obecnosciUcznia/:userId', authMiddleware, checkRole(['administrator', 'opiekun', 'uczen', 'nauczyciel']), PresenceController.getForUser);

router.get('/grupa/:id_grupy/obecnosci', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.getByGroupId);

router.put('/obecnosci/:id/ustaw', authMiddleware, checkRole(['administrator', 'nauczyciel']), PresenceController.setPresence);



module.exports = router;
