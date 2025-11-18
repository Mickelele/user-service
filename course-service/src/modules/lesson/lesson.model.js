const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Zajecia extends Model {}

Zajecia.init({
    id_zajec: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_grupy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Sala_id_sali: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sala_id_sali'
    },
    tematZajec: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'tematzajec'
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    godzina: {
        type: DataTypes.TIME,
        allowNull: false
    },
    notatki_od_nauczyciela: {
        type: DataTypes.STRING(500),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Zajecia',
    tableName: 'zajecia',
    timestamps: false
});

module.exports = Zajecia;
