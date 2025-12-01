const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class ZadanieDomowe extends Model {}

ZadanieDomowe.init({
    id_zadania: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_grupy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tytul: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    termin: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ZadanieDomowe',
    tableName: 'zadanie_domowe',
    timestamps: false
});

module.exports = ZadanieDomowe;
