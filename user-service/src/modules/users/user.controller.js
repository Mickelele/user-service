const UserService = require('./user.service');
const bcrypt = require('bcrypt');

const UserController = {
    async getProfile(req, res) {
        try {
            const profile = await UserService.getProfile(req.user.id);

            let zdjecie = null;
            if (profile.zdjecie) {
                zdjecie = {
                    nazwa: profile.zdjecie.nazwa,
                    dane: profile.zdjecie.zawartosc
                        ? profile.zdjecie.zawartosc.toString('base64')
                        : null
                };
            }

            const { haslo, ...userData } = profile.toJSON();
            res.json({ ...userData, zdjecie });
        } catch (err) {
            console.error('Błąd przy pobieraniu profilu:', err);
            res.status(404).json({ error: err.message });
        }
    },

    async updateProfile(req, res) {
        try {
            const updated = await UserService.updateProfile(req.user.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const result = await UserService.changePassword(req.user.id, currentPassword, newPassword);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await UserService.getUserByEmail(email);
            if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
            res.json(user);
        } catch (err) {
            console.error('Błąd przy pobieraniu użytkownika po email:', err);
            res.status(500).json({ error: 'Błąd serwera' });
        }
    },


    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });

            let zdjecie = null;
            if (user.zdjecie) {
                zdjecie = {
                    nazwa: user.zdjecie.nazwa,
                    dane: user.zdjecie.zawartosc
                        ? user.zdjecie.zawartosc.toString('base64')
                        : null
                };
            }

            const { haslo, ...userData } = user.toJSON();
            res.json({ ...userData, zdjecie });
        } catch (err) {
            console.error('Błąd przy pobieraniu użytkownika po ID:', err);
            res.status(500).json({ error: err.message });
        }
    },



    async createUser(req, res) {
        try {
            const { imie, nazwisko, email, haslo, rola } = req.body;
            const existing = await UserService.getUserByEmail(email);
            if (existing) return res.status(400).json({ error: 'Email zajęty' });

            const hashed = await bcrypt.hash(haslo, 10);
            const newUser = await UserService.createUser({
                imie,
                nazwisko,
                email,
                haslo: hashed,
                rola
            });

            res.status(201).json(newUser);
        } catch (err) {
            console.error('Błąd przy tworzeniu użytkownika:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async changeData(req, res) {
        try {
            const { id } = req.params;
            const updated = await UserService.changeData(id, req.body);
            
            let zdjecie = null;
            if (updated.zdjecie) {
                zdjecie = {
                    nazwa: updated.zdjecie.nazwa,
                    dane: updated.zdjecie.zawartosc
                        ? updated.zdjecie.zawartosc.toString('base64')
                        : null
                };
            }

            const { haslo, ...userData } = updated.toJSON();
            res.json({ ...userData, zdjecie });
        } catch (err) {
            console.error('Błąd przy aktualizacji danych użytkownika:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async updateUserAuthData(req, res) {
        try {
            const { id } = req.params;
            const allowedFields = ['haslo', 'reset_token', 'reset_token_expire_time'];
            
            // Filtrowanie tylko dozwolonych pól
            const filteredData = {};
            Object.keys(req.body).forEach(key => {
                if (allowedFields.includes(key)) {
                    filteredData[key] = req.body[key];
                }
            });

            if (Object.keys(filteredData).length === 0) {
                return res.status(400).json({ error: 'Nie podano żadnych dozwolonych pól do aktualizacji' });
            }

            const updated = await UserService.changeData(id, filteredData);
            
            // Zwracanie tylko potwierdzenia bez wrażliwych danych
            res.json({ 
                id: updated.id_uzytkownika, 
                email: updated.email,
                message: 'Dane uwierzytelniania zostały zaktualizowane' 
            });
        } catch (err) {
            console.error('Błąd przy aktualizacji danych uwierzytelniania:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async getUserByResetToken(req, res) {
        try {
            const { token } = req.params;
            const user = await UserService.getUserByResetToken(token);
            res.json(user);
        } catch (err) {
            console.error('Błąd przy pobieraniu użytkownika po tokenie:', err);
            res.status(404).json({ error: err.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(id);
            res.json(result);
        } catch (err) {
            console.error('Błąd przy usuwaniu użytkownika:', err);
            res.status(400).json({ error: err.message });
        }
    },

    async test(req, res) {
        try {
            return res.status(200).json({
                message: "Operacja zakończona sukcesem",
                status: "OK"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Wystąpił błąd serwera",
                error: error.message
            });
        }
    }
};

module.exports = UserController;