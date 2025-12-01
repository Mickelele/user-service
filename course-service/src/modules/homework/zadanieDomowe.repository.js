const ZadanieDomowe = require('./zadanieDomowe.model');

const HomeworkRepository = {
    async createHomework(data) {
        return await ZadanieDomowe.create(data);
    }
};

module.exports = HomeworkRepository;
