// src/modules/opiekun/opiekun.model.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Opiekun extends Model {}

Opiekun.init({
    id_opiekuna: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nr_indy_konta_bankowego: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Opiekun',
    tableName: 'Opiekun',
    timestamps: false
});

module.exports = Opiekun;
