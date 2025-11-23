const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Rezerwacja extends Model {}

Rezerwacja.init({
    id_rezerwacji: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_nauczyciela: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_sali: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_od: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    data_do: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'rezerwacja',
    timestamps: false
});

module.exports = Rezerwacja;
