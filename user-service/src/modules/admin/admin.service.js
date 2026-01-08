const AdminRepository = require('./admin.repository');
const User = require('../users/user.model');

class AdminService {
    async getAll() {
        const admini = await AdminRepository.findAll();

        const adminiZUserami = await Promise.all(
            admini.map(async (a) => {
                const user = await User.findByPk(a.id_administratora);
                return { ...a.toJSON(), user: user ? user.toJSON() : null };
            })
        );

        return adminiZUserami;
    }

    async getOne(id) {
        const admin = await AdminRepository.findById(id);
        if (!admin) throw new Error('Administrator nie znaleziony');

        const user = await User.findByPk(admin.id_administratora);
        return { ...admin.toJSON(), user: user ? user.toJSON() : null };
    }

    async create(data) {
        return await AdminRepository.create(data);
    }

    async update(id, data) {
        return await AdminRepository.update(id, data);
    }

    async delete(id) {
        return await AdminRepository.delete(id);
    }
}

module.exports = new AdminService();
