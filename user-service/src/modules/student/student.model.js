const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Uczen extends Model {}

Uczen.init({
    id_ucznia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_grupa: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Opiekun_id_opiekuna: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'opiekun_id_opiekuna'
    },
    saldo_punktow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    pseudonim: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Uczen',
    tableName: 'uczen',
    timestamps: false
});

module.exports = Uczen;
