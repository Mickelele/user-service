const Quiz = require('../modules/quiz/quiz.model');
const Pytanie = require('../modules/question/question.model');
const Odpowiedz = require('../modules/answer/answer.model');
const Zajecia = require('./zajecia.model');

// Quiz -> Pytanie (1:N)
Quiz.hasMany(Pytanie, {
    foreignKey: 'id_quizu',
    as: 'pytania',
    onDelete: 'CASCADE'
});
Pytanie.belongsTo(Quiz, {
    foreignKey: 'id_quizu',
    as: 'quiz'
});

// Pytanie -> Odpowiedź (1:N)
Pytanie.hasMany(Odpowiedz, {
    foreignKey: 'id_pytania',
    as: 'odpowiedzi',
    onDelete: 'CASCADE'
});
Odpowiedz.belongsTo(Pytanie, {
    foreignKey: 'id_pytania',
    as: 'pytanie'
});

// Zajecia -> Quiz (1:N)
Zajecia.hasMany(Quiz, {
    foreignKey: 'Zajecia_id_zajec',
    as: 'quizy'
});
Quiz.belongsTo(Zajecia, {
    foreignKey: 'Zajecia_id_zajec',
    as: 'zajecia'
});

module.exports = {
    Quiz,
    Pytanie,
    Odpowiedz,
    Zajecia
};
