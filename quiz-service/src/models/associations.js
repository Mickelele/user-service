const Quiz = require('../modules/quiz/quiz.model');
const Pytanie = require('../modules/question/question.model');
const Odpowiedz = require('../modules/answer/answer.model');
const Zajecia = require('./zajecia.model');
const WynikQuizu = require('../modules/quizResult/wynikQuizu.model');


Quiz.hasMany(Pytanie, {
    foreignKey: 'id_quizu',
    as: 'pytania',
    onDelete: 'CASCADE'
});
Pytanie.belongsTo(Quiz, {
    foreignKey: 'id_quizu',
    as: 'quiz'
});


Pytanie.hasMany(Odpowiedz, {
    foreignKey: 'id_pytania',
    as: 'odpowiedzi',
    onDelete: 'CASCADE'
});
Odpowiedz.belongsTo(Pytanie, {
    foreignKey: 'id_pytania',
    as: 'pytanie'
});


Zajecia.hasMany(Quiz, {
    foreignKey: 'Zajecia_id_zajec',
    as: 'quizy'
});
Quiz.belongsTo(Zajecia, {
    foreignKey: 'Zajecia_id_zajec',
    as: 'zajecia'
});


Quiz.hasMany(WynikQuizu, {
    foreignKey: 'Quiz_id_quizu',
    as: 'wyniki'
});
WynikQuizu.belongsTo(Quiz, {
    foreignKey: 'Quiz_id_quizu',
    as: 'quiz'
});

module.exports = {
    Quiz,
    Pytanie,
    Odpowiedz,
    Zajecia,
    WynikQuizu
};
