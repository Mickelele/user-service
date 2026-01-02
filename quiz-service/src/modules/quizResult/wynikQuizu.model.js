const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class WynikQuizu extends Model {}

WynikQuizu.init({
    id_wyniku_quizu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Uczen_id_ucznia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'uczen_id_ucznia'
    },
    Quiz_id_quizu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quiz_id_quizu'
    },
    wynik: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_uzyskania: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'WynikQuizu',
    tableName: 'wynikquizu',
    timestamps: false
});

module.exports = WynikQuizu;
