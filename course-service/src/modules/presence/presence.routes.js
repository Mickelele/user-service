const express = require('express');
const router = express.Router();

const PresenceController = require('./presence.controller');

router.get('/:lessonId/obecnosci', authMiddleware, checkRole(['nauczyciel']), PresenceController.getAllForLesson);

router.get('/obecnosci/:id', PresenceController.getOne);

router.post('/:lessonId/obecnosci/dodaj', authMiddleware, checkRole(['nauczyciel']), (req, res, next) => {
    req.body.id_zajec = req.params.lessonId;
    next();
}, PresenceController.create);

router.put('/obecnosci/:id', PresenceController.update);

router.delete('/obecnosci/:id', authMiddleware, checkRole(['nauczyciel']), PresenceController.delete);

const authMiddleware = require('../middleware/authMiddleware');
const { checkRole, checkOwnership, checkGuardianStudent } = require('../middleware/roleMiddleware');

router.get('/obecnosciUcznia/:userId', authMiddleware, checkRole(['opiekun', 'uczen', 'nauczyciel']), checkGuardianStudent('userId'), checkTeacherStudent('userId'), PresenceController.getForUser);

router.get('/grupa/:id_grupy/obecnosci', PresenceController.getByGroupId);

router.put('/obecnosci/:id/ustaw', authMiddleware, checkRole(['nauczyciel']), PresenceController.setPresence);



module.exports = router;
