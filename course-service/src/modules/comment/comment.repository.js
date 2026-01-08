const Uwaga = require('./comment.model');
const Zajecia = require('../lesson/lesson.model');
const Nauczyciel = require('../course/teacher.model');
const Grupa = require('../group/group.model');

const CommentRepository = {
    async findAll() {
        return await Uwaga.findAll();
    },

    async findById(id) {
        return await Uwaga.findByPk(id);
    },

    async findByStudentId(id_ucznia) {
        return await Uwaga.findAll({
            where: { id_ucznia },
            include: [
                {
                    model: Zajecia,
                    as: 'zajecia',
                    include: [
                        {
                            model: Grupa,
                            as: 'grupa'
                        }
                    ]
                },
                {
                    model: Nauczyciel,
                    as: 'nauczyciel'
                }
            ],
            order: [['data', 'DESC']]
        });
    },

    async create(data) {
        return await Uwaga.create(data);
    },

    async delete(id) {
        const uwaga = await Uwaga.findByPk(id);
        if (!uwaga) throw new Error('Uwaga nie znaleziona');
        await uwaga.destroy();
        return { message: 'Usunięto uwagę' };
    }
};

module.exports = CommentRepository;
