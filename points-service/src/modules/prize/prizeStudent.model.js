const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class RelacjaNagrodaUczen extends Model {}

RelacjaNagrodaUczen.init({
    id_nagroda_uczen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_nagrody: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'nagroda',
            key: 'id_nagrody'
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
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'RelacjaNagrodaUczen',
    tableName: 'relacjanagrodauczen',
    timestamps: false
});

module.exports = RelacjaNagrodaUczen;
