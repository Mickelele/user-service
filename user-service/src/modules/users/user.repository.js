const User = require('./user.model');
const Zdjecie = require('../zdjecie/zdjecie.model');

const UserRepository = {
    async findById(id, includePassword = false) {
        const attributes = includePassword
            ? ['id_uzytkownika', 'imie', 'nazwisko', 'email', 'rola', 'haslo']
            : ['id_uzytkownika', 'imie', 'nazwisko', 'email', 'rola'];

        return User.findByPk(id, {
            attributes,
            include: [
                {
                    model: Zdjecie,
                    as: 'zdjecie',
                    attributes: ['id_zdjecia', 'nazwa', 'zawartosc'],
                    required: false
                }
            ]
        });
    },

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    },

    async createUser(data) {
        return User.create(data);
    },

    async updateUser(user) {
        return user.save();
    },

    async findByResetToken(token) {
        return User.findOne({ 
            where: { reset_token: token },
            attributes: ['id_uzytkownika', 'email', 'reset_token', 'reset_token_expire_time']
        });
    }
};

module.exports = UserRepository;