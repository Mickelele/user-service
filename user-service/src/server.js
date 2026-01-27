require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { sequelize } = require('./config/db');
const userRouter = require('./modules/users/user.routes');
const teacherRouter = require('./modules/teacher/teacher.routes');
const guardianRouter = require('./modules/guardian/guardian.routes');
const studentRouter = require('./modules/student/student.routes');
const statusRouter = require('./modules/status/status.routes');
const todoRouter = require('./modules/todo/todo.routes');
const adminRouter = require('./modules/admin/admin.routes');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use('/user', userRouter);
app.use('/nauczyciele', teacherRouter);
app.use('/opiekunowie', guardianRouter);
app.use('/uczniowie', studentRouter);
app.use('/status', statusRouter);
app.use('/todo', todoRouter);
app.use('/administratorzy', adminRouter);

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
