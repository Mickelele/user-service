const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class OdpowiedzNaZadanie extends Model {}

OdpowiedzNaZadanie.init({
    id_odpowiedzi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_ucznia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_zadania: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tresc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ocena: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'OdpowiedzNaZadanie',
    tableName: 'odpowiedz_na_zadanie',
    timestamps: false
});

module.exports = OdpowiedzNaZadanie;

