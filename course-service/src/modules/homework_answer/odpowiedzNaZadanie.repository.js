const OdpowiedzNaZadanie = require('./odpowiedzNaZadanie.model');

const HomeworkAnswerRepository = {
    async createAnswer(data) {
        return await OdpowiedzNaZadanie.create(data);
    }
};

module.exports = HomeworkAnswerRepository;
