const Zdjecie = require('../zdjecie/zdjecie.model');
const User = require('./user.model');

const uploadUserImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nie przesłano żadnego pliku.' });
        }

        const noweZdjecie = await Zdjecie.create({
            nazwa: req.file.originalname,
            zawartosc: req.file.buffer,
        });

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony.' });

        user.id_zdjecia = noweZdjecie.id_zdjecia;
        await user.save();

        res.json({
            message: 'Zdjęcie zostało zapisane pomyślnie.',
            id_zdjecia: noweZdjecie.id_zdjecia,
            nazwa: noweZdjecie.nazwa,
        });
    } catch (err) {
        console.error('Błąd przy zapisie zdjęcia:', err);
        res.status(500).json({ error: 'Błąd przy zapisie zdjęcia.' });
    }
};

module.exports = { uploadUserImage };
