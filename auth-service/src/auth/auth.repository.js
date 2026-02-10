const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';

const AuthRepository = {
    async findByEmail(email) {
        const res = await axios.get(`${USER_SERVICE_URL}/user/email/${email}`);
        return res.data;
    },

    async findById(userId) {
        try {
            const res = await axios.get(`${USER_SERVICE_URL}/user/${userId}`);
            return res.data;
        } catch (err) {
            return null;
        }
    },

    async createUser(data) {
        const userRes = await axios.post(`${USER_SERVICE_URL}/user`, data);

        const opiekunData = {
            id_opiekuna: userRes.data.id_uzytkownika,
            nr_indy_konta_bankowego: null
        };

        await axios.post(`${USER_SERVICE_URL}/opiekunowie`, opiekunData);

        return userRes.data;
    },

    async updateResetToken(userId, resetToken, expireTime) {
        const res = await axios.put(`${USER_SERVICE_URL}/user/${userId}/auth-update`, {
            reset_token: resetToken,
            reset_token_expire_time: expireTime
        });
        return res.data;
    },

    async findByResetToken(token) {
        try {
            const res = await axios.get(`${USER_SERVICE_URL}/user/reset-token/${token}`);
            return res.data;
        } catch (err) {
            return null;
        }
    },

    async updatePassword(userId, hashedPassword) {
        const res = await axios.put(`${USER_SERVICE_URL}/user/${userId}/auth-update`, {
            haslo: hashedPassword,
            reset_token: null,
            reset_token_expire_time: null
        });
        return res.data;
    }
};

module.exports = AuthRepository;
