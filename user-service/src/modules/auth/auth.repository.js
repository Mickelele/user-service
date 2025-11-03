const User = require('../users/user.model');

const AuthRepository = {
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    },

    async createUser(data) {
        return await User.create(data);
    }
};

module.exports = AuthRepository;
