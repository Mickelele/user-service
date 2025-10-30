class IAuthService {
    createUser(userData) { throw new Error('Not implemented'); }
    getUserByEmail(email) { throw new Error('Not implemented'); }
    verifyPassword(userId) { throw new Error('Not implemented'); }
}

module.exports = IAuthService;
