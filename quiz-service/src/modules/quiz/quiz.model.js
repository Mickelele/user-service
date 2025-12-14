const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Quiz extends Model {}

Quiz.init({
    id_quizu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nazwa: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    opis: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    Zajecia_id_zajec: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'zajecia_id_zajec'
    }
}, {
    sequelize,
    modelName: 'Quiz',
    tableName: 'quiz',
    timestamps: false
});

module.exports = Quiz;
