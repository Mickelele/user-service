const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class TaskStatus extends Model {}

TaskStatus.init({
    id_status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nazwa: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'TaskStatus',
    tableName: 'task_status',
    timestamps: false
});

module.exports = TaskStatus;
