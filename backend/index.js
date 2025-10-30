const express = require('express');
const app = express();
const sequelize = require('./models');
const userController = require('./modules/auth/Controllers/AuthController');

app.use(express.json());
app.use('/Controllers/users', userController);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Backend działa na http://localhost:3000'));
    })
    .catch(err => console.error('Błąd przy sync:', err));
