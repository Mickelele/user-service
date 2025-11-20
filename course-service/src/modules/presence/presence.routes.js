const express = require('express');
const router = express.Router();

const PresenceController = require('./presence.controller');

router.get('/:lessonId/obecnosci', PresenceController.getAllForLesson);

router.get('/obecnosci/:id', PresenceController.getOne);

router.post('/:lessonId/obecnosci/dodaj', (req, res, next) => {
    req.body.id_zajec = req.params.lessonId;
    next();
}, PresenceController.create);

router.put('/obecnosci/:id', PresenceController.update);

router.delete('/obecnosci/:id', PresenceController.delete);

router.get('/obecnosciUcznia/:userId', PresenceController.getForUser);


router.put('/obecnosci/:id/ustaw', PresenceController.setPresence);



module.exports = router;
