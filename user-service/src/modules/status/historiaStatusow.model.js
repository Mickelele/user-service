const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class HistoriaStatusow extends Model {}

HistoriaStatusow.init({
    id_historiastatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_uzytkownik: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'uzytkownik',
            key: 'id_uzytkownika'
        }
    },
    id_statusu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rolastatus',
            key: 'id_statusu'
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'HistoriaStatusow',
    tableName: 'historia_statusow',
    timestamps: false
});

module.exports = HistoriaStatusow;
