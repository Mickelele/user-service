const { sequelize } = require('../config/db');
const { Kurs, Grupa } = require('./associations');
const Nauczyciel = require("../modules/course/teacher.model");
const Uczen = require("../modules/group/student.model");
const Zajecia = require("../modules/lesson/lesson.model");
const Obecnosc = require("../modules/presence/presence.model");

const initModels = async () => {
    await sequelize.authenticate();
    console.log('✅ Połączono z bazą danych');

    await sequelize.sync({ alter: false });

    console.log('✅ Modele i relacje zostały zarejestrowanee');
};

module.exports = { sequelize, Kurs, Grupa, initModels };
