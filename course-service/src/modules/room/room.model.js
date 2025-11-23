const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Sala extends Model {}

Sala.init({
    id_sali: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lokalizacja: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ilosc_miejsc: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'sala',
    timestamps: false
});

module.exports = Sala;
