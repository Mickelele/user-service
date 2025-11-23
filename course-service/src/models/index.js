const { sequelize } = require('../config/db');
const { Kurs, Grupa, Nauczyciel, Uczen, Zajecia, Obecnosc, Sala, Rezerwacja } = require('./associations');

const initModels = async () => {
    await sequelize.authenticate();
    console.log('Połączono z bazą danych');

    await sequelize.sync({ alter: false });

    console.log('Modele i relacje zostały zarejestrowanee');
};

module.exports = { sequelize, Kurs, Grupa, Nauczyciel, Uczen, Zajecia, Obecnosc, Sala, Rezerwacja, initModels };
