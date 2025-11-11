const Kurs = require('../modules/course/course.model');
const Grupa = require('../modules/group/group.model');
const Uczen = require('../modules/student/student.model');

// Kurs 1—* Grupa
Kurs.hasMany(Grupa, { foreignKey: 'Kurs_id_kursu', as: 'grupy' });
Grupa.belongsTo(Kurs, { foreignKey: 'Kurs_id_kursu', as: 'kurs' });

// Grupa 0—* Uczen
Grupa.hasMany(Uczen, {foreignKey: 'id_grupa', as: 'uczniowie'});
Uczen.belongsTo(Grupa, {foreignKey: 'id_grupa', as: 'grupa'});

module.exports = { Kurs, Grupa };
