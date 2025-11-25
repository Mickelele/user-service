const User = require('../modules/users/user.model');
const Zdjecie = require('../modules/zdjecie/zdjecie.model');
const Nauczyciel = require('../modules/teacher/teacher.model');
const Uczen = require('../modules/student/student.model');
const Opiekun = require('../modules/guardian/guardian.model');

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

module.exports = {
    User,
    Zdjecie,
    Nauczyciel,
    Uczen,
    Opiekun
};