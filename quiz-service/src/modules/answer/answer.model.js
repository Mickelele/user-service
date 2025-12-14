const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Odpowiedz extends Model {}

Odpowiedz.init({
    id_odpowiedzi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pytania: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pytanie',
            key: 'id_pytania'
        }
    },
    tresc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    czy_poprawna: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Odpowiedz',
    tableName: 'odpowiedz',
    timestamps: false
});

module.exports = Odpowiedz;
