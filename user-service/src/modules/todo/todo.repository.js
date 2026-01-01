const TaskStatus = require('./taskStatus.model');
const ListaZadan = require('./listaZadan.model');
const Zadanie = require('./zadanie.model');
const Uczen = require('../student/student.model');

require('../../models/associations');

const TodoRepository = {
    async getAllTaskStatuses() {
        return TaskStatus.findAll({
            order: [['id_status', 'ASC']]
        });
    },

    async getListyZadanByUczenId(uczenId) {
        return ListaZadan.findAll({
            where: { id_ucznia: uczenId },
            include: [
                {
                    model: Zadanie,
                    as: 'zadania',
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: TaskStatus,
                            as: 'status'
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });
    },

    async getListaZadanById(listaId) {
        return ListaZadan.findByPk(listaId, {
            include: [
                {
                    model: Zadanie,
                    as: 'zadania',
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: TaskStatus,
                            as: 'status'
                        }
                    ]
                }
            ]
        });
    },

    async createListaZadan(data) {
        return ListaZadan.create(data);
    },

    async updateListaZadan(listaId, data) {
        const lista = await ListaZadan.findByPk(listaId);
        if (!lista) return null;
        return lista.update(data);
    },

    async deleteListaZadan(listaId) {
        const lista = await ListaZadan.findByPk(listaId);
        if (!lista) return null;
        await lista.destroy();
        return lista;
    },

    async getZadaniaByUczenId(uczenId, filters = {}) {
        const where = { id_ucznia: uczenId, deleted: false };
        
        if (filters.id_statusu) {
            where.id_statusu = filters.id_statusu;
        }
        
        if (filters.id_lista) {
            where.id_lista = filters.id_lista;
        }

        return Zadanie.findAll({
            where,
            include: [
                {
                    model: TaskStatus,
                    as: 'status'
                },
                {
                    model: ListaZadan,
                    as: 'lista',
                    attributes: ['id_lista', 'nazwa']
                }
            ],
            order: [['termin', 'ASC'], ['priorytet', 'ASC']]
        });
    },

    async getZadanieById(zadanieId) {
        return Zadanie.findByPk(zadanieId, {
            include: [
                {
                    model: TaskStatus,
                    as: 'status'
                },
                {
                    model: ListaZadan,
                    as: 'lista'
                }
            ]
        });
    },

    async createZadanie(data) {
        return Zadanie.create(data);
    },

    async updateZadanie(zadanieId, data) {
        const zadanie = await Zadanie.findByPk(zadanieId);
        if (!zadanie) return null;
        return zadanie.update(data);
    },

    async deleteZadanie(zadanieId, soft = true) {
        const zadanie = await Zadanie.findByPk(zadanieId);
        if (!zadanie) return null;
        
        if (soft) {
            return zadanie.update({ deleted: true });
        } else {
            await zadanie.destroy();
            return zadanie;
        }
    },

    async markZadanieAsCompleted(zadanieId) {
        const zadanie = await Zadanie.findByPk(zadanieId);
        if (!zadanie) return null;
        
        const wykonaneStatus = await TaskStatus.findOne({ where: { nazwa: 'wykonane' } });
        if (!wykonaneStatus) return null;
        
        return zadanie.update({ id_statusu: wykonaneStatus.id_status });
    }
};

module.exports = TodoRepository;
