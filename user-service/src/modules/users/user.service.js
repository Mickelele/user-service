const bcrypt = require('bcrypt');
const userValidator = require('./validators/user.validator');
const UserRepository = require('./user.repository');

class UserService {
    async getProfile(id) {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error(`Nie znaleziono użytkownika o numerze ${id}`);
        return user;
    }

    async updateProfile(id, data) {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error(`Nie znaleziono użytkownika o numerze ${id}`);

        userValidator.validateUpdateProfile(data);

        const { imie, nazwisko, email } = data;
        if (imie !== undefined) user.imie = imie;
        if (nazwisko !== undefined) user.nazwisko = nazwisko;
        if (email !== undefined) user.email = email;

        await UserRepository.updateUser(user);
        return user;
    }

    async changePassword(id, currentPassword, newPassword) {
        const user = await UserRepository.findById(id, true);
        if (!user) throw new Error(`Nie znaleziono użytkownika o numerze ${id}`);

        userValidator.validateChangePassword({ currentPassword, newPassword });

        const match = await userValidator.comparePasswords(currentPassword, user.haslo);
        if (!match) throw new Error('Podano błędne aktualne hasło.');

        const isSame = await userValidator.comparePasswords(newPassword, user.haslo);
        if (isSame) throw new Error('Nowe hasło musi różnić się od aktualnego.');

        const hashed = await bcrypt.hash(newPassword, 10);
        user.haslo = hashed;

        await UserRepository.updateUser(user);
        return { message: 'Hasło zostało zmienione pomyślnie.' };
    }

    async getUserByEmail(email) {
        return UserRepository.findByEmail(email);
    }


    async getUserById(id) {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error(`Nie znaleziono użytkownika o numerze ${id}`);
        return user;
    }


    async createUser(data) {
        return UserRepository.createUser(data);
    }

    async changeData(id, data) {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error(`Nie znaleziono użytkownika o numerze ${id}`);

        const { imie, nazwisko, email, rola, id_zdjecia } = data;
        
        if (email && email !== user.email) {
            const existingUser = await UserRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('Email jest już zajęty przez innego użytkownika');
            }
        }

        if (imie !== undefined) user.imie = imie;
        if (nazwisko !== undefined) user.nazwisko = nazwisko;
        if (email !== undefined) user.email = email;
        if (rola !== undefined) user.rola = rola;
        if (id_zdjecia !== undefined) user.id_zdjecia = id_zdjecia;

        await UserRepository.updateUser(user);
        
        return UserRepository.findById(id);
    }
}

module.exports = new UserService();