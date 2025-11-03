const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

class User extends Model {}

User.init({
    id_uzytkownika: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imie: { type: DataTypes.STRING, allowNull: false },
    nazwisko: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    haslo: { type: DataTypes.STRING, allowNull: false },
    rola: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Uzytkownik',
    timestamps: false
});

module.exports = User;
