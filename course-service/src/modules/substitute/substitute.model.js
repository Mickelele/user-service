const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Zastepstwo extends Model {}

Zastepstwo.init({
    id_zastepstwa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Zajecia_id_zajec: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'zajecia',
            key: 'id_zajec'
        }
    },
    id_nauczyciela_zglaszajacego: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_nauczyciel_zastepujacy: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Zastepstwo',
    tableName: 'zastepstwo',
    timestamps: false
});

module.exports = Zastepstwo;
