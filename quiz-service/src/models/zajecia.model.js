const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

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
    }
}, {
    sequelize,
    modelName: 'Zajecia',
    tableName: 'zajecia',
    timestamps: false
});

module.exports = Zajecia;
