const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class RolaStatus extends Model {}

RolaStatus.init({
    id_statusu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'RolaStatus',
    tableName: 'rolastatus',
    timestamps: false
});

module.exports = RolaStatus;
