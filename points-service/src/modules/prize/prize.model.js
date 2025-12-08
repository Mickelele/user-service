const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Nagroda extends Model {}

Nagroda.init({
    id_nagrody: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nazwa: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    koszt: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Nagroda',
    tableName: 'nagroda',
    timestamps: false
});

module.exports = Nagroda;
