const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');
const Kurs = require('../course/course.model');
const Nauczyciel = require('../../../../user-service/src/modules/teacher/teacher.model');

class Grupa extends Model {}

Grupa.init({
    id_grupa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_nauczyciela: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_nauczyciela'
    },
    Kurs_id_kursu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'kurs_id_kursu'
    },
    liczba_uczniow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    dzien_tygodnia: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Poniedziałek'
    }
}, {
    sequelize,
    modelName: 'Grupa',
    tableName: 'grupa',
    timestamps: false
});

module.exports = Grupa;
