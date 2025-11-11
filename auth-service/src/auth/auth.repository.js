const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';

const AuthRepository = {
    async findByEmail(email) {
        const res = await axios.get(`${USER_SERVICE_URL}/user/email/${email}`);
        return res.data;
    },

    async createUser(data) {
        const userRes = await axios.post(`${USER_SERVICE_URL}/user`, data);

        const opiekunData = {
            id_opiekuna: userRes.data.id,
            nr_indy_konta_bankowego: data.nr_indy_konta_bankowego || 'BRAK'
        };

        await axios.post(`${USER_SERVICE_URL}/opiekunowie`, opiekunData);

        return userRes.data;
    },
};

module.exports = AuthRepository;
