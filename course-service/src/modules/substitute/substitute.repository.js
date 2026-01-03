const Zastepstwo = require('./substitute.model');
const Zajecia = require('../lesson/lesson.model');

class SubstituteRepository {
    async findAll() {
        return await Zastepstwo.findAll({
            include: [{
                model: Zajecia,
                as: 'zajecia'
            }],
            order: [['id_zastepstwa', 'DESC']]
        });
    }

    async findById(id) {
        return await Zastepstwo.findByPk(id, {
            include: [{
                model: Zajecia,
                as: 'zajecia'
            }]
        });
    }

    async findByTeacherReporting(id_nauczyciela) {
        return await Zastepstwo.findAll({
            where: { id_nauczyciela_zglaszajacego: id_nauczyciela },
            include: [{
                model: Zajecia,
                as: 'zajecia'
            }],
            order: [['id_zastepstwa', 'DESC']]
        });
    }

    async findByTeacherSubstituting(id_nauczyciela) {
        return await Zastepstwo.findAll({
            where: { id_nauczyciel_zastepujacy: id_nauczyciela },
            include: [{
                model: Zajecia,
                as: 'zajecia'
            }],
            order: [['id_zastepstwa', 'DESC']]
        });
    }

    async findAvailable() {
        return await Zastepstwo.findAll({
            where: { id_nauczyciel_zastepujacy: null },
            include: [{
                model: Zajecia,
                as: 'zajecia'
            }],
            order: [['id_zastepstwa', 'DESC']]
        });
    }

    async create(data) {
        return await Zastepstwo.create(data);
    }

    async update(id, data) {
        const zastepstwo = await this.findById(id);
        if (!zastepstwo) throw new Error('Zastępstwo nie znalezione');
        return await zastepstwo.update(data);
    }

    async delete(id) {
        const zastepstwo = await this.findById(id);
        if (!zastepstwo) throw new Error('Zastępstwo nie znalezione');
        return await zastepstwo.destroy();
    }

    async assignTeacher(id_zastepstwa, id_nauczyciel_zastepujacy) {
        const zastepstwo = await this.findById(id_zastepstwa);
        if (!zastepstwo) throw new Error('Zastępstwo nie znalezione');
        
        zastepstwo.id_nauczyciel_zastepujacy = id_nauczyciel_zastepujacy;
        return await zastepstwo.save();
    }
}

module.exports = new SubstituteRepository();
