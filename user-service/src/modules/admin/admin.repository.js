const Administrator = require('./admin.model');

const AdminRepository = {
    async findAll() {
        return await Administrator.findAll();
    },

    async findById(id) {
        return await Administrator.findByPk(id);
    },

    async create(data) {
        return await Administrator.create(data);
    },

    async update(id, data) {
        const admin = await Administrator.findByPk(id);
        if (!admin) throw new Error('Administrator nie znaleziony');
        return await admin.update(data);
    },

    async delete(id) {
        const admin = await Administrator.findByPk(id);
        if (!admin) throw new Error('Administrator nie znaleziony');
        await admin.destroy();
        return { message: 'Usunięto administratora' };
    }
};

module.exports = AdminRepository;
