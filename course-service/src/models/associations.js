const Kurs = require('../modules/course/course.model');
const Grupa = require('../modules/group/group.model');
const Nauczyciel = require('../modules/course/teacher.model');
const Uczen = require('../modules/group/student.model');
const Zajecia = require('../modules/lesson/lesson.model');
const Obecnosc = require('../modules/presence/presence.model');
const Sala = require('../modules/room/room.model');
const Rezerwacja = require('../modules/reservation/reservation.model');
const ZadanieDomowe = require('../modules/homework/zadanieDomowe.model');
const OdpowiedzNaZadanie = require('../modules/homework_answer/odpowiedzNaZadanie.model');
const Zastepstwo = require('../modules/substitute/substitute.model');

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


// SALA ↔ ZAJĘCIA  (0..* zajęcia)
Sala.hasMany(Zajecia, { foreignKey: 'Sala_id_sali', as: 'zajecia' });
Zajecia.belongsTo(Sala, { foreignKey: 'Sala_id_sali', as: 'sala' });

// SALA ↔ REZERWACJE
Sala.hasMany(Rezerwacja, { foreignKey: 'id_sali', as: 'rezerwacje' });
Rezerwacja.belongsTo(Sala, { foreignKey: 'id_sali', as: 'sala' });

// NAUCZYCIEL ↔ REZERWACJE
Nauczyciel.hasMany(Rezerwacja, { foreignKey: 'id_nauczyciela', as: 'rezerwacje' });
Rezerwacja.belongsTo(Nauczyciel, { foreignKey: 'id_nauczyciela', as: 'nauczyciel' });



Grupa.hasMany(ZadanieDomowe, {
    foreignKey: 'id_grupy',
    as: 'zadania'
});
ZadanieDomowe.belongsTo(Grupa, {
    foreignKey: 'id_grupy',
    as: 'grupa'
});

ZadanieDomowe.hasMany(OdpowiedzNaZadanie, {
    foreignKey: 'id_zadania',
    as: 'odpowiedzi'
});
OdpowiedzNaZadanie.belongsTo(ZadanieDomowe, {
    foreignKey: 'id_zadania',
    as: 'zadanie'
});

Uczen.hasMany(OdpowiedzNaZadanie, {
    foreignKey: 'id_ucznia',
    as: 'odpowiedzi'
});
OdpowiedzNaZadanie.belongsTo(Uczen, {
    foreignKey: 'id_ucznia',
    as: 'uczen'
});


// ZAJĘCIA ↔ ZASTĘPSTWA
Zajecia.hasMany(Zastepstwo, { foreignKey: 'zajecia_id_zajec', as: 'zastepstwa' });
Zastepstwo.belongsTo(Zajecia, { foreignKey: 'zajecia_id_zajec', as: 'zajecia' });


module.exports = {
    Kurs,
    Grupa,
    Nauczyciel,
    Uczen,
    Zajecia,
    Obecnosc,
    Rezerwacja,
    Sala,
    ZadanieDomowe,
    OdpowiedzNaZadanie,
    Zastepstwo
};
