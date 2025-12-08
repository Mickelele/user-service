const Uczen = require('../modules/points/points.model');
const Nagroda = require('../modules/prize/prize.model');
const RelacjaNagrodaUczen = require('../modules/prize/prizeStudent.model');

// Relacja Many-to-Many: Uczen <-> Nagroda przez RelacjaNagrodaUczen
Uczen.belongsToMany(Nagroda, {
    through: RelacjaNagrodaUczen,
    foreignKey: 'id_ucznia',
    otherKey: 'id_nagrody',
    as: 'nagrody'
});

Nagroda.belongsToMany(Uczen, {
    through: RelacjaNagrodaUczen,
    foreignKey: 'id_nagrody',
    otherKey: 'id_ucznia',
    as: 'uczniowie'
});

// Relacje dla bezpośredniego dostępu do tabeli asocjacyjnej
RelacjaNagrodaUczen.belongsTo(Uczen, {
    foreignKey: 'id_ucznia',
    as: 'uczen'
});

RelacjaNagrodaUczen.belongsTo(Nagroda, {
    foreignKey: 'id_nagrody',
    as: 'nagroda'
});

module.exports = {
    Uczen,
    Nagroda,
    RelacjaNagrodaUczen
};
