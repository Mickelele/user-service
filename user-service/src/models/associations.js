const User = require('../modules/users/user.model');
const Zdjecie = require('../modules/zdjecie/zdjecie.model');
const Nauczyciel = require('../modules/teacher/teacher.model');
const Uczen = require('../modules/student/student.model');
const Opiekun = require('../modules/guardian/guardian.model');
const RolaStatus = require('../modules/status/rolaStatus.model');
const HistoriaStatusow = require('../modules/status/historiaStatusow.model');
const TaskStatus = require('../modules/todo/taskStatus.model');
const ListaZadan = require('../modules/todo/listaZadan.model');
const Zadanie = require('../modules/todo/zadanie.model');

User.belongsTo(Zdjecie, {
    foreignKey: 'id_zdjecia',
    as: 'zdjecie'
});

Nauczyciel.belongsTo(User, {
    foreignKey: 'id_nauczyciela',
    as: 'user'
});
User.hasOne(Nauczyciel, {
    foreignKey: 'id_nauczyciela',
    as: 'nauczyciel'
});

Uczen.belongsTo(User, {
    foreignKey: 'id_ucznia',
    as: 'userDetails'
});
User.hasOne(Uczen, {
    foreignKey: 'id_ucznia',
    as: 'uczen'
});

Uczen.belongsTo(Opiekun, {
    foreignKey: 'Opiekun_id_opiekuna',
    as: 'opiekun'
});
Opiekun.hasMany(Uczen, {
    foreignKey: 'Opiekun_id_opiekuna',
    as: 'uczniowie'
});

Opiekun.belongsTo(User, {
    foreignKey: 'id_opiekuna',
    as: 'userDetails'
});
User.hasOne(Opiekun, {
    foreignKey: 'id_opiekuna',
    as: 'opiekun'
});

// Historia statusów - związki
HistoriaStatusow.belongsTo(User, {
    foreignKey: 'id_uzytkownik',
    as: 'uzytkownik'
});
User.hasMany(HistoriaStatusow, {
    foreignKey: 'id_uzytkownik',
    as: 'historiaStatusow'
});

HistoriaStatusow.belongsTo(RolaStatus, {
    foreignKey: 'id_statusu',
    as: 'rolaStatus'
});
RolaStatus.hasMany(HistoriaStatusow, {
    foreignKey: 'id_statusu',
    as: 'historiaStatusow'
});

ListaZadan.belongsTo(Uczen, {
    foreignKey: 'id_ucznia',
    as: 'uczen'
});
Uczen.hasMany(ListaZadan, {
    foreignKey: 'id_ucznia',
    as: 'listyZadan'
});

Zadanie.belongsTo(ListaZadan, {
    foreignKey: 'id_lista',
    as: 'lista'
});
ListaZadan.hasMany(Zadanie, {
    foreignKey: 'id_lista',
    as: 'zadania'
});

Zadanie.belongsTo(Uczen, {
    foreignKey: 'id_ucznia',
    as: 'uczen'
});
Uczen.hasMany(Zadanie, {
    foreignKey: 'id_ucznia',
    as: 'zadania'
});

Zadanie.belongsTo(TaskStatus, {
    foreignKey: 'id_statusu',
    as: 'status'
});
TaskStatus.hasMany(Zadanie, {
    foreignKey: 'id_statusu',
    as: 'zadania'
});

module.exports = {
    User,
    Zdjecie,
    Nauczyciel,
    Uczen,
    Opiekun,
    RolaStatus,
    HistoriaStatusow,
    TaskStatus,
    ListaZadan,
    Zadanie
};