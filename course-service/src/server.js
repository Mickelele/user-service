require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const courseRoutes = require('./modules/course/course.routes');
const groupRoutes = require('./modules/group/group.routes');
const lessonRoutes = require('./modules/lesson/lesson.routes');
const presenceRoutes = require('./modules/presence/presence.routes');
const roomRoutes = require('./modules/room/room.routes');
const reservationRoutes = require('./modules/reservation/reservation.routes');
const commentRoutes = require('./modules/comment/comment.routes');
const homeworkRoutes = require('./modules/homework/zadanieDomowe.routes');
const homeworkAnswerRoutes = require('./modules/homework_answer/odpowiedzNaZadanie.routes');
const substituteRoutes = require('./modules/substitute/substitute.routes');
const { initModels } = require('./models');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use('/kursy', courseRoutes);
app.use('/grupy', groupRoutes);
app.use('/zajecia', lessonRoutes);
app.use('/obecnosc', presenceRoutes);
app.use('/sale', roomRoutes);
app.use('/rezerwacje', reservationRoutes);
app.use('/uwagi', commentRoutes);
app.use('/zadania', homeworkRoutes);
app.use('/odpowiedzi', homeworkAnswerRoutes);
app.use('/zastepstwa', substituteRoutes);


const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Połączono z PostgreSQL przez Sequelize!');

        await sequelize.sync();
        console.log('Modele zsynchronizowane');

        app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
    } catch (err) {
        console.error('Błąd połączenia z bazą:', err);
    }
})();
