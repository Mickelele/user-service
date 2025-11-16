const User = require('../modules/users/user.model');
const Zdjecie = require('../modules/zdjecie/zdjecie.model');
const Nauczyciel = require('../modules/teacher/teacher.model');
const Uczen = require('../modules/student/student.model');
const Opiekun = require('../modules/guardian/guardian.model');

// ==== RELACJE DLA ZDJĘĆ ====
User.belongsTo(Zdjecie, {
    foreignKey: 'id_zdjecia',
    as: 'zdjecie'
});

// ==== RELACJE DLA NAUCZYCIELI ====
Nauczyciel.belongsTo(User, {
    foreignKey: 'id_nauczyciela',
    as: 'user'
});
User.hasOne(Nauczyciel, {
    foreignKey: 'id_nauczyciela',
    as: 'nauczyciel'
});

// ==== RELACJE DLA UCZNIÓW ====
Uczen.belongsTo(User, {
    foreignKey: 'id_ucznia',
    as: 'user'
});
User.hasOne(Uczen, {
    foreignKey: 'id_ucznia',
    as: 'uczen'
});

// Uczeń → Opiekun
Uczen.belongsTo(Opiekun, {
    foreignKey: 'Opiekun_id_opiekuna',
    as: 'opiekun'
});
Opiekun.hasMany(Uczen, {
    foreignKey: 'Opiekun_id_opiekuna',
    as: 'dzieci'
});

// ==== RELACJE DLA OPIEKUNÓW ====
Opiekun.belongsTo(User, {
    foreignKey: 'id_opiekuna',
    as: 'user'
});
User.hasOne(Opiekun, {
    foreignKey: 'id_opiekuna',
    as: 'opiekun'
});

module.exports = {
    User,
    Zdjecie,
    Nauczyciel,
    Uczen,
    Opiekun
};
