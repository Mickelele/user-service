const UserService = require('./uczen.service');

const UczenController = {
    async getProfile(req, res) {
        try {
            const profile = await UserService.getProfile(req.user.id);
            res.json(profile);
        } catch (err) {
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
    }
};

module.exports = UczenController;
