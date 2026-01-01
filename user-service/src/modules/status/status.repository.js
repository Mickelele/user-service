const RolaStatus = require('./rolaStatus.model');
const HistoriaStatusow = require('./historiaStatusow.model');
const User = require('../users/user.model');

require('../../models/associations');

const StatusRepository = {
    async getAllRolaStatus() {
        return RolaStatus.findAll({
            order: [['status', 'ASC']]
        });
    },

    async getRolaStatusById(id) {
        return RolaStatus.findByPk(id);
    },

    async createRolaStatus(data) {
        return RolaStatus.create(data);
    },

    async updateRolaStatus(id, data) {
        const rolaStatus = await RolaStatus.findByPk(id);
        if (!rolaStatus) return null;
        
        return rolaStatus.update(data);
    },

    async deleteRolaStatus(id) {
        const rolaStatus = await RolaStatus.findByPk(id);
        if (!rolaStatus) return null;
        
        await rolaStatus.destroy();
        return rolaStatus;
    },

    async getAllHistoriaStatusow() {
        return HistoriaStatusow.findAll({
            include: [
                {
                    model: User,
                    as: 'uzytkownik',
                    attributes: ['id_uzytkownika', 'imie', 'nazwisko', 'email']
                },
                {
                    model: RolaStatus,
                    as: 'rolaStatus',
                    attributes: ['id_statusu', 'status']
                }
            ],
            order: [['data', 'DESC']]
        });
    },

    async getHistoriaStatusowById(id) {
        return HistoriaStatusow.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'uzytkownik',
                    attributes: ['id_uzytkownika', 'imie', 'nazwisko', 'email']
                },
                {
                    model: RolaStatus,
                    as: 'rolaStatus',
                    attributes: ['id_statusu', 'status']
                }
            ]
        });
    },

    async getHistoriaStatusowByUserId(userId) {
        return HistoriaStatusow.findAll({
            where: { id_uzytkownik: userId },
            include: [
                {
                    model: RolaStatus,
                    as: 'rolaStatus',
                    attributes: ['id_statusu', 'status']
                }
            ],
            order: [['data', 'DESC']]
        });
    },

    async createHistoriaStatusow(data) {
        return HistoriaStatusow.create(data);
    },

    async updateHistoriaStatusow(id, data) {
        const historia = await HistoriaStatusow.findByPk(id);
        if (!historia) return null;
        
        return historia.update(data);
    },

    async deleteHistoriaStatusow(id) {
        const historia = await HistoriaStatusow.findByPk(id);
        if (!historia) return null;
        
        await historia.destroy();
        return historia;
    }
};

module.exports = StatusRepository;
