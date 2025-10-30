const { DataTypes } = require('sequelize');
const sequelize = require('../../../models');

const User = sequelize.define('Uzytkownik', {
    id_uzytkownika: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imie: { type: DataTypes.STRING, allowNull: false },
    nazwisko: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    haslo: { type: DataTypes.STRING, allowNull: false },
    rola: {
        type: DataTypes.ENUM('uczeń', 'opiekun', 'nauczyciel', 'administrator', 'gość'),
        allowNull: false
    }
}, {
    tableName: 'Uzytkownik',
    timestamps: false
});

module.exports = User;
