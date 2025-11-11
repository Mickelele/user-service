const { sequelize } = require('../config/db');
const { Kurs, Grupa } = require('./associations');

const initModels = async () => {
    await sequelize.authenticate();
    console.log('✅ Połączono z bazą danych');

    await sequelize.sync({ alter: false });

    console.log('✅ Modele i relacje zostały zarejestrowane');
};

module.exports = { sequelize, Kurs, Grupa, initModels };
