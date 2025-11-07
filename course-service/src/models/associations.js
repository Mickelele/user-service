const Kurs = require('../modules/course/course.model');
const Grupa = require('../modules/group/group.model');
const Nauczyciel = require('../modules/teacher/teacher.model');

// Kurs 1—* Grupa
Kurs.hasMany(Grupa, { foreignKey: 'Kurs_id_kursu', as: 'grupy' });
Grupa.belongsTo(Kurs, { foreignKey: 'Kurs_id_kursu', as: 'kurs' });

// Nauczyciel 1—* Grupa
Nauczyciel.hasMany(Grupa, { foreignKey: 'id_nauczyciela', as: 'grupy' });
Grupa.belongsTo(Nauczyciel, { foreignKey: 'id_nauczyciela', as: 'nauczyciel' });

module.exports = { Kurs, Grupa, Nauczyciel };
