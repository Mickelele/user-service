const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Pytanie extends Model {}

Pytanie.init({
    id_pytania: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_quizu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'quiz',
            key: 'id_quizu'
        }
    },
    tresc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ilosc_punktow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Pytanie',
    tableName: 'pytanie',
    timestamps: false
});

module.exports = Pytanie;
