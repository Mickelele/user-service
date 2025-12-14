require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const quizRoutes = require('./modules/quiz/quiz.routes');
const questionRoutes = require('./modules/question/question.routes');
const answerRoutes = require('./modules/answer/answer.routes');
require('./models/associations');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use('/quizy', quizRoutes);
app.use('/pytania', questionRoutes);
app.use('/odpowiedzi', answerRoutes);

const PORT = process.env.PORT || 7000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Połączono z PostgreSQL przez Sequelize!');

        await sequelize.sync();
        console.log('Modele zsynchronizowane');

        app.listen(PORT, () => console.log(`Quiz-service działa na porcie ${PORT}`));
    } catch (err) {
        console.error('Błąd połączenia z bazą:', err);
    }
})();
