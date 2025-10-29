const bcrypt = require('bcrypt');
const User = require('./model');

class UserService {
    async createUser({ imie, nazwisko, email, haslo, rola }) {
        const hashedPassword = await bcrypt.hash(haslo, 10);
        return User.create({ imie, nazwisko, email, haslo: hashedPassword, rola });
    }

    async getUserByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async verifyPassword(email, password) {
        const user = await this.getUserByEmail(email);
        if (!user) return false;
        const valid = await bcrypt.compare(password, user.haslo);
        return valid ? user : false;
    }
}

module.exports = new UserService();
