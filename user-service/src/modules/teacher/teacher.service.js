const TeacherRepository = require('./teacher.repository');
const User = require('../users/user.model');

class TeacherService {
    async getAll() {
        const nauczyciele = await TeacherRepository.findAll();

        const nauczycieleZUserami = await Promise.all(
            nauczyciele.map(async (n) => {
                const user = await User.findByPk(n.id_nauczyciela);
                return { ...n.toJSON(), user: user ? user.toJSON() : null };
            })
        );

        return nauczycieleZUserami;
    }

    async getOne(id) {
        const nauczyciel = await TeacherRepository.findById(id);
        if (!nauczyciel) throw new Error('Nauczyciel nie znaleziony');

        const user = await User.findByPk(nauczyciel.id_nauczyciela);
        return { ...nauczyciel.toJSON(), user: user ? user.toJSON() : null };
    }

    async create(data) {
        return await TeacherRepository.create(data);
    }

    async update(id, data) {
        return await TeacherRepository.update(id, data);
    }

    async delete(id) {
        return await TeacherRepository.delete(id);
    }
}

module.exports = new TeacherService();
