const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class ListaZadan extends Model {}

ListaZadan.init({
    id_lista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_ucznia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'uczen',
            key: 'id_ucznia'
        }
    },
    nazwa: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'ListaZadan',
    tableName: 'lista_zadan',
    timestamps: false
});

module.exports = ListaZadan;
