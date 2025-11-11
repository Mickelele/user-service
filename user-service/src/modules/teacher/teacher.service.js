const axios = require('axios');
const TeacherRepository = require('./teacher.repository');

class TeacherService {
    constructor() {
        this.userServiceUrl = process.env.USER_SERVICE_URL;
    }

    async getAll() {
        const nauczyciele = await TeacherRepository.findAll();

        const nauczycieleZUserami = await Promise.all(
            nauczyciele.map(async (n) => {
                try {
                    const res = await axios.get(`${this.userServiceUrl}/user/${n.id_nauczyciela}`);
                    return { ...n.toJSON(), user: res.data };
                } catch {
                    return { ...n.toJSON(), user: null };
                }
            })
        );

        return nauczycieleZUserami;
    }

    async getOne(id) {
        const nauczyciel = await TeacherRepository.findById(id);
        if (!nauczyciel) throw new Error('Nauczyciel nie znaleziony');

        try {
            const res = await axios.get(`${this.userServiceUrl}/user/${nauczyciel.id_nauczyciela}`);
            return { ...nauczyciel.toJSON(), user: res.data };
        } catch {
            return { ...nauczyciel.toJSON(), user: null };
        }
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
