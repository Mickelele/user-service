const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Obecnosc extends Model {}

Obecnosc.init({
    id_obecnosci: {
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
    czyObecny: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        field: 'czyobecny'
    }
}, {
    sequelize,
    tableName: 'obecnosc',
    timestamps: false
});

module.exports = Obecnosc;
