const User = require('./user.model');

const UserRepository = {
    async findById(id, includePassword = false) {
        const attributes = includePassword
            ? ['id_uzytkownika', 'imie', 'nazwisko', 'email', 'rola', 'haslo']
            : ['id_uzytkownika', 'imie', 'nazwisko', 'email', 'rola'];

        return User.findByPk(id, { attributes });
    },


    async findByEmail(email) {
        return User.findOne({ where: { email } });
    },

    async updateUser(user) {
        return user.save();
    }
};

module.exports = UserRepository;
