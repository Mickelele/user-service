const HomeworkService = require('./zadanieDomowe.service');

const HomeworkController = {
    async create(req, res) {
        try {
            const homework = await HomeworkService.addHomework(req.body);
            res.status(201).json(homework);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = HomeworkController;
