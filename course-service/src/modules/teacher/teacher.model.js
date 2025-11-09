const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Nauczyciel extends Model {}

Nauczyciel.init({
    id_nauczyciela: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    numer_nauczyciela: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nr_konta_bankowego: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Nauczyciel',
    tableName: 'nauczyciel',
    timestamps: false
});

module.exports = Nauczyciel;
