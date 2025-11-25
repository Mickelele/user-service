const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Uwaga extends Model {}

Uwaga.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_ucznia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_zajec: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tresc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    id_nauczyciela: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Uwaga',
    tableName: 'uwaga',
    timestamps: false
});

module.exports = Uwaga;
