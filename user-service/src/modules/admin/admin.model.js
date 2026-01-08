const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/db');

class Administrator extends Model {}

Administrator.init({
    id_administratora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Administrator',
    tableName: 'administrator',
    timestamps: false
});

module.exports = Administrator;
