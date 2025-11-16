const Opiekun = require('./guardian.model');
const Uczen = require('../student/student.model');
const User = require('../users/user.model');

const OpiekunRepository = {
    async findAll() {
        return await Opiekun.findAll();
    },

    async findById(id) {
        return await Opiekun.findByPk(id);
    },

    async create(data) {
        return await Opiekun.create(data);
    },

    async update(id, data) {
        const opiekun = await Opiekun.findByPk(id);
        if (!opiekun) throw new Error('Opiekun nie znaleziony');
        return await opiekun.update(data);
    },

    async delete(id) {
        const opiekun = await Opiekun.findByPk(id);
        if (!opiekun) throw new Error('Opiekun nie znaleziony');
        await opiekun.destroy();
        return { message: 'Usunięto opiekuna' };
    },

    async findStudentsWithUserInfo(id_opiekuna) {
        try {
            console.log(`Szukam uczniów dla opiekuna ID: ${id_opiekuna}`);

            const uczniowie = await Uczen.findAll({
                where: { Opiekun_id_opiekuna: id_opiekuna }
            });

            console.log(`Znaleziono ${uczniowie.length} uczniów`);

            const uczniowieZUserami = await Promise.all(
                uczniowie.map(async (uczen) => {
                    try {
                        console.log(`Pobieram usera dla ucznia ID: ${uczen.id_ucznia}`);
                        const user = await User.findByPk(uczen.id_ucznia);

                        console.log(`User dla ucznia ${uczen.id_ucznia}:`, user ? 'znaleziony' : 'nie znaleziony');

                        return {
                            id_ucznia: uczen.id_ucznia,
                            id_grupa: uczen.id_grupa,
                            Opiekun_id_opiekuna: uczen.Opiekun_id_opiekuna,
                            saldo_punktow: uczen.saldo_punktow,
                            pseudonim: uczen.pseudonim,
                            user: user ? {
                                id_uzytkownika: user.id_uzytkownika,
                                imie: user.imie,
                                nazwisko: user.nazwisko,
                                email: user.email
                            } : null
                        };
                    } catch (error) {
                        console.error(`Błąd przy pobieraniu usera dla ucznia ${uczen.id_ucznia}:`, error);
                        return {
                            id_ucznia: uczen.id_ucznia,
                            id_grupa: uczen.id_grupa,
                            Opiekun_id_opiekuna: uczen.Opiekun_id_opiekuna,
                            saldo_punktow: uczen.saldo_punktow,
                            pseudonim: uczen.pseudonim,
                            user: null
                        };
                    }
                })
            );

            console.log('Finalne dane uczniów:', uczniowieZUserami);
            return uczniowieZUserami;

        } catch (error) {
            console.error('Błąd w findStudentsWithUserInfo:', error);
            throw error;
        }
    }
};

module.exports = OpiekunRepository;