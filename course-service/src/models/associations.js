const Kurs = require('../modules/course/course.model');
const Grupa = require('../modules/group/group.model');
const Nauczyciel = require('../modules/course/teacher.model');
const Uczen = require('../modules/group/student.model');
const Zajecia = require('../modules/lesson/lesson.model');
const Obecnosc = require('../modules/presence/presence.model');


//RELACJE KURS ↔ GRUPA
Kurs.hasMany(Grupa, { foreignKey: 'Kurs_id_kursu', as: 'grupy' });
Grupa.belongsTo(Kurs, { foreignKey: 'Kurs_id_kursu', as: 'kurs' });


//RELACJE NAUCZYCIEL ↔ GRUPA
Nauczyciel.hasMany(Grupa, { foreignKey: 'id_nauczyciela', as: 'grupy' });
Grupa.belongsTo(Nauczyciel, { foreignKey: 'id_nauczyciela', as: 'nauczyciel' });


//RELACJE GRUPA ↔ UCZEŃ
Grupa.hasMany(Uczen, { foreignKey: 'id_grupa', as: 'uczniowie' });
Uczen.belongsTo(Grupa, { foreignKey: 'id_grupa', as: 'grupa' });



//RELACJE GRUPA ↔ ZAJĘCIA
Grupa.hasMany(Zajecia, { foreignKey: 'id_grupy', as: 'zajecia' });
Zajecia.belongsTo(Grupa, { foreignKey: 'id_grupy', as: 'grupa' });



//RELACJE ZAJĘCIA ↔ OBECNOŚĆ
Zajecia.hasMany(Obecnosc, { foreignKey: 'id_zajec', as: 'obecnosci' });
Obecnosc.belongsTo(Zajecia, { foreignKey: 'id_zajec', as: 'zajecia' });



//RELACJE UCZEŃ ↔ OBECNOŚĆ
Uczen.hasMany(Obecnosc, { foreignKey: 'id_ucznia', as: 'obecnosci' });
Obecnosc.belongsTo(Uczen, { foreignKey: 'id_ucznia', as: 'uczen' });


module.exports = {
    Kurs,
    Grupa,
    Nauczyciel,
    Uczen,
    Zajecia,
    Obecnosc
};
