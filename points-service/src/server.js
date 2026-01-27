require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const pointsRoutes = require('./modules/points/points.routes');
const prizeRoutes = require('./modules/prize/prize.routes');
require('./models/associations');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use('/punkty', pointsRoutes);
app.use('/nagrody', prizeRoutes);

const PORT = process.env.PORT || 6000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Połączono z PostgreSQL przez Sequelize!');

        await sequelize.sync();
        console.log('Modele zsynchronizowane');

        app.listen(PORT, () => console.log(`Points-service działa na porcie ${PORT}`));
    } catch (err) {
        console.error('Błąd połączenia z bazą:', err);
    }
})();
