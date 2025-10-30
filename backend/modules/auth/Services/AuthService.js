const bcrypt = require('bcrypt');
const User = require('../../uzytkownik/domain/UserModel');
const IAuthService = require('./IAuthService');
class AuthService extends IAuthService {

    async createUser({ imie, nazwisko, email, haslo }) {
        const hashedPassword = await bcrypt.hash(haslo, 10);
        const rola = 'opiekun';
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

module.exports = new AuthService();
