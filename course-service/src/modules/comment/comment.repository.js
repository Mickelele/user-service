const Uwaga = require('./comment.model');

const CommentRepository = {
    async findAll() {
        return await Uwaga.findAll();
    },

    async findById(id) {
        return await Uwaga.findByPk(id);
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
