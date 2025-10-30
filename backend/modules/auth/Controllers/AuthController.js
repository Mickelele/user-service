const express = require('express');
const router = express.Router();
const authService = require('../Services/AuthService');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.json({ id: user.id, email: user.email });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, haslo } = req.body;
    const user = await authService.verifyPassword(email, haslo);
    if (!user) return res.status(401).json({ error: 'Nieprawidłowe dane' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'tajny_klucz', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
