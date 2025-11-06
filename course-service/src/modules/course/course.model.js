const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Kurs extends Model {}

Kurs.init({
    id_kursu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nazwa_kursu: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    data_rozpoczecia: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_zakonczenia: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Kurs',
    tableName: 'kurs',
    timestamps: false
});

module.exports = Kurs;
