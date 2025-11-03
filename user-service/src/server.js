require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRouter = require('./modules/auth/auth.routes');
const userRouter = require('./modules/users/user.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());


app.use('/auth', authRouter);
app.use('/user', userRouter);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Połączono z PostgreSQL przez Sequelize');
        await sequelize.sync();
        console.log('Modele zsynchronizowane');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(` Serwer działa na http://localhost:${PORT}`));
    } catch (err) {
        console.error('Błąd połączenia z bazą:', err);
    }
})();