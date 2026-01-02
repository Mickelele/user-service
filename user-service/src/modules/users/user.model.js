const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

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
    rola: {
        type: DataTypes.ENUM('uczen', 'opiekun', 'nauczyciel', 'administrator', 'gosc'),
        allowNull: false,
    },
    reset_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    reset_token_expire_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'uzytkownik',
    timestamps: false
});

module.exports = User;
