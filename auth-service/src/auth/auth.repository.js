const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';

const AuthRepository = {
    async findByEmail(email) {
        const res = await axios.get(`${USER_SERVICE_URL}/user/email/${email}`);
        return res.data;
    },

    async createUser(data) {
        const res = await axios.post(`${USER_SERVICE_URL}/user`, data);
        return res.data;
    }
};

module.exports = AuthRepository;
