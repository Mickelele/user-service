const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Zadanie extends Model {}

Zadanie.init({
    id_zadania: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_lista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lista_zadan',
            key: 'id_lista'
        }
    },
    id_ucznia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'uczen',
            key: 'id_ucznia'
        }
    },
    tytul: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_dodania: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    termin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    priorytet: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 3,
        validate: {
            min: 1,
            max: 5
        }
    },
    id_statusu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'task_status',
            key: 'id_status'
        }
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Zadanie',
    tableName: 'zadanie',
    timestamps: false
});

module.exports = Zadanie;
